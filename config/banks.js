// config/banks.js
// แหล่งข้อมูลโปรโมชั่นบัตรเครดิตของแต่ละธนาคารไทย
//
// แต่ละธนาคารมีโครงสร้างหน้าเว็บต่างกัน และเปลี่ยนแปลงบ่อย
// ดังนั้นเราเก็บ "selectors" แยกต่อธนาคาร เพื่อให้แก้ไขง่ายเมื่อเว็บเปลี่ยน
//
// ถ้า scrape ไม่สำเร็จ (เว็บเป็น JS-rendered หรือ block bot) ระบบจะ fallback
// ไปใช้ข้อมูล seed ใน src/seed.js โดยอัตโนมัติ
//
// วิธีหา selector: เปิดหน้าเว็บใน Chrome > คลิกขวา Inspect > ดู class ของการ์ดโปรโมชั่น

export const BANKS = [
  {
    id: "kbank",
    name: "ธนาคารกสิกรไทย (KBank)",
    short: "KBank",
    color: "#0a8a3e",
    url: "https://www.kasikornbank.com/th/promotion/creditcard/pages/index.aspx",
    // เว็บ KBank เป็น JS-rendered ค่อนข้างมาก แนะนำเปิดโหมด puppeteer (SCRAPER_MODE=puppeteer)
    needsJs: true,
    selectors: {
      card: ".promotion-card, .card-promotion, .promo-item, article",
      title: "h3, .promo-title, .title",
      summary: ".promo-desc, .description, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "scb",
    name: "ธนาคารไทยพาณิชย์ (SCB)",
    short: "SCB",
    color: "#4e2a84",
    url: "https://www.scb.co.th/th/personal-banking/promotions.html",
    needsJs: true,
    selectors: {
      card: ".promotion-card, .card, .promo-card, article",
      title: "h3, .title, .card-title",
      summary: ".desc, .card-desc, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "krungsri",
    name: "ธนาคารกรุงศรีอยุธยา (Krungsri)",
    short: "Krungsri",
    color: "#6d4c91",
    url: "https://www.krungsri.com/th/promotion",
    needsJs: true,
    selectors: {
      card: ".promotion-item, .card-promotion, .promo-card, article",
      title: "h3, .title, .promotion-title",
      summary: ".description, .promo-desc, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "ktc",
    name: "บัตรเครดิต KTC (กรุงไทย)",
    short: "KTC",
    color: "#005bac",
    url: "https://www.ktc.co.th/promotion",
    needsJs: true,
    selectors: {
      card: ".promotion-card, .promo-card, .card-item, article",
      title: "h3, .promo-title, .title",
      summary: ".promo-detail, .description, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "bbl",
    name: "ธนาคารกรุงเทพ (Bangkok Bank)",
    short: "BBL",
    color: "#1b3f8b",
    url: "https://www.bangkokbank.com/th-TH/Personal/Promotions",
    needsJs: true,
    selectors: {
      card: ".promotion-card, .promo-card, .card, article",
      title: "h3, .title, .card-title",
      summary: ".desc, .description, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "ttb",
    name: "ธนาคารทหารไทยธนชาต (ttb)",
    short: "ttb",
    color: "#1565c0",
    url: "https://www.ttbbank.com/th/promotion",
    needsJs: true,
    selectors: {
      card: ".promotion-card, .promo-item, .card, article",
      title: "h3, .title",
      summary: ".description, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "uob",
    name: "ธนาคารยูโอบี (UOB)",
    short: "UOB",
    color: "#c8102e",
    url: "https://www.uob.co.th/personal/promotions/index.page",
    needsJs: true,
    selectors: {
      card: ".promotion-card, .promo-card, .card, article",
      title: "h3, .title",
      summary: ".description, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "aeon",
    name: "อิออน (AEON)",
    short: "AEON",
    color: "#e6007e",
    url: "https://www.aeon.co.th/aeon/cards",
    needsJs: true,
    selectors: {
      card: ".card-item, .promotion-card, article",
      title: "h3, .title",
      summary: ".description, p",
      link: "a",
      image: "img",
    },
  },
  {
    id: "icbc",
    name: "ไอซีบีซี ไทย (ICBC)",
    short: "ICBC",
    color: "#c30d23",
    url: "https://www.icbcthai.com/th/personal/card",
    needsJs: true,
    selectors: {
      card: ".card-item, .promotion-card, article",
      title: "h3, .title",
      summary: ".description, p",
      link: "a",
      image: "img",
    },
  },
];

export const BANK_BY_ID = Object.fromEntries(BANKS.map((b) => [b.id, b]));
