function formatDateTimeWithOffset(date, timeZone, label) {
    const options = {
        timeZone,
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat('en-NZ', options);
    const formatted = formatter.format(date);

    // Calculate UTC offset
    const offsetMinutes = -date.toLocaleString('en-US', { timeZone }).includes('GMT')
        ? 0
        : new Date(date.toLocaleString('en-US', { timeZone })).getTimezoneOffset();

    const offsetHours = Math.floor(-offsetMinutes / 60);
    const offsetMins = Math.abs(offsetMinutes % 60);
    const sign = offsetHours >= 0 ? '+' : '-';
    const utcOffset = `UTC${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    return `${label.padEnd(18)} ${formatted} (${utcOffset})`;
}

function updateClock() {
    const now = new Date();

    const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localLine = formatDateTimeWithOffset(now, localTZ, '📍 Local Time:');
    const nzLine = formatDateTimeWithOffset(now, 'Pacific/Auckland', '🇳🇿 New Zealand:');

    console.clear();
    console.log(localLine);
    console.log(nzLine);
}

setInterval(updateClock, 1000);
