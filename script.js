const firebaseConfig = {
  apiKey: "AIzaSyC95-aIknA2rwVl8_RHJ1Kgn433LAlIqrI",
  authDomain: "certificate-portal-389d9.firebaseapp.com",
  databaseURL: "https://certificate-portal-389d9-default-rtdb.firebaseio.com",
  projectId: "certificate-portal-389d9",
  storageBucket: "certificate-portal-389d9.firebasestorage.app",
  messagingSenderId: "663113680380",
  appId: "1:663113680380:web:d1123e33be4d2fdb8c9e79"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter ID!";
        msg.style.color = "orange";
        return;
    }

    msg.innerText = "🔍 Checking Database...";
    msg.style.color = "white";
    cert.style.display = "none";

    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Sab spelling variants cover kiye hain taake 'undefined' na aaye
            document.getElementById("name").innerText = data.name || data.Name || data.NAME || "Not Found";
            document.getElementById("webinar_title").innerText = data.course || data.Course || data.Webinar || "Not Found";
            document.getElementById("certDate").innerText = data.date || data.Date || data.DATE || "--/--/--";

            msg.innerText = "✅ Verification Successful!";
            msg.style.color = "#00ff00";
            cert.style.display = "block";
            cert.scrollIntoView({ behavior: 'smooth' });
        } else {
            msg.innerText = "❌ No Record Found for: " + idInput;
            msg.style.color = "#ff4444";
        }
    }).catch((e) => {
        msg.innerText = "⚠️ Connection error.";
        console.error(e);
    });
}
