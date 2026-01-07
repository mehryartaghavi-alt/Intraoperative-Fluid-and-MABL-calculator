document.getElementById("calcBtn").addEventListener("click", () => {
  const weight = Number(document.getElementById("weight").value);
  const sex = document.getElementById("sex").value;
  const severity = document.getElementById("severity").value;

  if (!weight) {
    document.getElementById("results").innerHTML =
      "<p style='color:red'>Please enter weight</p>";
    return;
  }

  const testValue = weight * 2;

  document.getElementById("results").innerHTML = `
    <p><strong>Test calculation</strong></p>
    <p>Weight × 2 = ${testValue}</p>
    <p>Sex: ${sex}</p>
    <p>Surgical severity: ${severity}</p>
  `;
});






