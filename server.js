// server.js — Express server: เสิร์ฟหน้าเว็บ + API ดึงโปรโมชั่นแบบเรียลไทม์
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scrapeAll } from "./src/scraper.js";
import { BANKS } from "./config/banks.js";
import { CATEGORIES } from "./src/categories.js";
import { clearCache, cacheTtlMs } from "./src/cache.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(__dirname, "public")));

// health check สำหรับ Render / uptime monitor
app.get("/healthz", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// metadata สำหรับสร้างตัวกรองฝั่งหน้าเว็บ
app.get("/api/meta", (_req, res) => {
  res.json({
    banks: BANKS.map((b) => ({ id: b.id, name: b.name, short: b.short, color: b.color })),
    categories: CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
    salaryTiers: [15000, 30000, 50000, 100000],
    cacheTtlMs,
  });
});

// ดึงโปรโมชั่น (ดึงสดทุกครั้งที่เปิด ถ้า CACHE_TTL_MS=0)
// query params (กรองฝั่ง server ได้ด้วย): ?banks=kbank,scb&categories=travel&minSalary=15000&q=คำค้น
app.get("/api/promotions", async (req, res) => {
  try {
    const bankIds = (req.query.banks ?? "").split(",").filter(Boolean);
    let promos = await scrapeAll({ bankIds });

    const cats = (req.query.categories ?? "").split(",").filter(Boolean);
    if (cats.length) promos = promos.filter((p) => p.categories.some((c) => cats.includes(c)));

    const minSalary = parseInt(req.query.minSalary ?? "0", 10);
    if (minSalary > 0) promos = promos.filter((p) => p.minSalary <= minSalary);

    const q = (req.query.q ?? "").trim().toLowerCase();
    if (q) promos = promos.filter((p) => `${p.title} ${p.summary}`.toLowerCase().includes(q));

    res.json({
      count: promos.length,
      fetchedAt: new Date().toISOString(),
      live: cacheTtlMs === 0,
      promotions: promos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ", detail: err.message });
  }
});

// บังคับล้างแคชเพื่อดึงสดใหม่
app.post("/api/refresh", (_req, res) => {
  clearCache();
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`\n🟢 เปิดเว็บที่  http://localhost:${PORT}`);
  console.log(`   โหมด scraper: ${process.env.SCRAPER_MODE ?? "cheerio"}  |  cache: ${cacheTtlMs}ms\n`);
});
