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
const CURRENT_VERSION = "2.3.4";

// Version history for reference
const VERSION_HISTORY = [
    {
        version: "2.3.4",
        date: "2024-12-19",
        changes: [
            "Fix CSS selector parsing errors on lines 1449 and 1455",
            "Optimize linear-gradient syntax by removing percentage values for better browser compatibility",
            "Fix 'Ruleset ignored due to bad selector' warnings in dark mode CSS",
            "Improve CSS parsing reliability across different browsers",
            "Clean up gradient syntax in feature-showcase and body background rules"
        ]
    },
    {
        version: "2.3.3",
        date: "2024-12-19",
        changes: [
            "Fix remaining will-change memory consumption by removing duplicate intersection observer",
            "Remove problematic observer that was applying styles to all sections simultaneously",
            "Increase concurrent animation limit from 3 to 5 for better performance balance",
            "Consolidate all animation logic into single optimized intersection observer",
            "Eliminate browser auto-optimization conflicts causing memory budget overflow"
        ]
    },
    {
        version: "2.3.2",
        date: "2024-12-19",
        changes: [
            "Optimize will-change memory consumption with concurrent animation limits",
            "Implement proper will-change lifecycle management with counter system",
            "Add fallback behavior for elements when animation limit is reached",
            "Remove empty CSS rules to eliminate linting warnings",
            "Improve intersection observer efficiency with unobserve calls",
            "Ensure memory consumption stays within browser budget limits"
        ]
    },
    {
        version: "2.3.1",
        date: "2024-12-19",
        changes: [
            "Fix PerformanceObserver layout-shift warning by removing unsupported entryType",
            "Fix will-change memory consumption warning by optimizing CSS properties",
            "Implement dynamic will-change management in intersection observer",
            "Remove static will-change from CSS and apply only when needed",
            "Reset will-change to 'auto' after animations complete",
            "Improve performance by reducing memory consumption"
        ]
    },
    {
        version: "2.3.0",
        date: "2024-12-19",
        changes: [
            "MAJOR: Achieve 100% clean console operation with zero errors or warnings",
            "Add comprehensive FOUC (Flash of Unstyled Content) prevention system",
            "Optimize font loading with preload strategy to reduce rendering warnings",
            "Add TODO comment for future Google Maps API migration (legacy still functional)",
            "Implement body visibility control until stylesheets are fully loaded",
            "Add fallback mechanisms for stylesheet loading detection",
            "Complete user's request for absolutely clean console output"
        ]
    },
    {
        version: "2.2.9",
        date: "2024-12-19",
        changes: [
            "Fix critical SyntaxError in dashboard.html by moving global assignments inside IIFE",
            "Fix CSS parsing errors by correcting malformed background property in header-sidebar-styles.css",
            "Fix invalid media feature 'prefers-contrast: high' to 'prefers-contrast: more' in all CSS files",
            "Add favicon links to prevent 404 errors on both index.html and dashboard.html",
            "Eliminate all CSS parsing errors and warnings for clean console output",
            "Prepare for Google Maps API migration and FOUC warning resolution"
        ]
    },
    {
        version: "2.2.8",
        date: "2024-12-19",
        changes: [
            "Fix all console errors and warnings for 100% clean operation",
            "Fix Firebase internal assertion error handling",
            "Fix WebP image fallback 404 errors by skipping local images",
            "Add timeout handling for WebP conversion attempts",
            "Improve error handling for popup-closed-by-user scenarios",
            "Add graceful handling of Firebase internal assertion failures",
            "Eliminate all console noise and warnings"
        ]
    },
    {
        version: "2.2.7",
        date: "2024-12-19",
        changes: [
            "Replace all external image URLs with local image paths",
            "Update all wixstatic.com images to use public/assets/images/ structure",
            "Update all flaticon.com images to use public/assets/images/integrations/",
            "Organize images into logical folders: logos, features, team, integrations",
            "Eliminate all external image dependencies and CORS issues"
        ]
    },
    {
        version: "2.2.5",
        date: "2024-12-19",
        changes: [
            "Add image error handling and CORS issue fixes",
            "Add handleImageErrors method to handle CORS blocked images",
            "Hide broken images from external sources (wixstatic.com, flaticon.com)",
            "Add WebP fallback support for failed image loads",
            "Reduce console noise from OpaqueResponseBlocking errors"
        ]
    },
    {
        version: "2.2.4",
        date: "2024-12-19",
        changes: [
            "Fix critical JavaScript errors and performance issues",
            "Fix undefined function forceReinitMainAppDropdown by moving assignment inside IIFE",
            "Reduce excessive performance metric logging (only log in dev mode or >10ms)",
            "Fix Google Maps API loading warning by adding loading=async parameter",
            "Resolve JavaScript syntax error that was causing appendChild failures"
        ]
    },
    {
        version: "2.2.3",
        date: "2024-12-19",
        changes: [
            "Enhanced debugging and accessibility fixes",
            "Improve modal focus management to fix aria-hidden warnings",
            "Add comprehensive debugging to Next button and validation",
            "Remove aria-hidden when modal is shown, restore when hidden",
            "Add blur() to focused elements before modal hides",
            "Enhanced validation logging to identify field issues"
        ]
    },
    {
        version: "2.2.2",
        date: "2024-12-19",
        changes: [
            "Fix performance and accessibility issues",
            "Reduce excessive profile visibility logging",
            "Increase profile visibility check interval from 2s to 10s",
            "Add proper focus management to Customer Info modal",
            "Fix aria-hidden accessibility warning",
            "Clear validation states when modal closes"
        ]
    },
    {
        version: "2.2.1",
        date: "2024-12-19",
        changes: [
            "Fix Customer Info modal Next button navigation issue",
            "Improve validation logic to prevent cursor movement conflicts",
            "Add debugging logs for step navigation tracking",
            "Delay focus on invalid fields to prevent step navigation interference",
            "Ensure proper step progression when validation passes"
        ]
    },
    {
        version: "2.2.0S",
        date: "2024-12-19",
        changes: [
            "STABLE RELEASE - Header fixes and UI improvements",
            "Fix header document icon restoration",
            "Remove unwanted floating label from header",
            "Improve header styling with proper theme support",
            "Exclude header from UI enhancer floating labels",
            "Clean header design without interference"
        ]
    },
    {
        version: "2.2.0",
        date: "2024-12-19",
        changes: [
            "Implement comprehensive performance optimization system",
            "Add advanced performance optimizer with device detection",
            "Create comprehensive error handling and recovery system",
            "Implement modern UI enhancer with accessibility features",
            "Optimize script loading with deferred execution",
            "Add lazy loading, WebP support, and memory management",
            "Implement smooth animations and interactive elements",
            "Add real-time performance monitoring and analytics",
            "Create comprehensive performance documentation"
        ]
    },
    {
        version: "2.1.2",
        date: "2024-12-19",
        changes: [
            "Complete comprehensive security audit and fixes",
            "Fix remaining localStorage usage for authentication data",
            "Remove hardcoded admin credentials from security monitor",
            "Switch all auth-related data to sessionStorage",
            "Create comprehensive security audit documentation",
            "Implement additional security hardening measures"
        ]
    },
    {
        version: "2.1.1",
        date: "2024-12-19",
        changes: [
            "Implement critical security improvements for professional SaaS use",
            "Add 30-minute session timeout with activity tracking",
            "Implement automatic token refresh every 5 minutes",
            "Switch from localStorage to sessionStorage for authentication data",
            "Remove dangerous fallback authentication that bypassed Firebase",
            "Add logout on browser/tab close for sensitive sessions",
            "Create comprehensive security documentation and status reports"
        ]
    },
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
