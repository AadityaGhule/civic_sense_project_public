# Civic Issue Reporter - AI Enhanced

**Hackathon Project - "AI-Verified" Edition**

## Project Description
Civic Issue Reporter is a web application that uses **Google Gemini AI** to verify and categorize civic issues in real-time. Unlike traditional reporting apps, our platform ensures that only valid infrastructure problems (potholes, garbage, water leaks, etc.) are reported, reducing spam and helping authorities prioritize.

## Key Differentiator: AI-Based Issue Verification
1.  **Real-time Analysis:** When a user uploads a photo, Google Gemini analyzes it instantly.
2.  **Auto-Tagging:** The AI automatically detects the category (e.g., "Pothole", "Streetlight").
3.  **Spam Reduction:** Irrelevant images (selfies, landscapes) are rejected before submission.

## Technologies Used
-   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Modern UI)
-   **AI:** **Google Gemini API** (Gemini 1.5 Flash)
-   **Google Cloud Platform:**
    -   **Google Maps JavaScript API:** Interactive map visualization.
    -   **Firebase:** Auth, Firestore, Storage, Hosting.

## Project Structure
```
Civic_Issue_Reporter_AI/
├── index.html        // Landing page with Google Login
├── report.html       // Issue reporting form with AI Verification
├── map.html          // Interactive map view
├── css/
│   └── style.css     // Modern Design System
├── js/
│   ├── firebase-config.js // Firebase configuration
│   ├── gemini-api.js      // Google Gemini API integration
│   ├── auth.js       // Authentication logic
│   ├── report.js     // Form handling & AI logic
│   └── map.js        // Google Maps logic
└── README.md
```

## Setup Instructions
1.  **Google Gemini Setup:**
    -   Get an API Key from [Google AI Studio](https://aistudio.google.com/).
    -   Open `js/gemini-api.js` and replace `YOUR_GEMINI_API_KEY` with your key.

2.  **Firebase & Maps Setup:**
    -   Configure Firebase in `js/firebase-config.js`.
    -   Add Google Maps API Key in `map.html`.

3.  **Run Locally:**
    -   Serve the project locally (e.g., `python -m http.server`).

## Demo Flow
1.  Login (Simulated).
2.  Go to "Report Issue".
3.  Upload an image (e.g., a photo of a pothole).
4.  **Watch the AI analyze and verify the issue!**
5.  Submit the verified report.
