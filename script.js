async function verify() {
    let idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title");
    const dateField = document.getElementById("certDate");

    // Aapka CSV Link
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    msg.innerHTML = "🔍 Checking Database...";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        // 'no-cache' add kiya taake naya data foran nazar aaye
        const response = await fetch(sheetURL, { cache: "no-store" });
        const data = await response.text();
        
        const rows = data.split('\n');
        let found = false;

        for (let i = 0; i < rows.length; i++) {
            let cols = rows[i].split(',');
            // Column A mein ID dhoondna
            let sheetID = cols[0] ? cols[0].trim().toLowerCase() : "";

            if (sheetID === idInput) {
                nameField.innerText = cols[1] ? cols[1].trim() : ""; // Column B
                webinarField.innerText = cols[2] ? cols[2].trim() : ""; // Column C
                dateField.innerText = cols[3] ? cols[3].trim() : ""; // Column D
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Found!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ Record Not Found for: " + idInput;
            msg.style.color = "red";
        }

    } catch (error) {
        msg.innerHTML = "⚠️ Connection Error! Please refresh the page.";
        msg.style.color = "orange";
        console.error("Error:", error);
    }
}
