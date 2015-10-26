$(function() {
  var map;
  // var marker;
  var file = neighborhood.polygon_url;
  var infoWindow;
  var polygon;
  var $checkboxes = $('input[type=checkbox]');
  var markersSet = {
    'landmarks': true,
    'museums': true,
    'parks': true
  };
  var markerId = 0;
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
      museumMarkers();
      parkMarkers();
      landmarkMarkers();
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


  //set museum markers
  function museumMarkers() {
    // if (markersSet.museums) {
      museums.forEach(function(museum, index) {
        var marker = new google.maps.Marker({
          position: {lat: museum.latlng.lat, lng: museum.latlng.lng},
          map: map,
          title: museum.name
        });
        if (google.maps.geometry.poly.containsLocation(marker.position, polygon)) {
          marker.addListener('click', function(event) {
          museum_content = '<h3>MUSEUM</h3><a href=' + '"' + museum.url + '"' + 'target="_blank">' + museum.name + '</a> <br>' + museum.address;
            if (infoWindow) {
              infoWindow.close();
            }
            infoWindow = new google.maps.InfoWindow({
              content: museum_content,
              position: event.latLng
            });
            infoWindow.open(map);
          });
          marker.type = 'museums';
          marker.setMap(map);
          markers.push(marker);
        } else {
          marker.setMap(null);
        }
      });
    // } else {
    //   markers.forEach(function(marker) {
    //     marker.setVisible(false);
    //   });
    // }
  }

  //set landmark markers
  function landmarkMarkers() {
    landmarks.forEach(function(landmark, index) {
      var marker = new google.maps.Marker({
        position: {lat: landmark.latlng.lat, lng: landmark.latlng.lng},
        map: map,
        title:landmark.name
      });
      if (google.maps.geometry.poly.containsLocation(marker.position, polygon)) {
        marker.addListener('click', function(event) {
        landmark_content = '<h3>LANDMARK</h3><a href=' + '"' + landmark.url + '"' + 'target="_blank">' + landmark.name + '</a> <br>' + landmark.address;
          if (infoWindow) {
            infoWindow.close();
          }
          infoWindow = new google.maps.InfoWindow({
            content: landmark_content,
            position: event.latLng
          });
          infoWindow.open(map);
        });
        marker.type = 'landmarks';
        marker.setMap(map);
        markers.push(marker);
      } else {
        marker.setMap(null);
      }
    });
  }

  // set park markers
  function parkMarkers() {
    parks.forEach(function(park, index) {
        var marker = new google.maps.Marker({
          position: {lat: park.latlng.lat, lng: park.latlng.lng},
          map: map,
          title:park.name
        });
        if (google.maps.geometry.poly.containsLocation(marker.position, polygon)) {
          marker.addListener('click', function(event) {
          park_content = '<h3>PARK</h3><a href=' + '"' + park.url + '"' + 'target="_blank">' + park.name + '</a> <br>' + park.address;
            if (infoWindow) {
              infoWindow.close();
            }
            infoWindow = new google.maps.InfoWindow({
              content: park_content,
              position: event.latLng
            });
            infoWindow.open(map);
          });
          marker.type = 'parks';
          marker.setMap(map);
          markers.push(marker);
        } else {
          marker.setMap(null);
        }
    });
  }

  function toggleHandler(e) {
    var $evt = $(e.target);
    var type = $evt.attr('name');
    console.log(type);
    //toggle true or false value in object
    markersSet[type] = !markersSet[type];
    console.log(markersSet);
    if (markersSet[type]) {
      toggleMarkers(type, true);
    } else {
      toggleMarkers(type, false);
    }
  }

  initMap();


  $checkboxes.on('click', toggleHandler);

  function toggleMarkers(type, onOff) {
    markers.forEach(function(marker) {
      if (marker.type === type) {
        marker.setVisible(onOff);
      }
    });
  }

});