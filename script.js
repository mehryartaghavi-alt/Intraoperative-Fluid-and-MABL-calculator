
document.getElementById("calcBtn").addEventListener("click", function () {

  const weight = Number(document.getElementById("weight").value);
  const age = Number(document.getElementById("age").value);
  const npo = Number(document.getElementById("npo").value);
  const grade = document.getElementById("grade").value;
  const sex = document.getElementById("sex").value;

  const b1 = Number(document.getElementById("bleed1").value) || 0;
  const b2 = Number(document.getElementById("bleed2").value) || 0;
  const b3 = Number(document.getElementById("bleed3").value) || 0;

  const hctPatient = Number(document.getElementById("hctpatient").value);
  const hctTarget = Number(document.getElementById("hctTarget").value);

  if (!weight || !age || !npo || !hctPatient || !hctTarget) {
    alert("Please fill all required fields");
    return;
  }

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

  
  if (hctTarget >= hctPatient) {
    alert("Target Hct must be lower than Patient Hct");
    return;
  }

  // -------- Maintenance (4-2-1) --------
  let maintenance;
  if (weight <= 10) maintenance = weight * 4;
  else if (weight <= 20) maintenance = 40 + (weight - 10) * 2;
  else maintenance = 60 + (weight - 20);

  // -------- Deficit --------
  const deficit = maintenance * npo;

  // -------- Third space --------
  let thirdRate = 0;
  if (grade === "minimal") thirdRate = 2;
  if (grade === "mild") thirdRate = 4;
  if (grade === "moderate") thirdRate = 6;
  if (grade === "severe") thirdRate = 8;

  const third = thirdRate * weight;

  // -------- CVE --------
  const cve = (age < 2 ? 15 : 5) * weight;

  // -------- LIBERAL --------
  const lib1 = maintenance + 0.5 * deficit + third + cve;
  const lib2 = maintenance + 0.25 * deficit + third + b1 * 3;
  const lib3 = maintenance + 0.25 * deficit + third + b2 * 3;
  const lib4 = maintenance + third + b3 * 3;

  // -------- RESTRICTIVE --------
  const rBase = thirdRate * weight;
  const r1 = rBase;
  const r2 = rBase + b1;
  const r3 = rBase + b2;
  const r4 = rBase + b3;

  // -------- EXPERIMENTAL --------
  const exp1 = (lib1 + r1) / 2;
  const exp2 = (lib2 + r2) / 2;
  const exp3 = (lib3 + r3) / 2;
  const exp4 = (lib4 + r4) / 2;

  // -------- EBV & MABL --------
  let ebvFactor;
  if (age < 1) ebvFactor = 90;
  else if (age < 2) ebvFactor = 80;
  else if (age <= 10) ebvFactor = 70;
  else ebvFactor = 60;

  let EBV = weight * ebvFactor;
  if (sex === "female") EBV *= 0.85;

  const MABL = EBV * ((hctPatient - hctTarget) / hctPatient);

  // -------- Fill Table --------
  document.getElementById("liberal1").innerText = lib1.toFixed(0);
  document.getElementById("liberal2").innerText = lib2.toFixed(0);
  document.getElementById("liberal3").innerText = lib3.toFixed(0);
  document.getElementById("liberal4").innerText = lib4.toFixed(0);

  document.getElementById("exp1").innerText = exp1.toFixed(0);
  document.getElementById("exp2").innerText = exp2.toFixed(0);
  document.getElementById("exp3").innerText = exp3.toFixed(0);
  document.getElementById("exp4").innerText = exp4.toFixed(0);

  document.getElementById("res1").innerText = r1.toFixed(0);
  document.getElementById("res2").innerText = r2.toFixed(0);
  document.getElementById("res3").innerText = r3.toFixed(0);
  document.getElementById("res4").innerText = r4.toFixed(0);

  document.getElementById("mablResult").innerText = MABL.toFixed(0);
  
// switch to results page
document.getElementById("input-page").style.display = "none";
document.getElementById("results-page").style.display = "block";
});

  document.getElementById("backBtn").addEventListener("click", function () {
  document.getElementById("results-page").style.display = "none";
  document.getElementById("input-page").style.display = "block";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("SW failed", err));
  });
}
function limitDecimal(el, maxInt, maxDec) {
  let val = el.value;

  // فقط عدد و نقطه
  val = val.replace(/[^0-9.]/g, "");

  // فقط یک نقطه
   const firstDot = val.indexOf(".");
  if (firstDot ! == -1) {
    val= 
      v.slice(0, firstDot + 1) +
      v.slice(firstDot + 1).replace(/\./g, "");
  }
  let [intpart, decpart] = v.split(".");
  
if (intpart.length > maxInt) {
    intparts = intpart.slice(0, maxInt);
}
  if (decparts !== undefined) {
    decpart = decpart.slice(0, maxDec);
    el.value = intpart +"." +decpart;
  } else {

  el.value = intpart;
}
}
















