$(function() {
  var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 47.6062095, lng: -122.3320708},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var marker;
  var infoWindow;

  console.log(landmarks)
  museums.forEach(function(museum, index) {

    infowindow = new google.maps.InfoWindow({
      content: museum.url
    });

    marker = new google.maps.Marker({
      position: {lat: museum.lat, lng: museum.lng},
      map: map,
      title: museum.name
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });

  landmarks.forEach(function(landmark, index) {

    infowindow = new google.maps.InfoWindow({
      content: landmark.url
    });

    marker = new google.maps.Marker({
      position: {lat: landmark.lat, lng: landmark.lng},
      map: map,
      title: landmark.name
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  })
  marker.setMap(map);
}

initMap();

file = neighborhood.polygon_url

map.data.loadGeoJson(file);

// Set the stroke width, and fill color for each polygon
var featureStyle = {
  fillColor: '#ADFF2F',
  fillOpacity: 0.1,
  strokeColor: '#ADFF2F',
  strokeWeight: 1
};

  // zoom to show all the features
  var bounds = new google.maps.LatLngBounds();
  map.data.addListener('addfeature', function (e) {
    processPoints(e.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
  });

  // zoom to the clicked feature
  map.data.addListener('click', function (e) {
    var bounds = new google.maps.LatLngBounds();
    processPoints(e.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
  });

function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function (g) {
      processPoints(g, callback, thisArg);
    });
  }
}


});
