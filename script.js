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

async function verify() {
    const idInput = document.getElementById("studentId").value.trim(); 
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter a Certificate ID!";
        return;
    }

    msg.innerText = "🔍 Verifying...";
    cert.style.display = "none";

    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Fix for Undefined: Pehle check karega small 'name', phir Capital 'Name'
            document.getElementById("name").innerText = data.name || data.Name || "Not Available";
            document.getElementById("webinar_title").innerText = data.course || data.Course || "Not Available";
            document.getElementById("certDate").innerText = data.date || data.Date || "--/--/--";
            
            msg.innerText = "✅ Verification Successful!";
            msg.style.color = "#4CAF50";
            cert.style.display = "block";
            cert.scrollIntoView({ behavior: 'smooth' });
        } else {
            msg.innerText = "❌ ID Not Found! Check spelling: " + idInput;
            msg.style.color = "#ff5252";
        }
    }).catch((e) => {
        msg.innerText = "⚠️ Error connecting to database.";
    });
}
