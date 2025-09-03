// ==================================================
// 🔐 CLEAN PROPOKIT AUTHENTICATION SYSTEM
// ==================================================
//
// PURPOSE: Simple, reliable authentication system
// This is a clean implementation that removes all complexity
// and provides basic Google sign-in functionality
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
 * 🔐 Sign in with Google
 */
async function signInWithGoogle() {
    try {
        console.log('🔐 Starting Google sign-in...');
        
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
        
        // Sign in with redirect
        await firebase.auth().signInWithRedirect(provider);
        console.log('✅ Sign-in redirect initiated');
        
    } catch (error) {
        console.error('❌ Sign-in failed:', error);
        
        // Reset button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Sign in with Google';
        }
        
        alert('Sign-in failed. Please try again.');
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
        
        // Redirect to home page
        window.location.href = '../index.html';
        
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
    
    // Redirect if on login page
    if (window.location.pathname.includes('login.html')) {
        console.log('🔄 Redirecting from login page...');
        setTimeout(() => {
            window.location.href = 'index-product.html';
        }, 1000);
    }
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
    
    // Show user profile
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.style.display = 'flex';
    
    // Update user name
    const userName = document.getElementById('user-name');
    if (userName) {
        userName.textContent = user.displayName || user.email.split('@')[0];
    }
    
    // Update user avatar
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
    
    // Hide user profile
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.style.display = 'none';
}

/**
 * 🔄 Handle redirect result
 */
async function handleRedirectResult() {
    try {
        console.log('🔄 Checking for redirect result...');
        const result = await firebase.auth().getRedirectResult();
        
        if (result.user) {
            console.log('✅ Redirect result found:', result.user.email);
        } else {
            console.log('🔍 No redirect result found');
        }
    } catch (error) {
        console.error('❌ Redirect result error:', error);
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
            handleRedirectResult();
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
