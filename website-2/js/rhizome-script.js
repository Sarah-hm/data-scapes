window.onload = (event) => {
  // let group = draw.group();
  let movingElement;
  let backgroundPolygons = [];

  let drawNewLine = SVG().addTo("#svg-container").size("100%", "100%");
  let lines = [];

  let dataloaded = false;
  let stopDataCheck = false;

  const rhizomeCloud = document.querySelector("#rhizome-cloud-container");
  let blackoutScreen = document.querySelector("#black-out-screen");
  let rhizomeLines = [];
  const newSvg = document.createElement(`svg`);

  //Draggable
  let mouseDown = false;
  let mouseX = 0;
  let mouseY = 0;
  let elementX = 0;
  let elementY = 0;

  // blackoutScreen.style.backgroundColor = "rgba(0,0,0,1)"
  // setTimeout(()=>{
  // blackoutScreen.style.display = "none"
  // }, 1500)

  //fetch data from the literature review json file and write them as rhizome items on the screen (at a random point)
  //fetch data by chatGPT
  fetch("data/literature-review.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        //create a new div for every literature review item with a specific data attribute and random position
        let newDiv = document.createElement("div");

        console.log(data[i].dataAtt);

        // add a rhizome grid class and their specific data attribute (name)
        newDiv.classList.add("rhizome-grid-item");
        newDiv.setAttribute(`data-att`, `${data[i].dataAtt}`);

        // set random position in x,y
        let leftPos = Math.floor(Math.random() * window.innerWidth) + "px";
        let topPos = Math.floor(Math.random() * window.innerHeight) + "px";

        newDiv.style.position = "fixed";
        newDiv.style.transition = "transform 1s";
        newDiv.style.left = leftPos;
        newDiv.style.top = topPos;

        // create an empty h1 and append it to the new div
        let title = document.createElement("h1");
        // let svgBackground = document.createElement("svg");
        let svgBackground = document.createElement("div");
        svgBackground.classList.add("svg-background");
        svgBackground.setAttribute(`background-div-att`, `${data[i].dataAtt}`);

        newDiv.appendChild(title);
        newDiv.appendChild(svgBackground);

        //append new div to the rhizome cloud
        rhizomeCloud.appendChild(newDiv);

        //append a hover div (pullquote and button) on the previously created div
        let container = document.querySelector(
          `[data-att="${data[i].dataAtt}"]`
        );
        //create a foreground to make an invisible hoverable svg
        let svgForeground = document.createElement("div");
        svgForeground.classList.add("svg-foreground");
        svgForeground.setAttribute(`foreground-div-att`, `${data[i].dataAtt}`);

        //create the hover div (with pullquote and button to access the rhizome item's page)
        let newDivHoverScreen = document.createElement("div");
        newDivHoverScreen.classList.add("rhizome-item-hover-screen");

        container.prepend(newDivHoverScreen);
        container.prepend(svgForeground);

        //put a h2 and button in all hover screen (pullquote and button)
        let hoverScreenContainer = document
          .querySelector(`[data-att="${data[i].dataAtt}"]`)
          .querySelector(".rhizome-item-hover-screen");
        let pullquote = document.createElement("h2");
        let btn = document.createElement("button");

        hoverScreenContainer.appendChild(pullquote);
        hoverScreenContainer.appendChild(btn);

        //Populate all elements with data from json file
        container.querySelector("h1").innerText = data[i].title;
        container.querySelector("h2").innerText = data[i].pullquote;
        container.querySelector("button").innerText = `Learn more`;

        let centercoords = getElCenter(container);
        data[i].xPos = centercoords.x;
        data[i].yPos = centercoords.y;
      }

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].link.length; j++) {
          //create a new line between rhizome items
          console.log(data[i].link[j]);

          let coreObject = document.querySelector(
            `[data-att="${data[i].dataAtt}"]`
          );
          let targetObject = document.querySelector(
            `[data-att="${data[i].link[j]}"]`
          );
          let targetObjectCoords = getElCenter(targetObject);

          let x1 = data[i].xPos;
          let y1 = data[i].yPos;
          let x2 = targetObjectCoords.x;
          let y2 = targetObjectCoords.y;

          lines.push(new Line(x1, y1, x2, y2, coreObject, targetObject));
        }
      }
      dataloaded = true;
    })
    .catch((error) => console.error(error));

  //check every second if the data has been loaded
  setInterval(() => {
    if (!stopDataCheck) {
      if (dataloaded) {
        //Gotta put a black loading screen or something and then make it disappear after everything is loaded
        stopDataCheck = true;

        let rhizomeItems = document.querySelectorAll(".rhizome-grid-item");
        drawBackgroundShape(rhizomeItems);
        handleEvents(rhizomeItems);
      }
    }
  }, 500);

  function handleEvents(rhizomeItems) {
    for (let i = 0; i < lines.length; i++) {
      console.log(lines[i]);
      lines[i].draw(drawNewLine);
    }
    rhizomeItems.forEach((el) => {
      // On mouse enter, make title disappear and pullquote appear
      el.addEventListener("mouseenter", handleMouseEnter);
      //On mouse leave, make pullquote disappear and title appear
      el.addEventListener("mouseleave", handleMouseLeave);

      //hover state + draggable + button click to change state
      el.addEventListener("mousedown", handleMouseDown);
      el.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    });
  }

  function getElCenter(el) {
    // console.log(el)
    let rect = el.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    return { x, y };
  }
  //handle mouse enter (hover effect)
  function handleMouseEnter(event) {
    if (!event.target.classList.contains("grid-item-open")) {
      event.target.classList.add("rhizome-grid-item-hover");
      event.target.querySelector("h1").style.color = "rgba(0,0,0,0)";

      let polygon = event.target.querySelector("polygon");

      let lgDist = 86;
      let shDist = 35.5;

      let p1 = {
        oct: { x: -shDist, y: -lgDist },
        rect: { x: -lgDist, y: -lgDist },
      };
      let p2 = {
        oct: { x: shDist, y: -lgDist },
        rect: { x: lgDist, y: -lgDist },
      };
      let p3 = {
        oct: { x: lgDist, y: -shDist },
        rect: { x: lgDist, y: -lgDist },
      };
      let p4 = {
        oct: { x: lgDist, y: shDist },
        rect: { x: lgDist, y: lgDist },
      };
      let p5 = {
        oct: { x: shDist, y: lgDist },
        rect: { x: lgDist, y: lgDist },
      };
      let p6 = {
        oct: { x: -shDist, y: lgDist },
        rect: { x: -lgDist, y: lgDist },
      };
      let p7 = {
        oct: { x: -lgDist, y: shDist },
        rect: { x: -lgDist, y: lgDist },
      };
      let p8 = {
        oct: { x: -lgDist, y: -shDist },
        rect: { x: -lgDist, y: -lgDist },
      };

      //   polygon.setAttribute(
      //     `points`,
      //     `${p1.rect.x},${p1.rect.y} ${p2.rect.x},${p2.rect.y} ${p3.rect.x},${p3.rect.y} ${p4.rect.x},${p4.rect.y} ${p5.rect.x},${p5.rect.y} ${p6.rect.x},${p6.rect.y} ${p7.rect.x},${p7.rect.y} ${p8.rect.x},${p8.rect.y}`
      //   );

      //   polygon
      //     .animate(500)
      //     .plot(
      //       `${p1.rect.x},${p1.rect.y} ${p2.rect.x},${p2.rect.y} ${p3.rect.x},${p3.rect.y} ${p4.rect.x},${p4.rect.y} ${p5.rect.x},${p5.rect.y} ${p6.rect.x},${p6.rect.y} ${p7.rect.x},${p7.rect.y} ${p8.rect.x},${p8.rect.y}`
      //     );

      setTimeout(() => {
        event.target.querySelector(".rhizome-item-hover-screen").style.opacity =
          "1";
      }, 750);
    }
  }
  function handleMouseLeave(event) {
    if (!event.target.classList.contains("grid-item-open")) {
      event.target.classList.remove("rhizome-grid-item-hover");
      event.target.querySelector(".rhizome-item-hover-screen").style.opacity =
        "0";
      setTimeout(() => {
        event.target.querySelector("h1").style.color = "rgba(0,0,0,1)";
      }, 750);
    }
  }
  // Handle mouse down event
  function handleMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;

    movingElement = event.target.parentElement.parentElement.parentElement;
  }
  // Handle mouse up event
  function handleMouseUp(event) {
    mouseDown = false;
  }
  // Handle mouse move event
  function handleMouseMove(event, data) {
    if (mouseDown) {
      let elRect = movingElement.getBoundingClientRect();

      const deltaX = elRect.width / 2;
      const deltaY = elRect.height / 2;

      let newX = event.clientX - deltaX;
      let newY = event.clientY - deltaY;

      movingElement.style.left = newX + "px";
      movingElement.style.top = newY + "px";

      let currentElement = event.target;

      while (
        currentElement.className != "rhizome-grid-item rhizome-grid-item-hover"
      ) {
        currentElement = currentElement.parentElement;
      }

      for (let i = 0; i < lines.length; i++) {
        if (currentElement == lines[i].startObject.object) {
          //   console.log(newX, newY);
          lines[i].redrawFromStart(newX, newY);
        } else if (currentElement == lines[i].endObject.object) {
          lines[i].redrawFromEnd(newX, newY);
        }
      }
      //redraw the rhizome lines;
      //   for (let i = 0; i < lines.length; i++) {}
    }
  }

  function drawBackgroundShape(event, data) {
    let elements = document.querySelectorAll(`.rhizome-grid-item`);
    console.log(elements);
    elements.forEach((el) => {
      let animating = false;
      let btnHovering = false;

      let svgBackgroundDiv = el.querySelector(".svg-background");
      let svgForegroundDiv = el.querySelector(".svg-foreground");

      let btn = el.querySelector("button");

      console.log(btn);
      //   console.log(el);
      const drawBackground = SVG().addTo(svgBackgroundDiv).size("100%", "100%");
      const drawForeground = SVG().addTo(svgForegroundDiv).size("100%", "100%");

      let lgDist = 86;
      let shDist = 35.5;

      let p1 = {
        oct: { x: -shDist, y: -lgDist },
        rect: { x: -lgDist, y: -lgDist },
      };
      let p2 = {
        oct: { x: shDist, y: -lgDist },
        rect: { x: lgDist, y: -lgDist },
      };
      let p3 = {
        oct: { x: lgDist, y: -shDist },
        rect: { x: lgDist, y: -lgDist },
      };
      let p4 = {
        oct: { x: lgDist, y: shDist },
        rect: { x: lgDist, y: lgDist },
      };
      let p5 = {
        oct: { x: shDist, y: lgDist },
        rect: { x: lgDist, y: lgDist },
      };
      let p6 = {
        oct: { x: -shDist, y: lgDist },
        rect: { x: -lgDist, y: lgDist },
      };
      let p7 = {
        oct: { x: -lgDist, y: shDist },
        rect: { x: -lgDist, y: lgDist },
      };
      let p8 = {
        oct: { x: -lgDist, y: -shDist },
        rect: { x: -lgDist, y: -lgDist },
      };

      let foregroundPolygon = drawForeground.polygon(
        `${p1.oct.x},${p1.oct.y} ${p2.oct.x},${p2.oct.y} ${p3.oct.x},${p3.oct.y} ${p4.oct.x},${p4.oct.y} ${p5.oct.x},${p5.oct.y} ${p6.oct.x},${p6.oct.y} ${p7.oct.x},${p7.oct.y} ${p8.oct.x},${p8.oct.y}`
      );
      foregroundPolygon.fill("transparent");
      let backgroundPolygon = drawBackground.polygon(
        `${p1.oct.x},${p1.oct.y} ${p2.oct.x},${p2.oct.y} ${p3.oct.x},${p3.oct.y} ${p4.oct.x},${p4.oct.y} ${p5.oct.x},${p5.oct.y} ${p6.oct.x},${p6.oct.y} ${p7.oct.x},${p7.oct.y} ${p8.oct.x},${p8.oct.y}`
      );
      backgroundPolygon.fill("#fff");

      foregroundPolygon.on(`mouseover`, () => {
        if (!animating) {
          animating = true;
          backgroundPolygon
            .animate(500)
            .plot(
              `${p1.rect.x},${p1.rect.y} ${p2.rect.x},${p2.rect.y} ${p3.rect.x},${p3.rect.y} ${p4.rect.x},${p4.rect.y} ${p5.rect.x},${p5.rect.y} ${p6.rect.x},${p6.rect.y} ${p7.rect.x},${p7.rect.y} ${p8.rect.x},${p8.rect.y}`
            )
            .after(function () {
              animating = false;
            });
        }
      });

      foregroundPolygon.on(`mouseleave`, (e) => {
        let btnRect = btn.getBoundingClientRect();
        // console.log(e.clientY);
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
          backgroundPolygon
            .animate(500)
            .plot(
              `${p1.oct.x},${p1.oct.y} ${p2.oct.x},${p2.oct.y} ${p3.oct.x},${p3.oct.y} ${p4.oct.x},${p4.oct.y} ${p5.oct.x},${p5.oct.y} ${p6.oct.x},${p6.oct.y} ${p7.oct.x},${p7.oct.y} ${p8.oct.x},${p8.oct.y}`
            )
            .after(function () {});
        }

        // backgroundPolygon.timeline.finish();
      });

      backgroundPolygons.push(backgroundPolygon);
    });
    handleSVGbackgroundEvents();
  }

  function handleSVGbackgroundEvents(el) {
    console.log(backgroundPolygons);
  }

  function handleSVGmouseMove(event) {
    // console.log(event.target)
  }

  function drawRhizomeLinks(data) {
    // console.log(data);
    let draw = SVG().addTo("#svg-container").size("100%", "100%");
    //For every data json entry, run through its link array and create an SVG line between the core element (i) and its linked element (link[j])
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].link.length; j++) {
        // console.log(data[i]);
        // console.log(data[i].link[j]);

        let coreElement = document.querySelector(
          `[data-att="${data[i].dataAtt}"]`
        );
        let targetElement = document.querySelector(
          `[data-att="${data[i].link[j]}"]`
        );
        coreCoords = getElCenter(coreElement);
        targetCoords = getElCenter(targetElement);

        draw
          .line(coreCoords.x, coreCoords.y, targetCoords.x, targetCoords.y)
          .stroke({ width: 1, color: "black" });
        // drawLine(coreCoords.x, coreCoords.y, targetCoords.x, targetCoords.y);

        document.addEventListener("mousemove", () => {
          //   draw.clear();
          let coreCoords = getElCenter(coreElement);
          let targetCoords = getElCenter(targetElement);
          //   console.log(coreCoords);
          draw
            .line(coreCoords.x, coreCoords.y, targetCoords.x, targetCoords.y)
            .stroke({ width: 1, color: "black" });
        });
      }
    }
  }

  function drawLine(x1, y1, x2, y2) {
    draw.line(x1, y1, x2, y2).stroke({ width: 1, color: "black" });
  }
}; //window onload
