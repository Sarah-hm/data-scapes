import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// window.onload = (event) => {
// url: "index.php",
// type: "get", //send it through get method
// data: {getAjaxOnLoad: "fread"}, //parameter (no form data)
// let latitude = null;
// let longitude = null;

// ====== COMMENTED OUT THE POSTING ========= DO NOT REMOVE
// postData();

async function postData(latitude, longitude) {
  const response = await fetch(`postData.php`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    //headers: {
    //"Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //},
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: new URLSearchParams({ latitude: latitude, longitude: longitude }), // body data type must match "Content-Type" header
  });
  let resp = await response.text();
  console.log(resp);
}
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

let map;
let nativeLandPolys = [];

let clientCoords = await fetchGeolocation();

//Get datascapes data and create the map
fetch("getData.php")
  .then((response) => response.text())
  .then(async (data) => {
    let parsedJSON = JSON.parse(data);

    // let currentCoords = await fetchGeolocation();
    // console.log(currentCoords);
    // console.log(currentCoords);
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
    // console.log(line);

    const loadMap = new Promise((resolve, reject) => {
      console.log(clientCoords);
      map = new MyMap(clientCoords.latitude, clientCoords.longitude);
      map.initPolyline(line);
    });
    // == DATA_SCAPES DATA FETCH ==

    //Fetch data from native-land, send it to map object
    fetch("https://native-land.ca/api/index.php?maps=territories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Run through data and divide the polygons (puts it in temp) data.length
        for (let i = 0; i < data.length; i++) {
          // console.log(i);
          //console.log(data[i]);
          let link = data[i].properties.description;

          // console.log(data[i].geometry.coordinates)
          let temp = data[i].geometry.coordinates;
          //  let geomArray = data[i].geometry.coordinates[0];
          // console.log(temp);
          //Puts all polygon lines (in temp) into their own arrays (geomArray)
          for (let j = 0; j < temp.length; j++) {
            //console.log (temp[j]);
            let geomArray = temp[j];
            //set the empty line array that is going to create the path
            let line = [];
            //Parse all the lines' coordinates (latitude, longitude) and push them into the array
            for (let k = 0; k < geomArray.length; k++) {
              //  console.log(geomArray[k])
              let coordinates = geomArray[k];
              let long = parseFloat(coordinates[0]);
              let lati = parseFloat(coordinates[1]);
              let coords = { lat: lati, lng: long };
              line.push(coords);
              // console.log(lati);
              // console.log(long);
            } //FOR GEOMARRAY (coordinates)

            let terrFillColor = "#454B1B";
            // console.log(geomArray);
            let polygon = L.polygon(line, {
              zindex: 0,
              color: "black",
              fillOpacity: 0.1,
              stroke: false,
              className: "native-land-polygons",
            });
            nativeLandPolys.push(polygon);

            // addTo(map);
            addListenersOnPolygon(polygon, link);
          }
        }
        map.toggleNativeLandLayer(nativeLandPolys);
      });
    // == NATIVE LAND DATA FETCH ==
  })
  .catch((error) => console.error(error));

let ipIPAinfo = await getPublicIP();
console.log(ipIPAinfo);

function fetchGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      console.log("we're getting the geolocation");
      //If user enabled geolocation, set lat/long to their current position, send data to database, and send to tracing Path function
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("we're allowing the geolocation");
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          resolve({ latitude, longitude }); //resolves properly and runs if geolocation is activated
        },
        function (error) {
          let ipLat = null;
          let ipLng = null;

          console.log(error);
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              var response = JSON.parse(this.responseText);
              if (response.status !== "success") {
                console.log("query failed: " + response.message);
                return;
              } else {
                ipLat = response.lat;
                ipLng = response.lon;
                console.log(ipLat, ipLng); //console.logging the good values, after line 174
              }
            }
          };
          xhr.open("GET", endpoint, true);
          xhr.send();

          console.log(ipLng); //console.log(null)
          let latitude = ipLat;
          let longitude = ipLng;

          resolve({ latitude, longitude }); //doesn't resolve anything, crashes
        }
      );
      // IF GEO

      //If geolocation is not enabled by the user, use the public IP address from IP API
    }
  });
}

function getPublicIP() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.status !== "success") {
          console.log("query failed: " + response.message);
          return;
        } else {
          console.log(response);
          clientInfo = {
            ipAddress: response.query,
            lat: response.lat,
            long: response.lon,
            continent: response.continent,
            region: response.regionName,
            city: response.city,
          };
          map.setupPublicIPInfo(
            clientInfo.ipAddress,
            clientInfo.lat,
            clientInfo.long,
            clientInfo.continent,
            clientInfo.region,
            clientInfo.city
          );
        }
      }
    };
    console.log(clientInfo);
    xhr.open("GET", endpoint, true);
    xhr.send(clientInfo);
    console.log(clientInfo);
    // console.log(latitude, longitude);
    resolve({ clientInfo });
  });
}

function addListenersOnPolygon(polygon, link) {
  polygon.on("click", function (event) {
    window.open(link, "_blank").focus();
  });
  polygon.on("mouseover", function (event) {
    // console.log(event.target);
    event.target.setStyle({
      color: "white",
      fillOpacity: 0.5,
      stroke: false,
      className: "native-land-polygons",
    });
  });
}
