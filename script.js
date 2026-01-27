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

  // -------- MABL --------
const sex = document.getElementById("sex").value;
const hctpatient = Number(document.getElementById("hctpatient").value);
const hctTarget = Number(document.getElementById("hctTarget").value);

let EBV;
if (sex === "male") EBV = weight * 70;
else EBV = weight * 65;

const MABL = EBV * ((hctpatient - hctTarget) / hctStart);

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
<p>${MABL.toFixed(0)} ml</p>

  `;
});







