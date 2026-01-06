async function verify() {
    const idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");
    
    // Aapka CSV Link
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ27SgNp1euflFm41V_E8lXFh6_Nffz2-YLdNM2h0BmEg6Rd9Sp0lyYvUUJzYNjh1k1Y5lCWSvKxy3E/pub?gid=0&single=true&output=csv
    msg.innerText = "Searching...";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL + "&cache=" + Math.random());
        const data = await response.text();
        const rows = data.split("\n");

        let found = false;
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(",");
            if (cols[0] && cols[0].trim().toLowerCase() === idInput) {
                document.getElementById("name").innerText = cols[1].trim();
                document.getElementById("webinar_title").innerText = cols[2].trim();
                document.getElementById("certDate").innerText = cols[3].trim();
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerText = "✅ Record Found!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerText = "❌ ID Not Found. Please check the spelling.";
            msg.style.color = "red";
        }
    } catch (e) {
        msg.innerText = "⚠️ Connection Error. Refresh the page.";
    }
}
