$(function() {
  var map;
  var file = neighborhood.polygon_url;
  var infoWindow;
  var polygon;
  var $checkboxes = $('input[type=checkbox]');
  var $mapLegend = $('div.map-legend');
  var markersSet = {
    'landmarks': true,
    'museums': true,
    'parks': true
  };
  var markers = [];

  //initialize map
  function initMap() {
    var bounds;
    var polygonCoords = [];

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 47.6062095, lng: -122.3320708},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    map.data.loadGeoJson(file);
    map.data.setStyle(function(feature) {
      return /** @type {google.maps.Data.StyleOptions} */({
        fillColor: feature.getProperty('color'),
        strokeWeight: 1
      });
    });
    // zoom to show all the features
    bounds = new google.maps.LatLngBounds();
      map.data.addListener('addfeature', function(e) {
      processPoints(e.feature.getGeometry(), bounds.extend, bounds);
      map.fitBounds(bounds);
    });

    //Create Google Maps Polygon from geoJSON file for filtering
    $.get(file, function(data) {
      geoJSON = JSON.parse(data);
      coordsArray = geoJSON.features[0].geometry.coordinates[0];
      coordsArray.forEach(function(singleCoordArray) {
        coords = {};
        coords.lat = singleCoordArray[1];
        coords.lng = singleCoordArray[0];
        polygonCoords.push(coords);
      });

      polygon = new google.maps.Polygon({paths: polygonCoords});

     //if an array is empty, check or uncheck the box on load and popualte the object accordingly
     //load markers
      setMarkersOrDisableCheckboxes(parks, 'parks', true);
      setMarkersOrDisableCheckboxes(museums, 'museums', true);
      setMarkersOrDisableCheckboxes(landmarks, 'landmarks', true);
    });
  }

  //orient the page to center on the selected neighborhood
  function processPoints(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      geometry.getArray().forEach(function(g) {
        processPoints(g, callback, thisArg);
      });
    }
  }

  function setMarkersOrDisableCheckboxes(markerArray, type, markersInit) {
    var $checkbox = $('input[name=' + type + ']');
    if (markerArray.length !== 0) {
      if (markersInit) {
        setMarkers(markerArray, type);
      }
      $checkbox.prop('checked', true);
    } else {
      $checkbox.prop('checked', false);
      $checkbox.prop('disabled', true);
    }
  }


  //Create markers on map
  function setMarkers(featureArray, type) {
    featureArray.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.latlng,
        map: map,
        title: feature.name
      });
      if (google.maps.geometry.poly.containsLocation(marker.position, polygon)) {
        createInfoWindow(feature, marker, type);
        setSingleMarker(marker, type);
      } else {
        marker.setMap(null);
      }
    });
  }

  //Create Marker Content
  function selectMarkerContent(feature, type) {
    var contentTail = '<a href=' + '"' + feature.url + '"' + 'target="_blank">' + feature.name + '</a> <br>' + feature.address;
    if (type === 'museums') {
      return '<h3>MUSEUM</h3>' + contentTail;
    }
    else if (type === 'parks') {
      return '<h3>PARK</h3>' + contentTail;
    }
    else {
      return '<h3>LANDMARK</h3>' + contentTail;
    }
  }

  //Create InfoWindow on each marker
  function createInfoWindow(feature, marker, type) {
    marker.addListener('click', function(event) {
      markerContent = selectMarkerContent(feature, type);
      if (infoWindow) {
        infoWindow.close();
      }
      infoWindow = new google.maps.InfoWindow({
        content: markerContent,
        position: event.latLng
      });
      infoWindow.open(map);
    });
  }

  //Set marker on map and push into markers array
  function setSingleMarker(marker, type) {
    marker.type = type;
    marker.setMap(map);
    markers.push(marker);
  }

  //Handle marker type toggling
  function toggleHandler(e) {
    var $evt = $(e.target);
    var type = $evt.attr('name');
    //toggle true or false value in object
    markersSet[type] = !markersSet[type];
    if (markersSet[type]) {
      toggleMarkers(type, true);
    } else {
      toggleMarkers(type, false);
    }
  }

  //Toggle the markers
  function toggleMarkers(type, onOff) {
    markers.forEach(function(marker) {
      if (marker.type === type) {
        marker.setVisible(onOff);
      }
    });
  }

  function resetMap() {
    markers.forEach(function(marker) {
      marker.setVisible(true);
    });
    setMarkersOrDisableCheckboxes(parks, 'parks');
    setMarkersOrDisableCheckboxes(museums, 'museums');
    setMarkersOrDisableCheckboxes(landmarks, 'landmarks');
  }

  //Marker type toggle event handler
  $checkboxes.on('click', toggleHandler);

  //Reset Map Handler
  $mapLegend.on('click', 'button', resetMap);


  initMap();

});