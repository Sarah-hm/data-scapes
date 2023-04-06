window.onload = (event) => {
  // let group = draw.group();
  let movingElement;
  let backgroundPolygons = [];
  let rhizomeItems = [];

  //svg rhizome points
  let p1;
  let p2;
  let p3;
  let p4;
  let p5;
  let p6;
  let p7;
  let p8;

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
          x = Math.floor(Math.random() * 100);
          y = Math.floor(Math.random() * 100);
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

        rhizomeItemsDiv = document.querySelectorAll(".rhizome-grid-item");
        drawBackgroundShape(rhizomeItemsDiv);
        handleEvents(rhizomeItemsDiv);
      } else {
        requestAnimationFrame(checkIfDataIsLoaded);
      }
    }
  }

  //This could be in the line's constructor:
  function handleEvents(rhizomeItems) {
    for (let i = 0; i < lines.length; i++) {
      // console.log(lines[i]);
      lines[i].draw(drawNewLine);
    }
  }

  //this could be in the rhizome-item constructor:
  function drawBackgroundShape(elements, data) {
    elements.forEach((el) => {
      let animating = false;
      let btnHovering = false;

      let svgBackgroundDiv = el.querySelector(".svg-background");
      let svgForegroundDiv = el.querySelector(".svg-foreground");

      let btn = el.querySelector("button");

      // console.log(btn);
      //   console.log(el);
      const drawBackground = SVG().addTo(svgBackgroundDiv).size("100%", "100%");
      const drawForeground = SVG().addTo(svgForegroundDiv).size("100%", "100%");

      lgDist = 100 / 2;
      shDist = 60 / 2;

      calculateSVGRhizomepoints(lgDist, shDist);

      let foregroundPolygon = drawForeground.polygon(
        `${p1.hex.x},${p1.hex.y} ${p2.hex.x},${p2.hex.y} ${p3.hex.x},${p3.hex.y} ${p4.hex.x},${p4.hex.y} ${p5.hex.x},${p5.hex.y} ${p6.hex.x},${p6.hex.y} ${p7.hex.x},${p7.hex.y} ${p8.hex.x},${p8.hex.y}`
      );
      foregroundPolygon.fill("transparent");
      let backgroundPolygon = drawBackground.polygon(
        `${p1.hex.x},${p1.hex.y} ${p2.hex.x},${p2.hex.y} ${p3.hex.x},${p3.hex.y} ${p4.hex.x},${p4.hex.y} ${p5.hex.x},${p5.hex.y} ${p6.hex.x},${p6.hex.y} ${p7.hex.x},${p7.hex.y} ${p8.hex.x},${p8.hex.y}`
      );
      backgroundPolygon.fill("#fff");
      backgroundPolygon.stroke({ color: "#808080", width: 2 });

      foregroundPolygon.on(`mouseover`, () => {
        if (!animating) {
          lgDist = 100 / 1.5;
          shDist = 100 / 1.5;
          calculateSVGRhizomepoints(lgDist, shDist);

          animating = true;
          backgroundPolygon
            .animate(500)
            .plot(
              `${p1.oct.x},${p1.oct.y} ${p2.oct.x},${p2.oct.y} ${p3.oct.x},${p3.oct.y} ${p4.oct.x},${p4.oct.y} ${p5.oct.x},${p5.oct.y} ${p6.oct.x},${p6.oct.y} ${p7.oct.x},${p7.oct.y} ${p8.oct.x},${p8.oct.y}`
            )
            .after(function () {
              animating = false;
            });
        }
      });

      foregroundPolygon.on(`mouseleave`, (e) => {
        let btnRect = btn.getBoundingClientRect();

        if (
          e.clientX >= btnRect.left &&
          e.clientX <= btnRect.right &&
          e.clientY >= btnRect.top &&
          e.clientY <= btnRect.bottom
        ) {
          console.log(btnHovering);
          btnHovering = true;
        } else {
          btnHovering = false;
        }
        if (!btnHovering) {
          lgDist = 100;
          shDist = 66;

          lgDist = 100 / 2;
          shDist = 60 / 2;
          calculateSVGRhizomepoints(lgDist, shDist);

          backgroundPolygon
            .animate(500)
            .plot(
              `${p1.hex.x},${p1.hex.y} ${p2.hex.x},${p2.hex.y} ${p3.hex.x},${p3.hex.y} ${p4.hex.x},${p4.hex.y} ${p5.hex.x},${p5.hex.y} ${p6.hex.x},${p6.hex.y} ${p7.hex.x},${p7.hex.y} ${p8.hex.x},${p8.hex.y}`
            )
            .after(function () {
              //making sure the hover state is removed from all rhizome items and that all shapes return to original state
              removeHoverStateRhizomeItems(el);
            });
        }
      });

      backgroundPolygons.push(backgroundPolygon);
    });
  }

  function redrawLines(el, x, y) {
    for (let i = 0; i < lines.length; i++) {
      if (el == lines[i].startObject.object) {
        //   console.log(newX, newY);
        lines[i].redrawFromStart(x, y);
      } else if (el == lines[i].endObject.object) {
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

  //this could be removed? It's already a rhizome-item method (class)
  function removeHoverStateRhizomeItems(el) {
    el.classList.remove("rhizome-grid-item-hover");
    el.querySelector(".rhizome-item-hover-screen").style.opacity = "0";
    if (!el.classList.contains(`button-clicked`)) {
      setTimeout(() => {
        el.querySelector("h1").style.color = "rgba(0,0,0,1)";
      }, 750);
    }
  }

  function calculateSVGRhizomepoints(lgDist, shDist) {
    p1 = {
      hex: { x: -lgDist, y: -shDist },
      oct: { x: -shDist, y: -lgDist },
      rect: { x: -lgDist, y: -lgDist },
    };
    p2 = {
      hex: { x: 0, y: -lgDist },
      oct: { x: shDist, y: -lgDist },
      rect: { x: lgDist, y: -lgDist },
    };
    p3 = {
      hex: { x: 0, y: -lgDist },
      oct: { x: lgDist, y: -shDist },
      rect: { x: lgDist, y: -lgDist },
    };
    p4 = {
      hex: { x: lgDist, y: -shDist },
      oct: { x: lgDist, y: shDist },
      rect: { x: lgDist, y: lgDist },
    };
    p5 = {
      hex: { x: lgDist, y: shDist },
      oct: { x: shDist, y: lgDist },
      rect: { x: lgDist, y: lgDist },
    };
    p6 = {
      hex: { x: 0, y: lgDist },
      oct: { x: -shDist, y: lgDist },
      rect: { x: -lgDist, y: lgDist },
    };
    p7 = {
      hex: { x: 0, y: lgDist },
      oct: { x: -lgDist, y: shDist },
      rect: { x: -lgDist, y: lgDist },
    };
    p8 = {
      hex: { x: -lgDist, y: shDist },
      oct: { x: -lgDist, y: -shDist },
      rect: { x: -lgDist, y: -lgDist },
    };
    return { p1, p2, p3, p4, p5, p6, p7, p8 };
  }
}; //window onload
