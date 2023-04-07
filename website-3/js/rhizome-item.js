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

    //Keep original position before focussing on item when it's clicked
    this.originCoords = null;

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
    this.createSVGbackground();
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

    // add a rhizome grid class and their specific data attribute (name)
    this.div.classList.add("rhizome-grid-item");
    this.div.setAttribute(`data-att`, `${this.name}`);

    //Set position, transition, left, top;
    this.div.style.position = "fixed";
    this.div.style.transition = "transform 1s";
    this.div.style.left = `${this.x}%`;
    this.div.style.top = `${this.y}%`;

    // create an empty h1 and append it to the new div
    this.titleElement = document.createElement("h1");
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

  createSVGbackground() {
    let self = this;
    let animating = false;
    let btnHovering = false;

    const drawBackground = SVG().addTo(this.svgBackground).size("100%", "100%");
    const drawForeground = SVG().addTo(this.svgForeground).size("100%", "100%");

    this.lgDist = 100 / 2;
    this.shDist = 60 / 2;

    this.calculateSVGRhizomepoints(this.lgDist, this.shDist);

    let foregroundPolygon = drawForeground.polygon(
      `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
    );
    foregroundPolygon.fill("transparent");
    let backgroundPolygon = drawBackground.polygon(
      `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
    );
    backgroundPolygon.fill("#fff");
    backgroundPolygon.stroke({ color: "#808080", width: 2 });

    foregroundPolygon.on(`mouseover`, () => {
      if (!animating) {
        self.lgDist = 100 / 1.5;
        self.shDist = 100 / 1.5;
        self.calculateSVGRhizomepoints(self.lgDist, self.shDist);

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
        // lgDist = 100;
        // shDist = 66;

        self.lgDist = 100 / 2;
        self.shDist = 60 / 2;
        self.calculateSVGRhizomepoints(self.lgDist, self.shDist);

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

    // this.backgroundPolygons.push(backgroundPolygon);
  }

  handleMouseEnter() {
    console.log("here");
    let self = this;
    this.div.addEventListener("mouseenter", () => {
      console.log("mouse has entered through class");
      if (!self.parentContainer.classList.contains("rhizome-item-open")) {
        self.div.classList.add("rhizome-grid-item-hover");
        self.titleElement.style.color = "rgba(0,0,0,0)";
        self.divHoverScreen.style.opacity = `1`;
      }
    });
  }

  handleMouseLeave() {
    let self = this;
    this.div.addEventListener("mouseleave", () => {
      if (!self.parentContainer.classList.contains("rhizome-item-open")) {
        if (self.div.classList.contains("rhizome-grid-item-hover")) {
          self.removeHoverStateRhizomeItems(self.div);
        }
      }
    });
  }

  handleMouseDown() {
    let self = this;
    this.div.addEventListener("mousedown", (event) => {
      if (!self.parentContainer.classList.contains("rhizome-item-open")) {
        console.log(event.clientX);
        self.mouseDown = true;

        let mouseX = event.clientX;
        let mouseY = event.clientY;
      }
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
      if (!self.parentContainer.classList.contains("rhizome-item-open")) {
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
      }
    });
  }

  handleBtnClick() {
    let self = this;
    this.btnElement.addEventListener("click", () => {
      if (!self.parentContainer.classList.contains("rhizome-item-open")) {
        //remember original position
        self.originCoords = self.getElCenter(self.div);
        self.parentContainer.classList.add("rhizome-item-open");
        // self.removeHoverStateRhizomeItems(self.div);
        //make div bigger;
        self.div.classList.add("rhizome-item-focus");
        //make polygon bigger,
      } else {
        self.parentContainer.classList.remove("rhizome-item-open");
        self.div.classList.remove("rhizome-item-focus");

        self.div.style.left = `${self.originCoords.x}px`;
        self.div.style.top = `${self.originCoords.y}px`;

        self.lgDist = "1000";
        self.shDist = "1000";

        //lines dont redraw
        self.redrawLines(self.div, self.originCoords.x, self.originCoords.y);
      }
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

  calculateSVGRhizomepoints(lgDist, shDist) {
    this.p1 = {
      hex: { x: -lgDist, y: -shDist },
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
      hex: { x: lgDist, y: -shDist },
      oct: { x: lgDist, y: shDist },
      rect: { x: lgDist, y: lgDist },
    };
    this.p5 = {
      hex: { x: lgDist, y: shDist },
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
      hex: { x: -lgDist, y: shDist },
      oct: { x: -lgDist, y: -shDist },
      rect: { x: -lgDist, y: -lgDist },
    };

    return this.p1;
    return { p1, p2, p3, p4, p5, p6, p7, p8 };
  }
}
