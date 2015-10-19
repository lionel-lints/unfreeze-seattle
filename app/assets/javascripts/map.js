$(function() {
  var map;
  var $body = $('body');

  //this function shows map and adds a new place
  (function initialize() {
    //load and center map on US
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 4,
      center: {lat: 39.5, lng: -98.35}  //center it on united states
    });

    var mapDiv = document.getElementById('map-canvas');

    // google.maps.event.addListener(map, 'click', addMarker);
  })();

});