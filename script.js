// Firebase configuration (Bas API Key apni paste karen)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE", 
    authDomain: "certificate-portal-389d9.firebaseapp.com",
    databaseURL: "https://certificate-portal-389d9-default-rtdb.firebaseio.com",
    projectId: "certificate-portal-389d9",
    storageBucket: "certificate-portal-389d9.appspot.com",
    messagingSenderId: "333333333333", // Ye optional hai
    appId: "1:333333333333:web:xxxxxxxxxxxx" // Ye optional hai
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
            msg.innerText = "❌ ID Not Found! Please check the ID and try again.";
            msg.style.color = "#ff5252";
        }
    }).catch((error) => {
        msg.innerText = "⚠️ Connection error. Please try again later.";
        console.error("Firebase Error:", error);
    });
}
