const SHEET_ID = "1of_mVqGw2igmqjVJdhQUR0wQ-_W7F7X58i6WJUv16Xk";
const SHEET_NAME = "Untitled spreadsheet";
const URL = `https://opensheet.elk.sh/${"1of_mVqGw2igmqjVJdhQUR0wQ-_W7F7X58i6WJUv16Xk" }/${"Untitled spreadsheet"}`;
async function verifyCertificate() {
  const inputId = document.getElementById("certId").value.trim();
  const resultDiv = document.getElementById("result");

  if (!inputId) {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter Certificate ID</p>";
    return;
  }

  resultDiv.innerHTML = "Checking... ⏳";

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const cert = data.find(c => c.CertificateID === inputId);

    if (cert) {
      resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${cert.Name}</p>
        <p><strong>Course:</strong> ${cert.Course}</p>
        <p><strong>Date:</strong> ${cert.Date}</p>
        <p><a href="${cert.PDF}" target="_blank">View Certificate</a></p>
      `;
    } else {
      resultDiv.innerHTML = "<p style='color:red;'>Certificate not found ❌</p>";
    }

  } catch (error) {
    resultDiv.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}
