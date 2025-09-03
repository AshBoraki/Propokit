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
    
    // Update UI
    updateUIForSignedOutUser();
}

/**
 * 🎨 Update UI for signed in user
 */
function updateUIForSignedInUser(user) {
    // Hide login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.style.display = 'none';
    
    // Show logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'flex';
    
    // Show user profile (only if it exists - for main app)
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.style.display = 'flex';
    
    // Show Launch App button (only if it exists - for home page)
    const launchAppBtn = document.getElementById('launch-app-btn');
    if (launchAppBtn) launchAppBtn.style.display = 'inline-flex';
    
    // Show Dashboard navigation item (only if it exists - for home page)
    const dashboardNavItem = document.getElementById('dashboard-nav-item');
    if (dashboardNavItem) dashboardNavItem.style.display = 'block';
    
    // Show Dashboard button (only if it exists - for home page)
    const dashboardBtn = document.getElementById('dashboard-btn');
    if (dashboardBtn) dashboardBtn.style.display = 'flex';
    
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
}

/**
 * 🎨 Update UI for signed out user
 */
function updateUIForSignedOutUser() {
    // Show login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.style.display = 'flex';
    
    // Hide logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';
    
    // Hide user profile (only if it exists - for main app)
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.style.display = 'none';
    
    // Hide Launch App button (only if it exists - for home page)
    const launchAppBtn = document.getElementById('launch-app-btn');
    if (launchAppBtn) launchAppBtn.style.display = 'none';
    
    // Hide Dashboard navigation item (only if it exists - for home page)
    const dashboardNavItem = document.getElementById('dashboard-nav-item');
    if (dashboardNavItem) dashboardNavItem.style.display = 'none';
    
    // Hide Dashboard button (only if it exists - for home page)
    const dashboardBtn = document.getElementById('dashboard-btn');
    if (dashboardBtn) dashboardBtn.style.display = 'none';
    
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
