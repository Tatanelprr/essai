// Fonction pour initialiser la carte
function init() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnVya2FuLWNpcmFjaSIsImEiOiJjbHYwcnNlcDQxa3R6MmtueTB2NDByNHBzIn0.3Ge2Hi18B7yrEXTdu-bhNA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0.107929, 49.49437],
        zoom: 13
    });

    // Fonction pour récupérer les marqueurs sauvegardés
    function getSavedMarkers() {
        var savedMarkers = localStorage.getItem('markers');
        return savedMarkers ? JSON.parse(savedMarkers) : [];
    }

    // Fonction pour sauvegarder les marqueurs
    function saveMarkers(markers) {
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    var savedMarkers = getSavedMarkers();

    // Ajouter les marqueurs sauvegardés à la carte
    savedMarkers.forEach(function(markerData) {
        var popup = new mapboxgl.Popup()
            .setHTML("<h3>" + markerData.title + "</h3><p>" + markerData.description + "</p>");

        var marker = new mapboxgl.Marker()
            .setLngLat(markerData.lngLat)
            .setPopup(popup)
            .addTo(map);
    });

    // Écouter le clic sur le bouton "Ajouter un marqueur"
    var addMarkerButton = document.getElementById('add-marker-mode');
    addMarkerButton.addEventListener('click', function() {
        // Activer le mode d'ajout de marqueur
        map.getCanvas().style.cursor = 'crosshair'; // Modifier le curseur pour indiquer que l'utilisateur peut ajouter un marqueur
        
        // Activer l'écouteur de clic sur la carte
        map.once('click', function(e) {
            var lngLat = e.lngLat;

            var title = prompt("Entrez le titre du marqueur :");
            var description = prompt("Entrez la description du marqueur :");

            var popup = new mapboxgl.Popup()
                .setHTML("<h3>" + title + "</h3><p>" + description + "</p>");

            var marker = new mapboxgl.Marker()
                .setLngLat(lngLat)
                .setPopup(popup)
                .addTo(map);

            // Enregistrer le nouveau marqueur
            savedMarkers.push({ lngLat: [lngLat.lng, lngLat.lat], title: title, description: description });
            saveMarkers(savedMarkers);

            // Désactiver le mode d'ajout de marqueur après avoir ajouté le marqueur
            map.getCanvas().style.cursor = '';
        });
    });
}

init();