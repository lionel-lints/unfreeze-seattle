 $(function() {
  var map;
  var infowindow;
  var $dropdown = $('.dropdown-container');
  // var $body = $('body');

  // this function shows map and adds a new place
  function initialize() {
    var neighborhoods = ["admiral","alki","arbor_heights","atlantic",
      "ballard","beacon_hill","belltown","bitter_lake","blue_ridge","brighton","broadmoor","broadview","bryant",
      "capitol_hill","cedar_park","central_district","columbia_city","crown_hill",
      "denny-blaine","downtown","eastlake","fauntleroy","first_hill","fremont",
      "georgetown","green_lake","greenwood","haller_lake","hawthorne_hills","high_point","highland_park",
      "industrial_district","interbay","international_district",
      "laurelhurst","leschi","lower_queen_anne","loyal_heights",
      "madison_park","madison_valley","madrona","magnolia","maple_leaf","matthews_beach","meadowbrook","montlake","mount_baker",
      "north_beach","north_college_park","north_delridge","northgate","olympic_hills","olympic_manor",
      "phinney_ridge","pinehurst","pioneer_square","portage_bay","queen_anne",
      "rainier_beach","ravenna","riverview","roosevelt","roxhill",
      "sand_point","seward_park","south_delridge","south_lake_union","south_park","sunset_hill",
      "university_district","victory_heights","view_ridge",
      "wallingford","wedgwood","west_seattle","westlake","whittier_heights","windermere"];
    // var geojson;
    //load and center map on US
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 11,
      center: {lat: 47.6062095, lng: -122.3320708}  //center it on united states
    });

    // geojson = JSON.parse('geojson/ballard.geojson');

    neighborhoods.forEach(function(neighborhood, index) {
      var file = 'geojson/' + neighborhood + '.geojson';
      // console.log(file);
      // var parsedFile = $.parseJSON(file);
      // console.log(parsedFile);

            //get request, get data

      map.data.loadGeoJson(file);
    });

    map.data.setStyle(function(feature) {
      return /** @type {google.maps.Data.StyleOptions} */({
        fillColor: feature.getProperty('color'),
        strokeWeight: 1
      });
    });

    map.data.addListener('click', function(event) {
      if (infowindow) {
        infowindow.close();
      }
      // console.log(event);
      // infoWindow.close();
      infowindow = new google.maps.InfoWindow({
        content: event.feature.getProperty('infoW'),
        position: event.latLng
      });
      infowindow.open(map);
      // document.getElementById('name').textContent = event.feature.getProperty('name');
      // document.getElementById('path').innerHTML = event.feature.getProperty('link');
      // document.getElementById('wiki-data').textContent = event.feature.getProperty('wikiContent');
    });

    map.data.addListener('mouseover', function(event) {
      var noColor = "rgba(0, 0, 0, 0)";
      map.data.overrideStyle(event.feature, {fillColor: noColor});
    });

    map.data.addListener('mouseout', function(event) {
      map.data.revertStyle();
    });
    //***********mouseout close

    // google.maps.event.addListener(map, 'click', addMarker);
  }

  function dropdownHandler(evt) {
    var $evt = $(evt.target);

    console.log($evt);
  }

  // function loadGeoJsonString(geoString) {
  //   var geojson = JSON.parse(geoString);
  //   map.data.addGeoJson(geojson);
  //   zoom(map);
  // }

  initialize();
  $dropdown.on('click', dropdownHandler);
});