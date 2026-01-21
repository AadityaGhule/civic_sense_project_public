// Report Issue Logic

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('issue-image');
    const imagePreview = document.getElementById('image-preview');
    const locationStatus = document.getElementById('location-status');
    const getLocationBtn = document.getElementById('get-location-btn');
    const reportForm = document.getElementById('report-form');

    // 1. Image Preview Logic
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px;">`;
                }
                
                reader.readAsDataURL(file);
            } else {
                imagePreview.innerHTML = '<p>No image selected</p>';
            }
        });
    }

    // 2. Location Logic (Placeholder/Browser API)
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', () => {
            locationStatus.textContent = "Locating...";
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        locationStatus.textContent = `Location found: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        document.getElementById('latitude').value = lat;
                        document.getElementById('longitude').value = lng;
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        locationStatus.textContent = "Location access denied. Using default.";
                    }
                );
            } else {
                locationStatus.textContent = "Geolocation not supported.";
            }
        });
    }

    // 3. Form Submission (Placeholder)
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Report submitted successfully! (This is a placeholder - no data was sent to server)");
            // Reset form
            reportForm.reset();
            imagePreview.innerHTML = '<p>No image selected</p>';
            locationStatus.textContent = "Detecting location...";
        });
    }
});
