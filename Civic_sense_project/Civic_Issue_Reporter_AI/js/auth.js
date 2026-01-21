// Authentication Logic

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // 1. Login Logic
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            console.log('Initiating Google Login...');
            try {
                // This triggers the Google Sign-In popup
                const result = await auth.signInWithPopup(provider);
                const user = result.user;
                console.log('User logged in:', user.displayName);
                
                // Redirect to report page after successful login
                window.location.href = 'report.html';
                
            } catch (error) {
                console.error("Login Failed:", error);
                alert(`Login Failed: ${error.message}`);
            }
        });
    }

    // 2. Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            console.log('Initiating Logout...');
            try {
                await auth.signOut();
                console.log('User signed out');
                window.location.href = 'index.html';
            } catch (error) {
                console.error("Logout Failed:", error);
            }
        });
    }

    // 3. Auth State Observer (Protect Routes)
    auth.onAuthStateChanged((user) => {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (user) {
            console.log("User is signed in:", user.email);
            
            // If user is on landing page, redirect to report
            if (currentPage === 'index.html' || currentPage === '') {
                window.location.href = 'report.html';
            }
            
            // Optional: Update UI with user info if elements exist
            // const userNameDisplay = document.getElementById('user-name-display');
            // if (userNameDisplay) userNameDisplay.textContent = user.displayName;

        } else {
            console.log("User is signed out");
            
            // If user is on protected pages (report.html, map.html), redirect to login
            if (currentPage === 'report.html' || currentPage === 'map.html') {
                // Prevent infinite redirect loop if verify logic runs before page load
                // But generally safe to redirect to index
                window.location.href = 'index.html';
            }
        }
    });
});
