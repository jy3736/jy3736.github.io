"use strict";

/* ---------- 內建範例（課堂展示用，點一下即載入） ---------- */

const EXAMPLES = [
  { name: "範例一", title: "1:10 稀釋",  c1: 100, c2: 10,  v2: 50,  cu: "mg/dL",  vu: "mL" },
  { name: "範例二", title: "標準品配製", c1: 1,   c2: 0.2, v2: 10,  cu: "mmol/L", vu: "mL" },
  { name: "範例三", title: "微量配製",   c1: 500, c2: 25,  v2: 200, cu: "µg/mL",  vu: "µL" }
];

/* ---------- 核心計算 ---------- */

function dilute(c1, c2, v2) {
  const v1 = (c2 * v2) / c1;
  return {
    v1: v1,
    diluent: v2 - v1,
    fold: c1 / c2
  };
}

/* ---------- 格式化 ---------- */

function fmtVol(v) {
  if (v === 0) return "0";
  if (Math.abs(v) >= 100) return v.toFixed(1);
  if (Math.abs(v) >= 1) return v.toFixed(2);
  return v.toPrecision(3);
}

function fmtFold(f) {
  const n = Number(f.toFixed(2));
  return "1 : " + (Number.isInteger(n) ? n : n.toFixed(2));
}

/* ---------- 輸入驗證 ---------- */

function validate(c1Raw, c2Raw, v2Raw) {
  if (c1Raw === "" || c2Raw === "" || v2Raw === "") {
    return "三個欄位都要填寫。";
  }
  const c1 = Number(c1Raw), c2 = Number(c2Raw), v2 = Number(v2Raw);
  if (!Number.isFinite(c1) || !Number.isFinite(c2) || !Number.isFinite(v2)) {
    return "請輸入有效的數字。";
  }
  if (c1 <= 0) return "母液濃度必須大於 0。";
  if (c2 <= 0) return "目標濃度必須大於 0。";
  if (v2 <= 0) return "目標體積必須大於 0。";
  if (c2 > c1) return "目標濃度不能大於母液濃度；稀釋只能把濃度變低。";
  return null;
}

/* ---------- 畫面 ---------- */

const $ = (id) => document.getElementById(id);

function run() {
  const c1Raw = $("c1").value.trim();
  const c2Raw = $("c2").value.trim();
  const v2Raw = $("v2").value.trim();

  const err = validate(c1Raw, c2Raw, v2Raw);
  if (err) {
    $("msg").textContent = "⚠ " + err;
    $("resultBox").hidden = true;
    return;
  }
  $("msg").textContent = "";

  const c1 = Number(c1Raw), c2 = Number(c2Raw), v2 = Number(v2Raw);
  const cu = $("cUnit").value;
  const vu = $("vUnit").value;
  const r = dilute(c1, c2, v2);

  $("v1").textContent = fmtVol(r.v1) + " " + vu;
  $("vd").textContent = fmtVol(r.diluent) + " " + vu;
  $("fold").textContent = fmtFold(r.fold);

  $("steps").innerHTML = [
    `V₁ = C₂ × V₂ ÷ C₁ = ${c2} ${cu} × ${v2} ${vu} ÷ ${c1} ${cu} = ${fmtVol(r.v1)} ${vu}`,
    `稀釋液 = V₂ − V₁ = ${v2} ${vu} − ${fmtVol(r.v1)} ${vu} = ${fmtVol(r.diluent)} ${vu}`,
    `稀釋倍數 = C₁ ÷ C₂ = ${c1} ÷ ${c2} = ${fmtFold(r.fold)}`
  ].map((s) => `<li>${s}</li>`).join("");

  // 若輸入正好是內建範例，顯示「與預期答案相符」
  const hit = EXAMPLES.find(
    (e) => e.c1 === c1 && e.c2 === c2 && e.v2 === v2 && e.cu === cu && e.vu === vu
  );
  $("badge").hidden = !hit;

  $("resultBox").hidden = false;
}

function load(ex) {
  $("c1").value = ex.c1;
  $("c2").value = ex.c2;
  $("v2").value = ex.v2;
  $("cUnit").value = ex.cu;
  $("vUnit").value = ex.vu;
  run();
  $("resultBox").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- 建立範例按鈕與對照表 ---------- */

function buildExamples() {
  const box = $("examples");
  const body = $("cmpBody");

  EXAMPLES.forEach((ex) => {
    const e = dilute(ex.c1, ex.c2, ex.v2);

    const btn = document.createElement("button");
    btn.className = "ex-btn";
    btn.type = "button";
    btn.innerHTML =
      `<span class="n">${ex.name}</span>` +
      `<span class="t">${ex.title}</span>` +
      `<span class="d">${ex.c1} → ${ex.c2} ${ex.cu}，配 ${ex.v2} ${ex.vu}</span>`;
    btn.addEventListener("click", () => load(ex));
    box.appendChild(btn);

    const tr = document.createElement("tr");
    tr.innerHTML =
      `<td>${ex.name}｜${ex.title}</td>` +
      `<td>${ex.c1} → ${ex.c2} ${ex.cu}，配 ${ex.v2} ${ex.vu}</td>` +
      `<td class="ans">${fmtVol(e.v1)} ${ex.vu}</td>` +
      `<td class="ans">${fmtVol(e.diluent)} ${ex.vu}</td>` +
      `<td class="ans">${fmtFold(e.fold)}</td>`;
    body.appendChild(tr);
  });
}

$("calc").addEventListener("click", run);
$("clear").addEventListener("click", () => {
  ["c1", "c2", "v2"].forEach((id) => ($(id).value = ""));
  $("msg").textContent = "";
  $("resultBox").hidden = true;
});
document.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") run();
});

buildExamples();
