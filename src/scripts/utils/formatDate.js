const currentDate = new Date();
export function fetchCurrentDate() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    const todayDate = `${year}-${month}-${day}`
    return todayDate
    // Example output: "2025-09-16 17:45:00"
}

export function fetchCurrentTime() {
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

    return currentTime
}