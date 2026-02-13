// ---------- Utility: limit decimal input (iOS safe) ----------
function limitDecimal(el, maxInt, maxDec) {
  let v = el.value;

  // allow only digits and dot
  v = v.replace(/[^0-9.]/g, '');

  // allow only one dot
  const firstDot = v.indexOf('.');
  if (firstDot !== -1) {
    v =
      v.slice(0, firstDot + 1) +
      v.slice(firstDot + 1).replace(/\./g, '');
  }

  let parts = v.split('.');
  let intPart = parts[0] || '';
  let decPart = parts[1];

  // limit integer part
  if (intPart.length > maxInt) {
    intPart = intPart.slice(0, maxInt);
  }

  // limit decimal part
  if (decPart !== undefined) {
    decPart = decPart.slice(0, maxDec);
    el.value = intPart + '.' + decPart;
  } else {
    el.value = intPart;
  }
}

// ---------- Main calculation ----------
document.getElementById("calcBtn").addEventListener("click", () => {

  // raw strings
  const weightStr = document.getElementById("weight").value;
  const ageStr = document.getElementById("age").value;
  const npoStr = document.getElementById("npo").value;
  const hctPatientStr = document.getElementById("hctpatient").value;
  const hctTargetStr = document.getElementById("hctTarget").value;

  // required check
  if (
    weightStr.trim() === "" ||
    ageStr.trim() === "" ||
    npoStr.trim() === "" ||
    hctPatientStr.trim() === "" ||
    hctTargetStr.trim() === ""
  ) {
    alert("Please fill all required fields");
    return;
  }

  // convert to numbers
  const weight = Number(weightStr);
  const age = Number(ageStr);
  const npo = Number(npoStr);
  const hctPatient = Number(hctPatientStr);
  const hctTarget = Number(hctTargetStr);

  // numeric validation
  if (
    isNaN(weight) ||
    isNaN(age) ||
    isNaN(npo) ||
    isNaN(hctPatient) ||
    isNaN(hctTarget)
  ) {
    alert("Invalid numeric input");
    return;
  }

  // logical validation
  if (hctTarget >= hctPatient) {
    alert("Target hematocrit must be lower than patient hematocrit");
    return;
  }

  const grade = document.getElementById("grade").value;
  const sex = document.getElementById("sex").value;

  const b1 = Number(document.getElementById("bleed1").value) || 0;
  const b2 = Number(document.getElementById("bleed2").value) || 0;
  const b3 = Number(document.getElementById("bleed3").value) || 0;

  // ---------- Maintenance (4-2-1 rule) ----------
  let maintenance;
  if (weight <= 10) maintenance = weight * 4;
  else if (weight <= 20) maintenance = 40 + (weight - 10) * 2;
  else maintenance = 60 + (weight - 20);

  // ---------- Deficit ----------
  const deficit = maintenance * npo;

  // ---------- Third space ----------
  let thirdRate = 0;
  if (grade === "minimal") thirdRate = 2;
  if (grade === "mild") thirdRate = 4;
  if (grade === "moderate") thirdRate = 6;
  if (grade === "severe") thirdRate = 8;

  const third = thirdRate * weight;

  // ---------- CVE (hour 1 only) ----------
  const cve = (age < 2 ? 15 : 5) * weight;

  // ---------- LIBERAL ----------
  const lib1 = maintenance + 0.5 * deficit + third + cve;
  const lib2 = maintenance + 0.25 * deficit + third + b1 * 3;
  const lib3 = maintenance + 0.25 * deficit + third + b2 * 3;
  const lib4 = maintenance + third + b3 * 3;

  // ---------- RESTRICTIVE ----------
  const rBase = thirdRate * weight;
  const r1 = rBase;
  const r2 = rBase + b1;
  const r3 = rBase + b2;
  const r4 = rBase + b3;

  // ---------- NORMAL (Experimental) ----------
  const e1 = (lib1 + r1) / 2;
  const e2 = (lib2 + r2) / 2;
  const e3 = (lib3 + r3) / 2;
  const e4 = (lib4 + r4) / 2;

  // ---------- EBV ----------
  let ebvFactor;
  if (age < 1) ebvFactor = 90;
  else if (age < 2) ebvFactor = 80;
  else if (age <= 10) ebvFactor = 70;
  else ebvFactor = 60;

  let EBV = weight * ebvFactor;
  if (sex === "female") EBV *= 0.85;

  const MABL = EBV * ((hctPatient - hctTarget) / hctPatient);

  // ---------- Fill table ----------
  document.getElementById("liberal1").innerText = lib1.toFixed(0);
  document.getElementById("liberal2").innerText = lib2.toFixed(0);
  document.getElementById("liberal3").innerText = lib3.toFixed(0);
  document.getElementById("liberal4").innerText = lib4.toFixed(0);

  document.getElementById("exp1").innerText = e1.toFixed(0);
  document.getElementById("exp2").innerText = e2.toFixed(0);
  document.getElementById("exp3").innerText = e3.toFixed(0);
  document.getElementById("exp4").innerText = e4.toFixed(0);

  document.getElementById("res1").innerText = r1.toFixed(0);
  document.getElementById("res2").innerText = r2.toFixed(0);
  document.getElementById("res3").innerText = r3.toFixed(0);
  document.getElementById("res4").innerText = r4.toFixed(0);

  document.getElementById("mablResult").innerText = MABL.toFixed(0);

  // ---------- Switch pages ----------
  document.getElementById("input-page").style.display = "none";
  document.getElementById("results-page").style.display = "block";
});

// ---------- Back button ----------
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("results-page").style.display = "none";
  document.getElementById("input-page").style.display = "block";
});
