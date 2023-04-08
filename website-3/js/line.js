class Line {
  //   constructor(x1, y1, x2, y2, startObject, endObject) {
  constructor(x1, y1, x2, y2, coreObject, targetObject) {
    this.startObject = {
      x: x1,
      y: y1,
      object: coreObject,
    };
    this.endObject = {
      x: x2,
      y: y2,
      object: targetObject,
    };
  }
  draw(drawNewLine) {
    // console.log("we are drawing an imaginary line :)");
    // console.log(this.endObject.object);
    this.lineDrawn = drawNewLine
      .line(
        this.startObject.x,
        this.startObject.y,
        this.endObject.x,
        this.endObject.y
      )
      .stroke({ width: 3, color: "black" })
      .addClass(`rhizome-cloud-line`);

    // console.log(this.lineDrawn);
  }

  redrawFromStart(newX, newY) {
    this.startObject.x = newX;
    this.startObject.y = newY;

    this.redraw(
      this.startObject.x,
      this.startObject.y,
      this.endObject.x,
      this.endObject.y
    );
  }
  redrawFromEnd(newX, newY) {
    this.endObject.x = newX;
    this.endObject.y = newY;

    this.redraw(
      this.startObject.x,
      this.startObject.y,
      this.endObject.x,
      this.endObject.y
    );
  }

  redraw(x1, y1, x2, y2) {
    this.lineDrawn.plot(x1, y1, x2, y2);
  }
}
