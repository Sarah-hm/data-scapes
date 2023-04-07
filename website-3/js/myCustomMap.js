class MyMap {
  constructor(latitude, longitude, zoomlvl, d3) {
    this.d3 = d3;
    this.nativeLandLayer = true;

    this.latitude = latitude;
    this.longitude = longitude;
    this.zoomLvl = zoomlvl;
    this.zoomOutLvl = 3;
    this.currentTile = null;

    this.style;
    this.line = [];
    this.zoomLvl = 10;

    this.initMap();
    this.setBlackTile();
    this.zoomOut();
  }

  setDatascapes() {}
  initMap(currentCoords) {
    this.map = L.map("map").setView(
      [this.latitude, this.longitude],
      this.zoomLvl,
      {}
    );
  }

  setBlackTile() {
    this.currentTile = L.tileLayer(
      "https://hybrid.concordia.ca/S_HONTOY/tile_blackout.jpg",
      {
        zIndex: -5,
        opacity: 1,
        reuseTiles: true,
      }
    ).addTo(this.map);
  }

  setWorldMapTile() {
    this.currentTile = L.tileLayer(
      "https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        zIndex: -5,
        opacity: 0.8,
        reuseTiles: true,
        minZoom: 2,
        maxZoom: 15,
      }
    ).addTo(this.map);
  }

  toggleNativeLandLayer(nativeLandData) {
    console.log(nativeLandData);
    if (this.nativeLandLayer) {
      for (let i = 0; i < nativeLandData.length; i++) {
        nativeLandData[i].addTo(this.map);
      }
    } else {
    }
  }

  initPolyline(datascapesData) {
    this.polyline = L.polyline(datascapesData, {
      color: "white",
      weight: "0.2",
      zindex: 5000,
      className: "data-scapes-polyline",
    }).addTo(this.map);
  }

  zoomOut() {
    if (this.zoomLvl > this.zoomOutLvl) {
      this.zoomLvl--;
      this.map.flyTo([this.latitude, this.longitude], this.zoomLvl, {
        animate: true,
        duration: 0.5,
      });
      setTimeout(() => this.zoomOut(), 750);
    } else if (this.zoomLvl <= this.zoomOutLvl) {
      // Go to black;
      console.log(this.polyline);
      this.setWorldMapTile();
      //put native land
    }
  }
}
