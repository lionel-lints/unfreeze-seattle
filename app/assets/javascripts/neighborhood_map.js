$(function() {
  var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 47.6062095, lng: -122.3320708}
    // mapTypeId: google.maps.mapTypeId.TERRAIN
  });
}

  map.data.loadGeoJson(neighborhood);

initMap();

});