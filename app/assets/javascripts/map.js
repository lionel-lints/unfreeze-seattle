$(function() {
  var map;
  var $body = $('body');

  // this function shows map and adds a new place
  function initialize() {
    var fileName = ['admiral', 'alki', 'arbor_heights', 'atlantic', 'ballard'];
    // var geojson;
    //load and center map on US
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 11,
      center: {lat: 47.6062095, lng: -122.3320708}  //center it on united states
    });

    // geojson = JSON.parse('geojson/ballard.geojson');

    fileName.forEach(function(neighborhood, index) {
      var file = 'geojson/' + neighborhood + '.geojson';
      console.log(file);
      // var parsedFile = $.parseJSON(file);

      // console.log(parsedFile);
      map.data.loadGeoJson(file);
      console.log(parsedFile);

    });

    map.data.setStyle({
      fillColor: 'purple',
      strokeWeight: 1
    });

    // map.data.addListener('click', function(event) {
    //   document.getElementById('info-box').textContent = event.feature.getProperty('letter');
    // });

    // google.maps.event.addListener(map, 'click', addMarker);
  }


  // function loadGeoJsonString(geoString) {
  //   var geojson = JSON.parse(geoString);
  //   map.data.addGeoJson(geojson);
  //   zoom(map);
  // }

  initialize();

});