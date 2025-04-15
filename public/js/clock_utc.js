function formatDateTimeWithOffset(date, timeZone) {
    const options = {
        timeZone,
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const formatter = new Intl.DateTimeFormat('en-NZ', options);
    const formatted = formatter.format(date);

    // Calculate UTC offset
    const localTime = new Date(date.toLocaleString('en-US', { timeZone }));
    const offsetMinutes = -localTime.getTimezoneOffset();
    const offsetHours = Math.floor(offsetMinutes / 60);
    const offsetMins = Math.abs(offsetMinutes % 60);
    const sign = offsetHours >= 0 ? '+' : '-';
    const utcOffset = `UTC${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    return `${formatted} (${utcOffset})`;
}

function updateClock() {
    const now = new Date();

    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localFormatted = formatDateTimeWithOffset(now, localTimeZone);
    const nzFormatted = formatDateTimeWithOffset(now, 'Pacific/Auckland');

    document.getElementById('clock').innerHTML = `
        <div><strong>📍 Local Time:</strong> ${localFormatted}</div>
        <div><strong>🇳🇿 New Zealand:</strong> ${nzFormatted}</div>
    `;
}

setInterval(updateClock, 1000);
updateClock();
