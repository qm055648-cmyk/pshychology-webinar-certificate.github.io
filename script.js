// SAMPLE DATA (baad mein Google Sheet se connect hoga)
const certificates = [
  {
    id: "PSY-2026-001",
    name: "Ali Khan",
    course: "Overthinking Webinar",
    date: "10 Jan 2026",
    pdf: "https://example.com/sample.pdf"
  },
  {
    id: "PSY-2026-002",
    name: "Sara Ahmed",
    course: "Stress Management",
    date: "15 Jan 2026",
    pdf: "https://example.com/sample.pdf"
  }
];

function verifyCertificate() {
  const inputId = document.getElementById("certId").value.trim();
  const resultDiv = document.getElementById("result");

  const cert = certificates.find(c => c.id === inputId);

  if (cert) {
    resultDiv.innerHTML = `
      <p><strong>Name:</strong> ${cert.name}</p>
      <p><strong>Course:</strong> ${cert.course}</p>
      <p><strong>Date:</strong> ${cert.date}</p>
      <p><a href="${cert.pdf}" target="_blank">View Certificate</a></p>
    `;
  } else {
    resultDiv.innerHTML = "<p style='color:red;'>Certificate not found ❌</p>";
  }
}
