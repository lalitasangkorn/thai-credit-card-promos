// src/categories.js
// จัดหมวด "หัวข้อเด่น" ของโปรโมชั่นจากคำสำคัญในชื่อ/รายละเอียด
// และเดาเกณฑ์เงินเดือนขั้นต่ำจากชื่อบัตร (ถ้าหาไม่เจอใช้ค่ามาตรฐาน 15,000)

export const CATEGORIES = [
  { id: "travel",     label: "ท่องเที่ยว/โรงแรม",  keywords: ["ท่องเที่ยว", "โรงแรม", "ตั๋วเครื่องบิน", "สายการบิน", "trip", "agoda", "booking", "hotel", "flight", "การบิน", "ทัวร์", "เที่ยว"] },
  { id: "dining",     label: "ร้านอาหาร",          keywords: ["ร้านอาหาร", "อาหาร", "บุฟเฟ่ต์", "บุฟเฟต์", "dining", "restaurant", "คาเฟ่", "เครื่องดื่ม", "ชาบู", "ปิ้งย่าง"] },
  { id: "shopping",   label: "ช้อปปิ้ง/ห้าง",       keywords: ["ช้อป", "ห้าง", "ช้อปปิ้ง", "shopping", "central", "the mall", "ลดราคา", "เซ็นทรัล", "department"] },
  { id: "online",     label: "ออนไลน์/อีคอมเมิร์ซ", keywords: ["ออนไลน์", "online", "lazada", "shopee", "ลาซาด้า", "ช้อปปี้", "อีคอมเมิร์ซ", "marketplace", "app"] },
  { id: "fuel",       label: "ปั๊มน้ำมัน",          keywords: ["น้ำมัน", "ปั๊ม", "ptt", "บางจาก", "shell", "เชลล์", "เติมน้ำมัน", "fuel"] },
  { id: "cashback",   label: "เครดิตเงินคืน",       keywords: ["เงินคืน", "cashback", "cash back", "เครดิตเงินคืน", "rebate"] },
  { id: "installment",label: "ผ่อน 0%",            keywords: ["ผ่อน 0", "ผ่อน0", "0%", "ผ่อนชำระ", "installment", "ผ่อนนาน", "แบ่งจ่าย"] },
  { id: "points",     label: "สะสมแต้ม/ไมล์",       keywords: ["แต้ม", "คะแนน", "point", "ไมล์", "mile", "k point", "rewards", "สะสม", "แลกคะแนน"] },
  { id: "newcard",    label: "สมัครบัตรใหม่",        keywords: ["สมัครบัตร", "สมัครใหม่", "บัตรใบแรก", "ลูกค้าใหม่", "welcome", "สมัคร"] },
  { id: "insurance",  label: "ประกัน",             keywords: ["ประกัน", "insurance", "ประกันภัย", "ประกันชีวิต", "ประกันเดินทาง"] },
  { id: "health",     label: "สุขภาพ/ความงาม",      keywords: ["โรงพยาบาล", "สุขภาพ", "ความงาม", "คลินิก", "spa", "สปา", "hospital", "beauty", "wellness"] },
];

// เกณฑ์เงินเดือนขั้นต่ำตามระดับบัตร (อ้างอิงมาตรฐานตลาดบัตรเครดิตไทย)
// บัตรทั่วไป 15,000 | บัตรทอง/แพลทินัม 30,000 | บัตรพรีเมียม 50,000 | บัตรไพรเวต 100,000+
const SALARY_TIERS = [
  { keywords: ["infinite", "reserve", "private", "ultima", "prestige", "world elite", "ไพรเวต"], minSalary: 100000 },
  { keywords: ["signature", "world", "wisdom", "first", "พรีเมียม", "premium"], minSalary: 50000 },
  { keywords: ["platinum", "แพลทินัม", "gold", "ทอง", "titanium"], minSalary: 30000 },
];

export function classifyCategories(text = "") {
  const t = text.toLowerCase();
  const found = [];
  for (const c of CATEGORIES) {
    if (c.keywords.some((k) => t.includes(k.toLowerCase()))) found.push(c.id);
  }
  return found.length ? found : ["shopping"]; // ค่า default ถ้าจับหมวดไม่ได้
}

export function guessMinSalary(text = "") {
  const t = text.toLowerCase();
  // ถ้าระบุตัวเลขเงินเดือนตรงๆ เช่น "รายได้ 50,000 บาท"
  const m = t.match(/(?:รายได้|เงินเดือน)\D{0,12}?(\d{2,3})[,.]?(\d{3})/);
  if (m) {
    const val = parseInt(m[1] + m[2], 10);
    if (val >= 10000 && val <= 500000) return val;
  }
  for (const tier of SALARY_TIERS) {
    if (tier.keywords.some((k) => t.includes(k.toLowerCase()))) return tier.minSalary;
  }
  return 15000; // เกณฑ์มาตรฐานบัตรเครดิตไทย
}
