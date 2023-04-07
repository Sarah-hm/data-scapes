// window.onload = (event) => {
// url: "index.php",
// type: "get", //send it through get method
// data: {getAjaxOnLoad: "fread"}, //parameter (no form data)
// let latitude = null;
// let longitude = null;

// ====== COMMENTED OUT THE POSTING ========= DO NOT REMOVE
// postData();

// async function postData() {
//   latitude = "01";
//   longitude = "02";

//   const response = await fetch(`postData.php`, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     //headers: {
//     //"Content-Type": "application/json",
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//     //},
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: new URLSearchParams({ latitude: latitude, longitude: longitude }), // body data type must match "Content-Type" header
//   });
//   let resp = await response.text();
//   console.log(resp);
// }
// ====== COMMENTED OUT THE POSTING ========= DO NOT REMOVE

// Declare some variables globally to pass them around
//Everything from the IP API
let publicIPAddress;
let clientInfo = {
  ipAddress: null,
  lat: null,
  long: null,
  continent: null,
  region: null,
  city: null,
  streetName: null,
};

//Get info from public IP address,
let endpoint =
  "http://ip-api.com/json/?fields=status,message,continent,country,countryCode,regionName,city,district,zip,lat,lon,timezone,offset,isp,org,as,mobile,proxy,hosting,query";

//Everything for the leaflet and map
//We get the data from the txt file
// let map;

const myMap = new MyMap();
console.log(myMap);
myMap.loadAndInit();
// map.loadAndInit();
// ========== geolocation and shtuff

// fetch("getData.php")
//   .then((response) => response.text())
//   .then(async (data) => {
//     let parsedJSON = JSON.parse(data);

//     // let publicIPinfo = await getPublicIP();
//     // console.log(publicIPinfo);
//     // console.log(parsedJSON);
//     let currentCoords = await fetchGeolocation();
//     // console.log(currentCoords);
//     console.log(currentCoords);
//     //set the empty line array that is going to create the path
//     let line = [];
//     //  console.log(parsedJSON);
//     for (let i = 0; i < parsedJSON.length - 1; i++) {
//       let lati = parseFloat(parsedJSON[i].latitude);
//       let long = parseFloat(parsedJSON[i].longitude);

//       // console.log(lati, long);
//       let coords = { lat: lati, lng: long };
//       line.push(coords);
//     }
//     // console.log(line);

//     let zoomLvl = 10;

//     const loadMap = new Promise((resolve, reject) => {
//       map = L.map("map").setView(
//         [currentCoords.latitude, currentCoords.longitude],
//         zoomLvl
//       );
//       L.tileLayer("https://hybrid.concordia.ca/S_HONTOY/tile_blackout.jpg", {
//         zIndex: -5,
//         opacity: 0.5,
//         reuseTiles: true,
//       }).addTo(map);

//       // loadAndRunNativeLand();

//       let polyline = L.polyline(line, {
//         color: "white",
//         weight: "0.2",
//         zindex: 5000,
//       }).addTo(map);

//       resolve(zoomLvl);
//     })
//       .then(
//         (value) => {
//           console.log(value);
//           zoomOut(value);
//           // Expected output: "Success!"
//         },
//         (reason) => {
//           console.error(reason); // Error!
//         }
//       )
//       .then(() => {
//         // make the screen go to black

//         console.log("hello");
//       });

//     function zoomOut(zoomlvl) {
//       zoomLvl--;
//       map.flyTo([currentCoords.latitude, currentCoords.longitude], zoomLvl, {
//         animate: true,
//         duration: 1.0,
//       });
//       if (zoomLvl >= 5) {
//         setTimeout(zoomOut(zoomLvl), 1500);
//       }
//     }

//     // Wrapping around the international date line if it's a shorter distance;
//     // new L.Wrapped.Polyline(line, { color: "red", weight: "0.2" }).addTo(map);

//     // === keep : greyed out world map
//     // L.tileLayer(
//     //   "https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
//     //   {
//     //     attribution:
//     //       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
//     //   }
//     // ).addTo(map);
//   })
//   .catch((error) => console.error(error));

// function fetchGeolocation() {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       console.log("we're getting the geolocation");
//       //If user enabled geolocation, set lat/long to their current position, send data to database, and send to tracing Path function
//       navigator.geolocation.getCurrentPosition(
//         function (position) {
//           console.log("we're allowing the geolocation");
//           let latitude = position.coords.latitude;
//           let longitude = position.coords.longitude;
//           resolve({ latitude, longitude });
//         },
//         function (error) {
//           console.log(error);
//           let xhr = new XMLHttpRequest();
//           xhr.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//               var response = JSON.parse(this.responseText);
//               if (response.status !== "success") {
//                 console.log("query failed: " + response.message);
//                 return;
//               } else {
//                 console.log(response);
//                 clientInfo = {
//                   ipAddress: response.query,
//                   lat: response.lat,
//                   long: response.lon,
//                   continent: response.continent,
//                   region: response.regionName,
//                   city: response.city,
//                 };
//                 console.log(clientInfo);
//               }
//               console.log(clientInfo);
//             }
//             console.log(clientInfo);
//           };
//           console.log(clientInfo);
//           xhr.open("GET", endpoint, true);
//           xhr.send(clientInfo);

//           let latitude = clientInfo.lat;
//           let longitude = clientInfo.long;

//           resolve({ latitude, longitude });
//         }
//       );
//       // IF GEO

//       //If geolocation is not enabled by the user, use the public IP address from IP API
//     }
//   });
// }

// // function getPublicIP() {
// //   return new Promise((resolve, reject) => {
// //     let xhr = new XMLHttpRequest();
// //     xhr.onreadystatechange = function () {
// //       if (this.readyState == 4 && this.status == 200) {
// //         var response = JSON.parse(this.responseText);
// //         if (response.status !== "success") {
// //           console.log("query failed: " + response.message);
// //           return;
// //         } else {
// //           console.log(response);
// //           clientInfo = {
// //             ipAddress: response.query,
// //             lat: response.lat,
// //             long: response.lon,
// //             continent: response.continent,
// //             region: response.regionName,
// //             city: response.city,
// //           };
// //           console.log(clientInfo);
// //         }
// //         console.log(clientInfo);
// //       }
// //       console.log(clientInfo);
// //     };
// //     console.log(clientInfo);
// //     xhr.open("GET", endpoint, true);
// //     xhr.send(clientInfo);

// //     // console.log(latitude, longitude);
// //     resolve({ clientInfo });
// //   });
// // }

// function loadAndRunNativeLand() {
//   // https://native-land.ca/api/index.php?maps=territories

//   $.get(
//     "https://native-land.ca/api/index.php?maps=territories",
//     function (data) {
//       //success
//       //step 1: console.log the result
//       //console.log(data.length);
//       //set boolean to true
//       //loaded = true;

//       // parse data into object
//       // console.log(data);
//       // console.log(map);

//       //Run through data and divide the polygons (puts it in temp) data.length
//       for (let i = 0; i < data.length; i++) {
//         // console.log(i);
//         //console.log(data[i]);
//         let link = data[i].properties.description;

//         // console.log(data[i].geometry.coordinates)
//         let temp = data[i].geometry.coordinates;
//         //  let geomArray = data[i].geometry.coordinates[0];
//         // console.log(temp);
//         //Puts all polygon lines (in temp) into their own arrays (geomArray)
//         for (let j = 0; j < temp.length; j++) {
//           //console.log (temp[j]);
//           let geomArray = temp[j];
//           //set the empty line array that is going to create the path
//           let line = [];
//           //Parse all the lines' coordinates (latitude, longitude) and push them into the array
//           for (let k = 0; k < geomArray.length; k++) {
//             //  console.log(geomArray[k])
//             let coordinates = geomArray[k];
//             let long = parseFloat(coordinates[0]);
//             let lati = parseFloat(coordinates[1]);
//             let coords = { lat: lati, lng: long };
//             line.push(coords);
//             // console.log(lati);
//             // console.log(long);
//           } //FOR GEOMARRAY (coordinates)

//           // let territoryFillColorIndex = Math.floor(
//           //   Math.random() * territoryColors.length
//           // );
//           // let terrFillColor = territoryColors[territoryFillColorIndex];
//           let terrFillColor = "#454B1B";
//           // console.log(geomArray);
//           let polygon = L.polygon(line, {
//             zindex: 0,
//             color: "black",
//             fillOpacity: 0.1,
//             stroke: false,
//             className: "native-land-polygons",
//           }).addTo(map);
//           addListenersOnPolygon(polygon, link);
//           // console.log(polygon);
//         } // FOR temp (lines)
//       } // FOR data (polygons)
//     } // GET function
//   ) //GET
//     //fail
//     .fail(function () {
//       console.log("error");
//     });
// }

// function addListenersOnPolygon(polygon, link) {
//   polygon.on("click", function (event) {
//     window.open(link, "_blank").focus();
//   });
//   polygon.on("mouseover", function (event) {
//     console.log(event.target);
//     event.target.setStyle({
//       color: "black",
//       fillOpacity: 0.5,
//       stroke: false,
//       className: "native-land-polygons",
//     });
//   });
// }
