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



});
