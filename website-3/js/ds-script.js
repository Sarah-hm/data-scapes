// window.onload = (event) => {
// url: "index.php",
// type: "get", //send it through get method
// data: {getAjaxOnLoad: "fread"}, //parameter (no form data)
// let latitude = null;
// let longitude = null;

//COMMENTED OUT THE POSTING ==
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

//We get the data from the txt file

fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    //Do something with the data
    // console.log(data);
    let parsedJSON = JSON.parse(data);

    console.log(parsedJSON);

    let currentCoords = await fetchGeolocation();
    console.log(currentCoords);

    //set the empty line array that is going to create the path
    let line = [];
    //  console.log(parsedJSON);
    for (let i = 0; i < parsedJSON.length - 1; i++) {
      let lati = parseFloat(parsedJSON[i].latitude);
      let long = parseFloat(parsedJSON[i].longitude);

      // console.log(lati, long);
      let coords = { lat: lati, lng: long };
      line.push(coords);
    }
    console.log(line);

    //  }
    //  let webPath = new google.maps.Polyline({
    //    path:line,
    //    strokeColor:"#F2F2F2",
    //    strokeOpacity:0.8,
    //    strokeWeight:2
    //  });
    //  webPath.setMap(map);

    let map = L.map("map").setView(
      [currentCoords.latitude, currentCoords.longitude],
      13
    );

    L.tileLayer("https://hybrid.concordia.ca/S_HONTOY/tile_blackout.jpg", {
      attribution: "mine :)",
    }).addTo(map);

    let polyline = L.polyline(line, { color: "white", weight: "0.2" }).addTo(
      map
    );

    // L.tileLayer(
    //   "https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    //   {
    //     attribution:
    //       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    //   }
    // ).addTo(map);

    // L.tileLayer(
    //   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    //   {
    //     attribution:
    //       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    //   }
    // ).addTo(map);

    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   maxZoom: 19,
    //   attribution:
    //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // }).addTo(map);
  })
  .catch((error) => console.error(error));

function fetchGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      //If user enabled geolocation, set lat/long to their current position, send data to database, and send to tracing Path function
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      }); // IF GEO

      //If geolocation is not enabled by the user, use the public IP address from IP API
    } else {
      console.log("we shall use your public IP address then :) ");

      let latitude = null;
      let longitude = null;
      resolve({ latitude, longitude });
    } // iF NO GEO
  });
}
