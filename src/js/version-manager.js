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
const CURRENT_VERSION = "2.1.0";

// Version history for reference
const VERSION_HISTORY = [
    {
        version: "2.1.0",
        date: "2024-12-19",
        changes: [
            "Add professional security monitoring system",
            "Create security/monitor.html with glassmorphism design",
            "Implement website monitoring with uptime and performance tracking",
            "Add library management with version checking and copy functionality",
            "Include real-time system logs and status monitoring",
            "Provide copy-to-clipboard functionality for library update information"
        ]
    },
    {
        version: "2.0.0",
        date: "2024-12-19",
        changes: [
            "Complete project restructuring to standard web app format",
            "Reorganize files into src/, public/, docs/, and scripts/ directories",
            "Update all file references and links to new structure",
            "Establish professional SaaS project organization",
            "Improve maintainability and scalability of codebase"
        ]
    },
    {
        version: "1.2.1",
        date: "2024-12-19",
        changes: [
            "Fix dashboard navigation link in dropdown menu",
            "Remove external redirect to propokit.com/dashboard",
            "Ensure consistent navigation within the application"
        ]
    },
    {
        version: "1.2.0",
        date: "2024-12-19",
        changes: [
            "Improve file naming conventions across the project",
            "Rename index-product.html to dashboard.html for clarity",
            "Rename modal files to use consistent lowercase naming",
            "Fix typo in header-sidebar-styles.css filename",
            "Update all internal links to reflect new file names",
            "Establish consistent naming conventions for future development"
        ]
    },
    {
        version: "1.1.1",
        date: "2024-12-19",
        changes: [
            "Fix QR code placeholder issue for new users",
            "Hide empty QR code containers until user generates first QR code",
            "Improve new user experience by removing sample placeholders",
            "Update initialization logic to prevent showing empty QR codes"
        ]
    },
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
        console.log('📋 Creating version display in sidebar...');
        
        // Find the sidebar
        const sidebar = document.getElementById('main-sidebar');
        if (!sidebar) {
            console.error('❌ Sidebar not found');
            return;
        }

        // Create version display element
        const versionDisplay = document.createElement('div');
        versionDisplay.id = 'sidebar-version-display';
        versionDisplay.className = 'sidebar-version-display';
        versionDisplay.innerHTML = `
            <div class="version-content">
                <span class="version-label">v</span>
                <span class="version-number">${this.currentVersion}</span>
            </div>
        `;

        // Add to sidebar at the bottom
        sidebar.appendChild(versionDisplay);
        console.log('✅ Version display added to sidebar');
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
