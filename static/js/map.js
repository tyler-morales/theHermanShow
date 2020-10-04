function initMap() {
  let map;
  let bounds = new google.maps.LatLngBounds();
  let mapOptions = {
    mapTypeId: 'roadmap'
  };

  // Display a map on the web page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  map.setTilt(50);

  // Multiple markers location, latitude, and longitude
  let markers = [
    ['Brooklyn Museum, NY', 40.671531, -73.963588],
  ];

  // Info window content
  let infoWindowContent = [
    [
      '<div class="info_content">' +
      `<h3>name</h3>` +
      '<p>The Brooklyn Museum is an art museum located in the New York City borough of Brooklyn.</p>' +
      '</div>'
    ]
  ];

  // Add multiple markers to map
  let infoWindow = new google.maps.InfoWindow(),
    marker, i;

  // Place each marker on the map  
  for (i = 0; i < markers.length; i++) {
    let position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });

    // Add info window to marker    
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Center the map to fit all markers on the screen
    map.fitBounds(bounds);
  }

  // Set zoom level
  let boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
    this.setZoom(5);
    google.maps.event.removeListener(boundsListener);
  });

}
// Load initialize function
google.maps.event.addDomListener(window, 'load', initMap);