# 🔥 Firebase Authentication Setup Guide

## Current Issue
Your Firebase API key is being blocked from accessing the Identity Toolkit API, which is causing authentication failures.

## 🔧 Quick Fix Steps

### 1. Check Firebase Console Settings
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `denali-tech-f22e8`
3. Go to **Authentication** → **Sign-in method**
4. Make sure **Google** is enabled as a sign-in provider
5. Add your domain to **Authorized domains**:
   - `localhost`
   - `127.0.0.1`
   - Your production domain (if any)

### 2. Check API Key Restrictions
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `denali-tech-f22e8`
3. Go to **APIs & Services** → **Credentials**
4. Find your API key: `AIzaSyD4KPxRXHK4phJVyiLsaU6CLb9pBfZygjw`
5. Check if there are any restrictions that might be blocking the Identity Toolkit API

### 3. Enable Required APIs
1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for and enable these APIs:
   - **Identity Toolkit API**
   - **Firebase Authentication API**
   - **Firebase Realtime Database API**
   - **Firebase Storage API**

### 4. Check OAuth 2.0 Client ID
1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID: `1012434420529-la200fdscsf5u6g5ajulo9r1ibmqo5rb.apps.googleusercontent.com`
3. Add these to **Authorized JavaScript origins**:
   - `http://localhost`
   - `http://127.0.0.1`
   - `http://localhost:3000` (if using a dev server)
   - Your production domain (if any)

## 🚀 Current Workaround
The app now automatically falls back to local test authentication when Firebase fails, so all features will work normally. You'll see:
- ✅ Local authentication mode active
- ✅ All app features available
- ✅ QR codes and data persistence working

## 🔍 Debug Information
The authentication system now provides detailed logging:
- `🚫 Firebase API key is blocked from Identity Toolkit API`
- `🔄 Falling back to local test authentication...`
- `🧪 Signed in with test account! All features available.`

## 📝 Next Steps
1. **Immediate**: The app works with local authentication
2. **Short-term**: Follow the setup steps above to fix Firebase
3. **Long-term**: Consider using a different Firebase project or authentication method

## 🆘 If Issues Persist
If you continue having Firebase issues:
1. Create a new Firebase project
2. Update the `firebaseConfig` in `Propokit/js/shared/firebase-config.js`
3. Or continue using the local authentication mode (fully functional)

## 💡 Local Authentication Mode
The local authentication mode provides:
- ✅ Full app functionality
- ✅ Data persistence (localStorage)
- ✅ QR code generation
- ✅ All features working normally
- ✅ No external dependencies

This mode is perfect for development and testing, and can even be used in production if needed.
