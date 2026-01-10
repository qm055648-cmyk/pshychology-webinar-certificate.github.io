function verify() {
    const idInput = document.getElementById("studentId").value.trim();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    if (!idInput) {
        msg.innerText = "⚠️ Please enter an ID!";
        return;
    }

    msg.innerText = "🔍 Searching..."; 
    cert.style.display = "none";

    // ✅ FIXED PATH: Ab data 'students' folder ke andar se dhonde ga
    database.ref('students/' + idInput).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Data ko UI mein bharna
            document.getElementById("name").innerText = data.name || "Not Found";
            document.getElementById("webinar_title").innerText = data.course || "Not Found";
            document.getElementById("certDate").innerText = data.date || "--/--/--";

            msg.innerText = "✅ Verification Successful!";
            msg.style.color = "#00ff00";
            cert.style.display = "block";
        } else {
            msg.innerText = "❌ No Record Found!";
            msg.style.color = "#ff4444";
        }
    }).catch((error) => {
        msg.innerText = "⚠️ Error: Connection failed.";
        console.error(error);
    });
}
