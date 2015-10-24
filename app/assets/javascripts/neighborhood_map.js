$(function() {
  var map;
  var marker;
  var infoWindow;
  var geojsondata;
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
      console.log(polygon);
      console.log(google.maps.geometry.poly.containsLocation(marker.position, polygon));
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
        marker.setMap(map);
      }
      else {
        marker.setVisible(false);
      }
    });
  }

initMap();

var file = neighborhood.polygon_url;

jQuery.get(file, function(data) {

    geoJSONData = JSON.parse(data);
    geojsonToPolygon = GeoJSON(geoJSONData);
    // polygon = new google.maps.Polygon(polygon);
    geojsonToPolygon.setMap(map);
    museumMarkers();
    parkMarkers();
    landmarkMarkers();

});

//load the neighborhood polygons
// var file = neighborhood.polygon_url;
// var polygon = new google.maps.Polygon(map.data.loadGeoJson(file));
// var polygon = new google.maps.Polygon(geojsondata);





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


});




//Copyright (c) 2012, Jason Sanford
// All rights reserved.
var GeoJSON = function( geojson, options ){

  var _geometryToGoogleMaps = function( geojsonGeometry, options, geojsonProperties ){

    var googleObj, opts = _copy(options);

    switch ( geojsonGeometry.type ){
      case "Point":
        opts.position = new google.maps.LatLng(geojsonGeometry.coordinates[1], geojsonGeometry.coordinates[0]);
        googleObj = new google.maps.Marker(opts);
        if (geojsonProperties) {
          googleObj.set("geojsonProperties", geojsonProperties);
        }
        break;

      case "MultiPoint":
        googleObj = [];
        for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
          opts.position = new google.maps.LatLng(geojsonGeometry.coordinates[i][1], geojsonGeometry.coordinates[i][0]);
          googleObj.push(new google.maps.Marker(opts));
        }
        if (geojsonProperties) {
          for (var k = 0; k < googleObj.length; k++){
            googleObj[k].set("geojsonProperties", geojsonProperties);
          }
        }
        break;

      case "LineString":
        var path = [];
        for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
          var coord = geojsonGeometry.coordinates[i];
          var ll = new google.maps.LatLng(coord[1], coord[0]);
          path.push(ll);
        }
        opts.path = path;
        googleObj = new google.maps.Polyline(opts);
        if (geojsonProperties) {
          googleObj.set("geojsonProperties", geojsonProperties);
        }
        break;

      case "MultiLineString":
        googleObj = [];
        for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
          var path = [];
          for (var j = 0; j < geojsonGeometry.coordinates[i].length; j++){
            var coord = geojsonGeometry.coordinates[i][j];
            var ll = new google.maps.LatLng(coord[1], coord[0]);
            path.push(ll);
          }
          opts.path = path;
          googleObj.push(new google.maps.Polyline(opts));
        }
        if (geojsonProperties) {
          for (var k = 0; k < googleObj.length; k++){
            googleObj[k].set("geojsonProperties", geojsonProperties);
          }
        }
        break;

      case "Polygon":
        var paths = [];
        var exteriorDirection;
        var interiorDirection;
        for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
          var path = [];
          for (var j = 0; j < geojsonGeometry.coordinates[i].length; j++){
            var ll = new google.maps.LatLng(geojsonGeometry.coordinates[i][j][1], geojsonGeometry.coordinates[i][j][0]);
            path.push(ll);
          }
          if(!i){
            exteriorDirection = _ccw(path);
            paths.push(path);
          }else if(i == 1){
            interiorDirection = _ccw(path);
            if(exteriorDirection == interiorDirection){
              paths.push(path.reverse());
            }else{
              paths.push(path);
            }
          }else{
            if(exteriorDirection == interiorDirection){
              paths.push(path.reverse());
            }else{
              paths.push(path);
            }
          }
        }
        opts.paths = paths;
        googleObj = new google.maps.Polygon(opts);
        if (geojsonProperties) {
          googleObj.set("geojsonProperties", geojsonProperties);
        }
        break;

      case "MultiPolygon":
        googleObj = [];
        for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
          var paths = [];
          var exteriorDirection;
          var interiorDirection;
          for (var j = 0; j < geojsonGeometry.coordinates[i].length; j++){
            var path = [];
            for (var k = 0; k < geojsonGeometry.coordinates[i][j].length; k++){
              var ll = new google.maps.LatLng(geojsonGeometry.coordinates[i][j][k][1], geojsonGeometry.coordinates[i][j][k][0]);
              path.push(ll);
            }
            if(!j){
              exteriorDirection = _ccw(path);
              paths.push(path);
            }else if(j == 1){
              interiorDirection = _ccw(path);
              if(exteriorDirection == interiorDirection){
                paths.push(path.reverse());
              }else{
                paths.push(path);
              }
            }else{
              if(exteriorDirection == interiorDirection){
                paths.push(path.reverse());
              }else{
                paths.push(path);
              }
            }
          }
          opts.paths = paths;
          googleObj.push(new google.maps.Polygon(opts));
        }
        if (geojsonProperties) {
          for (var k = 0; k < googleObj.length; k++){
            googleObj[k].set("geojsonProperties", geojsonProperties);
          }
        }
        break;

      case "GeometryCollection":
        googleObj = [];
        if (!geojsonGeometry.geometries){
          googleObj = _error("Invalid GeoJSON object: GeometryCollection object missing \"geometries\" member.");
        }else{
          for (var i = 0; i < geojsonGeometry.geometries.length; i++){
            googleObj.push(_geometryToGoogleMaps(geojsonGeometry.geometries[i], opts, geojsonProperties || null));
          }
        }
        break;

      default:
        googleObj = _error("Invalid GeoJSON object: Geometry object must be one of \"Point\", \"LineString\", \"Polygon\" or \"MultiPolygon\".");
    }

    return googleObj;

  };

  var _error = function( message ){

    return {
      type: "Error",
      message: message
    };

  };

  var _ccw = function( path ){
    var isCCW;
    var a = 0;
    for (var i = 0; i < path.length-2; i++){
      a += ((path[i+1].lat() - path[i].lat()) * (path[i+2].lng() - path[i].lng()) - (path[i+2].lat() - path[i].lat()) * (path[i+1].lng() - path[i].lng()));
    }
    if(a > 0){
      isCCW = true;
    }
    else{
      isCCW = false;
    }
    return isCCW;
  };

  var _copy = function(obj){
    var newObj = {};
    for(var i in obj){
      if(obj.hasOwnProperty(i)){
        newObj[i] = obj[i];
      }
    }
    return newObj;
  };

  var obj;

  var opts = options || {};

  switch ( geojson.type ){

    case "FeatureCollection":
      if (!geojson.features){
        obj = _error("Invalid GeoJSON object: FeatureCollection object missing \"features\" member.");
      }else{
        obj = [];
        for (var i = 0; i < geojson.features.length; i++){
          obj.push(_geometryToGoogleMaps(geojson.features[i].geometry, opts, geojson.features[i].properties));
        }
      }
      break;

    case "GeometryCollection":
      if (!geojson.geometries){
        obj = _error("Invalid GeoJSON object: GeometryCollection object missing \"geometries\" member.");
      }else{
        obj = [];
        for (var i = 0; i < geojson.geometries.length; i++){
          obj.push(_geometryToGoogleMaps(geojson.geometries[i], opts));
        }
      }
      break;

    case "Feature":
      if (!( geojson.properties && geojson.geometry )){
        obj = _error("Invalid GeoJSON object: Feature object missing \"properties\" or \"geometry\" member.");
      }else{
        obj = _geometryToGoogleMaps(geojson.geometry, opts, geojson.properties);
      }
      break;

    case "Point": case "MultiPoint": case "LineString": case "MultiLineString": case "Polygon": case "MultiPolygon":
      obj = geojson.coordinates
        ? obj = _geometryToGoogleMaps(geojson, opts)
        : _error("Invalid GeoJSON object: Geometry object missing \"coordinates\" member.");
      break;

    default:
      obj = _error("Invalid GeoJSON object: GeoJSON object must be one of \"Point\", \"LineString\", \"Polygon\", \"MultiPolygon\", \"Feature\", \"FeatureCollection\" or \"GeometryCollection\".");

  }

  return obj;

};
