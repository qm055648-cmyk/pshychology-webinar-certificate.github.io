async function verify() {
    let idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title"); // Naya ID
    const dateField = document.getElementById("certDate"); // Naya ID

    // Confusion khatam karne ke liye: '1' aur 'l' ka masla hal
    idInput = idInput.replace(/1/g, 'l');

    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    msg.innerHTML = "Verifying... Please wait.";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL);
        const csvData = await response.text();
        const rows = csvData.split('\n').map(row => row.split(','));

        let found = false;
        for (let i = 1; i < rows.length; i++) {
            let sheetID = rows[i][0] ? rows[i][0].trim().toLowerCase().replace(/1/g, 'l') : "";
            
            if (sheetID === idInput) {
                nameField.innerHTML = rows[i][1] ? rows[i][1].trim() : "Student Name"; // Column B
                webinarField.innerHTML = rows[i][2] ? rows[i][2].trim() : "Webinar Name"; // Column C
                dateField.innerHTML = rows[i][3] ? rows[i][3].trim() : "Date"; // Column D
                
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Verified!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ Record not found. Please check your ID.";
            msg.style.color = "red";
        }
    } catch (error) {
        msg.innerHTML = "⚠️ Connection Error.";
    }
}
