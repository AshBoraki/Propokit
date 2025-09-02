# 🔥 Firebase Google Authentication Setup Guide

## 🚨 Current Issue
Your Firebase API key is blocked/restricted, which is why the Google login falls back to test mode.

## 🔧 Step-by-Step Fix

### 1. **Firebase Console Setup**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `denali-tech-f22e8`
3. **Go to Authentication**: Left sidebar → Authentication
4. **Enable Google Sign-in**:
   - Click "Sign-in method" tab
   - Click "Google" provider
   - Toggle "Enable" to ON
   - Add your support email
   - Click "Save"

### 2. **Fix API Key Restrictions**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: `denali-tech-f22e8`
3. **Go to APIs & Services**: Left sidebar → APIs & Services → Credentials
4. **Find your API key**: `AIzaSyD4KPxRXHK4phJVyiLsaU6CLb9pBfZygjw`
5. **Click on the API key** to edit it
6. **Remove restrictions** or add proper ones:
   - **Application restrictions**: Set to "None" or "HTTP referrers"
   - **API restrictions**: Set to "Don't restrict key" or add specific APIs:
     - `Firebase Authentication API`
     - `Firebase Realtime Database API`
     - `Firebase Storage API`

### 3. **Add Authorized Domains**

1. **Back to Firebase Console**: Authentication → Settings
2. **Authorized domains**: Add your domains:
   - `yourdomain.com` (if you have a custom domain)
   - `localhost` (for local development)
   - `127.0.0.1` (for local development)

### 4. **Enable Required APIs**

1. **Google Cloud Console**: APIs & Services → Library
2. **Search and enable these APIs**:
   - `Firebase Authentication API`
   - `Firebase Realtime Database API`
   - `Firebase Storage API`
   - `Identity Toolkit API`

### 5. **Test the Setup**

After making these changes:

1. **Wait 5-10 minutes** for changes to propagate
2. **Refresh your page**
3. **Try the login button**
4. **Check console** for successful Google authentication

## 🔍 Troubleshooting

### If still getting API blocked errors:

1. **Check API quotas**: Google Cloud Console → APIs & Services → Quotas
2. **Verify billing**: Ensure your project has billing enabled
3. **Check domain restrictions**: Make sure your domain is authorized
4. **Clear browser cache**: Hard refresh (Ctrl+F5)

### Common Issues:

- **"API_KEY_SERVICE_BLOCKED"**: API key restrictions too strict
- **"auth/popup-blocked"**: Browser blocking popups
- **"auth/unauthorized-domain"**: Domain not in authorized list

## 🎯 Expected Result

After fixing these issues, you should see:
```
🔐 Starting Google sign-in...
✅ Google sign-in successful: your.email@gmail.com
🎉 Successfully signed in with Google!
```

## 📞 Need Help?

If you're still having issues after following this guide, please:
1. Check the Firebase Console for any error messages
2. Verify all APIs are enabled
3. Ensure your domain is authorized
4. Check that billing is enabled on your Google Cloud project

---

**Note**: This guide assumes you have access to the Firebase Console and Google Cloud Console for your project. If you don't have access, you'll need to contact the project owner.
