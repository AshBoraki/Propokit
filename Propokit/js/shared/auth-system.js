// ==================================================
// 🔐 PROPOKIT SHARED AUTHENTICATION SYSTEM
// ==================================================
//
// PURPOSE: Centralized authentication system for both marketing page and main app
// This file provides consistent login/logout functionality across all pages
//
// USAGE:
// - Include this file in both index.html (marketing) and index-product.html (main app)
// - Call initializeAuthSystem() to set up authentication
// - All authentication functions are available globally
//
// ==================================================

// Global variables
let currentUser = null;
let userSubscriptionStatus = 'free';
let isProductionMode = true; // Set to true for production

// DOM elements
let loginBtn = null;
let logoutBtn = null;
let userProfile = null;
let userAvatar = null;
let userName = null;
let userStatus = null;

/**
 * 🔐 Initialize the authentication system
 * Sets up all authentication functionality for the current page
 */
function initializeAuthSystem() {
    console.log('🔐 Initializing Propokit Authentication System...');

    // Get DOM elements
    loginBtn = document.getElementById('login-btn');
    logoutBtn = document.getElementById('logout-btn');
    userProfile = document.getElementById('user-profile');
    userAvatar = document.getElementById('user-avatar');
    userName = document.getElementById('user-name');
    userStatus = document.getElementById('user-status');

    // Check if Firebase is available
    if (typeof firebase === 'undefined' || !firebase.auth) {
        console.error('❌ Firebase Auth not available');
        showNotification('❌ Authentication system not available. Please refresh the page.', 'error', 5000);
        return;
    }

    // Set persistence to LOCAL to maintain session across browser sessions
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            console.log('🔒 Firebase persistence set to LOCAL');
        })
        .catch((error) => {
            console.error('❌ Failed to set persistence:', error);
        });

    // Listen for authentication state changes
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('✅ User signed in:', user.email);
            handleUserSignIn(user);
        } else {
            console.log('❌ User signed out');
            handleUserSignOut();
        }
    });
    
    // Handle redirect result for Google sign-in
    firebase.auth().getRedirectResult().then((result) => {
        if (result.user) {
            console.log('✅ Redirect sign-in successful:', result.user.email);
            handleUserSignIn(result.user);
            showNotification('🎉 Successfully signed in with Google!', 'success', 3000);
            showAuthStatusIndicator('firebase-mode', 'Firebase Mode');
        } else if (result.credential) {
            console.log('✅ Redirect completed but no user (might be sign-out)');
        }
    }).catch((error) => {
        if (error.code !== 'auth/no-redirect-result') {
            console.error('❌ Redirect sign-in failed:', error);
            showNotification('❌ Sign-in failed. Please try again.', 'error', 3000);
        }
    });

    // Setup login button
    if (loginBtn) {
        console.log('🔗 Setting up login button');
        loginBtn.addEventListener('click', (e) => {
            console.log('🖱️ Login button clicked');
            e.preventDefault();
            e.stopPropagation();
            signInWithGoogle();
        });

        // Add backup onclick
        loginBtn.onclick = function(e) {
            console.log('🔥 DIRECT ONCLICK: Login button clicked!');
            e.preventDefault();
            e.stopPropagation();
            signInWithGoogle();
        };
    } else {
        console.warn('⚠️ Login button not found');
    }

    // Setup logout button (only if present, mainly on marketing page)
    if (logoutBtn) {
        console.log('🔗 Setting up logout button');
        logoutBtn.addEventListener('click', (e) => {
            console.log('🖱️ Logout button clicked');
            e.preventDefault();
            signOut();
        });
    }

    // Setup pricing buttons (for marketing page)
    setupPricingButtons();

    // Setup dropdown toggles
    setupDropdownToggles();

    // Initialize main app user menu if on main app
    initializeMainAppUserMenu();

    console.log('✅ Authentication system initialized');
}

/**
 * 🎛️ Initialize main app user menu
 * Sets up the user menu in the main application
 */
function initializeMainAppUserMenu() {
    // Only run on main app
    if (window.location.pathname.includes('Propokit')) {
        console.log('🎛️ Initializing main app user menu...');
        
        // Check if user is already signed in
        const storedUID = localStorage.getItem('firebaseUID');
        if (storedUID && currentUser) {
            console.log('👤 User already signed in, updating main app UI...');
            handleUserSignIn(currentUser);
        } else if (storedUID && !isProductionMode) {
            console.log('👤 Found stored UID, setting up test user...');
            // Create a test user object for the stored UID
            const testUser = {
                uid: storedUID,
                email: 'alex.hormozi@test.com',
                displayName: 'Alex Hormozi',
                photoURL: 'https://static.wixstatic.com/shapes/a1b7fb_6605f9bff7e2408ba18fae25075bfa8c.svg'
            };
            handleUserSignIn(testUser);
        }
    }
}

/**
 * 🔐 Sign in with Google
 * Handles the Google authentication process
 */
async function signInWithGoogle() {
    try {
        console.log('🔐 Starting Google sign-in...');

        // Show loading state
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Signing in...
            `;
            loginBtn.style.opacity = '0.7';
        }

        // Check if Firebase is available and properly configured
        if (typeof firebase === 'undefined' || !firebase.auth) {
            console.error('❌ Firebase Auth not available');
            throw new Error('Firebase Auth not loaded');
        }

        // Create provider
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');

        // Set the client ID for better compatibility
        if (typeof firebaseConfig !== 'undefined' && firebaseConfig.clientId) {
            provider.setCustomParameters({
                client_id: firebaseConfig.clientId
            });
        }

        // Use redirect method for better compatibility
        try {
            console.log('🔄 Redirecting to Google sign-in...');
            
            // Check if we're already on the login page
            if (window.location.pathname.includes('login.html')) {
                console.log('✅ Already on login page, proceeding with Google sign-in...');
                
                // Use redirect method for login page
                await firebase.auth().signInWithRedirect(provider);
                console.log('✅ Google sign-in redirect initiated');
                
            } else {
                // Redirect to login page
                window.location.href = 'Propokit/login.html';
                return;
            }

        } catch (redirectError) {
            console.error('❌ Google sign-in redirect failed:', redirectError);
            
            // Only fall back to local test if we're in development mode
            if (!isProductionMode) {
                console.warn('🔄 Falling back to local test authentication...');
                await signInWithLocalTest();
                return;
            } else {
                // In production, show error and don't fall back
                throw redirectError;
            }
        }

        // Redirect to main app if on marketing page
        if (window.location.pathname.includes('index.html') && !window.location.pathname.includes('Propokit')) {
            setTimeout(() => {
                window.location.href = 'Propokit/index-product.html';
            }, 2000);
        }

    } catch (error) {
        console.error('❌ Authentication failed:', error);

        // Reset button state
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10,17 15,12 10,7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Log in
            `;
            loginBtn.style.opacity = '1';
        }

        let errorMessage = 'Sign-in failed. Please try again.';
        
        if (error.message.includes('Firebase Auth not loaded')) {
            errorMessage = 'Authentication system is loading. Please wait a moment and try again.';
        } else if (error.message.includes('403') || error.message.includes('API_KEY_SERVICE_BLOCKED')) {
            errorMessage = 'Authentication service temporarily unavailable. Please check your Firebase configuration.';
        } else if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign-in was cancelled. Please try again.';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Pop-up was blocked. Please allow pop-ups and try again.';
        }
        
        showNotification(`❌ ${errorMessage}`, 'error', 5000);
    }
}

/**
 * 🔐 Sign in with local test system (only for development)
 * Uses the local Firebase test system for authentication
 */
async function signInWithLocalTest() {
    if (isProductionMode) {
        console.error('❌ Local test mode not available in production');
        return;
    }
    
    console.log('🧪 Using local test authentication...');
    
    // Show a notification about the fallback
    showNotification('🔄 Using local authentication mode', 'info', 2000);
    
    // Show local mode status indicator
    showAuthStatusIndicator('local-mode', 'Local Mode');
    
    // Check if local Firebase test system is available
    if (window.localFirebaseTest) {
        console.log('✅ Local Firebase test system found');
        
        // Create a mock user object
        const mockUser = {
            uid: window.localFirebaseTest.testUID || 'test-user-123',
            email: 'alex.hormozi@test.com',
            displayName: 'Alex Hormozi',
            photoURL: 'https://static.wixstatic.com/shapes/a1b7fb_6605f9bff7e2408ba18fae25075bfa8c.svg'
        };
        
        // Handle the sign in
        handleUserSignIn(mockUser);
        showNotification('🧪 Signed in with test account! All features available.', 'success', 4000);
        
    } else {
        // Create a simple test user
        const testUser = {
            uid: 'test-user-' + Date.now(),
            email: 'alex.hormozi@test.com',
            displayName: 'Alex Hormozi',
            photoURL: 'https://static.wixstatic.com/shapes/a1b7fb_6605f9bff7e2408ba18fae25075bfa8c.svg'
        };
        
        // Store test UID
        localStorage.setItem('firebaseUID', testUser.uid);
        window.currentFirebaseUID = testUser.uid;
        
        // Handle the sign in
        handleUserSignIn(testUser);
        showNotification('🧪 Signed in with test account! All features available.', 'success', 4000);
    }
    
    // Show additional info about the fallback
    setTimeout(() => {
        console.log('💡 Local authentication mode active - all app features will work normally');
        console.log('💡 To fix Firebase authentication, check your Firebase Console settings');
    }, 1000);
}

/**
 * 🔍 Show authentication status indicator
 * Displays the current authentication mode in the header
 */
function showAuthStatusIndicator(mode, text) {
    const indicator = document.getElementById('auth-status-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
        indicator.className = `auth-status-indicator ${mode}`;
        
        const icon = indicator.querySelector('i');
        const textSpan = indicator.querySelector('.auth-status-text');
        
        if (mode === 'firebase-mode') {
            icon.className = 'fas fa-fire';
            textSpan.textContent = text || 'Firebase Mode';
        } else if (mode === 'local-mode') {
            icon.className = 'fas fa-shield-alt';
            textSpan.textContent = text || 'Local Mode';
        } else if (mode === 'error-mode') {
            icon.className = 'fas fa-exclamation-triangle';
            textSpan.textContent = text || 'Auth Error';
        }
    }
}

/**

/**
 * 🔐 Sign out
 * Handles the sign out process
 */
async function signOut() {
    try {
        console.log('🔐 Signing out...');
        if (typeof firebase !== 'undefined' && firebase.auth) {
            await firebase.auth().signOut();
        }
        showNotification('👋 Successfully signed out', 'info', 3000);

        // Redirect to marketing page if on main app
        if (window.location.pathname.includes('Propokit')) {
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }
    } catch (error) {
        console.error('❌ Sign-out failed:', error);
        showNotification('❌ Sign-out failed. Please try again.', 'error', 3000);
    }
}

/**
 * 👤 Handle user sign in
 * Updates UI and stores user data
 */
function handleUserSignIn(user) {
    console.log('👤 Handling user sign in:', user.email);
    currentUser = user;

    // Update UI elements based on page type
    const isMarketing = !window.location.pathname.includes('Propokit');
    
    if (isMarketing) {
        // Marketing page UI updates
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'flex';
        // Render avatar: prefer user photo, fallback to initials
        renderMarketingAvatar(user);
        if (userName) userName.textContent = user.displayName || user.email.split('@')[0];
    } else {
        // Main app UI updates
        const profileUserName = document.getElementById('profile-user-name');
        const profileUserEmail = document.getElementById('profile-user-email');
        const userAvatarTrigger = document.getElementById('user-avatar-trigger');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (profileUserName) profileUserName.textContent = user.displayName || 'Alex Hormozi';
        if (profileUserEmail) profileUserEmail.textContent = user.email || 'alex.hormozi@test.com';
        if (userAvatarTrigger) {
            if (user.photoURL) {
                userAvatarTrigger.innerHTML = `<img src="${user.photoURL}" alt="User Avatar" style="width: 32px; height: 32px; border-radius: 50%;">`;
            } else {
                const initials = getUserInitials(user.displayName || user.email);
                userAvatarTrigger.innerHTML = `<div style="width: 32px; height: 32px; border-radius: 50%; background:#333; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:12px;">${initials}</div>`;
            }
        }
        
        // Make sure logout button is visible and clickable
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.style.visibility = 'visible';
            logoutBtn.style.opacity = '1';
            logoutBtn.style.pointerEvents = 'auto';
            console.log('🔍 Logout button should now be visible');
            
            // Don't force the dropdown to be open - let user click to open it
            // const userMenu = document.getElementById('user-profile-menu');
            // if (userMenu) {
            //     userMenu.classList.add('open');
            //     console.log('🔍 User menu forced open');
            //     
            //     // Also make sure the dropdown content is visible
            //     const dropdown = userMenu.querySelector('.profile-dropdown');
            //     if (dropdown) {
            //         dropdown.style.opacity = '1';
            //         dropdown.style.visibility = 'visible';
            //         dropdown.style.transform = 'translateY(0)';
            //         console.log('🔍 Dropdown content forced visible');
            //     }
            // }
        } else {
            console.warn('⚠️ Logout button not found in main app');
        }
    }

    // Update subscription status
    updateUserStatus('free');

    // Store user UID in localStorage
    localStorage.setItem('firebaseUID', user.uid);
    window.currentFirebaseUID = user.uid;

    // Trigger existing Firebase data initialization
    if (window.reinitializeFirebaseRefs) {
        window.reinitializeFirebaseRefs(user.uid);
    }
}

/**
 * 👤 Handle user sign out
 * Resets UI and clears user data
 */
function handleUserSignOut() {
    console.log('👤 Handling user sign out');
    currentUser = null;

    // Update UI elements based on page type
    const isMarketing = !window.location.pathname.includes('Propokit');
    
    if (isMarketing) {
        // Marketing page UI updates
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
            logoutBtn.style.visibility = 'hidden';
        }
        if (userProfile) userProfile.style.display = 'none';
        // Reset marketing avatar elements
        const initialsEl = document.getElementById('user-avatar-initials');
        if (initialsEl && initialsEl.parentElement) initialsEl.parentElement.removeChild(initialsEl);
        if (userAvatar) {
            userAvatar.src = '';
            userAvatar.style.display = '';
        }
    } else {
        // Main app UI updates
        const profileUserName = document.getElementById('profile-user-name');
        const profileUserEmail = document.getElementById('profile-user-email');
        const userAvatarTrigger = document.getElementById('user-avatar-trigger');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (profileUserName) profileUserName.textContent = 'Guest User';
        if (profileUserEmail) profileUserEmail.textContent = 'Not logged in';
        if (userAvatarTrigger) {
            userAvatarTrigger.innerHTML = `<span>GU</span><div class="user-status-indicator online"></div>`;
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
            logoutBtn.style.visibility = 'hidden';
        }
    }
    
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    if (userDropdownMenu) userDropdownMenu.classList.remove('show');

    // Clear stored data
    localStorage.removeItem('firebaseUID');
    window.currentFirebaseUID = null;

    // Trigger existing Firebase data cleanup
    if (window.reinitializeFirebaseRefs) {
        window.reinitializeFirebaseRefs('');
    }
}

// =============================
// Avatar helpers
// =============================

function getUserInitials(nameOrEmail) {
    if (!nameOrEmail) return 'U';
    const base = String(nameOrEmail).trim();
    if (base.includes(' ')) {
        const parts = base.split(/\s+/).filter(Boolean);
        const first = parts[0]?.[0] || '';
        const last = parts[parts.length - 1]?.[0] || '';
        return (first + last).toUpperCase();
    }
    // From email
    const beforeAt = base.split('@')[0];
    const first = beforeAt[0] || 'U';
    return first.toUpperCase();
}

function renderMarketingAvatar(user) {
    try {
        if (!userProfile) return;
        const existingInitials = document.getElementById('user-avatar-initials');
        if (user && user.photoURL) {
            // Show image, hide initials if any
            if (userAvatar) {
                userAvatar.src = user.photoURL;
                userAvatar.style.display = '';
            }
            if (existingInitials) existingInitials.style.display = 'none';
        } else {
            // Hide image, show initials badge
            if (userAvatar) userAvatar.style.display = 'none';
            const initialsText = getUserInitials(user?.displayName || user?.email);
            if (existingInitials) {
                existingInitials.textContent = initialsText;
                existingInitials.style.display = 'inline-flex';
            } else {
                const badge = document.createElement('span');
                badge.id = 'user-avatar-initials';
                badge.textContent = initialsText;
                badge.style.cssText = 'width:24px;height:24px;border-radius:50%;background:#333;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;margin-right:8px;';
                userProfile.insertBefore(badge, userProfile.firstChild);
            }
        }
    } catch (e) {
        console.warn('Avatar render failed:', e);
    }
}

/**
 * 📊 Update user subscription status
 * Updates the UI to show the user's plan
 */
function updateUserStatus(status) {
    userSubscriptionStatus = status;

    if (userStatus) {
        switch (status) {
            case 'free':
                userStatus.textContent = 'Free Plan';
                userStatus.className = 'user-status';
                break;
            case 'pro':
                userStatus.textContent = 'Pro Plan';
                userStatus.className = 'user-status pro';
                break;
            case 'enterprise':
                userStatus.textContent = 'Enterprise';
                userStatus.className = 'user-status pro';
                break;
        }
    }
}

/**
 * 💳 Setup pricing buttons
 * Makes pricing buttons trigger authentication
 */
function setupPricingButtons() {
    const pricingButtons = document.querySelectorAll('.btn[href="#"], .pricing-card .btn');
    pricingButtons.forEach(button => {
        if (button.textContent.includes('Start Your Free Trial') ||
            button.textContent.includes('Start') ||
            button.textContent.includes('Get Started')) {
            button.addEventListener('click', handlePricingButtonClick);
        }
    });
}

/**
 * 💳 Handle pricing button clicks
 * Triggers authentication when pricing buttons are clicked
 */
function handlePricingButtonClick(e) {
    e.preventDefault();
    console.log('💳 Pricing button clicked - starting authentication...');
    signInWithGoogle();
}

/**
 * 🎛️ Setup dropdown toggles
 * Makes dropdown menus clickable and functional
 */
function setupDropdownToggles() {
    // Marketing page dropdown toggle
    const marketingDropdownToggle = document.getElementById('user-dropdown-toggle');
    const marketingDropdownMenu = document.getElementById('user-dropdown-menu');
    
    if (marketingDropdownToggle && marketingDropdownMenu) {
        console.log('🎛️ Setting up marketing page dropdown toggle');
        marketingDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            marketingDropdownMenu.classList.toggle('show');
        });
    }
    
    // Main app dropdown toggle - only set up if we're on the main app
    if (window.location.pathname.includes('Propokit')) {
        const mainAppUserMenu = document.getElementById('user-profile-menu');
        const mainAppUserAvatarTrigger = document.getElementById('user-avatar-trigger');
        
        if (mainAppUserAvatarTrigger && mainAppUserMenu) {
            console.log('🎛️ Setting up main app dropdown toggle');
            mainAppUserAvatarTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Main app avatar clicked, toggling dropdown');
                mainAppUserMenu.classList.toggle('open');
                console.log('🔍 Dropdown classes after toggle:', mainAppUserMenu.className);
            });
        } else {
            console.warn('⚠️ Main app dropdown elements not found:', {
                avatarTrigger: !!mainAppUserAvatarTrigger,
                userMenu: !!mainAppUserMenu
            });
        }
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (marketingDropdownMenu && !marketingDropdownMenu.contains(e.target) && !marketingDropdownToggle?.contains(e.target)) {
            marketingDropdownMenu.classList.remove('show');
        }
        const mainAppUserMenu = document.getElementById('user-profile-menu');
        if (mainAppUserMenu && !mainAppUserMenu.contains(e.target)) {
            mainAppUserMenu.classList.remove('open');
        }
    });
}

/**
 * 🔔 Show notification
 * Displays a notification message to the user
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Check if notification system exists (but avoid infinite recursion)
    if (window.showNotification && window.showNotification !== showNotification) {
        window.showNotification(message, type, duration);
    } else {
        // Fallback: simple console log and alert for errors
        console.log(`[${type.toUpperCase()}] ${message}`);
        if (type === 'error') {
            alert(message);
        }
    }
}

/**
 * 🔄 Toggle user dropdown
 * Shows/hides the user dropdown menu
 */
function toggleUserDropdown(e) {
    e.stopPropagation();
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    if (userDropdownMenu) {
        userDropdownMenu.classList.toggle('show');
    }
}

/**
 * 💎 Handle upgrade button click
 * Scrolls to pricing section
 */
function handleUpgrade() {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
        showNotification('💎 Choose your plan below!', 'info', 3000);
    }

    // Close dropdown
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    if (userDropdownMenu) userDropdownMenu.classList.remove('show');
}

// ==================================================
// 🚀 AUTO-INITIALIZATION
// ==================================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 DOM loaded, initializing authentication system...');

    // Wait for Firebase to load
    let attempts = 0;
    const maxAttempts = 10;

    const checkFirebase = () => {
        attempts++;
        if (typeof firebase !== 'undefined' && firebase.auth) {
            console.log('🔥 Firebase Auth ready, initializing authentication...');
            initializeAuthSystem();
        } else if (attempts < maxAttempts) {
            console.log(`🔄 Waiting for Firebase... (${attempts}/${maxAttempts})`);
            setTimeout(checkFirebase, 500);
        } else {
            console.error('❌ Firebase failed to load after multiple attempts');
            showNotification('❌ Authentication system failed to load. Please refresh the page.', 'error', 10000);
        }
    };

    // Start checking immediately
    setTimeout(checkFirebase, 100);
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, initialize immediately
    console.log('🔥 Starting authentication initialization (DOM already loaded)...');
    setTimeout(() => {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            initializeAuthSystem();
        }
    }, 100);
}

// ==================================================
// 🌍 GLOBAL EXPORTS
// ==================================================

// Make functions available globally
window.PropoKitAuth = {
    initialize: initializeAuthSystem,
    signIn: signInWithGoogle,
    signOut: signOut,
    getCurrentUser: () => currentUser,
    getSubscriptionStatus: () => userSubscriptionStatus,
    updateUserStatus,
    handleUpgrade,
    toggleUserDropdown
};

// Also make signOut available directly on window for the main app
window.signOut = signOut;

// Debug function to force show logout button
window.forceShowLogout = function() {
    console.log('🔧 Force showing logout button...');
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        logoutBtn.style.visibility = 'visible';
        logoutBtn.style.opacity = '1';
        logoutBtn.style.pointerEvents = 'auto';
        console.log('✅ Logout button forced visible');
        
        // Don't force the dropdown to be open - let user click to open it
        // const userMenu = document.getElementById('user-profile-menu');
        // if (userMenu) {
        //     userMenu.classList.add('open');
        //     const dropdown = userMenu.querySelector('.profile-dropdown');
        //     if (dropdown) {
        //         dropdown.style.opacity = '1';
        //         dropdown.style.visibility = 'visible';
        //         dropdown.style.transform = 'translateY(0)';
        //     }
        // }
    } else {
        console.warn('❌ Logout button not found');
    }
};

console.log('📦 Propokit authentication system loaded');

