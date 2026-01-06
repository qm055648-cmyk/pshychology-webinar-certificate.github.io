async function verify() {
    let idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");

    // Confusion khatam karne ke liye: '1' aur 'l' dono ko accept karega
    idInput = idInput.replace(/1/g, 'l');

    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv';

    if (idInput === "") {
        msg.innerHTML = "Please enter a Student ID.";
        msg.style.color = "orange";
        return;
    }

    msg.innerHTML = "Verifying... Please wait.";
    msg.style.color = "blue";

    try {
        const response = await fetch(sheetURL);
        const csvData = await response.text();
        const rows = csvData.split('\n').map(row => row.split(','));

        let found = false;
        for (let i = 1; i < rows.length; i++) {
            let sheetID = rows[i][0] ? rows[i][0].trim().toLowerCase().replace(/1/g, 'l') : "";
            let studentName = rows[i][1] ? rows[i][1].trim() : "";

            if (sheetID === idInput) {
                nameField.innerHTML = studentName; 
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Verified!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ Record not found.";
            msg.style.color = "red";
            cert.style.display = "none";
        }
    } catch (error) {
        msg.innerHTML = "⚠️ Connection Error.";
    }
}
