// src/categories.js
// "หัวข้อเด่น" = จุดเด่น/สิทธิประโยชน์ของบัตร (ไม่ใช่แค่หมวดการใช้จ่าย)
// ใช้สร้างชิปตัวกรองหน้าเว็บ และ map id -> label
// แต่ละบัตรใน src/seed.js จะระบุ categories (id) ตรงกับรายการนี้

export const CATEGORIES = [
  { id: "lowincome",   label: "เงินเดือนเริ่ม 15,000", keywords: ["15,000", "15000", "รายได้น้อย", "สมัครง่าย"] },
  { id: "nofee",       label: "ฟรีค่าธรรมเนียมรายปี",  keywords: ["ฟรีค่าธรรมเนียม", "ไม่มีค่าธรรมเนียม", "ตลอดชีพ", "no annual fee"] },
  { id: "lounge",      label: "เลานจ์สนามบิน",         keywords: ["เลานจ์", "ห้องรับรอง", "lounge", "สนามบิน"] },
  { id: "cashback",    label: "เครดิตเงินคืน",         keywords: ["เงินคืน", "cashback", "cash back", "เครดิตเงินคืน", "rebate"] },
  { id: "miles",       label: "สะสมไมล์",              keywords: ["ไมล์", "mile", "royal orchid", "การบิน", "บิ๊กพอยท์", "big point"] },
  { id: "points",      label: "สะสมคะแนน",             keywords: ["คะแนน", "แต้ม", "point", "rewards", "k point", "uni$", "สะสม"] },
  { id: "installment", label: "ผ่อน 0%",              keywords: ["ผ่อน 0", "ผ่อน0", "0%", "ผ่อนชำระ", "installment", "ผ่อนนาน", "แบ่งจ่าย"] },
  { id: "travel",      label: "ท่องเที่ยว/โรงแรม",     keywords: ["ท่องเที่ยว", "โรงแรม", "ตั๋วเครื่องบิน", "trip", "agoda", "hotel", "flight", "เที่ยว", "เดินทาง"] },
  { id: "dining",      label: "ร้านอาหาร",             keywords: ["ร้านอาหาร", "อาหาร", "บุฟเฟ่ต์", "dining", "restaurant", "คาเฟ่", "เครื่องดื่ม", "สายกิน"] },
  { id: "online",      label: "ช้อปออนไลน์",           keywords: ["ออนไลน์", "online", "lazada", "shopee", "ลาซาด้า", "ช้อปปี้", "อีคอมเมิร์ซ"] },
  { id: "fuel",        label: "น้ำมัน",                keywords: ["น้ำมัน", "ปั๊ม", "ptt", "บางจาก", "bangchak", "shell", "เติมน้ำมัน", "fuel"] },
  { id: "premium",     label: "บัตรพรีเมียม",          keywords: ["พรีเมียม", "premium", "infinite", "signature", "reserve", "wisdom", "first", "exclusive", "prestige"] },
];

// เกณฑ์เงินเดือนขั้นต่ำตามระดับบัตร (ใช้เดาเมื่อข้อมูลไม่ได้ระบุ)
const SALARY_TIERS = [
  { keywords: ["infinite", "reserve", "private", "ultima", "prestige", "world elite", "ไพรเวต", "first", "wisdom", "exclusive"], minSalary: 100000 },
  { keywords: ["signature", "world", "พรีเมียม", "premium", "absolute"], minSalary: 50000 },
  { keywords: ["platinum", "แพลทินัม", "gold", "ทอง", "titanium", "ไทเทเนียม"], minSalary: 15000 },
];

export function classifyCategories(text = "") {
  const t = text.toLowerCase();
  const found = [];
  for (const c of CATEGORIES) {
    if (c.keywords.some((k) => t.includes(k.toLowerCase()))) found.push(c.id);
  }
  return found.length ? found : ["points"]; // ค่า default ถ้าจับหัวข้อไม่ได้
}

export function guessMinSalary(text = "") {
  const t = text.toLowerCase();
  const m = t.match(/(?:รายได้|เงินเดือน)\D{0,12}?(\d{2,3})[,.]?(\d{3})/);
  if (m) {
    const val = parseInt(m[1] + m[2], 10);
    if (val >= 10000 && val <= 500000) return val;
  }
  for (const tier of SALARY_TIERS) {
    if (tier.keywords.some((k) => t.includes(k.toLowerCase()))) return tier.minSalary;
  }
  return 15000;
}
