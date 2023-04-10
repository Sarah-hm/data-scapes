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
        let x;
        let y;

        //if i = data-scapes, hard code it in the middle of the screen
        if (i === 0) {
          x = 45;
          y = 45;
        } else {
          x = Math.floor(Math.random() * 80);
          y = Math.floor(Math.random() * 80);
        }

        let lgDist = 100 / 2;
        let shDist = 60 / 2;

        //push the data, x, y, shDist and lgDist into a new rhizome Item
        rhizomeItems.push(
          new RhizomeItem(
            x,
            y,
            data[i].title,
            data[i].pullquote,
            data[i].description,
            data[i].image,
            data[i].dataAtt,
            data[i].link,
            lgDist,
            shDist,
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
    })
    .catch((error) => console.error(error));

  //check every frame if the data has been loaded
  checkIfDataIsLoaded();

  function checkIfDataIsLoaded() {
    if (!stopDataCheck) {
      if (dataloaded) {
        //Gotta put a black loading screen or something and then make it disappear after everything is loaded
        stopDataCheck = true;

        // rhizomeItemsDiv = document.querySelectorAll(".rhizome-grid-item");
        //  drawBackgroundShape(rhizomeItemsDiv);
        drawLinks();
      } else {
        requestAnimationFrame(checkIfDataIsLoaded);
      }
    }
  }

  //If data is loaded, draw the links between them
  function drawLinks() {
    for (let i = 0; i < lines.length; i++) {
      // console.log(lines[i]);
      lines[i].draw(drawNewLine);
    }
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
}; //window onload
