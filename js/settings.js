// Settings functionality

// DOM Elements
let saveSettings, resetSettings;

// Initialize Settings
function initSettings() {
    saveSettings = document.getElementById("saveSettings");
    resetSettings = document.getElementById("resetSettings");
    
    // Add event listeners
    if (saveSettings) {
        saveSettings.addEventListener("click", function() {
            saveSystemSettings();
        });
    }
    
    if (resetSettings) {
        resetSettings.addEventListener("click", function() {
            resetSystemSettings();
        });
    }
}

// Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem("settings") || "{}");

    if (settings.companyName) {
        document.getElementById("companyName").value = settings.companyName;
    }

    if (settings.currency) {
        document.getElementById("currency").value = settings.currency;
    }

    if (settings.dateFormat) {
        document.getElementById("dateFormat").value = settings.dateFormat;
    }

    if (settings.lowStockThreshold) {
        document.getElementById("lowStockThreshold").value = settings.lowStockThreshold;
    }

    if (settings.emailNotifications !== undefined) {
        document.getElementById("emailNotifications").checked = settings.emailNotifications;
    }

    if (settings.autoBackup !== undefined) {
        document.getElementById("autoBackup").checked = settings.autoBackup;
    }

    if (settings.backupFrequency) {
        document.getElementById("backupFrequency").value = settings.backupFrequency;
    }
}

// Save System Settings
function saveSystemSettings() {
    const settings = {
        companyName: document.getElementById("companyName").value,
        currency: document.getElementById("currency").value,
        dateFormat: document.getElementById("dateFormat").value,
        lowStockThreshold: parseInt(document.getElementById("lowStockThreshold").value),
        emailNotifications: document.getElementById("emailNotifications").checked,
        autoBackup: document.getElementById("autoBackup").checked,
        backupFrequency: document.getElementById("backupFrequency").value,
    };

    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
}

// Reset System Settings
function resetSystemSettings() {
    if (confirm("Are you sure you want to reset all settings to default values?")) {
        localStorage.removeItem("settings");
        document.getElementById("companyName").value = "College StockFlow";
        document.getElementById("currency").value = "KES (KSh)";
        document.getElementById("dateFormat").value = "MM/DD/YYYY";
        document.getElementById("lowStockThreshold").value = "5";
        document.getElementById("emailNotifications").checked = true;
        document.getElementById("autoBackup").checked = true;
        document.getElementById("backupFrequency").value = "Daily";

        alert("Settings have been reset to default values.");
    }
}

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', function() {
    initSettings();
});