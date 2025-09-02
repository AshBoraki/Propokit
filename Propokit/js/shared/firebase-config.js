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
            // Initialize database reference
            database = firebase.database();
            console.log('📊 Firebase Database initialized');
            
            // Initialize storage reference
            storage = firebase.storage();
            console.log('💾 Firebase Storage initialized');
            
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
    return firebase.apps.length > 0 && database !== null && storage !== null;
}

// ==================================================
// 🚀 AUTO-INITIALIZATION
// ==================================================
// Automatically initialize Firebase when this script loads
// This ensures Firebase is ready when other scripts need it

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 Starting Firebase initialization...');
    initializeFirebaseServices();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, initialize immediately
    console.log('🔥 Starting Firebase initialization (DOM already loaded)...');
    initializeFirebaseServices();
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
    config: firebaseConfig
};

console.log('📦 Firebase configuration module loaded');
