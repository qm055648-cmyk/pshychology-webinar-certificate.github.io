async function verify() {
    let idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title");
    const dateField = document.getElementById("certDate");

    // Aapki image se liya gaya exact link
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    msg.innerHTML = "Checking Record...";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        // Fetching data from Google Sheets
        const response = await fetch(sheetURL);
        const data = await response.text();
        
        // CSV data ko lines mein split karna
        const rows = data.split('\n');
        let found = false;

        for (let i = 1; i < rows.length; i++) {
            // Har line ko columns (comma) mein split karna
            let cols = rows[i].split(',');
            let sheetID = cols[0] ? cols[0].trim().toLowerCase() : "";

            if (sheetID === idInput) {
                nameField.innerText = cols[1] ? cols[1].trim() : "";
                webinarField.innerText = cols[2] ? cols[2].trim() : "";
                dateField.innerText = cols[3] ? cols[3].trim() : "";
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Verified!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ ID Not Found. Please check: " + idInput;
            msg.style.color = "red";
        }

    } catch (error) {
        msg.innerHTML = "⚠️ Database Connection Error. Try refreshing the page.";
        msg.style.color = "orange";
        console.error("Fetch error:", error);
    }
}
