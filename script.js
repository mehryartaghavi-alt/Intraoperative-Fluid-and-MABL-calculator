document.getElementById("calcBtn").addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const sex = document.getElementById("sex").value;
  const severity = document.getElementById("severity").value;

  if (!weight) {
    document.getElementById("results").innerHTML =
      "<p style='color:red'>Please enter weight</p>";
    return;
  }

  // EBV for MABL
  let EBV = sex === "male" ? weight * 70 : weight * 65;
  const Hstart = 40;
  const Htarget = 30;
  const MABL = EBV * ((Hstart - Htarget) / Hstart);

  // Fluid rates
  let liberalRate, restrictedRate, goalRate;

  switch (severity) {
    case "minimal":
      liberalRate = 4;
      restrictedRate = 2;
      goalRate = 3;
      break;
    case "mild":
      liberalRate = 6;
      restrictedRate = 3;
      goalRate = 4;
      break;
    case "moderate":
      liberalRate = 8;
      restrictedRate = 4;
      goalRate = 6;
      break;
    case "severe":
      liberalRate = 10;
      restrictedRate = 6;
      goalRate = 8;
      break;
  }

  const liberal = liberalRate * weight;
  const restricted = restrictedRate * weight;
  const goal = goalRate * weight;

  document.getElementById("results").innerHTML = `
    <p><strong>Fluid Strategies (ml/hour)</strong></p>
    <p>Liberal: ${liberal.toFixed(0)} ml/h</p>
    <p>Restricted: ${restricted.toFixed(0)} ml/h</p>
    <p>Goal-directed: ${goal.toFixed(0)} ml/h</p>
    <hr>
    <p><strong>MABL</strong></p>
    <p>${MABL.toFixed(0)} ml</p>
  `;
});







