// Firebase Configuration (Same as before)
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
const database = firebase.database();

function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter an ID!";
        return;
    }

    msg.innerText = "🔍 Searching...";
    cert.style.display = "none";

    // ✅ 'students/' path lazmi hai kyunke data isi folder mein hai
    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // UI mein data bharna (Google Sheet ke columns ke mutabiq)
            document.getElementById("name").innerText = data.name || "N/A";
            document.getElementById("webinar_title").innerText = data.course || "N/A";
            document.getElementById("certDate").innerText = data.date || "N/A";

            msg.innerText = "✅ Verification Successful!";
            msg.style.color = "#00ff00";
            cert.style.display = "block";
        } else {
            msg.innerText = "❌ No Record Found!";
            msg.style.color = "#ff4444";
        }
    }).catch((error) => {
        msg.innerText = "⚠️ Error: Connection failed.";
        console.error(error);
    });
}
