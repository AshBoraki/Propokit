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
    
    // Handle redirect result for Google sign-in
    firebase.auth().getRedirectResult().then((result) => {
        if (result.user) {
            console.log('✅ Redirect sign-in successful:', result.user.email);
            handleUserSignIn(result.user);
            showNotification('🎉 Successfully signed in with Google!', 'success', 3000);
        }
    }).catch((error) => {
        if (error.code !== 'auth/no-redirect-result') {
            console.error('❌ Redirect sign-in failed:', error);
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

        // Try Firebase authentication with different methods
        if (typeof firebase !== 'undefined' && firebase.auth) {
            // Create provider OUTSIDE the try block so it's available in catch blocks
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');

            // Set the client ID for better compatibility
            if (typeof firebaseConfig !== 'undefined' && firebaseConfig.clientId) {
                provider.setCustomParameters({
                    client_id: firebaseConfig.clientId
                });
            }

            try {
                // Try redirect method first (more reliable than popup)
                console.log('🔄 Trying redirect method...');
                await firebase.auth().signInWithRedirect(provider);

                // If we get here, redirect was successful
                console.log('✅ Google sign-in successful via redirect');
                showNotification('🎉 Successfully signed in with Google!', 'success', 3000);

            } catch (firebaseError) {
                console.warn('⚠️ Firebase redirect failed, trying popup:', firebaseError);

                try {
                    // Try popup method as fallback
                    const result = await firebase.auth().signInWithPopup(provider);
                    console.log('✅ Google sign-in successful via popup:', result.user.email);
                    showNotification('🎉 Successfully signed in with Google!', 'success', 3000);

                } catch (popupError) {
                    console.warn('⚠️ Firebase popup failed, using local test mode:', popupError);
                    // Fall back to local test authentication
                    await signInWithLocalTest();
                }
            }
        } else {
            // Firebase not available, use local test
            await signInWithLocalTest();
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
        showNotification(`❌ ${errorMessage}`, 'error', 5000);
    }
}

/**
 * 🔐 Sign in with local test system
 * Uses the local Firebase test system for authentication
 */
async function signInWithLocalTest() {
    console.log('🧪 Using local test authentication...');
    
    // Check if local Firebase test system is available
    if (window.localFirebaseTest) {
        console.log('✅ Local Firebase test system found');
        
        // Create a mock user object
        const mockUser = {
            uid: window.localFirebaseTest.testUID || 'test-user-123',
            email: 'test@propokit.com',
            displayName: 'Test User',
            photoURL: 'https://via.placeholder.com/32'
        };
        
        // Handle the sign in
        handleUserSignIn(mockUser);
        showNotification('🧪 Signed in with test account!', 'success', 3000);
        
    } else {
        // Create a simple test user
        const testUser = {
            uid: 'test-user-' + Date.now(),
            email: 'test@propokit.com',
            displayName: 'Test User',
            photoURL: 'https://via.placeholder.com/32'
        };
        
        // Store test UID
        localStorage.setItem('firebaseUID', testUser.uid);
        window.currentFirebaseUID = testUser.uid;
        
        // Handle the sign in
        handleUserSignIn(testUser);
        showNotification('🧪 Signed in with test account!', 'success', 3000);
    }
}

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

    // Update UI elements (marketing page only)
    const isMarketing = !window.location.pathname.includes('Propokit');
    if (isMarketing) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'flex';
    }

    if (userAvatar) userAvatar.src = user.photoURL || 'https://static.wixstatic.com/shapes/a1b7fb_6605f9bff7e2408ba18fae25075bfa8c.svg';
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

    // Update UI elements (marketing page only)
    const isMarketing = !window.location.pathname.includes('Propokit');
    if (isMarketing) {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'none';
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

