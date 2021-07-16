// Creating map object
var myMap = L.map("map", {
  center: [38, -95],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// create a variable to link to the geoJson data
var link = "https://raw.githubusercontent.com/frostbrosracing/state_boundaries/main/static/data/states.json";


// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(name) {
  switch (name) {
    case "Arizona": 
    return "lightcoral";
  case "Arkansas": 
    return "red";
  case "California": 
    return "tomato";
  case "Colorado": 
    return "peachpuff";
  case "Connecticut": 
    return "darkorange";
  case "District of Columbia": 
    return "orange";
  case "Georgia": 
    return "gold";
  case "Hawaii": 
    return "yellow";
  case "Illinois": 
    return "greenyellow";
  case "Indiana": 
    return "chartreuse";
  case "Louisiana": 
    return "palegreen";
  case "Minnesota": 
    return "forestgreen";
  case "Mississippi": 
    return "lime";
  case "Montana": 
    return "green";
  case "New Mexico": 
    return "aquamarine";
  case "North Dakota": 
    return "aqua";
  case "Oklahoma": 
    return "deepskyblue";
  case "Pennsylvania": 
    return "lightskyblue";
  case "Tennessee": 
    return "lightsteelblue";
  case "Virginia": 
    return "royalblue";
  case "Puerto Rico": 
    return "blue";
  case "Delaware": 
    return "slateblue";
  case "West Virginia": 
    return "mediumpurple";
  case "Wisconsin": 
    return "blueviolet";
  case "Wyoming": 
    return "mediumorchid";
  case "Alabama": 
    return "fuchsia";
  case "Alaska": 
    return "deeppink";
  case "Florida": 
    return "pink";
  case "Idaho": 
    return "lightcoral";
  case "Kansas": 
    return "red";
  case "Maryland": 
    return "tomato";
  case "New Jersey": 
    return "peachpuff";
  case "North Carolina": 
    return "darkorange";
  case "South Carolina": 
    return "orange";
  case "Washington": 
    return "gold";
  case "Vermont": 
    return "yellow";
  case "Utah": 
    return "greenyellow";
  case "Iowa": 
    return "chartreuse";
  case "Kentucky": 
    return "palegreen";
  case "Maine": 
    return "forestgreen";
  case "Massachusetts": 
    return "lime";
  case "Michigan": 
    return "green";
  case "Missouri": 
    return "aquamarine";
  case "Nebraska": 
    return "aqua";
  case "Nevada": 
    return "deepskyblue";
  case "New Hampshire": 
    return "lightskyblue";
  case "New York": 
    return "lightsteelblue";
  case "Ohio": 
    return "royalblue";
  case "Oregon": 
    return "blue";
  case "Rhode Island": 
    return "slateblue";
  case "South Dakota": 
    return "mediumpurple";
  case "Texas": 
    return "blueviolet";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature
    style: function(feature) {
      return {
        color: "red",
        // Call the chooseColor function to decide which color to color the state
        fillColor: chooseColor(feature.properties.NAME),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 1
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h2>" + feature.properties.NAME + "</h2>");
    }
  }).addTo(myMap);
});
