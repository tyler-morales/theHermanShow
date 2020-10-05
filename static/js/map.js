let stations = [{
    "name": "KAKX 89.3 FM",
    "location": "Mendocino, California",
    "lat": 39.305168,
    "lon": -123.798210,
    "time": "Wed 9 am"
  },
  {
    "name": "KOYO 107.1 FM",
    "location": "Oroville, California",
    "lat": 39.512341,
    "lon": -121.554611,
    "time": "Wed 1 pm"
  },
  {
    "name": "KCXU 92.7 FM",
    "location": "San Jose, California",
    "lat": 37.337207,
    "lon": -121.887082,
    "time": "Sat 9 pm"
  },
  {
    "name": "WDBX 91.1 FM",
    "location": "Carbondale, Illinois",
    "lat": 37.725237,
    "lon": -89.216705,
    "time": "Thu 12 am"
  },
  {
    "name": "WHFH 88.5 FM",
    "location": "Flossmoor, Illinois",
    "lat": 41.542577,
    "lon": -87.684628,
    "time": "Thu 6 pm"
  },
  {
    "name": "WLTL 88.1 FM",
    "location": "LaGrange, Illinois",
    "lat": 41.814218,
    "lon": -87.869112,
    "time": "Sun 10 pm"
  },
  {
    "name": "WLNX 88.9 FM",
    "location": "	Lincoln, Illinois",
    "lat": 40.146213,
    "lon": -89.361344,
    "time": "Sun 9 pm"
  },
  {
    "name": "WARG 88.9 FM",
    "location": "Crete, Illinois",
    "lat": 41.444472,
    "lon": -87.632813,
    "time": "Returning soon"
  },
  {
    "name": "WBRO 89.9 FM",
    "location": "Marengo, Indiana",
    "lat": 38.369075,
    "lon": -86.342390,
    "time": "Mon 8 pm"
  },
  {
    "name": "WMNB 107.1 FM",
    "location": "North Adams, Massachusetts",
    "lat": 42.699428,
    "lon": -73.114180,
    "time": "Sat 12 pm"
  },
  {
    "name": "WUPI 92.1 FM",
    "location": "Presque Isle, Maine",
    "lat": 46.682465,
    "lon": -68.013928,
    "time": "Returning soon"
  },
  {
    "name": "WAHS 89.5 FM",
    "location": "Auburn Hills, Michigan",
    "lat": 42.671343,
    "lon": -83.220561,
    "time": "Sun 12 pm"
  },
  {
    "name": "WBFH 88.1 FM",
    "location": "Bloomfield Hills, Michigan",
    "lat": 42.583994,
    "lon": -83.244007,
    "time": "Sat 10 pm"
  },
  {
    "name": "WNBI 107.9 FM",
    "location": "New Buffalo, Michigan",
    "lat": 41.792697,
    "lon": -86.746864,
    "time": "Wed 7 pm, Thu 12 am"
  },
  {
    "name": "WNTE 89.5 FM",
    "location": "Mansfield, Pennsylvania",
    "lat": 41.806559,
    "lon": -77.077860,
    "time": "Thu 12 pm"
  },
  {
    "name": "CKDJ 107.9 FM",
    "location": "Ottawa, Ontario, Canada",
    "lat": 45.420434,
    "lon": -75.692442,
    "time": "Sat 11 am"
  },
  {
    "name": "CKLU 96.7 FM",
    "location": "Sudbury, Ontario, Canada",
    "lat": 46.489520,
    "lon": -80.989155,
    "time": "Thu 9 pm"
  },
  {
    "name": "CFRG 93.1 FM",
    "location": "Gravelbourg, Saskatchewan, Canada",
    "lat": 49.872896,
    "lon": -106.550720,
    "time": "Thu 10 pm, Fri 10 pm"
  }
]

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
  let markers = []
  stations.forEach((station) => {
    markers.push([station.name, station.lat, station.lon]);
  });

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
// google.maps.event.addDomListener(window, 'load', initMap);