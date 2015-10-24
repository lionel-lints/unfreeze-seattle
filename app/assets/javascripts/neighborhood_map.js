$(function() {
  var map;
  var marker;
  var infoWindow;
  var polygon;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 47.6062095, lng: -122.3320708},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
}

  function museumMarkers() {
    museums.forEach(function(museum, index) {
      marker = new google.maps.Marker({
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
        marker.setMap(map);
      }
      else {
        marker.setVisible(false);
      }
    });
  }

  //landmarks
  function landmarkMarkers() {
    landmarks.forEach(function(landmark, index) {
      marker = new google.maps.Marker({
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
        marker.setMap(map);
      }
      else {
        marker.setVisible(false);
      }
    });
  }
  // parks
  function parkMarkers() {
    parks.forEach(function(park, index) {
      marker = new google.maps.Marker({
        position: {lat: park.latlng.lat, lng: park.latlng.lng},
        map: map,
        title:park.name
      });
      if (google.maps.geometry.poly.containsLocation(marker.position, polygon) || parkExceptions(park.latlng)) {
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
        marker.setMap(map);
      }
      else {
        marker.setVisible(false);
      }
    });
  }

initMap();

//load the neighborhood polygons
var file = neighborhood.polygon_url;

map.data.loadGeoJson(file);

$.get(file, function(data) {
  geoJSON = JSON.parse(data);
  coordsArray = geoJSON.features[0].geometry.coordinates[0];
  var polygonCoords = [];
  coordsArray.forEach(function(singleCoordArray) {
    coords = {};
    coords.lat = singleCoordArray[1];
    coords.lng = singleCoordArray[0];
    polygonCoords.push(coords);
  });

  polygon = new google.maps.Polygon({paths: polygonCoords});
  museumMarkers();
  parkMarkers();
  landmarkMarkers();
});

//orient the page to center on the selected neighborhood
var featureStyle = map.data.setStyle(function(feature) {
     return /** @type {google.maps.Data.StyleOptions} */({
       fillColor: feature.getProperty('color'),
       strokeWeight: 1
     });
   });
  // zoom to show all the features
  var bounds = new google.maps.LatLngBounds();
  map.data.addListener('addfeature', function (e) {
    processPoints(e.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
  });

  function processPoints(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      geometry.getArray().forEach(function (g) {
        processPoints(g, callback, thisArg);
      });
    }

    $('input[type=checkbox]').on('click', function(e) {
      var $evt = $(e.target);
      var type = $evt.attr('name');
      console.log(type);
      if (type == "landmark") {

      } else if (type == 'museum') {

      } else if (type== 'park') {

      } else {

      }

    });
  }

  function parkExceptions(latlng) {
    if (latlng.lat == 47.588951 && latlng.lng == -122.378676) {
      return true;
    }
    else if (latlng.lat == 47.58671 && latlng.lng == -122.400127) {
      return true;
    }
    else {
      return false;
    }
  }

});
