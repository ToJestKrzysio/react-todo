export function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    if (data !== null) {
        return JSON.parse(data);
    }
    return []
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
