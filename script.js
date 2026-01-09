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
        msg.innerText = "⚠️ Please enter an ID!";
        msg.style.color = "orange";
        return;
    }

    msg.innerText = "🔍 Searching in Database...";
    msg.style.color = "white";
    cert.style.display = "none";

    // ✅ FIXED PATH: Ab data 'students' folder se fetch hoga
    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Data ko UI mein bharna (Dono small aur capital letters handle kiye hain)
            document.getElementById("name").innerText = data.name || data.Name || "Not Found";
            document.getElementById("webinar_title").innerText = data.course || data.Course || "Not Found";
            document.getElementById("certDate").innerText = data.date || data.Date || "--/--/--";

            msg.innerText = "✅ Student Verified Successfully!";
            msg.style.color = "#00ff00";
            
            // Certificate display karna
            cert.style.display = "block";
            cert.scrollIntoView({ behavior: 'smooth' });
        } else {
            msg.innerText = "❌ No Record Found for ID: " + idInput;
            msg.style.color = "#ff4444";
        }
    }).catch((error) => {
        msg.innerText = "⚠️ Connection Error. Please check your internet.";
        console.error(error);
    });
}
