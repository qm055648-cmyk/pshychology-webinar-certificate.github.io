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

function verify() {

    const id = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const frame = document.getElementById("driveFrame");

    if (!id) {
        msg.innerText = "Enter ID";
        return;
    }

    msg.innerText = "Searching...";

    cert.style.display = "none";
    frame.style.display = "none";

    db.ref("students/" + id).once("value")
    .then(snapshot => {

        if (!snapshot.exists()) {
            msg.innerText = "No Record Found";
            return;
        }

        const data = snapshot.val();

        // 🔥 DRIVE CERTIFICATE
        if (data.certificateLink && data.certificateLink !== "") {

            frame.src = data.certificateLink;
            frame.style.display = "block";

            msg.innerText = "Certificate Loaded";

        } else {

            // AUTO CERTIFICATE
            document.getElementById("name").innerText = data.name;
            document.getElementById("webinar_title").innerText = data.course;
            document.getElementById("certDate").innerText = data.date;

            cert.style.display = "block";

            msg.innerText = "Verified Successfully";
        }

    })
    .catch(err => {
        console.log(err);
        msg.innerText = "Error";
    });
}
