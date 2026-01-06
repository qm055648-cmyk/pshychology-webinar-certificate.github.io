async function verify() {
    const idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    const nameField = document.getElementById("name");
    const webinarField = document.getElementById("webinar_title");
    const dateField = document.getElementById("certDate");

    // Ye raha aapka Sheet Link (Maine isme ek extra security parameter add kiya hai)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjnVzX1JxAGMxClvi4MVQJwmyE3bx6djlk8qvZ8NSN2hKe3Qz7AGblXt_tZHQnYRRxmWDrFuY55ZRN/pub?gid=0&single=true&output=csv&cachebust=' + Math.random();

    msg.innerHTML = "🔍 Checking Record...";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL);
        const csvData = await response.text();
        
        // CSV ko lines mein split karna
        const lines = csvData.split(/\r?\n/);
        let found = false;

        // Pehli line (Heading) ko chor kar baki lines check karna
        for (let i = 1; i < lines.length; i++) {
            // Regex use kar raha hoon taake commas aur spaces ki galti na ho
            let cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            if (cols[0]) {
                let sheetID = cols[0].replace(/"/g, "").trim().toLowerCase();
                
                if (sheetID === idInput) {
                    nameField.innerText = cols[1] ? cols[1].replace(/"/g, "").trim() : "";
                    webinarField.innerText = cols[2] ? cols[2].replace(/"/g, "").trim() : "";
                    dateField.innerText = cols[3] ? cols[3].replace(/"/g, "").trim() : "";
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            msg.innerHTML = "✅ Certificate Verified!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerHTML = "❌ Record Not Found. Make sure you typed: " + idInput;
            msg.style.color = "red";
        }

    } catch (error) {
        msg.innerHTML = "⚠️ Database Connection Error. Try refreshing.";
        msg.style.color = "orange";
    }
}
