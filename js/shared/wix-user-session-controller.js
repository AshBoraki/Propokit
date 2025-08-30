*******************
// ****** [F-014 - MODIFIED FOR PROFILE UI] ****** Wix Message Listener ********************************
window.addEventListener("message", async function(event) {
  const FUNC_ID_F014 = "[F-014 MODIFIED - Profile UI]";

  if (!event || !event.data) return;

  console.log(`${FUNC_ID_F014} Received message from origin: ${event.origin}. Data:`, event.data);

  // --- LOGOUT / CLEAR ---
  if (event.data.clear) {
console.log(`${FUNC_ID_F014} Wix 'clear' message (Logout). Resetting to guest state...`);
localStorage.removeItem("firebaseUID");
resetUserProfileUI(); // Reset the profile display
await reinitializeFirebaseRefs("");
appInitialized = true;
return;
  }

  // --- LOGIN / REFRESH ---
  let newUIDFromMessage = event.data.firebaseUID;
  let userNameFromMessage = event.data.userName;
  let userEmailFromMessage = event.data.userEmail;

  // Update the profile UI as soon as we get the data
  if (userNameFromMessage || userEmailFromMessage) {
  updateUserProfileUI(userNameFromMessage, userEmailFromMessage);
  }

  // Condition to (re)initialize Firebase data
  if (newUIDFromMessage !== undefined && (newUIDFromMessage !== currentFirebaseUID || !appInitialized)) {
console.log(`${FUNC_ID_F014} Wix 'firebaseUID' message. New: "${newUIDFromMessage}". Initializing app...`);
await reinitializeFirebaseRefs(newUIDFromMessage);
appInitialized = true;
  } else if (event.data.refresh && appInitialized) {
console.log(`${FUNC_ID_F014} Wix 'refresh' signal for UID: "${currentFirebaseUID}". Re-initializing...`);
await reinitializeFirebaseRefs(currentFirebaseUID);
  }
}, false);
// ****** END [F-014 - MODIFIED FOR PROFILE UI] *********************************************************


  // ****** [NEW_PROFILE_UI_001] ****** Get Initials from Name ******
// TL;DR: Creates 1 or 2 initials from a full name.
function getInitials(name) {
if (!name || typeof name !== 'string') return '?';
const parts = name.trim().split(' ');
const first = parts[0] ? parts[0][0] : '';
const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
return (first + last).toUpperCase();
}
// ****** END [NEW_PROFILE_UI_001] ****************************************

// ****** [NEW_PROFILE_UI_002] ****** Update User Profile UI ******
// TL;DR: Updates the header with the logged-in user's details.
function updateUserProfileUI(name, email) {
if (name) {
document.getElementById('profile-user-name').textContent = name;
document.querySelector('#user-avatar-trigger span').textContent = getInitials(name);
}
if (email) {
document.getElementById('profile-user-email').textContent = email;
}
}
// ****** END [NEW_PROFILE_UI_002] ****************************************

// ****** [NEW_PROFILE_UI_003] ****** Reset User Profile UI ******
// TL;DR: Resets the header to a "Guest" state on logout.
function resetUserProfileUI() {
document.getElementById('profile-user-name').textContent = 'Guest User';
document.getElementById('profile-user-email').textContent = 'Not logged in';
document.querySelector('#user-avatar-trigger span').textContent = 'GU';
}
// ****** END [NEW_PROFILE_UI_003] ****************************************
