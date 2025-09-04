/* ==================================================
   📋 VERSION MANAGER - PROPOKIT APPLICATION
   ==================================================
   
   This file manages version numbers and displays them in the UI.
   Each update should increment the version number.
   
   VERSION FORMAT: X.Y.Z
   - X = Major version (breaking changes)
   - Y = Minor version (new features)
   - Z = Patch version (bug fixes)
   ================================================== */

// Current version - UPDATE THIS WITH EACH COMMIT
const CURRENT_VERSION = "1.1.0";

// Version history for reference
const VERSION_HISTORY = [
    {
        version: "1.1.0",
        date: "2024-01-01",
        changes: [
            "Add version management system",
            "Add version display in bottom left corner",
            "Create version tracking and history",
            "Add version rules and commit guidelines"
        ]
    },
    {
        version: "1.0.0",
        date: "2024-01-01",
        changes: [
            "Initial release",
            "Header dark mode support",
            "Sidebar text readability improvements"
        ]
    }
];

class VersionManager {
    constructor() {
        this.currentVersion = CURRENT_VERSION;
        this.init();
    }

    init() {
        this.createVersionDisplay();
        this.updateVersionDisplay();
        this.addVersionToConsole();
    }

    createVersionDisplay() {
        // Create version display element
        const versionDisplay = document.createElement('div');
        versionDisplay.id = 'version-display';
        versionDisplay.className = 'version-display';
        versionDisplay.innerHTML = `
            <div class="version-content">
                <span class="version-label">v</span>
                <span class="version-number">${this.currentVersion}</span>
            </div>
        `;

        // Add to body
        document.body.appendChild(versionDisplay);
    }

    updateVersionDisplay() {
        const versionNumber = document.querySelector('.version-number');
        if (versionNumber) {
            versionNumber.textContent = this.currentVersion;
        }
    }

    addVersionToConsole() {
        console.log(`%c🚀 PropoKit v${this.currentVersion}`, 'color: #ffc300; font-size: 16px; font-weight: bold;');
        console.log(`%c📅 Build Date: ${new Date().toLocaleDateString()}`, 'color: #666; font-size: 12px;');
    }

    // Method to get current version (useful for other parts of the app)
    getCurrentVersion() {
        return this.currentVersion;
    }

    // Method to get version history
    getVersionHistory() {
        return VERSION_HISTORY;
    }

    // Method to check if version needs update
    checkForUpdates() {
        // This could be expanded to check against a remote version
        return false;
    }
}

// Initialize version manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.versionManager = new VersionManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VersionManager;
}
