class RhizomeItem {
  constructor(
    title,
    pullquote,
    desc,
    img,
    dataAtt,
    links,
    rhizomeCloud,
    getElCenter,
    redrawLines
  ) {
    this.name = dataAtt;

    this.x = null;
    this.y = null;
    this.oldX = null;
    this.oldY = null;
    this.title = title;
    this.pullquote = pullquote;
    this.description = desc;
    this.img = img;
    this.links = links;

    //for when item is focused
    this.descriptionOpened = false;
    this.descriptionCtn = null;
    this.descriptionTitle = null;
    this.descriptionSubtitle = null;
    this.descriptionDesc = [];

    this.parentContainer = rhizomeCloud;

    console.log(this.description.length);

    //only works for the SVGs, div stays the same size
    this.rhizomeSVGsize = 0.15 * this.description.length;
    this.divWidth = this.rhizomeSVGsize * 250;
    this.divHeight = this.divWidth;
    this.fontSize = this.divWidth / 7.5;

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

    this.dsDelta = 10;

    this.dsBckg = {
      closed: {
        lgDist: 0,
        midDist: 0,
        shDist: 0,
      },
      opened: {
        lgDist: this.hex.lgDist - this.dsDelta,
        midDist: this.hex.midDist - this.dsDelta * 86.57,
        shDist: this.hex.shDist - this.dsDelta / 2,
      },
    };

    this.calculateRectSVGDist();

    this.calculateSVGRhizomepoints(
      this.hex.lgDist,
      this.hex.midDist,
      this.hex.shDist
    );

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

    //svgs
    this.foregroundPolygon = null;
    this.backgroundPolygon = null;

    //only for data-scapes, once it is clicked
    this.dsPopup = null;

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

    this.tempX = null;
    this.tempY = null;
    this.temptRect = null;
    this.handleBtnClick();
    this.handleWindowResize();
  }

  createRhizomeItem() {
    //create a new div for every literature review item with a specific data attribute and random position
    this.div = document.createElement("div");

    // add a rhizome grid class and their specific data attribute (name)
    this.div.classList.add("rhizome-grid-item");
    this.div.style.width = `${this.divWidth}px`;
    this.div.style.height = `${this.divHeight}px`;
    this.div.setAttribute(`data-att`, `${this.name}`);

    //Set position, transition, left, top;
    this.div.style.transition = "transform 1s";

    //Randomize a position for the div within the parent container
    this.randomizeDivPos();

    //set the in that position (in px)
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;

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

      // this.div.querySelector("h1").innerText = this.title;
    }

    // let svgBackground = document.createElement("svg");
    this.svgBackground = document.createElement("div");
    this.svgBackground.classList.add("svg-background");
    this.svgBackground.setAttribute(`background-div-att`, `${this.name}`);

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
    this.container.querySelector("h2").innerText = this.title;
    this.container.querySelector("button").innerText = `Learn more`;

    //Convert the x, y position (%) in pixel with client rect and send it to the move event listener
    let originPosition = this.div.getBoundingClientRect();
    // this.addMoveEventListener(originPosition.x, originPosition.y);
  }

  createBackgroundSVG() {
    let self = this;
    let animating = false;
    let btnHovering = false;

    const drawBackground = SVG().addTo(this.svgBackground).size("100%", "100%");
    const drawForeground = SVG().addTo(this.svgForeground).size("100%", "100%");
    const drawDSanimation = SVG()
      .addTo(this.svgBackground)
      .size("100%", "100%");

    this.calculateSVGRhizomepoints(
      this.hex.lgDist,
      this.hex.midDist,
      this.hex.shDist
    );

    this.foregroundPolygon = drawForeground.polygon(
      `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
    );
    this.foregroundPolygon.fill("transparent");
    this.backgroundPolygon = drawBackground.polygon(
      `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
    );
    this.backgroundPolygon.fill("#fff");
    this.backgroundPolygon.stroke({ color: "#000", width: 2 });

    //create the black background if the rhizome item is data_scapes
    if (this.title === "data_scapes") {
      this.calculateSVGRhizomepoints(
        this.dsBckg.closed.lgDist,
        this.dsBckg.closed.midDist,
        this.dsBckg.closed.shDist
      );
      this.dsBackground = drawDSanimation.polygon(
        `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
      );
      this.dsBackground.fill("black");
    }

    this.foregroundPolygon.on(`mouseover`, () => {
      if (!this.parentContainer.classList.contains("button-clicked")) {
        if (!animating) {
          self.calculateSVGRhizomepoints(
            self.oct.lgDist,
            self.oct.midDist,
            self.oct.shDist
          );
          animating = true;
          this.backgroundPolygon
            .animate(500)
            .plot(
              `${self.p1.oct.x},${self.p1.oct.y} ${self.p2.oct.x},${self.p2.oct.y} ${self.p3.oct.x},${self.p3.oct.y} ${self.p4.oct.x},${self.p4.oct.y} ${self.p5.oct.x},${self.p5.oct.y} ${self.p6.oct.x},${self.p6.oct.y} ${self.p7.oct.x},${self.p7.oct.y} ${self.p8.oct.x},${self.p8.oct.y}`
            )
            .after(function () {
              animating = false;
            });
        }

        //if data_scapes, also animate the background svg:
        if (self.title === "data_scapes") {
          self.calculateSVGRhizomepoints(
            self.dsBckg.opened.lgDist,
            self.dsBckg.opened.midDist,
            self.dsBckg.opened.shDist
          );
          animating = true;
          this.dsBackground
            .animate(500)
            .plot(
              `${self.p1.oct.x},${self.p1.oct.y} ${self.p2.oct.x},${self.p2.oct.y} ${self.p3.oct.x},${self.p3.oct.y} ${self.p4.oct.x},${self.p4.oct.y} ${self.p5.oct.x},${self.p5.oct.y} ${self.p6.oct.x},${self.p6.oct.y} ${self.p7.oct.x},${self.p7.oct.y} ${self.p8.oct.x},${self.p8.oct.y}`
            )
            .after(function () {
              animating = false;
            });
        }
      }

      // If data_scapes is mouse over'd, animate the black oct from 0 to open
      if (self.title === "data_scapes") {
        //change to full oct shape - 10 indent;
        console.log("we are changing data_scapes on mouse over");
      }
    });

    this.foregroundPolygon.on(`mouseleave`, (e) => {
      if (!this.parentContainer.classList.contains("button-clicked")) {
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

          this.backgroundPolygon
            .animate(500)
            .plot(
              `${self.p1.hex.x},${self.p1.hex.y} ${self.p2.hex.x},${self.p2.hex.y} ${self.p3.hex.x},${self.p3.hex.y} ${self.p4.hex.x},${self.p4.hex.y} ${self.p5.hex.x},${self.p5.hex.y} ${self.p6.hex.x},${self.p6.hex.y} ${self.p7.hex.x},${self.p7.hex.y} ${self.p8.hex.x},${self.p8.hex.y}`
            )
            .after(function () {
              //making sure the hover state is removed from all rhizome items and that all shapes return to original state
              self.removeHoverStateRhizomeItems(self.div);
            });

          if (self.title === "data_scapes") {
            self.calculateSVGRhizomepoints(
              self.dsBckg.closed.lgDist,
              self.dsBckg.closed.midDist,
              self.dsBckg.closed.shDist
            );
            animating = true;
            this.dsBackground
              .animate(1000)
              .plot(
                `${this.p1.hex.x},${this.p1.hex.y} ${this.p2.hex.x},${this.p2.hex.y} ${this.p3.hex.x},${this.p3.hex.y} ${this.p4.hex.x},${this.p4.hex.y} ${this.p5.hex.x},${this.p5.hex.y} ${this.p6.hex.x},${this.p6.hex.y} ${this.p7.hex.x},${this.p7.hex.y} ${this.p8.hex.x},${this.p8.hex.y}`
              )
              .after(function () {
                animating = false;
              });
          }
        }
      }
    });
  }

  handleMouseEnter() {
    console.log("here");
    let self = this;
    this.div.addEventListener("mouseenter", () => {
      if (!self.parentContainer.classList.contains("button-clicked")) {
        console.log("mouse has entered through class");
        if (!self.div.classList.contains("grid-item-open")) {
          self.div.classList.add("rhizome-grid-item-hover");
          self.coverElement.style.opacity = "0";

          setTimeout(() => {
            self.divHoverScreen.style.opacity = "1";
          }, 100);
        }
        // self.divHoverScreen.style.opacity = `1`;
      }
    });
  }

  handleMouseLeave() {
    let self = this;
    this.div.addEventListener("mouseleave", () => {
      if (!self.parentContainer.classList.contains("button-clicked")) {
        if (self.div.classList.contains("rhizome-grid-item-hover")) {
          self.removeHoverStateRhizomeItems(self.div);
        }
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
      if (!this.parentContainer.classList.contains("button-clicked")) {
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

          self.x = newX;
          self.y = newY;

          console.log(self.x);

          //redraw the rhizome lines;
          this.redrawLines(self.div, self.x, self.y);
        }
      }
    });
  }

  handleBtnClick() {
    let self = this;
    this.btnElement.addEventListener("click", (e) => {
      //If data_scapes, send to other function to handle the animation and page change
      if (self.title === "data_scapes") {
        self.goToDatascapes();
      } else {
        console.log(self.div);

        //If no item is in focus, bring that item in focus
        if (!self.div.classList.contains("rhizome-item-focus")) {
          //store the current position of the item so it goes back when it closes
          self.tempRect = self.div.getBoundingClientRect();
          console.log(self.tempRect);
          self.tempX = self.tempRect.x;
          self.tempY = self.tempRect.y;
          self.parentContainer.classList.add("button-clicked");
          console.log("button clicked");

          //resize the rhizome-item to be the full width of the screen and on top of everything

          self.div.classList.remove("rhizome-grid-item");
          self.div.classList.remove("rhizome-grid-item-hover");
          self.div.style = "";

          self.div.classList.add("rhizome-item-focus");

          //change the background svg to rectangle => gotta calculate the full width of the client after having resized the div
          this.calculateSVGRhizomepoints(
            this.rect.lgDist,
            this.rect.midDist,
            this.rect.shDist
          );

          //make polygon bigger
          this.backgroundPolygon
            .animate(500)
            .plot(
              `${self.p1.rect.x},${self.p1.rect.y} ${self.p2.rect.x},${self.p2.rect.y} ${self.p3.rect.x},${self.p3.rect.y} ${self.p4.rect.x},${self.p4.rect.y} ${self.p5.rect.x},${self.p5.rect.y} ${self.p6.rect.x},${self.p6.rect.y} ${self.p7.rect.x},${self.p7.rect.y} ${self.p8.rect.x},${self.p8.rect.y}`
            )
            .after(function () {
              //Create the description div
              // self.toggleDescription();
              // self.divHoverScreen.style.opacity = `0`;
            });
        }
        //if button is clicked and an item is in focus, close that item (and make it go back to its original position)
        else {
          self.parentContainer.classList.remove("button-clicked");
          self.div.classList.add("rhizome-grid-item");
          self.div.style = `transition: transform 1s ease 0s; left:${self.tempX}px; top: ${self.tempY}px `;
          self.div.classList.remove("rhizome-item-focus");

          //change the background svg to rectangle => gotta calculate the full width of the client after having resized the div
          this.calculateSVGRhizomepoints(
            this.hex.lgDist,
            this.hex.midDist,
            this.hex.shDist
          );
          console.log("hello");
          //make polygon bigger
          this.backgroundPolygon
            .animate(500)
            .plot(
              `${self.p1.hex.x},${self.p1.hex.y} ${self.p2.hex.x},${self.p2.hex.y} ${self.p3.hex.x},${self.p3.hex.y} ${self.p4.hex.x},${self.p4.hex.y} ${self.p5.hex.x},${self.p5.hex.y} ${self.p6.hex.x},${self.p6.hex.y} ${self.p7.hex.x},${self.p7.hex.y} ${self.p8.hex.x},${self.p8.hex.y}`
            )
            .after(function () {
              //making sure the hover state is removed from all rhizome items and that all shapes return to original state
              self.removeHoverStateRhizomeItems(self.div);
            });

          //recalculate lines

          for (let i = 0; i < self.links.length; i++) {
            let newCoords = self.getElCenter(self.div);
            self.x = newCoords.x;
            self.y = newCoords.y;
            //Get the center of the end object too!
            this.redrawLines(self.div, self.x, self.y);
          }
        }
      }
    });
  }

  //  == broken, not used ==
  addMoveEventListener(x, y) {
    if (!this.parentContainer.classList.contains("button-clicked")) {
      let currentPosition = this.div.getBoundingClientRect();
      console.log(x);
      console.log(currentPosition);
      if (x === currentPosition.x) {
        // console.log("it's the same");
        // breaks the program:
        requestAnimationFrame(
          this.addMoveEventListener(currentPosition.x, currentPosition.y)
        );
      } else {
      }
    }
  }

  // Not resizing properly all lines when the lines are %
  handleWindowResize() {
    let self = this;
    window.addEventListener("resize", (event) => {
      // console.log(self.links);
      for (let i = 0; i < self.links.length; i++) {
        let newCoords = self.getElCenter(self.div);

        self.x = newCoords.x;
        self.y = newCoords.y;

        //Get the center of the end object too!
        this.redrawLines(self.div, self.x, self.y);
      }
    });
  }

  removeHoverStateRhizomeItems(el) {
    el.classList.remove("rhizome-grid-item-hover");
    el.querySelector(".rhizome-item-hover-screen").style.opacity = "0";
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

  randomizeDivPos() {
    let container = this.parentContainer.getBoundingClientRect();
    this.x = Math.floor(Math.random() * container.width);
    this.y = Math.floor(Math.random() * container.height);
    console.log(this.title);
    if (this.title === "data_scapes") {
      this.x = container.width / 2;
      this.y = container.height / 2;
    }
    this.oldX = this.x;
    this.oldY = this.y;
  }

  calculateRectSVGDist() {
    console.log(this.parentContainer);
    let container = this.parentContainer.getBoundingClientRect();
    this.rect = {
      lgDist: container.width / 5,
      midDist: 86.57 * this.rhizomeSVGsize,
      shDist: container.height / 5,
    };
  }

  toggleDescription() {
    if (descriptionOpened) {
      console.log("description is opened");
    } else {
      console.log("description is closed");
    }
  }

  goToDatascapes() {
    this.dsPopup = document.querySelector("#ds-geolocation-sharing-ack");

    let fadeAnim = document.querySelector(`#black-out-screen`);
    this.parentContainer.style.transform = "scale(3)";

    console.log(fadeAnim);
    // fadeAnim.style.display = `block`;
    // fadeAnim.style.opacity = `1`;
    setTimeout(() => {
      document.querySelector("#ds-info-box").style.display = "block";
    }, 1500);
  }
}
