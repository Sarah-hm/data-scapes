window.onload = (event) => {
  // let group = draw.group();
  let movingElement;
  let backgroundPolygons = [];
  let rhizomeItems = [];

  let drawNewLine = SVG().addTo("#svg-container").size("100%", "100%");
  let lines = [];

  let dataloaded = false;
  let stopDataCheck = false;

  const rhizomeCloud = document.querySelector("#rhizome-cloud-container");
  let blackoutScreen = document.querySelector("#black-out-screen");

  //Draggable
  let mouseDown = false;

  // blackoutScreen.style.backgroundColor = "rgba(0,0,0,1)"
  // setTimeout(()=>{
  // blackoutScreen.style.display = "none"
  // }, 1500)

  //fetch data from the literature review json file and write them as rhizome items on the screen (at a random point)
  //fetch data by chatGPT
  fetch("data/literature-review.json")
    .then((response) => response.json())
    .then((data) => {
      //push all the data in their own object
      for (let i = 0; i < data.length; i++) {
        //push the data, x, y, shDist and lgDist into a new rhizome Item
        rhizomeItems.push(
          new RhizomeItem(
            data[i].title,
            data[i].pullquote,
            data[i].description,
            data[i].image,
            data[i].dataAtt,
            data[i].link,
            rhizomeCloud,
            getElCenter,
            redrawLines
          )
        );
      }
      //links all rhizome items from their links and data-attribute
      //for every rhizome item
      for (let i = 0; i < rhizomeItems.length; i++) {
        //Go through all the linked items
        for (let j = 0; j < rhizomeItems[i].links.length; j++) {
          //assign the linked item to the targetObj
          let targetObj = rhizomeItems[i].links[j];
          //Go through all rhizome items again
          for (let k = 0; k < rhizomeItems.length; k++) {
            //If the targetObj matches the rhizome Items's name
            if (targetObj == rhizomeItems[k].name) {
              let coreObjCoords = getElCenter(rhizomeItems[i].div);
              //Make a line between the two elements
              let targetObjCoords = getElCenter(rhizomeItems[k].div);

              let x1 = coreObjCoords.x;
              let y1 = coreObjCoords.y;
              let x2 = targetObjCoords.x;
              let y2 = targetObjCoords.y;

              lines.push(
                new Line(
                  x1,
                  y1,
                  x2,
                  y2,
                  rhizomeItems[i].div,
                  rhizomeItems[k].div
                )
              );
            }
          }
        }
      }
      dataloaded = true;
      checkIfDataIsLoaded();
    })
    .catch((error) => console.error(error));

  //check every frame if the data has been loaded

  function checkIfDataIsLoaded() {
    console.log(drawNewLine);
    if (!stopDataCheck) {
      //Gotta put a black loading screen or something and then make it disappear after everything is loaded
      stopDataCheck = true;

      // rhizomeItemsDiv = document.querySelectorAll(".rhizome-grid-item");
      //  drawBackgroundShape(rhizomeItemsDiv);
      drawLinks(lines, drawNewLine);
      addEventListeners();

      requestAnimationFrame(getRhizomeItemsPos);
    }
  }

  //If data is loaded, draw the links between them
  function drawLinks(lines, drawNewLine) {
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
      // console.log(lines[i]);
      lines[i].draw(drawNewLine);
    }
  }

  function addEventListeners() {
    let rhizomeInfoBoxOpened = false;
    document
      .querySelector(`#rhizome-info-icon`)
      .addEventListener("click", () => {
        if (!rhizomeInfoBoxOpened) {
          document.querySelector(`#rhizome-info-box`).style.top = `10vh`;
          rhizomeInfoBoxOpened = true;
        } else {
          document.querySelector(`#rhizome-info-box`).style.top = `110vh`;
          rhizomeInfoBoxOpened = false;
        }
      });

    let self = this;
    let goBackBtn = document.querySelector(`#ds-popup-go-back-btn`);
    let shareIPGeolocBtn = document.querySelector("#share-public-geolocation");
    let sharePersGeolocBtn = document.querySelector(
      "#share-personal-geolocation"
    );

    console.log(goBackBtn);

    goBackBtn.addEventListener("click", () => {
      console.log("clickidiclack");
      document.querySelector("#ds-info-box").style.display = "none";
      document.querySelector("#rhizome-cloud-container").style.transform =
        "scale(1)";
    });

    shareIPGeolocBtn.addEventListener("click", () => {
      // set black out screen while zooming out
      document.querySelector("#rhizome-cloud-container").style.transform =
        "scale(7)";
      // get ip address, send it to geolocation.txt and make it the new marker
      // and go to map.php
      document.querySelector("#black-out-screen").style.display = "block";

      setTimeout(() => {
        document.querySelector("#black-out-screen").style.opacity = "1";
      }, 1000);

      setTimeout(() => {
        window.open("map.php", "_self");
      }, 1000);
    });

    sharePersGeolocBtn.addEventListener("click", () => {
      // set black out screen while zooming out
      document.querySelector("#rhizome-cloud-container").style.transform =
        "scale(7)";
      setTimeout(() => {
        document.querySelector("#black-out-screen").style.opacity = "1";
      }, 1000);
      // get geolocation, send it to geolocation.txt and make it the new marker
      // and go to map.php
      setTimeout(() => {
        window.open("map.php", "_self");
      }, 1000);
    });
  }

  function redrawLines(el, x, y) {
    for (let i = 0; i < lines.length; i++) {
      if (el == lines[i].startObject.object) {
        // console.log(lines[i], "from start");
        lines[i].redrawFromStart(x, y);
      } else if (el == lines[i].endObject.object) {
        // console.log(lines[i], "from end");
        lines[i].redrawFromEnd(x, y);
      }
    }
  }

  function getElCenter(el) {
    // console.log(el)
    let rect = el.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    return { x, y };
  }

  function getRhizomeItemsPos() {
    //console.log("go");
    for (let i = 0; i < rhizomeItems.length; i++) {
      checkXandYRhizomeitems(rhizomeItems[i]);
    }
    requestAnimationFrame(getRhizomeItemsPos);
  }
  // requestAnimationFrame(checkXandYRhizomeitems);

  function checkXandYRhizomeitems(el) {
    // console.log("go");

    let rect = getElCenter(el.div);
    // console.log(rect);

    // if (el.title === "Visual Complexity") {
    console.log(rect);

    let currentX = rect.x;
    let currentY = rect.y;

    let oldX = el.oldX;
    let oldY = el.oldY;

    // console.log(currentX);

    if (currentX !== oldX || currentY !== oldY) {
      console.log("this ain't the same");

      el.oldX = currentX;
      el.oldY = currentY;

      //redraw lines linked
      for (let i = 0; i < el.links.length; i++) {
        // let newCoords = el.getElCenter(el.div);
        //Get the center of the end object too!
        el.redrawLines(el.div, currentX, currentY);
      }
      // }
    }
  } //window onload
};
