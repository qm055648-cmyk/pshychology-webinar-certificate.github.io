const sheetURL = "1of_mVqGw2igmqjVJdhQUR0wQ-_W7F7X58i6WJUv16Xk";

async function verify() {
  const id = document.getElementById("studentId").value.trim();
  const msg = document.getElementById("msg");
  const cert = document.getElementById("certificate");

  const res = await fetch(sheetURL);
  const text = await res.text();
  const rows = text.split("\n").slice(1);

  let found = false;

  rows.forEach(row => {
    const cols = row.split(",");
    if (cols[0] === id) {
      document.getElementById("name").innerText = cols[1];
      document.getElementById("webinar").innerText = cols[2];
      cert.style.display = "block";
      msg.innerText = "";
      found = true;
    }
  });

  if (!found) {
    cert.style.display = "none";
    msg.innerText = "❌ Invalid Student ID";
    msg.style.color = "red";
  }
}
