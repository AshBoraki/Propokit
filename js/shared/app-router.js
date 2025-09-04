// ====================================================================================
// PropoKit Application Core Controller - app-router.js
// ====================================================================================
//
// PURPOSE:
// This script acts as the central "brain" for the PropoKit single-page application.
// It is responsible for handling page navigation without full reloads, managing
// global UI elements, and initializing the application state.
//
// WHAT'S INSIDE:
//
// 1.  PAGE ROUTING & LOADING:
//     - Listens for clicks on the main sidebar navigation links.
//     - Dynamically loads the corresponding HTML content and initializes the
//       necessary JavaScript for that page.
//     - Uses the 'pageTemplates' object (defined in the main HTML file) to find
//       the correct content and initialization function for each page.
//     - Manages the visual "active" state indicator on the sidebar.
//
// 2.  GLOBAL UI MANAGEMENT:
//     - USER PROFILE DROPDOWN: Controls the open/close behavior of the user
//       profile menu in the header.
//     - THEME SWITCHER: Manages the light/dark mode theme for the entire
//       application. It applies styles to the body and header, and saves the
//       user's preference in localStorage.
//     - ZOOM CONTROLS: Handles the zoom in/out functionality for the main
//       content area and persists the user's selected zoom level.
//
// 3.  APPLICATION INITIALIZATION:
//     - Determines the initial page to be loaded when the application starts.
//     - Applies any saved user preferences (like theme and zoom) on load.
//
// DEPENDENCIES:
// - This script assumes that a global variable `pageTemplates` has already been
//   defined in the scope before it runs.
//
// ====================================================================================


// =================================================================
// === APPLICATION ROUTER & INITIALIZATION
// =================================================================
const pageContentEl = document.getElementById('page-content');
const sidebarLinks = document.querySelectorAll('#main-sidebar a.nav-link');

// Enhanced Menu Functionality
let currentSearchQuery = '';
let filteredSections = new Set();
const activeIndicator = document.getElementById('active-nav-indicator');

// Note: loadPage and setActiveLink functions are now handled by the main application
// This prevents conflicts between the two implementations

// =================================================================
// === SHARED/GLOBAL UI LOGIC
// =================================================================

// --- User Profile Dropdown ---
// Note: User profile dropdown is now handled by the main application
// This prevents conflicts between the two implementations

// --- Theme Switcher ---
const themeToggle = document.getElementById('theme-toggle-checkbox');
if (themeToggle) {
    const body = document.body;
    const header = document.getElementById('top-application-header');
    const logo = document.getElementById('propokit-icon-logo');

    if (!header || !logo) {
        console.error("Theme script could not find the header or logo element.");
    } else {
        const applyTheme = (theme) => {
            // Set data-theme attribute on both html and body elements
            document.documentElement.setAttribute('data-theme', theme);
            document.body.setAttribute('data-theme', theme);
            
            if (theme === 'light') {
                themeToggle.checked = true;
            } else { // 'dark'
                themeToggle.checked = false;
            }
            
            // Dispatch custom event for theme change
            const themeEvent = new CustomEvent('themeChanged', { detail: { theme } });
            document.dispatchEvent(themeEvent);
        };

        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'light' : 'dark';
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        });

        // Apply saved theme on initial load
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
    }
}

// Note: Zoom functionality is now handled by the main application
// This prevents conflicts between the two implementations

// Note: Application startup is now handled by the main application
// This prevents conflicts between the two implementations

// =================================================================
// === ENHANCED MENU FUNCTIONALITY
// =================================================================

// Initialize enhanced menu features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEnhancedMenu();
});

function initializeEnhancedMenu() {
    // Initialize collapsible sections
    initializeCollapsibleSections();
    
    // Initialize search functionality
    initializeSearchFunctionality();
    
    // Initialize section status indicators
    initializeStatusIndicators();
    
    // Initialize progress tracking
    updateProgressBar();
}

// Collapsible Sections
function initializeCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.nav-section-header.collapsible');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sectionGroup = header.closest('.nav-section-group');
            const isExpanded = sectionGroup.classList.contains('expanded');
            
            if (isExpanded) {
                sectionGroup.classList.remove('expanded');
            } else {
                sectionGroup.classList.add('expanded');
            }
        });
    });
    
    // Expand first section by default
    const firstSection = document.querySelector('.nav-section-group');
    if (firstSection) {
        firstSection.classList.add('expanded');
    }
}

// Search Functionality
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('sidebarSearch');
    const searchClearBtn = document.getElementById('searchClearBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase();
            performSearch();
        });
    }
    
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            clearSearch();
        });
    }
}

function performSearch() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionGroups = document.querySelectorAll('.nav-section-group');
    
    if (currentSearchQuery === '') {
        // Show all sections and links
        sectionGroups.forEach(group => {
            group.style.display = 'block';
            const links = group.querySelectorAll('.nav-link');
            links.forEach(link => link.style.display = 'flex');
        });
        return;
    }
    
    // Filter links and sections
    sectionGroups.forEach(group => {
        const links = group.querySelectorAll('.nav-link');
        let hasVisibleLinks = false;
        
        links.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            const isVisible = linkText.includes(currentSearchQuery);
            link.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) hasVisibleLinks = true;
        });
        
        // Show/hide section based on whether it has visible links
        group.style.display = hasVisibleLinks ? 'block' : 'none';
    });
}

function clearSearch() {
    const searchInput = document.getElementById('sidebarSearch');
    if (searchInput) {
        searchInput.value = '';
        currentSearchQuery = '';
        performSearch();
    }
}

// Status Indicators
function initializeStatusIndicators() {
    // This would typically be populated from your application state
    // For now, we'll set some example statuses
    const statusMap = {
        'cover-page': 'completed',
        'company-intro': 'in-progress',
        'products-services': 'pending',
        'scope-of-work': 'pending',
        'objectives': 'pending',
        'pricing-summary': 'pending',
        'terms-and-conditions': 'pending'
    };
    
    Object.entries(statusMap).forEach(([page, status]) => {
        const link = document.querySelector(`[data-page="${page}"]`);
        if (link) {
            const statusIndicator = link.querySelector('.nav-link-status');
            if (statusIndicator) {
                statusIndicator.className = `nav-link-status ${status}`;
            }
        }
    });
}

// Progress Tracking
function updateProgressBar() {
    const completedSections = document.querySelectorAll('.nav-link-status.completed').length;
    const totalSections = document.querySelectorAll('.nav-link-status').length;
    const progressPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
    
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
    }
}

// Enhanced Zoom Controls
function initializeEnhancedZoomControls() {
    const zoomResetBtn = document.getElementById('zoom-reset-btn');
    
    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', () => {
            // Reset zoom to 100%
            if (typeof resetZoom === 'function') {
                resetZoom();
            }
        });
    }
}