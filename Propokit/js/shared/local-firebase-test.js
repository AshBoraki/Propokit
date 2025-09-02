// Local Firebase Testing Configuration
// This file allows you to test locally with your Firebase data

class LocalFirebaseTest {
    constructor() {
this.testUID = null;
this.isTestMode = true;
this.init();
    }

    init() {
console.log('ðŸ”¥ Local Firebase Test Mode Initialized');
this.setupTestUser();
this.loadTestData();
    }

    // Set up a test user UID for local testing
    setupTestUser() {
// OPTION 1: Use your actual Firebase UID (replace with your real UID)
// You can find your UID in Firebase Console > Authentication > Users
// Or use the browser console and type: firebase.auth().currentUser?.uid

// OPTION 2: Clear any old cached UID and use your real Firebase UID
// Remove any old test UIDs from localStorage
localStorage.removeItem("firebaseUID");

// OPTION 3: Use your actual Firebase UID that connects to your Firebase data
// This is your real user UID from Firebase Authentication
this.testUID = 'hzl3M39ICUZXAtkcngVz5jFs7802';

// If no real UID is set, use a development UID but warn user
if (this.testUID === 'YOUR_ACTUAL_FIREBASE_UID_HERE' || this.testUID === 'denali-tech-local-user-2024') {
    // Use the denali-tech UID for testing
    this.testUID = 'denali-tech-local-user-2024';
    console.warn('âš ï¸  Using development UID. To connect to real Firebase data:');
    console.warn('   1. Go to Firebase Console > Authentication');
    console.warn('   2. Find your user UID');
    console.warn('   3. Call: setRealFirebaseUID("your-actual-uid")');
} else if (this.testUID === 'hzl3M39ICUZXAtkcngVz5jFs7802') {
    console.log('ðŸ”¥ Connected to your real Firebase UID:', this.testUID);
    console.log('ðŸ“Š Loading your existing data from Firebase...');
}

// Set the UID immediately in localStorage
localStorage.setItem("firebaseUID", this.testUID);

// Simulate Wix user session message
setTimeout(() => {
    // Use consistent test user display across pages
    const userName = 'Alex Hormozi';
    const userEmail = 'alex.hormozi@test.com';

    window.postMessage({
firebaseUID: this.testUID,
userName: userName,
userEmail: userEmail
    }, '*');

    // Also trigger a custom event for immediate connection
    window.dispatchEvent(new CustomEvent('localFirebaseReady', {
detail: {
    firebaseUID: this.testUID,
    userName: userName,
    userEmail: userEmail
}
    }));
}, 500);

console.log('ðŸ‘¤ Using Firebase UID:', this.testUID);
    }

    // Load sample test data
    loadTestData() {
if (!window.firebase) {
    console.error('âŒ Firebase not loaded');
    return;
}

const db = firebase.database();
const userRef = db.ref(`users/${this.testUID}`);

// If using a real UID (not development), don't overwrite existing data
if (this.testUID !== 'local-dev-user-replace-me' && this.testUID !== 'denali-tech-local-user-2024' && this.testUID === 'hzl3M39ICUZXAtkcngVz5jFs7802') {
    console.log('ðŸ”— Connected to your real Firebase UID - not overwriting existing data');
    console.log('ðŸ“Š Your existing QR codes and data should load automatically');
    console.log('âœ… App is now connected to live Firebase data!');
    return;
}

console.log('ðŸ“ Loading sample test data for development...');

// Sample company info
const companyInfo = {
    companyName: 'Denali Tech (Test)',
    companyAddress: '123 Test Street, Test City, TC 12345',
    companyPhone: '(555) 123-4567',
    companyEmail: 'test@denalitech.com',
    companyWebsite: 'www.denalitech-test.com'
};

// Sample proposal data
const proposalData = {
    name: 'John Test Customer',
    address: '456 Customer Ave, Client City, CC 67890',
    phone: '(555) 987-6543',
    email: 'customer@test.com',
    proposalInfo: 'Test proposal for local development',
    proposalDate: '12/25/2023',
    showPhone: true,
    showEmail: true
};

// Sample QR codes (matching your existing system)
const qrCodes = {
    websiteUrl: 'https://www.denalitechs.com',
    pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/denali-tech-f22e8.appspot.com/o/sample-proposal.pdf?alt=media'
};

// Sample about page content
const page2About = {
    paragraph1: 'This is test content for paragraph 1. Denali Tech specializes in advanced audio and home automation solutions.',
    paragraph2: 'We take a consultative approach to understand your unique needs and preferences.',
    paragraph3: 'With our comprehensive services, we handle everything from initial consultation to final installation.',
    paragraph4: 'Whether you are looking to install a simple sound system or a complex smart home setup, we have the expertise.'
};

// Sample footer content
const footerContent = {
    line1: 'Denali Tech - Home Automation & Custom AV Solutions (Test)',
    line2: '123 Test Street, Test City, TC 12345',
    line3: 'Phone: (555) 123-4567 | www.denalitech-test.com'
};

// Write test data to Firebase
Promise.all([
    userRef.child('companyInfo').set(companyInfo),
    userRef.child('proposalData').set(proposalData),
    userRef.child('qrCodes').set(qrCodes),
    userRef.child('page2About').set(page2About),
    userRef.child('footerContent').set(footerContent),
    userRef.child('coverImageUrl').set('https://static.wixstatic.com/media/d31297_87b0f69623904649a3c8c94dc048f57d~mv2.jpg'),
    userRef.child('page2CoverImageUrl').set('https://static.wixstatic.com/media/73be98_3d4e882c397a4c30bff811ffb6646733~mv2.png')
]).then(() => {
    console.log('âœ… Test data loaded successfully');
    this.showTestInfo();
}).catch(error => {
    console.error('âŒ Error loading test data:', error);
});
    }

    showTestInfo() {
// Create a test info panel
const testPanel = document.createElement('div');
testPanel.id = 'local-test-panel';
testPanel.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: #2196F3;
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: Arial, sans-serif;
    font-size: 12px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const isRealFirebase = this.testUID === 'hzl3M39ICUZXAtkcngVz5jFs7802';
testPanel.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 5px;">${isRealFirebase ? 'ðŸ”¥ LIVE FIREBASE MODE' : 'ðŸ§ª LOCAL TEST MODE'}</div>
    <div>User: ${isRealFirebase ? 'Alex Hormozi' : 'Alex Hormozi (Test)'} </div>
    <div>UID: ${this.testUID}</div>
    <div style="margin-top: 8px;">
<button onclick="forceFirebaseConnection()" style="
    background: #4CAF50;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 11px;
    margin-right: 5px;
">ðŸ”Œ Force Connect</button>
<button onclick="loadTestScenario('full')" style="
    background: #FF9800;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 11px;
">ðŸ“Š Reload Data</button>
    </div>
    <div style="margin-top: 5px; font-size: 10px; opacity: 0.8;">
${isRealFirebase ? 'Connected to your live Firebase data!' : 'QR codes and all features should work with test data'}
    </div>
    <button onclick="this.parentElement.remove()" style="
position: absolute;
top: 5px;
right: 5px;
background: none;
border: none;
color: white;
cursor: pointer;
font-size: 16px;
    ">Ã—</button>
`;

document.body.appendChild(testPanel);

// Auto-hide after 10 seconds
setTimeout(() => {
    if (testPanel.parentElement) {
testPanel.remove();
    }
}, 10000);
    }

    // Method to clear test data
    clearTestData() {
if (!window.firebase || !this.testUID) return;

const db = firebase.database();
const userRef = db.ref(`users/${this.testUID}`);

userRef.remove().then(() => {
    console.log('ðŸ—‘ï¸ Test data cleared');
}).catch(error => {
    console.error('âŒ Error clearing test data:', error);
});
    }

    // Method to load different test scenarios
    loadTestScenario(scenario) {
switch(scenario) {
    case 'empty':
this.clearTestData();
break;
    case 'full':
this.loadTestData();
break;
    default:
console.log('Available scenarios: empty, full');
}
    }

    // Set your real Firebase UID
    setRealFirebaseUID(realUID) {
console.log('ðŸ”‘ Setting real Firebase UID:', realUID);
this.testUID = realUID;
localStorage.setItem("firebaseUID", realUID);

// Force reconnection with real UID
this.forceConnection();

console.log('âœ… Now connected with your real Firebase UID');
console.log('ðŸŽ¯ QR codes and data should now work properly!');
    }

    // Force connection method
    forceConnection() {
console.log('ðŸ”Œ Forcing Firebase connection...');

// Set localStorage immediately
localStorage.setItem("firebaseUID", this.testUID);

// Trigger the message event that the main app listens for
window.postMessage({
    firebaseUID: this.testUID,
    userName: 'Alex Hormozi',
    userEmail: 'alex.hormozi@test.com'
}, '*');

// Also try to directly call reinitializeFirebaseRefs if it exists
if (typeof window.reinitializeFirebaseRefs === 'function') {
    window.reinitializeFirebaseRefs(this.testUID);
}

console.log('âœ… Connection forced with UID:', this.testUID);
    }
}

// Initialize local testing when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if we should run in test mode
    const isLocal = window.location.hostname === 'localhost' ||
   window.location.hostname === '127.0.0.1' ||
   window.location.protocol === 'file:' ||
   window.location.hostname.includes('127.0.0.1') ||
   window.location.hostname.includes('localhost');

    // Force test mode if URL parameter is present
    const urlParams = new URLSearchParams(window.location.search);
    const forceTest = urlParams.get('testMode') === 'true';

    if (isLocal || forceTest) {
console.log('ðŸ§ª Initializing Local Firebase Test Mode...');

// DEPLOYMENT NOTE: When deploying to production, you can either:
// 1. Remove this entire file from your build, OR
// 2. Set this to false: const ENABLE_LOCAL_TESTING = false;
const ENABLE_LOCAL_TESTING = true;

if (!ENABLE_LOCAL_TESTING) {
    console.log('ðŸŒ Local testing disabled for production deployment');
    return;
}

// Wait for Firebase to be loaded
const initTest = () => {
    if (window.firebase) {
window.localFirebaseTest = new LocalFirebaseTest();

// Add global test functions
window.clearTestData = () => window.localFirebaseTest.clearTestData();
window.loadTestScenario = (scenario) => window.localFirebaseTest.loadTestScenario(scenario);
window.forceFirebaseConnection = () => window.localFirebaseTest.forceConnection();
window.setRealFirebaseUID = (uid) => window.localFirebaseTest.setRealFirebaseUID(uid);
window.forceRealUID = () => {
    localStorage.clear();
    window.localFirebaseTest.testUID = 'hzl3M39ICUZXAtkcngVz5jFs7802';
    window.localFirebaseTest.forceConnection();
    location.reload();
};

console.log('ðŸ”§ Local test functions available:');
console.log('  - clearTestData() - Clear all test data');
console.log('  - loadTestScenario("full") - Load full test data');
console.log('  - loadTestScenario("empty") - Clear all data');
console.log('  - forceFirebaseConnection() - Force Firebase connection for testing');
console.log('  - setRealFirebaseUID("your-uid") - Connect to your real Firebase account');
console.log('  - forceRealUID() - Force connection to your real UID and reload page');
    } else {
console.log('â³ Waiting for Firebase to load...');
setTimeout(initTest, 1000);
    }
};

initTest();
    } else {
console.log('ðŸŒ Running in production mode (no local test data)');
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalFirebaseTest;
}
