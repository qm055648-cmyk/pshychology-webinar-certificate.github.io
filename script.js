function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter an ID!";
        return;
    }

    msg.innerText = "🔍 Searching in 'students' folder..."; 
    cert.style.display = "none";

    // Data dhoondne ki koshish
    database.ref('students/' + idInput).once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Data Found:", data); // Ye browser console mein dikhayega

            // UI update karna
            document.getElementById("name").innerText = data.name || data.Name || "Name Error";
            document.getElementById("webinar_title").innerText = data.course || data.Course || "Course Error";
            document.getElementById("certDate").innerText = data.date || data.Date || "Date Error";

            msg.innerText = "✅ Student Verified!";
            msg.style.color = "#00ff00";
            cert.style.display = "block";
        } else {
            msg.innerText = "❌ ID '" + idInput + "' not found in database.";
            msg.style.color = "#ff4444";
        }
    })
    .catch((error) => {
        msg.innerText = "⚠️ Connection Error: " + error.message;
        console.error("Firebase Error:", error);
    });
}
