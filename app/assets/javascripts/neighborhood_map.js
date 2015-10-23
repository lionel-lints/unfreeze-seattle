$(function() {
  var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 47.6062095, lng: -122.3320708},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  museums.forEach(function(museum, index) {
    var lat = museum.lat;
    var lng = museum.lng;
    var data = museum.name;

    var infowindow = new google.maps.InfoWindow({
      content: data
    });

    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map
    });
  });



  marker.addListener('click', function() {
  //google.maps.geometry.poly.containsLocation(latLng, bermudaTriangle)
    infowindow.open(map, marker);
  });
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
