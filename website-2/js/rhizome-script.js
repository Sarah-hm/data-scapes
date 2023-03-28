window.onload = (event) => {
  const draw = SVG().addTo("#svg-container").size("100%", "100%");

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
        let newDivHoverScreen = document.createElement("div");

        newDivHoverScreen.classList.add("rhizome-item-hover-screen");
        container.appendChild(newDivHoverScreen);

        //put a h2 and button in all hover screen
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

        data[i].backgroundDrawn = false;
        drawBackgroundShape(container, data[i]);

        //hover state + draggable + button click to change state
        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseup", handleMouseUp);
        // document.addEventListener('mousemove',handleMouseMove);

        document.addEventListener("mousemove", function (event) {
          handleMouseMove(event, data[i]);
        });
        // On mouse enter, make title disappear and pullquote appear
        container.addEventListener("mouseenter", handleMouseEnter);
        //On mouse leave, make pullquote disappear and title appear
        container.addEventListener("mouseleave", handleMouseLeave);

        // console.log(container[i].querySelector("#svg-container"))

        // draw.on("mousemove", ()=>{
        //     drawBackgroundShape(container, data[i])
        // })
        //draw lines between rhizomes
      }

      drawRhizomeLinks(data);
    })
    .catch((error) => console.error(error));

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

  // 3 following hadnlers from chatGPT:
  // Handle mouse down event
  function handleMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
    elementX = event.target.offsetLeft;
    elementY = event.target.offsetTop;
  }
  // Handle mouse up event
  function handleMouseUp(event) {
    mouseDown = false;
  }
  // Handle mouse move event
  function handleMouseMove(event, data) {
    // if (event.target.classList.contains("rhizome-grid-item")) {
    if (mouseDown) {
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      event.target.style.left = elementX + deltaX + "px";
      event.target.style.top = elementY + deltaY + "px";

      console.log(event.target);
      console.log(data);

      drawBackgroundShape(event.target, data);
      // drawBackgroundShape(event.target)
    }
    // }
  }

  function drawBackgroundShape(el, data) {
    let element = document.querySelector(
      `[background-div-att="${data.dataAtt}"]`
    );
    // let svgContainer = el.querySelector(".svg-background");
    console.log(element);
    const drawContainer = SVG().addTo(element).size("100%", "100%");

    console.log(el);
    coords = getElCenter(el);
    console.log(coords);

    let lgDist = 86;
    let shDist = 35.5;

    console.log(coords);
    console.log(coords.x + shDist, coords.x - shDist);

    let p1 = {
      oct: { x: coords.x + shDist, y: lgDist },
      rect: { x: lgDist, y: lgDist },
    };
    let p2 = {
      oct: { x: shDist, y: lgDist },
      rect: { x: +lgDist, y: lgDist },
    };
    let p3 = {
      oct: { x: lgDist, y: shDist },
      rect: { x: lgDist, y: lgDist },
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
      oct: { x: shDist, y: lgDist },
      rect: { x: lgDist, y: lgDist },
    };
    let p7 = {
      oct: { x: lgDist, y: shDist },
      rect: { x: lgDist, y: lgDist },
    };
    let p8 = {
      oct: { x: lgDist, y: shDist },
      rect: { x: lgDist, y: lgDist },
    };

    // let p1 = {
    //   oct: { x: coords.x - shDist, y: coords.y - lgDist },
    //   rect: { x: coords.x - lgDist, y: coords.y - lgDist },
    // };
    // let p2 = {
    //   oct: { x: coords.x + shDist, y: coords.y - lgDist },
    //   rect: { x: coords.x + lgDist, y: coords.y - lgDist },
    // };
    // let p3 = {
    //   oct: { x: coords.x + lgDist, y: coords.y - shDist },
    //   rect: { x: coords.x + lgDist, y: coords.y - lgDist },
    // };
    // let p4 = {
    //   oct: { x: coords.x + lgDist, y: coords.y + shDist },
    //   rect: { x: coords.x + lgDist, y: coords.y + lgDist },
    // };
    // let p5 = {
    //   oct: { x: coords.x + shDist, y: coords.y + lgDist },
    //   rect: { x: coords.x + lgDist, y: coords.y + lgDist },
    // };
    // let p6 = {
    //   oct: { x: coords.x - shDist, y: coords.y + lgDist },
    //   rect: { x: coords.x - lgDist, y: coords.y + lgDist },
    // };
    // let p7 = {
    //   oct: { x: coords.x - lgDist, y: coords.y + shDist },
    //   rect: { x: coords.x - lgDist, y: coords.y + lgDist },
    // };
    // let p8 = {
    //   oct: { x: coords.x - lgDist, y: coords.y - shDist },
    //   rect: { x: coords.x - lgDist, y: coords.y - lgDist },
    // };

    let polygon = drawContainer.polygon(
      `${p1.oct.x},${p1.oct.y} ${p2.oct.x},${p2.oct.y} ${p3.oct.x},${p3.oct.y} ${p4.oct.x},${p4.oct.y} ${p5.oct.x},${p5.oct.y} ${p6.oct.x},${p6.oct.y} ${p7.oct.x},${p7.oct.y} ${p8.oct.x},${p8.oct.y}`
    );
    polygon.fill("#f06");

    if (!data.backgroundDrawn) {
      // let polygon = draw.polygon(`${coords.x+50},${coords.y} ${coords.x+100},${coords.y+50} ${coords.x+50},${coords.y+100} ${coords.x},${coords.y+50}`)

      polygon.on(`mouseover`, () => {
        console.log(p1.rect.x);
        polygon
          .animate(500)
          .plot(
            `${p1.rect.x},${p1.rect.y} ${p2.rect.x},${p2.rect.y} ${p3.rect.x},${p3.rect.y} ${p4.rect.x},${p4.rect.y} ${p5.rect.x},${p5.rect.y} ${p6.rect.x},${p6.rect.y} ${p7.rect.x},${p7.rect.y} ${p8.rect.x},${p8.rect.y}`
          );

        // let polygon = draw.polygon(`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y} ${p5.x},${p5.y} ${p6.x},${p6.y} ${p7.x},${p7.y} ${p8.x},${p8.y}`)
      });
      polygon.on(`mouseleave`, () => {
        polygon
          .animate(500)
          .plot(
            `${p1.oct.x},${p1.oct.y} ${p2.oct.x},${p2.oct.y} ${p3.oct.x},${p3.oct.y} ${p4.oct.x},${p4.oct.y} ${p5.oct.x},${p5.oct.y} ${p6.oct.x},${p6.oct.y} ${p7.oct.x},${p7.oct.y} ${p8.oct.x},${p8.oct.y}`
          );
      });
    }

    //   polygon.plot([[coords.x+50,coords.y], [coords.x+100,coords.y+50], [coords.x+50,coords.y+100], [coords.x,coords.y+50]])

    // return polygon;
  }

  function handleSVGmouseMove(event) {
    // console.log(event.target)
  }

  function drawRhizomeLinks(data) {
    let rhizomeItems = document.querySelectorAll(".rhizome-grid-item");

    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].link.includes("visual-complexity")) {
        let target = document.querySelector('[data-att="visual-complexity"]');
        targetCoords = getElCenter(target);
        console.log(targetCoords);
        drawLine(data[i].xPos, data[i].yPos, targetCoords.x, targetCoords.y);
      }
    }
    // if (data.link.includes('visual-complexity')){
    //     console.log("visual complexity link")
    // }

    // let coords = getElCenter(container);

    // let polygon = draw.polygon(`${coords.x+50},${coords.y} ${coords.x+100},${coords.y+50} ${coords.x+50},${coords.y+100} ${coords.x},${coords.y+50}`)
    // polygon.fill('#f06')
  }

  function drawLine(x1, y1, x2, y2) {
    console.log(x1, y1, x2, y2);
    draw.line(x1, y1, x2, y2).stroke({ width: 1, color: "black" });

    // line.plot(50, 30, 100, 150)
  }
}; //window onload
