// src/cache.js
// แคชในหน่วยความจำแบบ TTL — ใช้กันยิงเว็บธนาคารถี่เกินไป
// ตั้งค่าผ่าน env CACHE_TTL_MS (ค่าเริ่มต้น 10 นาที). ตั้งเป็น 0 เพื่อดึงสดทุกครั้ง

const TTL = parseInt(process.env.CACHE_TTL_MS ?? "600000", 10); // 10 นาที
const store = new Map();

export function getCached(key) {
  if (TTL <= 0) return null;
  const hit = store.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL) {
    store.delete(key);
    return null;
  }
  return hit.value;
}

export function setCached(key, value) {
  store.set(key, { value, at: Date.now() });
}

export function clearCache() {
  store.clear();
}

export const cacheTtlMs = TTL;
