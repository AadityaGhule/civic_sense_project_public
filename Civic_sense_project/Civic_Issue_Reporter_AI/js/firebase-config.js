// Firebase Configuration
// Replace these values with your actual Firebase project credentials
// You can get these from Project Settings > General > Your Apps > Web App in Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized");
} catch (error) {
    console.warn("Firebase initialization failed:", error);
    console.warn("Please update js/firebase-config.js with your actual Firebase credentials.");
}

// NOTE:
// 1. Go to Firebase Console > Authentication > Sign-in method
// 2. Enable "Google" provider
// 3. Ensure "Authorized domains" includes your testing domain (e.g., localhost)
