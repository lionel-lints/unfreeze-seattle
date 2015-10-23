 $(function() {
  var map;
  var infowindow;
  var $dropdownBox = $('.dropdown-container');
  var $links = $('.nhd-link');
  var $dropdown = $('.dropdown');
  var link;

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

  function dropdownHandler(e) {
    var $evt = $(e.target);
    var $selectMain = $('.select-main p');
    var $go = $('#go');
    var link;
    // var $dropdown = $('.dropdown');

    // console.log($evt);

    e.stopPropagation();

    if ($evt.is($selectMain)) {
      selectHandler();
    } else if ($evt.is($links)) {
      linkHandler($evt, $selectMain);
    } else if ($evt.is($go)) {
      goToLink($selectMain);
    }

  }
//TOGGLE!
  function selectHandler() {
    $dropdown.toggle();
  }

  function linkHandler($evt, $selectMain) {
    // console.log(link);
    link = $evt.attr('data-link');
    selectHandler();
    $selectMain.html($evt.html());
  }

  // function loadGeoJsonString(geoString) {
  //   var geojson = JSON.parse(geoString);
  //   map.data.addGeoJson(geojson);
  //   zoom(map);
  // }

  function highlightBG(e) {
    $evt = $(e.target);
    $evt.toggleClass('highlight');
  }

  function goToLink($selectMain) {
    var path = '/' + link;
    window.location.href = path;
  }

  initialize();
  $dropdownBox.on('click', dropdownHandler);
  $links.on('mouseenter', highlightBG);
  $links.on('mouseleave', highlightBG);
});