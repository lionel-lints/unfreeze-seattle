$(function() {
  var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  map.fitBounds(parseFloat(myPolygon.getBounds()));
}

google.maps.Polygon.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;
    for (var i = 0; i < paths.getLength(); i++) {
        path = paths.getAt(i);
        for (var ii = 0; ii < path.getLength(); ii++) {
            bounds.extend(path.getAt(ii));
        }
    }
    return bounds;
}

// var map = new google.maps.Map(container, opts); // I'll spare the details on this

var coords = [
    new google.maps.LatLng(47.66383747785215, -122.37198829650879)
    ,new google.maps.LatLng(47.67250753526796, -122.36907005310059)
    ,new google.maps.LatLng(47.67643748686037, -122.37301826477051)
    ,new google.maps.LatLng(47.67828677343194, -122.38314628601074)
    ,new google.maps.LatLng(47.67840235166643, -122.39396095275879)
    ,new google.maps.LatLng(47.67770887841921, -122.40889549255371)
    ,new google.maps.LatLng(47.669386480511356, -122.40614891052246)
    ,new google.maps.LatLng(47.66534039098829, -122.39739418029785)
    ,new google.maps.LatLng(47.65944409904046, -122.37799644470215)
    ,new google.maps.LatLng(47.66383747785215, -122.37198829650879)
];

var myPolygon = new google.maps.Polygon({
    paths: coords
    ,strokeColor: "#A80000"
    ,strokeOpacity: 0.8
    ,strokeWeight: 1
    ,fillColor: "#0b2a32"
    ,fillOpacity: 0.12
});

initMap();

});
