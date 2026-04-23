// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC95-aIknA2rwVl8_RHJ1Kgn433LAlIqrI",
  authDomain: "certificate-portal-389d9.firebaseapp.com",
  databaseURL: "https://certificate-portal-389d9-default-rtdb.firebaseio.com",
  projectId: "certificate-portal-389d9",
  storageBucket: "certificate-portal-389d9.firebasestorage.app",
  messagingSenderId: "663113680380",
  appId: "1:663113680380:web:d1123e33be4d2fdb8c9e79"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔍 VERIFY FUNCTION
function verify() {

    const id = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const frame = document.getElementById("driveFrame");

    if (!id) {
        msg.innerText = "⚠️ Please enter Certificate ID";
        msg.style.color = "yellow";
        return;
    }

    msg.innerText = "🔍 Searching...";
    msg.style.color = "white";

    cert.style.display = "none";
    frame.style.display = "none";

    // 🔥 SAME ID FORMAT (psy-2026-001)
    db.ref("students/" + id).once("value")
    .then(snapshot => {

        if (!snapshot.exists()) {
            msg.innerText = "❌ Invalid Certificate ID";
            msg.style.color = "red";
            return;
        }

        const data = snapshot.val();
        console.log("DATA:", data);

        // ✅ CHECK LINK
        if (data.certificateLink && data.certificateLink.trim() !== "") {

            // 👉 GOOGLE DRIVE CERTIFICATE
            frame.src = data.certificateLink;
            frame.style.display = "block";

            msg.innerText = "✅ Certificate Loaded";
            msg.style.color = "lightgreen";

        } else {

            // 👉 AUTO GENERATED CERTIFICATE (OLD SYSTEM)
            document.getElementById("name").innerText = data.name || "N/A";
            document.getElementById("webinar_title").innerText = data.course || "N/A";
            document.getElementById("certDate").innerText = data.date || "N/A";

            cert.style.display = "block";

            msg.innerText = "✅ Verified Successfully";
            msg.style.color = "lightgreen";
        }

    })
    .catch(err => {
        console.error(err);
        msg.innerText = "⚠️ Error loading data";
        msg.style.color = "orange";
    });
}
