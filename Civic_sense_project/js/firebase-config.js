// Firebase Configuration (Placeholders)
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
// Note: This initialization is safe even with placeholder keys for UI development
// but will fail network requests until real keys are provided.
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized");
} catch (error) {
    console.warn("Firebase initialization failed (expected if using placeholders):", error);
}
