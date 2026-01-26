document.getElementById("calcBtn").addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const severity = document.getElementById("severity").value;

  const b1 = Number(document.getElementById("bleed1").value) || 0;
  const b2 = Number(document.getElementById("bleed2").value) || 0;
  const b3 = Number(document.getElementById("bleed3").value) || 0;

  if (!weight) {
    document.getElementById("results").innerHTML =
      "<p style='color:red'>Please enter weight</p>";
    return;
  }

  let rate;
  switch (severity) {
    case "minimal": rate = 2; break;
    case "mild": rate = 4; break;
    case "moderate": rate = 6; break;
    case "severe": rate = 8; break;
  }

  const base = rate * weight;

  const hour1 = base;
  const hour2 = base + b1;
  const hour3 = base + b2;
  const hour4 = base + b3;

  document.getElementById("results").innerHTML = `
    <p><strong>Restrictive Strategy (ml/hour)</strong></p>
    <p>Hour 1: ${hour1.toFixed(0)} ml</p>
    <p>Hour 2: ${hour2.toFixed(0)} ml</p>
    <p>Hour 3: ${hour3.toFixed(0)} ml</p>
    <p>Hour 4: ${hour4.toFixed(0)} ml</p>
  `;
});

