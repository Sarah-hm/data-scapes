//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// window.onload = (event) => {
// url: "index.php",
// type: "get", //send it through get method
// data: {getAjaxOnLoad: "fread"}, //parameter (no form data)
// let latitude = null;
// let longitude = null;

// ====== COMMENTED OUT THE POSTING ========= DO NOT REMOVE
// postData();

addEventListeners();

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

function getIPAPIdata() {
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
        map.ipData = clientInfo;
        map.toggleIPinfo();
      }
    }
  };
}

function getIPCoords() {
  console.log("getting IP ");
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        if (response.status !== "success") {
          reject("query failed: " + response.message);
          return;
        } else {
          resolve(response);
        }
      }
    };
    xhr.open("GET", endpoint, true);
    xhr.send();
  });
}

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
      // console.log(clientCoords);
      map = new MyMap(clientCoords.latitude, clientCoords.longitude);
      map.initPolyline(line);
    });
    // == DATA_SCAPES DATA FETCH ==

    //Fetch data from native-land, send it to map object
    fetch("https://native-land.ca/api/index.php?maps=territories")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
            } //FOR GEOMARRAY (coordinates)

            let polygon = L.polygon(line, {
              zindex: 0,
              color: "white",
              fillOpacity: 0.0,
              stroke: false,
              className: "native-land-polygons",
            });
            nativeLandPolys.push({ polygon: polygon, link: link });
          }
        }
        //set the data in the map as native land;
        map.nativeLandData = nativeLandPolys;
        //toggle the map on
        map.toggleNativeLandLayer();
      });
    // == NATIVE LAND DATA FETCH ==
  })
  .catch((error) => console.error(error));

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
          resolve({ latitude, longitude }); //resolves properly and runs if geolocation is
        },
        async function (error) {
          // console.log(error);
          let res = await getIPCoords();
          // console.log(res);

          let latitude = res.lat;
          let longitude = res.lon;
          resolve({ latitude, longitude }); //doesn't resolve anything, crashes
        }
      );
      // IF GEO

      //If geolocation is not enabled by the user, use the public IP address from IP API
    }
  });
}

//== event listeners about buttons and other shenanigans ===
function addEventListeners() {
  let layersMenuOpened = false;
  let layersMenuIcon = document.querySelector("#layersMenuIcon");

  let layerMenuCtn = document.querySelector("#sliders-container");
  let layersCtn = document.querySelector("#sliders-subcontainer");

  //native-land info icon and box
  let nlInfoBoxIcon = document.querySelector("#nl-info-box-icon");
  let nlInfoBox = document.querySelector("#nl-info-box");

  //mercator info icon and box
  let mrctInfoBoxIcon = document.querySelector("#mrct-info-box-icon");
  let mrctInfoBox = document.querySelector("#mrct-info-box");

  //d-s info icon and box
  let dsInfoBoxOpened = false;
  let dsInfoBoxIcon = document.querySelector("#ds-info-box-icon");
  let dsInfoBox = document.querySelector("#ds-info-box");

  //Go back button
  let goBackToRhizomeBtn = document.querySelector("#goBackToRhizomeButton");

  layerMenuCtn.style.height = `0px`;
  layersCtn.style.height = "0%";
  layersCtn.style.width = "0%";
  layersMenuIcon.style.transform = "rotate(0deg)";

  layersMenuIcon.addEventListener("click", () => {
    if (layersMenuOpened) {
      // layersCtn.style.display = "none";
      layerMenuCtn.style.height = `0px`;
      layersCtn.style.height = "0%";
      layersCtn.style.width = "0%";
      layersMenuIcon.style.transform = "rotate(0deg)";

      //Close info-box in case they are open
      mrctInfoBox.style.top = `110vh`;
      nlInfoBox.style.top = `110vh`;

      //set menu as closed (!opened)
      layersMenuOpened = false;
    } else {
      // layersCtn.style.display = "block";
      layerMenuCtn.style.height = `200px`;
      layersCtn.style.height = "100%";
      layersCtn.style.width = "100%";
      layersMenuIcon.style.transform = "rotate(180deg)";
      layersMenuOpened = true;
    }
  });

  // window.addEventListener("click", (event) => {
  //   console.log(event.target);
  // });

  //set info-box to be !opened
  let nlInfoBoxOpened = false;
  let mrctInfoBoxOpened = false;

  nlInfoBoxIcon.addEventListener("click", () => {
    if (!nlInfoBoxOpened) {
      nlInfoBox.style.top = `30vh`;
      mrctInfoBox.style.top = `110vh`;
      dsInfoBox.style.top = `110vh`;
      nlInfoBoxOpened = true;
    } else {
      mrctInfoBox.style.top = `110vh`;
      nlInfoBox.style.top = `110vh`;
      dsInfoBox.style.top = `110vh`;
      nlInfoBoxOpened = false;
    }
  });

  mrctInfoBoxIcon.addEventListener("click", () => {
    if (!mrctInfoBoxOpened) {
      mrctInfoBox.style.top = `30vh`;
      nlInfoBox.style.top = `110vh`;
      dsInfoBox.style.top = `110vh`;
      mrctInfoBoxOpened = true;
    } else {
      mrctInfoBox.style.top = `110vh`;
      nlInfoBox.style.top = `110vh`;
      dsInfoBox.style.top = `110vh`;
      mrctInfoBoxOpened = false;
    }
  });

  dsInfoBoxIcon.addEventListener("click", () => {
    if (!dsInfoBoxOpened) {
      console.log("clicked");
      dsInfoBox.style.top = `30vh`;
      nlInfoBox.style.top = `110vh`;
      mrctInfoBox.style.top = `110vh`;
      dsInfoBoxOpened = true;
    } else {
      dsInfoBox.style.top = `110vh`;
      dsInfoBoxOpened = false;
    }
  });

  goBackToRhizomeBtn.addEventListener("click", () => {
    window.open("index.php", "_self");
  });
}
