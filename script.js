async function verify() {
    let idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title");
    const dateField = document.getElementById("certDate");

    // Google Sheet CSV Link (Jo aapne photo mein bheja)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    msg.innerHTML = "Checking Record... Please wait.";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL);
        const csvData = await response.text();
        const rows = csvData.split('\n').map(row => row.split(','));

        let found = false;
        // i=1 se start taake heading (CertificateID) skip ho jaye
        for (let i = 1; i < rows.length; i++) {
            let sheetID = rows[i][0] ? rows[i][0].trim().toLowerCase() : "";
            
            if (sheetID === idInput) {
                nameField.innerHTML = rows[i][1] ? rows[i][1].trim() : ""; // Column B
                webinarField.innerHTML = rows[i][2] ? rows[i][2].trim() : ""; // Column C
                dateField.innerHTML = rows[i][3] ? rows[i][3].trim() : ""; // Column D
                
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Record Found! Your certificate is below.";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ Record not found. Make sure ID is: psy-2026-001";
            msg.style.color = "red";
        }
    } catch (error) {
        msg.innerHTML = "⚠️ Connection Error. Please try again.";
        msg.style.color = "orange";
    }
}
