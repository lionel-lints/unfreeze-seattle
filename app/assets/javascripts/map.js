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

    // google.maps.event.addListener(map, 'click', addMarker);
  }


  // function initialize() {
  //   var mapCanvas = document.getElementById('map-canvas');
  //   var mapOptions = {
  //     center: new google.maps.LatLng(39.5, -98.35),
  //     zoom: 4,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  //   var map = new google.maps.Map(mapCanvas, mapOptions)
  // }

  initialize();

});