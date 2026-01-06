async function verify() {
    let idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title");
    const dateField = document.getElementById("certDate");

    // Naya Link + Cache Buster (taake purana data show na ho)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv&t=' + new Date().getTime();

    msg.innerHTML = "🔍 Checking our records...";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const csvData = await response.text();
        const rows = csvData.split('\n').map(row => row.split(','));

        let found = false;
        // Hum loop 0 se start kar rahe hain taake agar heading na ho toh bhi mil jaye
        for (let i = 0; i < rows.length; i++) {
            let sheetID = rows[i][0] ? rows[i][0].trim().toLowerCase() : "";
            
            if (sheetID === idInput) {
                nameField.innerHTML = rows[i][1] ? rows[i][1].trim() : "N/A";
                webinarField.innerHTML = rows[i][2] ? rows[i][2].trim() : "N/A";
                dateField.innerHTML = rows[i][3] ? rows[i][3].trim() : "N/A";
                
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Found!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ ID Not Found. Try: " + idInput;
            msg.style.color = "red";
        }
    } catch (error) {
        msg.innerHTML = "⚠️ Error: Could not connect to the database.";
        console.error(error);
    }
}
