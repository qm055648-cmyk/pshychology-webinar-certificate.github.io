<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Verification Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>
</head>
<body>
    <div class="hero-section">
        <div class="logo">PTI Official</div>
        <h1>Certificate Verification</h1>
        <div class="search-box">
            <input type="text" id="studentId" placeholder="Enter ID (e.g. psy-2026-001)">
            <button onclick="verify()">Verify Now</button>
        </div>
        <p id="msg"></p>
    </div>

    <div id="certificate" class="cert-card" style="display: none;">
        <div class="cert-border-outer">
            <div class="cert-border-inner">
                <div class="cert-content">
                    <div class="gold-seal">🏆</div>
                    <h2 class="cert-title">CERTIFICATE OF COMPLETION</h2>
                    <p class="cert-intro">This is to certify that</p>
                    <h1 id="name">Name Not Found</h1>
                    <p class="cert-intro">has successfully completed the webinar</p>
                    <h3 id="webinar_title">Course Not Found</h3>
                    
                    <div class="cert-footer">
                        <div class="sig-block">
                            <p class="sig-name">Major Muhammad Usama Durani</p>
                            <p class="sig-role">Instructor | Psychiatrist</p>
                        </div>
                        <div class="date-block">
                            <p id="certDate" class="date-val">--/--/--</p>
                            <p class="sig-role">Issue Date</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="print-btn" onclick="window.print()">Download / Print</button>
    </div>

    <footer>
        <p>&copy; 2026 Psychology Training Institute. All Rights Reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
