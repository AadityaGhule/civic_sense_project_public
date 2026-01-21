// Gemini API Integration

const GEMINI_API_KEY = "AIzaSyBW8JH2QoEoSzAerA7yOc6zynwZbqQVSu4"; // Replace with your actual key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Analyzes an image using Google Gemini API to verify if it is a civic issue.
 * @param {File} imageFile - The image file to analyze.
 * @returns {Promise<Object>} - The analysis result { isCivicIssue, category, reason }.
 */
async function analyzeImageWithGemini(imageFile) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "AIzaSyBW8JH2QoEoSzAerA7yOc6zynwZbqQVSu4") {
        console.warn("Gemini API Key is missing. Returning mock data.");
        return mockGeminiAnalysis();
    }

    try {
        const base64Image = await fileToBase64(imageFile);
        
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64Image.split(',')[1];

        const prompt = `
        Analyze this image for a civic issue reporting app.
        Identify if the image contains a valid civic issue like a pothole, garbage dump, water leakage, broken streetlight, or similar public infrastructure problem.
        
        Return ONLY a JSON object with this structure (no markdown):
        {
            "isCivicIssue": boolean,
            "category": "Pothole" | "Garbage" | "Water" | "Streetlight" | "Other" | "Not a Civic Issue",
            "reason": "Short explanation of what is seen."
        }
        `;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        {
                            inline_data: {
                                mime_type: imageFile.type,
                                data: base64Data
                            }
                        }
                    ]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        const textResponse = data.candidates[0].content.parts[0].text;
        
        // Clean up markdown code blocks if Gemini adds them
        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("Gemini API Error:", error);
        alert("AI Verification failed. Please try again or check your API key.");
        return null;
    }
}

/**
 * Helper to convert file to Base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/**
 * Mock function for testing without a real API key
 */
function mockGeminiAnalysis() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Randomly simulate success or rejection for demo purposes
            const isIssue = Math.random() > 0.3; 
            if (isIssue) {
                const categories = ["Pothole", "Garbage", "Water", "Streetlight"];
                const category = categories[Math.floor(Math.random() * categories.length)];
                resolve({
                    isCivicIssue: true,
                    category: category,
                    reason: `AI detected a ${category.toLowerCase()} in the image.`
                });
            } else {
                resolve({
                    isCivicIssue: false,
                    category: "Not a Civic Issue",
                    reason: "The image does not appear to show a valid civic issue (e.g., selfie, landscape, indoor)."
                });
            }
        }, 2000);
    });
}
