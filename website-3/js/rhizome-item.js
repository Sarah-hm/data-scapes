class RhizomeItem {
  //   constructor(x1, y1, x2, y2, startObject, endObject) {
  constructor(
    x,
    y,
    title,
    pullquote,
    desc,
    img,
    dataAtt,
    links,
    lgDist,
    shDist,
    rhizomeCloud,
    getElCenter,
    redrawLines
  ) {
    this.name = dataAtt;

    this.x = x;
    this.y = y;
    this.title = title;
    this.pullquote = pullquote;
    this.description = desc;
    this.img = img;
    this.links = links;

    this.lgDist = lgDist;
    this.shDist = shDist;

    this.points = {
      p1: {
        hex: { x: -this.lgDist, y: -this.shDist },
        oct: { x: -this.shDist, y: -this.lgDist },
        rect: { x: -this.lgDist, y: -this.lgDist },
      },
      p2: {
        hex: { x: 0, y: -this.lgDist },
        oct: { x: this.shDist, y: -this.lgDist },
        rect: { x: this.lgDist, y: -this.lgDist },
      },
      p3: {
        hex: { x: 0, y: -this.lgDist },
        oct: { x: this.lgDist, y: -this.shDist },
        rect: { x: this.lgDist, y: -this.lgDist },
      },
      p4: {
        hex: { x: this.lgDist, y: -this.shDist },
        oct: { x: this.lgDist, y: this.shDist },
        rect: { x: this.lgDist, y: this.lgDist },
      },
      p5: {
        hex: { x: this.lgDist, y: this.shDist },
        oct: { x: this.shDist, y: this.lgDist },
        rect: { x: this.lgDist, y: this.lgDist },
      },
      p6: {
        hex: { x: 0, y: this.lgDist },
        oct: { x: -this.shDist, y: this.lgDist },
        rect: { x: -this.lgDist, y: this.lgDist },
      },
      p7: {
        hex: { x: 0, y: this.lgDist },
        oct: { x: -this.lgDist, y: this.shDist },
        rect: { x: -this.lgDist, y: this.lgDist },
      },
      p8: {
        hex: { x: -this.lgDist, y: this.shDist },
        oct: { x: -this.lgDist, y: -this.shDist },
        rect: { x: -this.lgDist, y: -this.lgDist },
      },
    };

    this.parentContainer = rhizomeCloud;
    this.div = null;
    this.titleElement = null;
    this.svgBackground = null;
    this.container = null;
    this.svgForeground = null;
    this.divHoverScreen = null;
    this.pullquoteElement = null;
    this.btnElement = null;

    let mouseDown = false;
    this.redrawLines = redrawLines;
    this.getElCenter = getElCenter;
    this.createRhizomeItem();
    this.handleMouseEnter();
    this.handleMouseLeave();
    this.handleMouseDown();
    this.handleMouseUp();
    this.handleMouseMove();
    this.handleBtnClick();
    this.handleWindowResize();
  }

  createRhizomeItem() {
    //create a new div for every literature review item with a specific data attribute and random position
    this.div = document.createElement("div");

    // console.log(data[i].dataAtt);

    // add a rhizome grid class and their specific data attribute (name)
    this.div.classList.add("rhizome-grid-item");
    this.div.setAttribute(`data-att`, `${this.name}`);

    //Set position, transition, left, top;
    this.div.style.transition = "transform 1s";
    this.div.style.left = `${this.x}%`;
    this.div.style.top = `${this.y}%`;

    // create an empty h1 and append it to the new div
    this.titleElement = document.createElement("h1");
    // let svgBackground = document.createElement("svg");
    this.svgBackground = document.createElement("div");
    this.svgBackground.classList.add("svg-background");
    this.svgBackground.setAttribute(`background-div-att`, `${this.name}`);

    this.div.appendChild(this.titleElement);
    this.div.appendChild(this.svgBackground);

    //append new div to the rhizome cloud
    this.parentContainer.appendChild(this.div);

    //append a hover div (pullquote and button) on the previously created div;
    this.container = document.querySelector(`[data-att="${this.name}"]`);
    //create a foreground to make an invisible hoverable svg;
    this.svgForeground = document.createElement("div");
    this.svgForeground.classList.add("svg-foreground");
    this.svgForeground.setAttribute(`foreground-div-att`, `${this.name}`);

    //create the hover div (with pullquote and button to access the rhizome item's page)
    this.divHoverScreen = document.createElement("div");
    this.divHoverScreen.classList.add("rhizome-item-hover-screen");

    this.container.prepend(this.divHoverScreen);
    this.container.prepend(this.svgForeground);

    //put a h2 and button in all hover screen (pullquote and button)
    // this.hoverScreenContainer = document
    //   .querySelector(`[data-att="${this.name}"]`)
    //   .querySelector(".rhizome-item-hover-screen");
    this.pullquoteElement = document.createElement("h2");
    this.btnElement = document.createElement("button");

    this.divHoverScreen.appendChild(this.pullquoteElement);
    this.divHoverScreen.appendChild(this.btnElement);

    //Populate all elements with data from json file
    this.container.querySelector("h1").innerText = this.title;
    this.container.querySelector("h2").innerText = this.pullquote;
    this.container.querySelector("button").innerText = `Learn more`;
  }

  handleMouseEnter() {
    console.log("here");
    let self = this;
    this.div.addEventListener("mouseenter", () => {
      console.log("mouse has entered through class");
      if (!self.div.classList.contains("grid-item-open")) {
        self.div.classList.add("rhizome-grid-item-hover");
        self.titleElement.style.color = "rgba(0,0,0,0)";
        self.divHoverScreen.style.opacity = `1`;
      }
    });
  }

  handleMouseLeave() {
    let self = this;
    this.div.addEventListener("mouseleave", () => {
      if (self.div.classList.contains("rhizome-grid-item-hover")) {
        self.removeHoverStateRhizomeItems(self.div);
      }
    });
  }

  handleMouseDown() {
    let self = this;
    this.div.addEventListener("mousedown", (event) => {
      console.log(event.clientX);
      self.mouseDown = true;

      let mouseX = event.clientX;
      let mouseY = event.clientY;

      // let movingElement = self.div;
    });
  }

  handleMouseUp() {
    let self = this;
    document.addEventListener("mouseup", () => {
      self.mouseDown = false;
    });
  }

  handleMouseMove() {
    let self = this;
    document.addEventListener("mousemove", (event) => {
      if (self.mouseDown) {
        let elRect = self.div.getBoundingClientRect();

        const deltaX = elRect.width / 2;
        const deltaY = elRect.height / 2;

        let newX = event.clientX - deltaX;
        let newY = event.clientY - deltaY;

        self.div.style.left = newX + "px";
        self.div.style.top = newY + "px";

        //Redraw line with the current Element's X, Y position (should be whenever the div moves, not only on mouse move)
        newX = newX + elRect.width / 2;
        newY = newY + elRect.height / 2;

        //redraw the rhizome lines;
        this.redrawLines(self.div, newX, newY);
      }
    });
  }

  handleBtnClick() {
    let self = this;
    this.btnElement.addEventListener("click", () => {
      self.div.classList.add("button-clicked");
      self.removeHoverStateRhizomeItems(self.div);
    });
  }

  // Not resizing properly all lines
  handleWindowResize() {
    let self = this;
    window.addEventListener("resize", (event) => {
      for (let i = 0; i < self.links.length; i++) {
        let newCoords = self.getElCenter(self.div);
        self.redrawLines(self.div, newCoords.x, newCoords.y);
      }
    });
  }

  removeHoverStateRhizomeItems(el) {
    el.classList.remove("rhizome-grid-item-hover");
    el.querySelector(".rhizome-item-hover-screen").style.opacity = "0";
    if (!el.classList.contains(`button-clicked`)) {
      setTimeout(() => {
        this.titleElement.style.color = "rgba(0,0,0,1)";
      }, 750);
    }
  }
}
