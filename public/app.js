// public/app.js — ฝั่งหน้าเว็บ: โหลด meta, ดึงโปรโมชั่น, จัดการตัวกรอง
const state = {
  meta: null,
  promos: [],
  filters: { q: "", minSalary: 0, categories: new Set(), banks: new Set() },
};

const $ = (id) => document.getElementById(id);
const catLabel = (id) => state.meta?.categories.find((c) => c.id === id)?.label ?? id;

async function init() {
  state.meta = await fetch("/api/meta").then((r) => r.json());
  renderCategoryChips();
  renderBankList();
  bindEvents();
  await loadPromotions();
}

function renderCategoryChips() {
  $("categoryChips").innerHTML = state.meta.categories
    .map((c) => `<button class="chip" data-cat="${c.id}">${c.label}</button>`)
    .join("");
}

function renderBankList() {
  $("bankList").innerHTML = state.meta.banks
    .map(
      (b) => `<label class="bank-item">
        <input type="checkbox" data-bank="${b.id}" />
        <span class="dot" style="background:${b.color}"></span>${b.short}
      </label>`
    )
    .join("");
}

function bindEvents() {
  $("searchInput").addEventListener("input", (e) => {
    state.filters.q = e.target.value.toLowerCase();
    render();
  });
  $("salarySelect").addEventListener("change", (e) => {
    state.filters.minSalary = parseInt(e.target.value, 10);
    render();
  });
  $("categoryChips").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    const id = btn.dataset.cat;
    btn.classList.toggle("active");
    state.filters.categories.has(id)
      ? state.filters.categories.delete(id)
      : state.filters.categories.add(id);
    render();
  });
  $("bankList").addEventListener("change", (e) => {
    const id = e.target.dataset.bank;
    if (!id) return;
    e.target.checked ? state.filters.banks.add(id) : state.filters.banks.delete(id);
    render();
  });
  $("resetBtn").addEventListener("click", resetFilters);
  $("refreshBtn").addEventListener("click", async () => {
    await fetch("/api/refresh", { method: "POST" });
    await loadPromotions();
  });
}

function resetFilters() {
  state.filters = { q: "", minSalary: 0, categories: new Set(), banks: new Set() };
  $("searchInput").value = "";
  $("salarySelect").value = "0";
  document.querySelectorAll(".chip.active").forEach((c) => c.classList.remove("active"));
  document.querySelectorAll('.bank-item input:checked').forEach((c) => (c.checked = false));
  render();
}

async function loadPromotions() {
  $("status").textContent = "กำลังดึงข้อมูลโปรโมชั่น…";
  showSkeleton();
  try {
    const data = await fetch("/api/promotions").then((r) => r.json());
    state.promos = data.promotions;
    const t = new Date(data.fetchedAt).toLocaleString("th-TH");
    $("status").textContent = `อัปเดตล่าสุด ${t} · ${data.live ? "ดึงสดทุกครั้ง" : "มีแคชชั่วคราว"}`;
    render();
  } catch (err) {
    $("status").textContent = "ดึงข้อมูลไม่สำเร็จ";
    $("grid").innerHTML = "";
    $("empty").hidden = false;
    $("empty").textContent = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
  }
}

function applyFilters() {
  const f = state.filters;
  return state.promos.filter((p) => {
    if (f.q && !`${p.title} ${p.summary}`.toLowerCase().includes(f.q)) return false;
    if (f.minSalary > 0 && p.minSalary > f.minSalary) return false;
    // ต้องเข้า "ทุก" หัวข้อเด่นที่เลือก (AND)
    if (f.categories.size && ![...f.categories].every((c) => p.categories.includes(c))) return false;
    if (f.banks.size && !f.banks.has(p.bankId)) return false;
    return true;
  });
}

function render() {
  const list = applyFilters();
  $("countLabel").textContent = `พบ ${list.length} โปรโมชั่น`;
  $("empty").hidden = list.length > 0;
  $("grid").innerHTML = list.map(card).join("");
}

function card(p) {
  const thumb = p.image
    ? `<img class="thumb" src="${p.image}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'thumb-fallback',style:'background:${p.bankColor}',textContent:'${p.bank}'}))" />`
    : `<div class="thumb-fallback" style="background:${p.bankColor}">${p.bank}</div>`;
  const tags = p.categories.map((c) => `<span class="tag">${catLabel(c)}</span>`).join("");
  const seed = p.source === "seed" ? `<span class="seed-badge">ตัวอย่าง</span>` : "";
  return `<article class="promo">
    ${thumb}
    <div class="body">
      <span class="bank-tag" style="color:${p.bankColor}">
        <span class="dot" style="background:${p.bankColor}"></span>${p.bankName}${seed}
      </span>
      <h3>${p.title}</h3>
      <p class="desc">${p.summary || ""}</p>
      <div class="meta">
        ${tags}
        <span class="salary">เงินเดือนขั้นต่ำ ${p.minSalary.toLocaleString("th-TH")} บาท</span>
      </div>
      <a class="cta" href="${p.url}" target="_blank" rel="noopener">ดูรายละเอียด</a>
    </div>
  </article>`;
}

function showSkeleton() {
  $("empty").hidden = true;
  $("grid").innerHTML = Array.from({ length: 6 }, () => `<div class="skeleton"></div>`).join("");
}

init();
