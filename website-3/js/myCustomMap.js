class MyMap {
  constructor(latitude, longitude, zoomlvl) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoomLvl = zoomlvl;

    this.map = L.map("map").setView(
      [this.latitude, this.longitude],
      this.zoomLvl
    );

    L.tileLayer("https://hybrid.concordia.ca/S_HONTOY/tile_blackout.jpg", {
      zIndex: -5,
      opacity: 0.5,
      reuseTiles: true,
    }).addTo(this.map);

    console.log(this.map);
    // this.leafletMap = leafletMap;
    this.line = [];
    this.zoomLvl = 10;
  }

  // async loadAndInit() {
  //   this.initMap(currentCoords);
  //   this.loadAndRunNativeLand();
  //   this.initPolyline();
  //   this.zoomOut();
  // }

  initMap(currentCoords) {
    this.map = this.leafletMap.setView(
      [currentCoords.latitude, currentCoords.longitude],
      this.zoomLvl
    );
    L.tileLayer("https://hybrid.concordia.ca/S_HONTOY/tile_blackout.jpg", {
      zIndex: -5,
      opacity: 0.5,
      reuseTiles: true,
    }).addTo(this.map);
  }

  loadAndRunNativeLand() {
    console.log("we are running native-land");
    // implementation

    $.get(
      "https://native-land.ca/api/index.php?maps=territories",
      function (data) {
        //success
        //step 1: console.log the result
        //console.log(data.length);
        //set boolean to true
        //loaded = true;

        // parse data into object
        // console.log(data);
        // console.log(map);

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

            // let territoryFillColorIndex = Math.floor(
            //   Math.random() * territoryColors.length
            // );
            // let terrFillColor = territoryColors[territoryFillColorIndex];
            let terrFillColor = "#454B1B";
            // console.log(geomArray);
            let polygon = L.polygon(line, {
              zindex: 0,
              color: "black",
              fillOpacity: 0.1,
              stroke: false,
              className: "native-land-polygons",
            }).addTo(map);
            addListenersOnPolygon(polygon, link);
            // console.log(polygon);
          } // FOR temp (lines)
        } // FOR data (polygons)
      } // GET function
    ) //GET
      //fail
      .fail(function () {
        console.log("error");
      });
  }

  initPolyline(line) {
    this.polyline = L.polyline(line, {
      color: "white",
      weight: "0.2",
      zindex: 5000,
    }).addTo(this.map);
  }

  zoomOut() {
    if (this.zoomLvl >= 5) {
      this.zoomLvl--;
      this.map.flyTo(
        [this.currentCoords.latitude, this.currentCoords.longitude],
        this.zoomLvl,
        {
          animate: true,
          duration: 1.0,
        }
      );
      setTimeout(() => this.zoomOut(), 1500);
    }
  }
}
