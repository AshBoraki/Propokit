const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = {
  // You'll need to generate a service account key from Firebase Console
  // Go to Project Settings > Service Accounts > Generate New Private Key
  type: "service_account",
  project_id: "denali-tech-f22e8",
  private_key_id: "YOUR_PRIVATE_KEY_ID",
  private_key: "YOUR_PRIVATE_KEY",
  client_email: "firebase-adminsdk-xxxxx@denali-tech-f22e8.iam.gserviceaccount.com",
  client_id: "YOUR_CLIENT_ID",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40denali-tech-f22e8.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'denali-tech-f22e8'
});

async function addAuthorizedDomain() {
  try {
    // Note: Firebase Admin SDK doesn't directly support adding authorized domains
    // This would need to be done through the Firebase Console or REST API
    console.log('Firebase Admin SDK initialized');
    console.log('To add propokit.com to authorized domains:');
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/denali-tech-f22e8/authentication/settings');
    console.log('2. Scroll down to "Authorized domains"');
    console.log('3. Click "Add domain"');
    console.log('4. Add "propokit.com"');
    console.log('5. Click "Save"');
  } catch (error) {
    console.error('Error:', error);
  }
}

addAuthorizedDomain();
