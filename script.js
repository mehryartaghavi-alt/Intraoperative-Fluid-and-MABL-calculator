document.getElementById("calcBtn").addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const sex = document.getElementById("sex").value;

  if (!weight) {
    document.getElementById("results").innerHTML =
      "<p style='color:red'>Please enter weight</p>";
    return;
  }

  let EBV;
  if (sex === "male") EBV = weight * 70;
  else EBV = weight * 65;

  const Hstart = 40;
  const Htarget = 30;

  const MABL = EBV * ((Hstart - Htarget) / Hstart);

  document.getElementById("results").innerHTML = `
    <p><strong>MABL (Maximum Allowable Blood Loss)</strong></p>
    <p>EBV: ${EBV.toFixed(0)} ml</p>
    <p>MABL: ${MABL.toFixed(0)} ml</p>
  `;
});







