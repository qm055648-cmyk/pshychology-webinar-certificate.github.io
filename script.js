function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    msg.innerText = "🔍 Verifying...";
    cert.style.display = "none";

    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Ye lines automatically check karengi ke Keys small hain ya Capital
            const sName = data.name || data.Name || data.NAME || "Not Found";
            const sCourse = data.course || data.Course || data.Course_Name || "Not Found";
            const sDate = data.date || data.Date || data.DATE || "--/--/--";

            document.getElementById("name").innerText = sName;
            document.getElementById("webinar_title").innerText = sCourse;
            document.getElementById("certDate").innerText = sDate;

            msg.innerText = "✅ Verification Successful!";
            msg.style.color = "#4CAF50";
            cert.style.display = "block";
        } else {
            msg.innerText = "❌ ID Not Found!";
            msg.style.color = "#ff5252";
        }
    });
}
