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
        msg.innerHTML = "<span style='color:red;'>⚠️ Please enter a Certificate ID</span>";
        return;
    }

    msg.innerHTML = "<span style='color:blue;'>🔄 Authenticating...</span>";

    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Data Received:", data); // Is se browser console mein data dikhay dega

            // Data mapping with Fallback to prevent 'undefined'
            document.getElementById("name").innerText = data.name || data.Name || data.NAME || "N/A";
            document.getElementById("webinar_title").innerText = data.course || data.Course || data.Webinar || "N/A";
            document.getElementById("certDate").innerText = data.date || data.Date || data.DATE || "--/--/--";

            msg.innerHTML = "<span style='color:green;'>✅ Certificate Successfully Verified</span>";
            cert.style.display = "block";
            cert.scrollIntoView({ behavior: 'smooth' });
        } else {
            msg.innerHTML = "<span style='color:red;'>❌ ID Not Found. Please check the credentials.</span>";
            cert.style.display = "none";
        }
    }).catch((error) => {
        msg.innerHTML = "<span style='color:orange;'>⚠️ Connection Error. Try again.</span>";
        console.error(error);
    });
}
