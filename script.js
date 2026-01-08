function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter an ID!";
        msg.style.color = "orange";
        return;
    }

    msg.innerText = "🔍 Checking Database...";
    msg.style.color = "white";
    cert.style.display = "none";

    // Yahan humne path change kar diya hai kyunke data root par hai
    database.ref(idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Data ko UI par dikhana
            document.getElementById("name").innerText = data.name || data.Name || "Not Found";
            document.getElementById("webinar_title").innerText = data.course || data.Course || "Not Found";
            document.getElementById("certDate").innerText = data.date || data.Date || "--/--/--";

            msg.innerText = "✅ Verified Successfully!";
            msg.style.color = "#00ff00";
            cert.style.display = "block";
            cert.scrollIntoView({ behavior: 'smooth' });
        } else {
            msg.innerText = "❌ Record Not Found for: " + idInput;
            msg.style.color = "#ff4444";
        }
    }).catch((e) => {
        msg.innerText = "⚠️ Connection Error.";
        console.error(e);
    });
}
