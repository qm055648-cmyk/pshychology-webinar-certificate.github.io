// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC95-aIknA2rwVl8_RHJ1Kgn433LAlIqrI",
  authDomain: "certificate-portal-389d9.firebaseapp.com",
  databaseURL: "https://certificate-portal-389d9-default-rtdb.firebaseio.com",
  projectId: "certificate-portal-389d9",
  storageBucket: "certificate-portal-389d9.firebasestorage.app",
  messagingSenderId: "663113680380",
  appId: "1:663113680380:web:d1123e33be4d2fdb8c9e79"
};

// Initialize Firebase (Check agar already initialized nahi hai to)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Already initialized
}

const database = firebase.database();

function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    // Input validation
    if (!idInput) {
        msg.innerText = "⚠️ Please enter an ID!";
        msg.style.color = "#ff4444";
        cert.style.display = "none";
        return;
    }

    // Show loading
    msg.innerText = "🔍 Searching...";
    msg.style.color = "#ffffff";
    cert.style.display = "none";

    // Database query with error handling
    database.ref('students/' + idInput).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // Debug: Check data in console
                console.log("Data found:", data);
                
                // Update certificate fields
                const nameElement = document.getElementById("name");
                const titleElement = document.getElementById("webinar_title");
                const dateElement = document.getElementById("certDate");
                
                if (nameElement) nameElement.innerText = data.name || "N/A";
                if (titleElement) titleElement.innerText = data.course || data.webinar_title || "N/A";
                if (dateElement) dateElement.innerText = data.date || new Date().toLocaleDateString();

                // Success message
                msg.innerText = "✅ Verification Successful!";
                msg.style.color = "#00ff00";
                cert.style.display = "block";
                
                // Optional: Hide after 3 seconds
                setTimeout(() => {
                    msg.innerText = "";
                }, 3000);
                
            } else {
                msg.innerText = "❌ No Record Found for ID: " + idInput;
                msg.style.color = "#ff4444";
                cert.style.display = "none";
            }
        })
        .catch((error) => {
            console.error("Firebase Error:", error);
            msg.innerText = "⚠️ Error: " + (error.message || "Connection failed. Check console.");
            msg.style.color = "#ff4444";
            cert.style.display = "none";
        });
}

// Optional: Enter key press support
document.getElementById("studentId")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        verify();
    }
});
