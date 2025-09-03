// ==================================================
// 🔐 CLEAN PROPOKIT AUTHENTICATION SYSTEM
// ==================================================
//
// PURPOSE: Simple, reliable authentication system
// This is a clean implementation that removes all complexity
// and provides basic Google sign-in functionality with popup
//
// ==================================================

// Global state
let currentUser = null;
let authInitialized = false;
let isInitialLogin = true; // Track if this is the first login

/**
 * 🔐 Initialize the clean authentication system
 */
function initializeCleanAuth() {
    if (authInitialized) {
        console.log('🔐 Auth already initialized');
        return;
    }
    
    console.log('🔐 Initializing clean authentication system...');
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined' || !firebase.auth) {
        console.error('❌ Firebase not available');
        return;
    }
    
    // Set up auth state listener
    firebase.auth().onAuthStateChanged((user) => {
        console.log('🔍 Auth state changed:', user ? user.email : 'No user');
        
        if (user) {
            currentUser = user;
            handleUserSignedIn(user);
        } else {
            currentUser = null;
            handleUserSignedOut();
        }
    });
    
    // Set up login button if it exists
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signInWithGoogle();
        });
    }
    
    // Set up logout button if it exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut();
        });
    }
    
    authInitialized = true;
    console.log('✅ Clean authentication system initialized');
}

/**
 * 🔐 Sign in with Google using popup
 */
async function signInWithGoogle() {
    try {
        console.log('🔐 Starting Google sign-in with popup...');
        
        // Show loading state
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = 'Signing in...';
        }
        
        // Create Google provider
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        
        // Sign in with popup
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('✅ Sign-in successful:', result.user.email);
        
        // Reset button
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Sign In';
        }
        
    } catch (error) {
        console.error('❌ Sign-in failed:', error);
        
        // Reset button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Sign In';
        }
        
        // Handle specific error types
        if (error.code === 'auth/popup-closed-by-user') {
            console.log('👤 User closed popup');
        } else if (error.code === 'auth/popup-blocked') {
            alert('Popup was blocked. Please allow popups for this site and try again.');
        } else {
            alert('Sign-in failed. Please try again.');
        }
    }
}

/**
 * 🔐 Sign out
 */
async function signOut() {
    try {
        console.log('🔐 Signing out...');
        await firebase.auth().signOut();
        console.log('✅ Signed out successfully');
        
        // Redirect to home page after logout
        setTimeout(() => {
            console.log('🏠 Redirecting to home page after logout...');
            window.location.href = '../index.html';
        }, 500); // 0.5 second delay
        
    } catch (error) {
        console.error('❌ Sign-out failed:', error);
        alert('Sign-out failed. Please try again.');
    }
}

/**
 * 👤 Handle user signed in
 */
function handleUserSignedIn(user) {
    console.log('👤 User signed in:', user.email);
    
    // Store user data
    localStorage.setItem('firebaseUID', user.uid);
    
    // Update UI
    updateUIForSignedInUser(user);
}

/**
 * 👤 Handle user signed out
 */
function handleUserSignedOut() {
    console.log('👤 User signed out');
    
    // Clear stored data
    localStorage.removeItem('firebaseUID');
    
    // Reset initial login flag for next login
    isInitialLogin = true;
    
    // Update UI
    updateUIForSignedOutUser();
}

/**
 * 🎨 Update UI for signed in user
 */
function updateUIForSignedInUser(user) {
    // Change login button to sign out button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.style.display = 'flex';
        loginBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
        `;
        // Change the click handler to sign out
        loginBtn.onclick = signOut;
    }
    
    // Show user profile (only if it exists - for main app)
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.style.display = 'flex';
    
    // Show user profile menu (only if it exists - for home page)
    const userProfileMenu = document.getElementById('homepage-user-profile-container');
    if (userProfileMenu) userProfileMenu.style.display = 'flex';
    
    // Hide theme circle (only if it exists - for home page)
    const themeCircle = document.getElementById('theme-toggle');
    if (themeCircle) themeCircle.style.display = 'none';
    
    // Show Launch App button (only if it exists - for home page)
    const launchAppBtn = document.getElementById('launch-app-btn');
    if (launchAppBtn) launchAppBtn.style.display = 'inline-flex';
    
    // Show Dashboard navigation item (only if it exists - for home page)
    const dashboardNavItem = document.getElementById('dashboard-nav-item');
    if (dashboardNavItem) dashboardNavItem.style.display = 'block';
    
    // Update logo link to go to main app (only if it exists - for home page)
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.href = 'Propokit/index-product.html';
        logoLink.title = 'Go to Dashboard';
    }
    
    // Update user name (only if it exists - for main app)
    const userName = document.getElementById('user-name');
    if (userName) {
        userName.textContent = user.displayName || user.email.split('@')[0];
    }
    
    // Update user avatar (only if it exists - for main app)
    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar && user.photoURL) {
        userAvatar.src = user.photoURL;
    }
    
    // Update main app user avatar trigger (only if it exists - for main app)
    const userAvatarTrigger = document.getElementById('user-avatar-trigger');
    if (userAvatarTrigger) {
        if (user.photoURL) {
            // If user has profile picture, show it
            userAvatarTrigger.innerHTML = `<img src="${user.photoURL}" alt="User Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"><div class="user-status-indicator online"></div>`;
        } else {
            // If no profile picture, show initials
            const initials = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
            userAvatarTrigger.innerHTML = `<span>${initials}</span><div class="user-status-indicator online"></div>`;
        }
        
        // Re-add click handler after innerHTML update for main app
        if (typeof window.forceReinitMainAppDropdown === 'function') {
            setTimeout(() => {
                window.forceReinitMainAppDropdown();
            }, 50);
        }
    }
    
    // Update home page user profile elements
    const homePageUserAvatarText = document.getElementById('homepage-user-avatar-initials');
    if (homePageUserAvatarText) {
        homePageUserAvatarText.textContent = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
    }
    
    const homePageUserAvatarTrigger = document.getElementById('homepage-user-avatar-button');
    if (homePageUserAvatarTrigger) {
        // Store existing click handlers before updating innerHTML
        const existingClickHandlers = homePageUserAvatarTrigger.onclick;
        
        if (user.photoURL) {
            // If user has profile picture, show it
            homePageUserAvatarTrigger.innerHTML = `<img src="${user.photoURL}" alt="User Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"><div class="user-status-indicator online"></div>`;
        } else {
            // If no profile picture, show initials
            const initials = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
            homePageUserAvatarTrigger.innerHTML = `<span>${initials}</span><div class="user-status-indicator online"></div>`;
        }
        
        // Re-add click handler after innerHTML update
        if (typeof window.forceReinitDropdown === 'function') {
            setTimeout(() => {
                window.forceReinitDropdown();
            }, 50);
        }
    }
    
    // Update home page dropdown user info
    const homePageProfileUserName = document.getElementById('homepage-user-display-name');
    const homePageProfileUserEmail = document.getElementById('homepage-user-email-address');
    if (homePageProfileUserName) homePageProfileUserName.textContent = user.displayName || 'User';
    if (homePageProfileUserEmail) homePageProfileUserEmail.textContent = user.email;
    
    // Auto-redirect to main app only on initial login (not when returning to home page)
    if (isInitialLogin && window.location.pathname.includes('index.html')) {
        setTimeout(() => {
            console.log('🚀 Initial login - redirecting to main app...');
            window.location.href = 'Propokit/index-product.html';
        }, 1000); // 1 second delay to show success state
        isInitialLogin = false; // Mark that initial login is done
    }
}

/**
 * 🎨 Update UI for signed out user
 */
function updateUIForSignedOutUser() {
    // Reset login button to sign in
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.style.display = 'flex';
        loginBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10,17 15,12 10,7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Sign In
        `;
        // Reset the click handler to sign in
        loginBtn.onclick = signInWithGoogle;
    }
    
    // Hide user profile (only if it exists - for main app)
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.style.display = 'none';
    
    // Hide user profile menu (only if it exists - for home page)
    const userProfileMenu = document.getElementById('homepage-user-profile-container');
    if (userProfileMenu) userProfileMenu.style.display = 'none';
    
    // Show theme circle (only if it exists - for home page)
    const themeCircle = document.getElementById('theme-toggle');
    if (themeCircle) themeCircle.style.display = 'flex';
    
    // Hide Launch App button (only if it exists - for home page)
    const launchAppBtn = document.getElementById('launch-app-btn');
    if (launchAppBtn) launchAppBtn.style.display = 'none';
    
    // Hide Dashboard navigation item (only if it exists - for home page)
    const dashboardNavItem = document.getElementById('dashboard-nav-item');
    if (dashboardNavItem) dashboardNavItem.style.display = 'none';
    
    // Reset logo link to home page (only if it exists - for home page)
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.href = '#';
        logoLink.title = 'PropoKit Home';
    }
}

// ==================================================
// 🚀 AUTO-INITIALIZATION
// ==================================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 DOM loaded, initializing clean auth...');
    
    // Wait for Firebase
    const checkFirebase = () => {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            console.log('🔥 Firebase ready, initializing auth...');
            initializeCleanAuth();
        } else {
            console.log('⏳ Waiting for Firebase...');
            setTimeout(checkFirebase, 100);
        }
    };
    
    setTimeout(checkFirebase, 100);
});

// ==================================================
// 🌍 GLOBAL EXPORTS
// ==================================================

window.CleanAuth = {
    initialize: initializeCleanAuth,
    signIn: signInWithGoogle,
    signOut: signOut,
    getCurrentUser: () => currentUser
};

console.log('📦 Clean authentication system loaded');
