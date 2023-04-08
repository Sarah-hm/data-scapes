class RhizomeItem {
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

    this.rhizomeSVGsize = 0.5;

    this.hex = {
      lgDist: 100 * this.rhizomeSVGsize,
      midDist: 90 * this.rhizomeSVGsize,
      shDist: 50 * this.rhizomeSVGsize,
    };
    this.oct = {
      lgDist: 100 * this.rhizomeSVGsize,
      midDist: 86.57 * this.rhizomeSVGsize,
      shDist: 60 * this.rhizomeSVGsize,
    };
    this.rect = {
      lgDist: (rhizomeCloud.clientWidth / 2) * this.rhizomeSVGsize,
      midDist: 86.57 * this.rhizomeSVGsize,
      shDist: (rhizomeCloud.clientWidth / 2) * this.rhizomeSVGsize,
    };

    this.calculateSVGRhizomepoints(
      this.hex.lgDist,
      this.hex.midDist,
      this.hex.shDist
    );

    // this.points = {
    //   p1: {
    //     hex: { x: -this.lgDist, y: -this.shDist },
    //     oct: { x: -this.shDist, y: -this.lgDist },
    //     rect: { x: -this.lgDist, y: -this.lgDist },
    //   },
    //   p2: {
    //     hex: { x: 0, y: -this.lgDist },
    //     oct: { x: this.shDist, y: -this.lgDist },
    //     rect: { x: this.lgDist, y: -this.lgDist },
    //   },
    //   p3: {
    //     hex: { x: 0, y: -this.lgDist },
    //     oct: { x: this.lgDist, y: -this.shDist },
    //     rect: { x: this.lgDist, y: -this.lgDist },
    //   },
    //   p4: {
    //     hex: { x: this.lgDist, y: -this.shDist },
    //     oct: { x: this.lgDist, y: this.shDist },
    //     rect: { x: this.lgDist, y: this.lgDist },
    //   },
    //   p5: {
    //     hex: { x: this.lgDist, y: this.shDist },
    //     oct: { x: this.shDist, y: this.lgDist },
    //     rect: { x: this.lgDist, y: this.lgDist },
    //   },
    //   p6: {
    //     hex: { x: 0, y: this.lgDist },
    //     oct: { x: -this.shDist, y: this.lgDist },
    //     rect: { x: -this.lgDist, y: this.lgDist },
    //   },
    //   p7: {
    //     hex: { x: 0, y: this.lgDist },
    //     oct: { x: -this.lgDist, y: this.shDist },
    //     rect: { x: -this.lgDist, y: this.lgDist },
    //   },
    //   p8: {
    //     hex: { x: -this.lgDist, y: this.shDist },
    //     oct: { x: -this.lgDist, y: -this.shDist },
    //     rect: { x: -this.lgDist, y: -this.lgDist },
    //   },
    // };

    this.parentContainer = rhizomeCloud;
    this.div = null;
    this.coverElement = null;
    this.logoElement = null;
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
    this.createBackgroundSVG();
    this.handleMouseEnter();
    this.handleMouseLeave();
    this.handleMouseDown();
    this.handleMouseUp();
    this.handleMouseMove();
    this.handleBtnClick();
    this.handleWindowResize();
    this.addMoveEventListener();
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

    this.coverElement = document.createElement("div");
    this.coverElement.classList.add("rhizome-item-cover-element");

    this.div.appendChild(this.coverElement);

    //If the rhizome-item is data-scapes, create an image;
    if (this.name === "data-scapes") {
      // console.log("it is data-scapes");
      this.logoElement = document.createElement("img");
      this.logoElement.src = `assets/ds-logo.png`;
      this.logoElement.classList.add("ds-logo-element-rhizome-item");
      console.log(this.logoElement);
      this.coverElement.appendChild(this.logoElement);
      this.coverElement.style.opacity = "1";
    } else {
      // create an empty h1 and append it to the new div
      this.titleElement = document.createElement("h1");
      this.coverElement.appendChild(this.titleElement);
      console.log(this.div);
      // this.div.querySelector("h1").innerText = this.title;
    }

    // let svgBackground = document.createElement("svg");
    this.svgBackground = document.createElement("div");
    this.svgBackground.classList.add("svg-background");
    this.svgBackground.setAttribute(`background-div-att`, `${this.name}`);

    this.div.appendChild(this.svgBackground);

    //append new div to the rhizome cloud
    this.parentContainer.appendChild(this.div);
    console.log(this.div);

    //append a hover div (pullquote and button) on the previously created div;
    this.container = document.querySelector(`[data-att="${this.name}"]`);

    console.log(this.container);
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
    this.container.querySelector("h2").innerText = this.title;
    this.container.querySelector("button").innerText = `Learn more`;
  }

  createBackgroundSVG() {
    let self = this;
    let animating = false;
    let btnHovering = false;

    const drawBackground = SVG().addTo(this.svgBackground).size("100%", "100%");
    const drawForeground = SVG().addTo(this.svgForeground).size("100%", "100%");

    this.calculateSVGRhizomepoints(
      this.hex.lgDist,
      this.hex.midDist,
      this.hex.shDist
    );

    let foregroundPolygon = drawForeground.polygon(
      `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
    );
    foregroundPolygon.fill("transparent");
    let backgroundPolygon = drawBackground.polygon(
      `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
    );
    backgroundPolygon.fill("#fff");
    backgroundPolygon.stroke({ color: "#000", width: 2 });

    foregroundPolygon.on(`mouseover`, () => {
      if (!animating) {
        self.calculateSVGRhizomepoints(
          self.oct.lgDist,
          self.oct.midDist,
          self.oct.shDist
        );

        animating = true;
        backgroundPolygon
          .animate(500)
          .plot(
            `${self.p1.oct.x},${self.p1.oct.y} ${self.p2.oct.x},${self.p2.oct.y} ${self.p3.oct.x},${self.p3.oct.y} ${self.p4.oct.x},${self.p4.oct.y} ${self.p5.oct.x},${self.p5.oct.y} ${self.p6.oct.x},${self.p6.oct.y} ${self.p7.oct.x},${self.p7.oct.y} ${self.p8.oct.x},${self.p8.oct.y}`
          )
          .after(function () {
            animating = false;
          });
      }
    });

    foregroundPolygon.on(`mouseleave`, (e) => {
      let btnRect = self.btnElement.getBoundingClientRect();

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
        //Return to hex shape SVGs
        self.calculateSVGRhizomepoints(
          self.hex.lgDist,
          self.hex.midDist,
          self.hex.shDist
        );

        backgroundPolygon
          .animate(500)
          .plot(
            `${self.p1.hex.x},${self.p1.hex.y} ${self.p2.hex.x},${self.p2.hex.y} ${self.p3.hex.x},${self.p3.hex.y} ${self.p4.hex.x},${self.p4.hex.y} ${self.p5.hex.x},${self.p5.hex.y} ${self.p6.hex.x},${self.p6.hex.y} ${self.p7.hex.x},${self.p7.hex.y} ${self.p8.hex.x},${self.p8.hex.y}`
          )
          .after(function () {
            //making sure the hover state is removed from all rhizome items and that all shapes return to original state
            self.removeHoverStateRhizomeItems(self.div);
          });
      }
    });
  }

  handleMouseEnter() {
    console.log("here");
    let self = this;
    this.div.addEventListener("mouseenter", () => {
      console.log("mouse has entered through class");
      if (!self.div.classList.contains("grid-item-open")) {
        self.div.classList.add("rhizome-grid-item-hover");
        self.coverElement.style.opacity = "0";

        setTimeout(() => {
          self.divHoverScreen.style.opacity = "1";
        }, 100);

        // self.divHoverScreen.style.opacity = `1`;
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
    console.log(el.getAttribute("data-att"));
    el.querySelector(".rhizome-item-cover-element").style.opacity = "1";
  }

  calculateSVGRhizomepoints(lgDist, midDist, shDist) {
    this.p1 = {
      hex: { x: -midDist, y: -shDist },
      oct: { x: -shDist, y: -lgDist },
      rect: { x: -lgDist, y: -lgDist },
    };
    this.p2 = {
      hex: { x: 0, y: -lgDist },
      oct: { x: shDist, y: -lgDist },
      rect: { x: lgDist, y: -lgDist },
    };
    this.p3 = {
      hex: { x: 0, y: -lgDist },
      oct: { x: lgDist, y: -shDist },
      rect: { x: lgDist, y: -lgDist },
    };
    this.p4 = {
      hex: { x: midDist, y: -shDist },
      oct: { x: lgDist, y: shDist },
      rect: { x: lgDist, y: lgDist },
    };
    this.p5 = {
      hex: { x: midDist, y: shDist },
      oct: { x: shDist, y: lgDist },
      rect: { x: lgDist, y: lgDist },
    };
    this.p6 = {
      hex: { x: 0, y: lgDist },
      oct: { x: -shDist, y: lgDist },
      rect: { x: -lgDist, y: lgDist },
    };
    this.p7 = {
      hex: { x: 0, y: lgDist },
      oct: { x: -lgDist, y: shDist },
      rect: { x: -lgDist, y: lgDist },
    };
    this.p8 = {
      hex: { x: -midDist, y: shDist },
      oct: { x: -lgDist, y: -shDist },
      rect: { x: -lgDist, y: -lgDist },
    };
  }

  addMoveEventListener() {}
}
