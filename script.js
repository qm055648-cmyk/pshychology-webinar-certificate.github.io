async function verify() {
    const idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title");
    const dateField = document.getElementById("certDate");

    // Aapka Published CSV Link
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    msg.innerHTML = "🔍 Checking Database...";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL + '&cachebust=' + new Date().getTime());
        const csvText = await response.text();
        
        // CSV parsing logic for different devices
        const rows = csvText.split(/\r?\n/);
        let found = false;

        for (let i = 0; i < rows.length; i++) {
            // Split by comma but handle potential quotes
            let cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (cols.length > 0) {
                let sheetID = cols[0].replace(/["']/g, "").trim().toLowerCase();
                
                if (sheetID === idInput) {
                    nameField.innerText = cols[1] ? cols[1].replace(/["']/g, "").trim() : "";
                    webinarField.innerText = cols[2] ? cols[2].replace(/["']/g, "").trim() : "";
                    dateField.innerText = cols[3] ? cols[3].replace(/["']/g, "").trim() : "";
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            msg.innerHTML = "✅ Record Found Successfully!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ ID Not Found: " + idInput;
            msg.style.color = "red";
        }

    } catch (error) {
        msg.innerHTML = "⚠️ Connection Error. Please refresh and try again.";
        msg.style.color = "orange";
    }
}
