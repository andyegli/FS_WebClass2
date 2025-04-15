function updateClock() {
    const localNow = new Date();

    // Local time
    const localTime = localNow.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const localDate = localNow.toLocaleDateString([], {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // New Zealand time (formatted directly)
    const nzDateTime = new Intl.DateTimeFormat('en-NZ', {
        timeZone: 'Pacific/Auckland',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date());

    document.getElementById('clock').innerHTML = `
        <div><strong>Local:</strong> ${localDate} - ${localTime}</div>
        <div><strong>New Zealand:</strong> ${nzDateTime}</div>
    `;
}

setInterval(updateClock, 1000);
updateClock();
