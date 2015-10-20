$(function() {
  var map;
  var $body = $('body');

  // this function shows map and adds a new place
  function initialize() {
    //load and center map on US
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 12,
      center: {lat: 47.6062095, lng: -122.3320708}  //center it on united states
    });

    var mapDiv = document.getElementById('map-canvas');

    map.data.loadGeoJson('localhost:3000/lib/assets/geojson');

    // google.maps.event.addListener(map, 'click', addMarker);
  }


  // function loadGeoJsonString(geoString) {
  //   var geojson = JSON.parse(geoString);
  //   map.data.addGeoJson(geojson);
  //   zoom(map);
  // }

  initialize();

});