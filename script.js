// Firebase configuration (Aapki image se li gayi details)
const firebaseConfig = {
  apiKey: "AIzaSyC95-aIknA2rwVl8_RHJ1Kgn433LAlIqrI",
  authDomain: "certificate-portal-389d9.firebaseapp.com",
  databaseURL: "https://certificate-portal-389d9-default-rtdb.firebaseio.com",
  projectId: "certificate-portal-389d9",
  storageBucket: "certificate-portal-389d9.firebasestorage.app",
  messagingSenderId: "663113680380",
  appId: "1:663113680380:web:d1123e33be4d2fdb8c9e79",
  measurementId: "G-8HT13BKBP0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

async function verify() {
    const idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter a Certificate ID!";
        msg.style.color = "#ff9800";
        return;
    }

    msg.innerText = "🔍 Authenticating with Database...";
    msg.style.color = "white";
    cert.style.display = "none";

    // Firebase database call
    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Updating Certificate Fields
            document.getElementById("name").innerText = data.name;
            document.getElementById("webinar_title").innerText = data.course;
            document.getElementById("certDate").innerText = data.date;
            
            msg.innerText = "✅ Verification Successful!";
            msg.style.color = "#4CAF50";
            cert.style.display = "block";
            
            // Scroll to certificate automatically
            cert.scrollIntoView({ behavior: 'smooth' });
        } else {
            msg.innerText = "❌ ID Not Found! Make sure you typed: psy-2026-001";
            msg.style.color = "#ff5252";
        }
    }).catch((error) => {
        msg.innerText = "⚠️ Connection error. Please try again later.";
        console.error("Firebase Error:", error);
    });
}
