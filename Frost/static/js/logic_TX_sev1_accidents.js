// Store our API endpoint inside queryUrl
var accidents1link = "static/data/USA_sev1_accidents.geojson";

// Create the wifi locations layer for our map.
let accidents1locations = new L.LayerGroup();

// Retrieve the wifi locations GeoJSON data.
d3.json(accidents1link, function(data) {
  console.log(data);

  // Creating a geoJSON layer with the retrieved data
 L.geoJson(data, {
    onEachFeature: function(features, layer){
      layer.bindPopup("<h3>" + features.properties.datetime + "</h3>")
    }
  }).addTo(accidents1locations);

  // Add the accidents layer to our map.
  accidents1locations.addTo(myMap);
});

let light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

// Create a base layer
let baseMaps = {
  "Light": light
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
  "Severity 1 Accidents": accidents1locations,
};

// Creating map object
var myMap = L.map("map", {
  center: [31, -97],
  zoom: 4,
  layers: [light]
});

// Then we add a control to the map that will allow the user to change which
// layers are visible.
// L.control.layers(baseMaps, overlays).addTo(map);
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);





