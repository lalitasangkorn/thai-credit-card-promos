// src/scraper.js
// เครื่องมือดึงข้อมูลโปรโมชั่นจากเว็บธนาคาร
//
// โหมดการทำงาน (ตั้งผ่าน env SCRAPER_MODE):
//   "cheerio"   (ค่าเริ่มต้น) — ดึง HTML ด้วย fetch แล้ว parse ด้วย cheerio  เร็ว เบา แต่ไม่รองรับหน้า JS-rendered
//   "puppeteer" — เปิดเบราว์เซอร์จริง รองรับหน้า JS แต่ต้องติดตั้ง puppeteer (npm i puppeteer) และช้ากว่า
//
// ทุกธนาคารที่ scrape ไม่สำเร็จจะ fallback ไปใช้ข้อมูลใน src/seed.js โดยอัตโนมัติ

import * as cheerio from "cheerio";
import { BANKS } from "../config/banks.js";
import { classifyCategories, guessMinSalary } from "./categories.js";
import { SEED } from "./seed.js";
import { getCached, setCached } from "./cache.js";

const MODE = process.env.SCRAPER_MODE ?? "cheerio";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const TIMEOUT = parseInt(process.env.FETCH_TIMEOUT_MS ?? "12000", 10);

function abs(url, base) {
  if (!url) return base;
  try { return new URL(url, base).href; } catch { return base; }
}

function clean(s = "") {
  return s.replace(/\s+/g, " ").trim();
}

// แปลงข้อมูลดิบให้เป็น schema มาตรฐานเดียวกัน
function normalize(bank, raw, index) {
  const text = `${raw.title} ${raw.summary} ${raw.cardName ?? ""}`;
  return {
    id: `${bank.id}-${index}`,
    bankId: bank.id,
    bank: bank.short,
    bankName: bank.name,
    bankColor: bank.color,
    title: clean(raw.title),
    summary: clean(raw.summary),
    categories: raw.categories ?? classifyCategories(text),
    minSalary: raw.minSalary ?? guessMinSalary(text),
    url: raw.url || bank.url,
    image: raw.image || null,
    source: raw.source || "live",
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "th,en;q=0.8" },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

// puppeteer โหลดแบบ dynamic เฉพาะเมื่อใช้โหมดนี้ (เป็น optionalDependency)
let _browser = null;
async function fetchHtmlJs(url) {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    throw new Error("ยังไม่ได้ติดตั้ง puppeteer — รัน `npm i puppeteer` หรือใช้ SCRAPER_MODE=cheerio");
  }
  if (!_browser) {
    _browser = await puppeteer.launch({
      headless: "new",
      // ใช้ Chromium ที่ติดตั้งไว้บน host (เช่นใน Docker image) ถ้ามี
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // กัน crash เพราะ /dev/shm เล็กบน container
        "--disable-gpu",
        "--no-zygote",
      ],
    });
  }
  const page = await _browser.newPage();
  try {
    await page.setUserAgent(UA);
    await page.goto(url, { waitUntil: "networkidle2", timeout: TIMEOUT + 8000 });
    await new Promise((r) => setTimeout(r, 1500)); // รอ JS render เพิ่ม
    return await page.content();
  } finally {
    await page.close();
  }
}

function parseCards(html, bank) {
  const $ = cheerio.load(html);
  const sel = bank.selectors;
  const items = [];
  $(sel.card).each((_, el) => {
    const $el = $(el);
    const title = clean($el.find(sel.title).first().text());
    const summary = clean($el.find(sel.summary).first().text());
    if (!title || title.length < 6) return; // ข้ามการ์ดที่ไม่มีเนื้อหา
    const href = $el.find(sel.link).first().attr("href");
    const img =
      $el.find(sel.image).first().attr("src") ||
      $el.find(sel.image).first().attr("data-src");
    items.push({
      title,
      summary,
      url: abs(href, bank.url),
      image: img ? abs(img, bank.url) : null,
      source: "live",
    });
  });
  // ตัดรายการซ้ำตามชื่อ
  const seen = new Set();
  return items.filter((it) => {
    if (seen.has(it.title)) return false;
    seen.add(it.title);
    return true;
  });
}

function seedFor(bank) {
  return (SEED[bank.id] || []).map((s) => ({ ...s, source: "seed" }));
}

// ดึงข้อมูลของธนาคารเดียว (มี cache + fallback)
export async function scrapeBank(bank) {
  const cached = getCached(bank.id);
  if (cached) return cached;

  let raws = [];
  try {
    const html = MODE === "puppeteer" ? await fetchHtmlJs(bank.url) : await fetchHtml(bank.url);
    raws = parseCards(html, bank);
  } catch (err) {
    console.warn(`[scrape] ${bank.id} ล้มเหลว: ${err.message} — ใช้ข้อมูล seed แทน`);
  }

  if (!raws.length) raws = seedFor(bank);

  const promos = raws.map((r, i) => normalize(bank, r, i));
  setCached(bank.id, promos);
  return promos;
}

// ดึงข้อมูลทุกธนาคาร — จำกัด concurrency กัน RAM พุ่ง (โดยเฉพาะโหมด puppeteer บนเครื่องเล็ก)
// ตั้งผ่าน env SCRAPE_CONCURRENCY (ค่าเริ่มต้น: puppeteer=2, cheerio=7)
export async function scrapeAll({ bankIds } = {}) {
  const targets = bankIds?.length
    ? BANKS.filter((b) => bankIds.includes(b.id))
    : BANKS;
  const limit = parseInt(
    process.env.SCRAPE_CONCURRENCY ?? (MODE === "puppeteer" ? "2" : "7"),
    10
  );
  const promos = [];
  for (let i = 0; i < targets.length; i += limit) {
    const batch = targets.slice(i, i + limit);
    const results = await Promise.allSettled(batch.map(scrapeBank));
    for (const r of results) if (r.status === "fulfilled") promos.push(...r.value);
  }
  return promos;
}

export async function closeBrowser() {
  if (_browser) { await _browser.close(); _browser = null; }
}
