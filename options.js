document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    document.getElementById('settings-form').addEventListener('submit', event => {
        event.preventDefault();
        saveSettings();
    });
});

function loadSettings() {
    chrome.storage.sync(['cacheDuration'], result => {
        if(result.cacheDuration) {
            document.getElementById('cache-duration').value = result.cacheDuration;
        }
    })
}

function saveSettings() {
    const cacheDuration = document.getElementById('cache-duration').value;
    chrome.storage.sync.set({cacheDuration}, () => {
        alert('Settings saved')
    })
}