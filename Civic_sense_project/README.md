# Civic Issue Reporter

**Hackathon Project - Pre-build Phase (50% Completion)**

## Project Description
Civic Issue Reporter is a web application designed to empower citizens to report local civic issues (like potholes, broken streetlights, or trash) directly to authorities. Users can log in, upload a photo of the issue, and pin its location. All reported issues are visualized on an interactive Google Map.

## Technologies Used
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Google Cloud Platform:**
  - **Google Maps JavaScript API:** To display reported issues on an interactive map.
  - **Firebase:**
    - **Authentication:** For Google Sign-In (Configured).
    - **Firestore:** Database to store issue details (Configured).
    - **Storage:** To store uploaded images (Configured).
    - **Hosting:** For deployment (Configured).

## Project Structure
```
civic-issue-reporter/
├── index.html        // Landing page with Google Login
├── report.html       // Issue reporting form
├── map.html          // Interactive map view
├── css/
│   └── style.css     // Global styles
├── js/
│   ├── firebase-config.js // Firebase configuration
│   ├── auth.js       // Authentication logic
│   ├── report.js     // Form handling logic
│   └── map.js        // Google Maps logic
└── README.md
```

## Setup Instructions
1. **Firebase Setup:**
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Google Sign-in), Firestore, and Storage.
   - Copy your web app configuration keys.
   - Open `js/firebase-config.js` and replace the placeholder values with your actual config.

2. **Google Maps Setup:**
   - Get an API Key from the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the "Maps JavaScript API".
   - Open `map.html` and replace `YOUR_API_KEY` in the script tag with your actual API key.

3. **Run Locally:**
   - Open `index.html` in your browser.
   - Note: For Google Auth to work properly, you may need to run this on a local server (e.g., using VS Code Live Server or `python -m http.server`).

## Note for Judges/Reviewers
**Current Status:** Pre-hackathon build (50%).
- **Implemented:** UI/UX, Project Structure, Configuration placeholders, Frontend logic (Maps/Forms).
- **To Be Completed (During Hackathon):** Backend integration (Auth, DB writes), Image upload implementation, Real-time map updates.
