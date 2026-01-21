// Report Issue Logic

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('issue-image');
    const imagePreview = document.getElementById('image-preview');
    const locationStatus = document.getElementById('location-status');
    const getLocationBtn = document.getElementById('get-location-btn');
    const reportForm = document.getElementById('report-form');
    
    // AI Elements
    const aiStatus = document.getElementById('ai-verification-status');
    const aiLoading = document.querySelector('.ai-loading');
    const aiResult = document.querySelector('.ai-result');
    const issueDesc = document.getElementById('issue-desc');
    const submitBtn = reportForm.querySelector('button[type="submit"]');

    let isVerifiedIssue = false;

    // 1. Image Preview & AI Logic
    if (imageInput) {
        imageInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (file) {
                // Show preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px;">`;
                }
                reader.readAsDataURL(file);

                // Start AI Verification
                if (aiStatus) {
                    aiStatus.classList.remove('hidden');
                    aiLoading.classList.remove('hidden');
                    aiResult.classList.add('hidden');
                    submitBtn.disabled = true;
                    submitBtn.classList.add('btn-disabled');

                    // Call Gemini API
                    const analysis = await analyzeImageWithGemini(file);
                    
                    aiLoading.classList.add('hidden');
                    aiResult.classList.remove('hidden');

                    if (analysis && analysis.isCivicIssue) {
                        isVerifiedIssue = true;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-disabled');
                        
                        aiResult.innerHTML = `
                            <div class="alert alert-success">
                                <span class="material-icons-round">check_circle</span>
                                <div>
                                    <strong>Verified: ${analysis.category}</strong>
                                    <p>${analysis.reason}</p>
                                </div>
                            </div>
                        `;
                        
                        // Auto-fill description if empty
                        if (!issueDesc.value) {
                            issueDesc.value = `Reported: ${analysis.category}. ${analysis.reason}`;
                        }
                    } else {
                        isVerifiedIssue = false;
                        // Keep submit disabled? Or allow override?
                        // For hackathon "Rejects irrelevant images", let's keep it disabled or show warning.
                        
                        aiResult.innerHTML = `
                            <div class="alert alert-error">
                                <span class="material-icons-round">error</span>
                                <div>
                                    <strong>Not a Civic Issue</strong>
                                    <p>${analysis ? analysis.reason : "Analysis failed."}</p>
                                </div>
                            </div>
                        `;
                    }
                }

            } else {
                imagePreview.innerHTML = '<p>No image selected</p>';
                if (aiStatus) aiStatus.classList.add('hidden');
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
            
            if (!isVerifiedIssue) {
                alert("Please upload a valid image of a civic issue.");
                return;
            }

            alert("Report submitted successfully! (This is a placeholder - no data was sent to server)");
            // Reset form
            reportForm.reset();
            imagePreview.innerHTML = '<p>No image selected</p>';
            if (aiStatus) aiStatus.classList.add('hidden');
            locationStatus.textContent = "Detecting location...";
            isVerifiedIssue = false;
        });
    }
});
