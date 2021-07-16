// Adding tile layer
let light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

// Creating map object
var myMap = L.map("map", {
  center: [31, -97],
  zoom: 6,
  layers: [light]
});

// Create a base layer
let baseMaps = {
  "Light": light
};

// Add all layer groups for the boundaries.
let stateBoundaries = new L.LayerGroup();
let stateRoads = new L.LayerGroup();
let stateRoads2 = new L.LayerGroup();
let stateRoads3 = new L.LayerGroup();
let stateRoads4 = new L.LayerGroup();
let stateRoads5 = new L.LayerGroup();
let stateRoads6 = new L.LayerGroup();

// Add a reference to each of the groups to the overlays object.

let overlays = {
  "States": stateBoundaries,
  "State Roads": stateRoads,
  "State Roads 2": stateRoads2,
  "State Roads 3": stateRoads3,
  "State Roads 4": stateRoads4,
  "State Roads 5": stateRoads5,
  "State Roads 6": stateRoads6,

};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
// L.control.layers(baseMaps, overlays).addTo(map);
L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(myMap);

// create a variable to link to the geoJson data
var stateLink = "static/data/states.json";
var stateRoadsLink = "static/data/json_data.json";
var stateRoadsLink2 = "static/data/json_data2.json";
var stateRoadsLink3 = "static/data/json_data3.json";
var stateRoadsLink4 = "static/data/json_data4.json";
var stateRoadsLink5 = "static/data/json_data5.json";
var stateRoadsLink6 = "static/data/json_data6.json"

// Function that will determine the color of each state
function chooseColorState(stateName) {
  switch (stateName) {
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
d3.json(stateLink, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature
    style: function(feature) {
      return {
        color: "red",
        // Call the chooseColor function to decide which color to color the state
        fillColor: chooseColorState(feature.properties.NAME),
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
  }).addTo(stateBoundaries);
  

// Grabbing our GeoJSON data.
d3.json(stateRoadsLink, function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: {
    color: 'blue',
    weight: 0.2
  }
}).addTo(stateRoads);
});
// .addTo(stateRoads);

});
// Grabbing our GeoJSON data for the marker popups
// d3.json(stateRoadsLink, function(data) {
// L.geoJson(data, {
//   style: myStyle,
//   // We turn each feature into a marker on the map.
//   // onEachFeature: function(feature, layer) {
//   //   layer.bindPopup("<h3>Test " + feature.properties.OBJECTID + "</h3> <hr> <h3> test2: " + feature.properties.GID + "</h3>");
//   // }
// })

// })
// Grabbing our GeoJSON data.
d3.json(stateRoadsLink2, function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: {
    color: 'red',
    weight: 0.2
  }
}).addTo(stateRoads2);
});

d3.json(stateRoadsLink3, function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: {
    color: 'green',
    weight: 0.2
  }
}).addTo(stateRoads3);
});

d3.json(stateRoadsLink4, function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: {
    color: 'chartreuse',
    weight: 0.2
  }
}).addTo(stateRoads4);
});

d3.json(stateRoadsLink5, function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: {
    color: 'orange',
    weight: 0.2
  }
}).addTo(stateRoads5);
});

d3.json(stateRoadsLink6, function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: {
    color: 'magenta',
    weight: 0.2
  }
}).addTo(stateRoads6);
});
// let myStyle2 = {
//   color: "yellow",
//   weight: 0.5
// }
// // Grabbing our GeoJSON data for the marker popups
// d3.json(stateRoadsLink2, function(data) {
// L.geoJson(data, {
//   style: {
//     color: 'yellow',
//     weight: 0.5
//   }
//   // We turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("<h3>Test " + type + "</h3>");
//   }
// })
// .addTo(stateRoads2);
// });




    // // Called on each feature
    // onEachFeature: function(feature, layer) {
    //   // Set mouse events to change map styling
    //   layer.on({
    //     // When a user's mouse touches a map feature, the mouseover event calls this function
    //     mouseover: function(event) {
    //       layer = event.target;
    //       layer.setStyle({
    //         fillOpacity: 1
    //       });
    //     },
    //     // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back
    //     mouseout: function(event) {
    //       layer = event.target;
    //       layer.setStyle({
    //         fillOpacity: 0.5
    //       });
    //     },
    //     // When a feature is clicked, it is enlarged to fit the screen
    //     click: function(event) {
    //       myMap.fitBounds(event.target.getBounds());
    //     }
    //   });
    //   // Giving each feature a pop-up with information pertinent to it
    //   layer.bindPopup("<h2>" + feature.properties.NAME + "</h2>");
    // }
//   }).addTo(stateRoads);
// })

