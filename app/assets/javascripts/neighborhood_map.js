$(function() {
  var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
}
file = neighborhood.polygon_url
map.data.loadGeoJson(file);


initMap();

});
