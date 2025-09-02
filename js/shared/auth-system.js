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
    
    // Setup logout button
    if (logoutBtn) {
        console.log('🔗 Setting up logout button');
        logoutBtn.addEventListener('click', (e) => {
            console.log('🖱️ Logout button clicked');
            e.preventDefault();
            signOut();
        });
    } else {
        console.warn('⚠️ Logout button not found');
    }
    
    // Setup pricing buttons (for marketing page)
    setupPricingButtons();
    
    console.log('✅ Authentication system initialized');
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
            console.warn('⚠️ Firebase Auth not available, using local test mode');
            await signInWithLocalTest();
            return;
        }

        // Test Firebase configuration first
        try {
            // Try to access Firebase Auth to test if API key is working
            await firebase.auth().signOut(); // This will test if the API is accessible
            console.log('✅ Firebase Auth API is accessible');
        } catch (configError) {
            console.warn('⚠️ Firebase Auth API test failed:', configError);
            
            // Check if it's the 403 API key blocked error
            if (configError.code === 'auth/internal-error' || 
                configError.message.includes('403') || 
                configError.message.includes('API_KEY_SERVICE_BLOCKED') ||
                configError.message.includes('identitytoolkit')) {
                
                console.warn('🚫 Firebase API key is blocked from Identity Toolkit API');
                console.warn('🔄 Falling back to local test authentication...');
                await signInWithLocalTest();
                return;
            }
        }
        
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        
        // Set the client ID for better compatibility
        if (typeof firebaseConfig !== 'undefined' && firebaseConfig.clientId) {
            provider.setCustomParameters({
                client_id: firebaseConfig.clientId
            });
        }

        // Try popup method first (more reliable than redirect for local development)
        try {
            console.log('🔄 Trying popup method...');
            const result = await firebase.auth().signInWithPopup(provider);
            console.log('✅ Google sign-in successful via popup:', result.user.email);
            showNotification('🎉 Successfully signed in with Google!', 'success', 3000);
            
            // Show Firebase mode status indicator
            showAuthStatusIndicator('firebase-mode', 'Firebase Mode');

        } catch (popupError) {
            console.warn('⚠️ Firebase popup failed, trying redirect:', popupError);
            
            // Check if it's the 403 API key blocked error
            if (popupError.code === 'auth/internal-error' || 
                popupError.message.includes('403') || 
                popupError.message.includes('API_KEY_SERVICE_BLOCKED') ||
                popupError.message.includes('identitytoolkit')) {
                
                console.warn('🚫 Firebase API key is blocked from Identity Toolkit API');
                console.warn('🔄 Falling back to local test authentication...');
                await signInWithLocalTest();
                return;
            }

            try {
                // Try redirect method as fallback
                console.log('🔄 Trying redirect method...');
                await firebase.auth().signInWithRedirect(provider);
                console.log('✅ Google sign-in redirect initiated');

            } catch (redirectError) {
                console.warn('⚠️ Firebase redirect failed, using local test mode:', redirectError);
                
                // Check if it's the 403 API key blocked error
                if (redirectError.code === 'auth/internal-error' || 
                    redirectError.message.includes('403') || 
                    redirectError.message.includes('API_KEY_SERVICE_BLOCKED') ||
                    redirectError.message.includes('identitytoolkit')) {
                    
                    console.warn('🚫 Firebase API key is blocked from Identity Toolkit API');
                    console.warn('🔄 Falling back to local test authentication...');
                    await signInWithLocalTest();
                    return;
                }
                
                // Fall back to local test authentication
                await signInWithLocalTest();
            }
        }
        
        // Redirect to main app if on marketing page
        if (window.location.pathname.includes('index.html') && !window.location.pathname.includes('Propokit')) {
            setTimeout(() => {
                window.location.href = 'Propokit/login.html';
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
        
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign-in was cancelled.';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Pop-up was blocked. Please allow pop-ups and try again.';
        } else if (error.message.includes('Firebase Auth not loaded')) {
            errorMessage = 'Authentication system is loading. Please wait a moment and try again.';
        } else if (error.message.includes('403') || error.message.includes('API_KEY_SERVICE_BLOCKED')) {
            errorMessage = 'Authentication service temporarily unavailable. Using local mode.';
            // Automatically fall back to local test
            await signInWithLocalTest();
            return;
        }
        
        showNotification(`❌ ${errorMessage}`, 'error', 5000);
    }
}

/**
 * 🔐 Sign in with local test system
 * Uses the local Firebase test system for authentication
 */
async function signInWithLocalTest() {
    console.log('🧪 Using local test authentication...');
    
    // Show a notification about the fallback
    showNotification('🔄 Using local authentication mode', 'info', 2000);
    
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
        await firebase.auth().signOut();
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
    
    // Update UI elements
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'flex';
    if (userProfile) userProfile.style.display = 'flex';
    
    if (userAvatar) userAvatar.src = user.photoURL || 'https://via.placeholder.com/32';
    if (userName) userName.textContent = user.displayName || user.email.split('@')[0];
    
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
    
    // Update UI elements
    if (loginBtn) loginBtn.style.display = 'flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'none';
    if (userDropdownMenu) userDropdownMenu.classList.remove('show');
    
    // Clear stored data
    localStorage.removeItem('firebaseUID');
    window.currentFirebaseUID = null;
    
    // Trigger existing Firebase data cleanup
    if (window.reinitializeFirebaseRefs) {
        window.reinitializeFirebaseRefs('');
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
 * 🔔 Show notification
 * Displays a notification message to the user
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Check if notification system exists
    if (window.showNotification) {
        window.showNotification(message, type, duration);
    } else {
        // Fallback: simple alert
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
    if (userDropdownMenu) {
        userDropdownMenu.classList.remove('show');
    }
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

console.log('📦 Propokit authentication system loaded');
