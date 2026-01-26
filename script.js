document.getElementById("calcBtn").addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const sex = document.getElementById("sex").value;
  const severity = document.getElementById("severity").value;

  if (!weight) {
    document.getElementById("results").innerHTML =
      "<p style='color:red'>Please enter weight</p>";
    return;
  }

  // EBV
  let EBV = sex === "male" ? weight * 70 : weight * 65;

  // MABL
  const Hstart = 40;
  const Htarget = 30;
  const MABL = EBV * ((Hstart - Htarget) / Hstart);

  // Fluid rates
  let liberalRate, restrictedRate, goalRate;
  let h1, h2, h3;

  switch (severity) {
    case "minimal":
      liberalRate = 4; restrictedRate = 2; goalRate = 3;
      h1 = 0.05; h2 = 0.03; h3 = 0.02;
      break;
    case "mild":
      liberalRate = 6; restrictedRate = 3; goalRate = 4;
      h1 = 0.10; h2 = 0.05; h3 = 0.03;
      break;
    case "moderate":
      liberalRate = 8; restrictedRate = 4; goalRate = 6;
      h1 = 0.15; h2 = 0.10; h3 = 0.05;
      break;
    case "severe":
      liberalRate = 10; restrictedRate = 6; goalRate = 8;
      h1 = 0.20; h2 = 0.15; h3 = 0.10;
      break;
  }

  const liberal = liberalRate * weight;
  const restricted = restrictedRate * weight;
  const goal = goalRate * weight;

  const bleed1 = EBV * h1;
  const bleed2 = EBV * h2;
  const bleed3 = EBV * h3;

  document.getElementById("results").innerHTML = `
    <p><strong>Fluid Strategies (ml/hour)</strong></p>
    <p>Liberal: ${liberal.toFixed(0)} ml/h</p>
    <p>Restricted: ${restricted.toFixed(0)} ml/h</p>
    <p>Goal-directed: ${goal.toFixed(0)} ml/h</p>

    <hr>
    <p><strong>Estimated Blood Loss</strong></p>
    <p>Hour 1: ${bleed1.toFixed(0)} ml</p>
    <p>Hour 2: ${bleed2.toFixed(0)} ml</p>
    <p>Hour 3: ${bleed3.toFixed(0)} ml</p>

    <hr>
    <p><strong>MABL</strong></p>
    <p>${MABL.toFixed(0)} ml</p>
  `;
});








