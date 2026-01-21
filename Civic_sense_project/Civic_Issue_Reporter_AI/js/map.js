// Google Maps Logic

function initMap() {
    // Default location (e.g., San Francisco or generic city center)
    // You can change this to your hackathon city's coordinates
    const defaultLocation = { lat: 37.7749, lng: -122.4194 }; 

    // The map, centered at default location
    const map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 12,
        center: defaultLocation,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false
    });

    // Add a marker at the center (Placeholder for reported issues)
    const marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: "Default Location",
    });

    // Placeholder: In the future, this is where we will fetch issues from Firestore
    // and loop through them to add markers.
    console.log("Map initialized.");
}

// Handle Google Maps API Error (if key is missing/invalid)
window.gm_authFailure = function() {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb;">
                <h3>Google Maps Error</h3>
                <p>The map could not load. Please check your API key in map.html.</p>
                <p>This is expected if you haven't replaced 'YOUR_API_KEY' yet.</p>
            </div>
        `;
    }
};
