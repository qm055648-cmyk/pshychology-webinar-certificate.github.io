async function verify() {
    const idInput = document.getElementById("studentId").value.trim().toLowerCase();
    const msg = document.getElementById("msg");
    const cert = document.getElementById("certificate");

    // AAPKA NAYA LINK (Image 10 wala)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ27SgNp1eufIFm41V_E8lXFh6_Nffz2-YLdNM2hOBmEg6Rd9SpOlyYvUUJzYNjh1k1Y5ICWSvKxy3E/pub?gid=0&single=true&output=csv';

    if (!idInput) {
        msg.innerText = "⚠️ Please enter an ID!";
        msg.style.color = "orange";
        return;
    }

    msg.innerText = "🔍 Checking Database...";
    msg.style.color = "blue";
    cert.style.display = "none";

    try {
        const response = await fetch(sheetURL + "&cache=" + Math.random());
        const data = await response.text();
        
        // CSV data ko lines mein split karna
        const rows = data.split(/\r?\n/);
        let found = false;

        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(",");
            // ID ko clean karke match karna
            if (cols[0] && cols[0].replace(/["']/g, "").trim().toLowerCase() === idInput) {
                document.getElementById("name").innerText = cols[1].replace(/["']/g, "").trim();
                document.getElementById("webinar_title").innerText = cols[2].replace(/["']/g, "").trim();
                document.getElementById("certDate").innerText = cols[3].replace(/["']/g, "").trim();
                found = true;
                break;
            }
        }

        if (found) {
            msg.innerText = "✅ Record Found!";
            msg.style.color = "green";
            cert.style.display = "block";
        } else {
            msg.innerText = "❌ Record Not Found for: " + idInput;
            msg.style.color = "red";
        }
    } catch (e) {
        msg.innerText = "⚠️ Connection Error. Refresh and try again.";
        msg.style.color = "orange";
    }
}
