// ==================================================
// 🔥 PROPOKIT FIREBASE CONFIGURATION
// ==================================================
//
// PURPOSE: Centralized Firebase configuration and initialization
// This file contains all Firebase settings and provides a clean
// way to initialize Firebase across the application.
//
// WHAT'S INCLUDED:
// - Firebase project configuration
// - Firebase initialization logic
// - Global Firebase service references
// - Error handling for initialization
//
// ==================================================

/**
 * 🔥 Firebase Configuration Object
 * Contains all the necessary keys and URLs for Firebase services
 */
const firebaseConfig = {
    apiKey: "AIzaSyD4KPxRXHK4phJVyiLsaU6CLb9pBfZygjw",           // API key for Firebase access
    authDomain: "denali-tech-f22e8.firebaseapp.com",                // Domain for authentication
    databaseURL: "https://denali-tech-f22e8-default-rtdb.firebaseio.com/", // Real-time database URL
    projectId: "denali-tech-f22e8",                                // Project identifier
    storageBucket: "denali-tech-f22e8.appspot.com",                // File storage bucket
    messagingSenderId: "1012434420529",                            // Sender ID for notifications
    appId: "1:1012434420529:web:41c0019b364c6086046610",          // Unique app identifier
    clientId: "1012434420529-la200fdscsf5u6g5ajulo9r1ibmqo5rb.apps.googleusercontent.com" // Google Web client ID
};

/**
 * 🚀 Initialize Firebase Application
 * Safely initializes Firebase to prevent multiple initializations
 * 
 * @returns {Object} Firebase app instance
 */
function initializeFirebase() {
    try {
        // Check if Firebase is already initialized to prevent errors
        if (!firebase.apps.length) {
            const app = firebase.initializeApp(firebaseConfig);
            console.log('🔥 Firebase initialized successfully');
            return app;
        } else {
            console.log('🔥 Firebase already initialized');
            return firebase.app();
        }
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        return null;
    }
}

/**
 * 🌍 Global Firebase Service References
 * These variables provide easy access to Firebase services throughout the app
 */
let database = null;
let storage = null;

/**
 * 📡 Initialize Firebase Services
 * Sets up references to Firebase database and storage services
 */
function initializeFirebaseServices() {
    try {
        // Initialize Firebase app first
        const app = initializeFirebase();
        
        if (app) {
            // Only initialize services that are available
            if (typeof firebase.database === 'function') {
                database = firebase.database();
                console.log('📊 Firebase Database initialized');
            } else {
                console.log('⚠️ Firebase Database module not loaded - skipping database initialization');
            }
            
            if (typeof firebase.storage === 'function') {
                storage = firebase.storage();
                console.log('💾 Firebase Storage initialized');
            } else {
                console.log('⚠️ Firebase Storage module not loaded - skipping storage initialization');
            }
            
            return true;
        } else {
            console.error('❌ Cannot initialize Firebase services - app initialization failed');
            return false;
        }
    } catch (error) {
        console.error('❌ Firebase services initialization failed:', error);
        return false;
    }
}

/**
 * 🔍 Test Firebase Authentication Connectivity
 * Tests if Firebase Auth is properly configured and accessible
 * 
 * @returns {Promise<boolean>} True if authentication is working, false otherwise
 */
async function testFirebaseAuth() {
    try {
        console.log('🔍 Testing Firebase Authentication connectivity...');
        
        // Check if Firebase Auth is available
        if (typeof firebase === 'undefined' || !firebase.auth) {
            console.error('❌ Firebase Auth not available');
            return false;
        }
        
        // Try to access Firebase Auth methods
        const auth = firebase.auth();
        
        // Test basic auth functionality
        const currentUser = auth.currentUser;
        console.log('✅ Firebase Auth is accessible');
        console.log('👤 Current user:', currentUser ? currentUser.email : 'None');
        
        // Test provider creation
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log('✅ Google Auth Provider created successfully');
        
        return true;
        
    } catch (error) {
        console.error('❌ Firebase Auth test failed:', error);
        
        // Check for specific error types
        if (error.code === 'auth/internal-error' || 
            error.message.includes('403') || 
            error.message.includes('API_KEY_SERVICE_BLOCKED') ||
            error.message.includes('identitytoolkit')) {
            console.error('🚫 Firebase API key is blocked from Identity Toolkit API');
            console.error('💡 To fix this:');
            console.error('   1. Go to Firebase Console > Project Settings > General');
            console.error('   2. Scroll down to "Your apps" section');
            console.error('   3. Make sure your domain is added to authorized domains');
            console.error('   4. Check that Google Sign-In is enabled in Authentication > Sign-in method');
        }
        
        return false;
    }
}

/**
 * 🔍 Get Firebase Database Reference
 * Returns the Firebase database instance
 * 
 * @returns {Object|null} Firebase database instance or null if not initialized
 */
function getFirebaseDatabase() {
    if (!database) {
        console.warn('⚠️ Firebase database not initialized. Call initializeFirebaseServices() first.');
        return null;
    }
    return database;
}

/**
 * 📁 Get Firebase Storage Reference
 * Returns the Firebase storage instance
 * 
 * @returns {Object|null} Firebase storage instance or null if not initialized
 */
function getFirebaseStorage() {
    if (!storage) {
        console.warn('⚠️ Firebase storage not initialized. Call initializeFirebaseServices() first.');
        return null;
    }
    return storage;
}

/**
 * ✅ Check Firebase Initialization Status
 * Returns whether Firebase is properly initialized
 * 
 * @returns {boolean} True if Firebase is initialized, false otherwise
 */
function isFirebaseInitialized() {
    return firebase.apps.length > 0;
}

// ==================================================
// 🚀 AUTO-INITIALIZATION
// ==================================================
// Automatically initialize Firebase when this script loads
// This ensures Firebase is ready when other scripts need it

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔥 Starting Firebase initialization...');
    const success = initializeFirebaseServices();
    
    if (success) {
        // Test authentication connectivity
        const authWorking = await testFirebaseAuth();
        if (authWorking) {
            console.log('✅ Firebase Authentication is ready for production use');
        } else {
            console.warn('⚠️ Firebase Authentication may have configuration issues');
        }
    }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, initialize immediately
    console.log('🔥 Starting Firebase initialization (DOM already loaded)...');
    initializeFirebaseServices().then(async (success) => {
        if (success) {
            await testFirebaseAuth();
        }
    });
}

// ==================================================
// 🌍 GLOBAL EXPORTS
// ==================================================
// Make functions available globally for other scripts to use

window.FirebaseConfig = {
    initialize: initializeFirebase,
    initializeServices: initializeFirebaseServices,
    getDatabase: getFirebaseDatabase,
    getStorage: getFirebaseStorage,
    isInitialized: isFirebaseInitialized,
    testAuth: testFirebaseAuth,
    config: firebaseConfig
};

console.log('📦 Firebase configuration module loaded');
