
document.getElementById("calcBtn").addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const severity = document.getElementById("severity").value;
  const age = Number(document.getElementById("age").value);
  const npo = Number(document.getElementById("npo").value);

  const b1 = Number(document.getElementById("bleed1").value) || 0;
  const b2 = Number(document.getElementById("bleed2").value) || 0;
  const b3 = Number(document.getElementById("bleed3").value) || 0;

  if (!weight) {
    document.getElementById("results").innerHTML =
      "<p style='color:red'>Please enter weight</p>";
    return;
  }

  // -------- Maintenance (4-2-1) --------
  let maintenance;
  if (weight <= 10) maintenance = weight * 4;
  else if (weight <= 20) maintenance = 40 + (weight - 10) * 2;
  else maintenance = 60 + (weight - 20) * 1;

  // -------- Deficit --------
  const totalDeficit = maintenance * npo;

  // -------- Third space (Liberal) --------
  let thirdRate;
  switch (severity) {
    case "minimal": thirdRate = 2; break;
    case "mild": thirdRate = 4; break;
    case "moderate": thirdRate = 6; break;
    case "severe": thirdRate = 8; break;
  }
  const third = thirdRate * weight;

  // -------- CVE (only hour 1) --------
  const cveRate = age < 2 ? 15 : 5;
  const cve = cveRate * weight;

  // -------- Bleeding effects --------
  const B1 = b1 * 3;
  const B2 = b2 * 3;
  const B3 = b3 * 3;

  // -------- LIBERAL --------
  const lib1 = maintenance + 0.5 * totalDeficit + third + cve;
  const lib2 = maintenance + 0.25 * totalDeficit + third + B1;
  const lib3 = maintenance + 0.25 * totalDeficit + third + B2;
  const lib4 = maintenance + third + B3;

  // -------- RESTRICTIVE --------
  let rRate;
  switch (severity) {
    case "minimal": rRate = 2; break;
    case "mild": rRate = 4; break;
    case "moderate": rRate = 6; break;
    case "severe": rRate = 8; break;
  }
  const rBase = rRate * weight;

  const r1 = rBase;
  const r2 = rBase + b1;
  const r3 = rBase + b2;
  const r4 = rBase + b3;

  // -------- EXPERIMENTAL --------
const exp1 = (r1 + lib1) / 2;
const exp2 = (r2 + lib2) / 2;
const exp3 = (r3 + lib3) / 2;
const exp4 = (r4 + lib4) / 2;

 // -------- EBV & MABL --------
const sex = document.getElementById("sex").value;
const hctpatient = Number(document.getElementById("hctpatient").value);
const hctTarget = Number(document.getElementById("hctTarget").value);

// تعیین ضریب EBV بر اساس سن
let ebvFactor;

if (age < 1) ebvFactor = 90;
else if (age >= 1 && age < 2) ebvFactor = 80;
else if (age >= 2 && age <= 10) ebvFactor = 70;
else ebvFactor = 60;

// محاسبه EBV پایه (برای آقایان)
let EBV = weight * ebvFactor;

// اگر خانم بود
if (sex === "female") {
  EBV = EBV * 0.85;
}

// کنترل منطقی
if (hctTarget >= hctpatient) {
  alert("Target Hct must be lower than patient Hct");
  return;
}

// فرمول نهایی MABL
const MABL = EBV * ((hctpatient - hctTarget) / hctpatient);


  document.getElementById("results").innerHTML = `
    <h3>Restrictive (ml/h)</h3>
    <p>H1: ${r1.toFixed(0)}</p>
    <p>H2: ${r2.toFixed(0)}</p>
    <p>H3: ${r3.toFixed(0)}</p>
    <p>H4: ${r4.toFixed(0)}</p>

    <hr>

    <h3>Experimental (ml/h)</h3>
<p>H1: ${exp1.toFixed(0)}</p>
<p>H2: ${exp2.toFixed(0)}</p>
<p>H3: ${exp3.toFixed(0)}</p>
<p>H4: ${exp4.toFixed(0)}</p>

    <h3>Liberal (ml/h)</h3>
    <p>H1: ${lib1.toFixed(0)}</p>
    <p>H2: ${lib2.toFixed(0)}</p>
    <p>H3: ${lib3.toFixed(0)}</p>
    <p>H4: ${lib4.toFixed(0)}</p>

    <hr>
<h3>MABL</h3>
<p>EBV: ${EBV.toFixed(0)} ml</p>
<p>Maximum Allowable Blood Loss: ${MABL.toFixed(0)} ml</p>

  document.getElementById("liberal1").innerText = liberal_h1;
  document.getElementById("liberal2").innerText = liberal_h2;
  document.getElementById("liberal3").innerText = liberal_h3;
  document.getElementById("liberal4").innerText = liberal_h4;

  document.getElementById("exp1").innerText = exp_h1;
  document.getElementById("exp2").innerText = exp_h2;
  document.getElementById("exp3").innerText = exp_h3;
  document.getElementById("exp4").innerText = exp_h4;

  document.getElementById("res1").innerText = res_h1;
  document.getElementById("res2").innerText = res_h2;
  document.getElementById("res3").innerText = res_h3;
  document.getElementById("res4").innerText = res_h4;

  document.getElementById("mablResult").innerText = mabl;

  `;
});












