function getOS() {
    let platform = window.navigator.platform;
    if (/Win/i.test(platform)) return "Windows";
    if (/Mac/i.test(platform)) return "MacOS";
    if (/Linux/i.test(platform)) return "Linux";
    if (/Android/i.test(navigator.userAgent)) return "Android";
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return "iOS";
    return "Nieznany";
    }
    
    function getResolution() {
    return `${window.screen.width}x${window.screen.height}`;
    }
    
    function saveVisit(ip) {
    let visitCount = localStorage.getItem("visitCount") || 0;
    visitCount++;
    localStorage.setItem("visitCount", visitCount);
    
    let data = {
    ip: ip,
    os: getOS(),
    resolution: getResolution(),
    time: new Date().toLocaleString(),
    visits: visitCount
    };
    
    fetch('https://script.google.com/macros/s/AKfycbxXXSZwFNSIO_RBfmqsgrRMoAQWBnHs0P1rNeUa73AHTGTyPyujQDbEnZNNYj6xQExUiw/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    displayVisits(data);
    }
    
    function displayVisits(data) {
    let logs = document.getElementById("logs");
    let listItem = document.createElement("li");
    listItem.textContent = `${data.time} - ${data.os} - ${data.resolution} - IP: ${data.ip} (Wejść: ${data.visits})`;
    logs.appendChild(listItem);
    }
    
    // Pobranie IP użytkownika z API i zapisanie wizyty
    fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => saveVisit(data.ip))
    .catch(error => {
    console.error("Błąd pobierania IP:", error);
    saveVisit("Nieznane IP");
    });

    
