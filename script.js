async function verify() {
    const idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar");

    // Aapka CSV link jo aapne spreadsheet se generate kiya hai
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    if (idInput === "") {
        msg.innerHTML = "Please enter a Student ID.";
        msg.style.color = "orange";
        return;
    }

    msg.innerHTML = "Verifying ID... Please wait.";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL);
        const csvData = await response.text();
        
        // CSV data ko rows aur columns mein convert karna
        const rows = csvData.split('\n').map(row => row.split(','));

        let found = false;
        
        // Spreadsheet check karna (Column A = ID, Column B = Name)
        for (let i = 1; i < rows.length; i++) {
            let sheetID = rows[i][0] ? rows[i][0].trim().toLowerCase() : "";
            let studentName = rows[i][1] ? rows[i][1].trim() : "";

            if (sheetID === idInput) {
                nameField.innerHTML = studentName; 
                webinarField.innerHTML = "Psychology Webinar 2026"; // Webinar ka naam
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Verified!";
            msg.style.color = "green";
            // Certificate ka section dikhana
            cert.style.display = "block"; 
        } else {
            msg.innerHTML = "❌ Invalid Student ID. Record not found.";
            msg.style.color = "red";
            cert.style.display = "none";
        }
    } catch (error) {
        msg.innerHTML = "⚠️ Error connecting to database.";
        console.error("Fetch Error:", error);
    }
}
