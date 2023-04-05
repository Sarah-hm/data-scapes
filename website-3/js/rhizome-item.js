class RhizomeItem {
  //   constructor(x1, y1, x2, y2, startObject, endObject) {
  constructor(x, y, title, pullquote, desc, links, lgDist, shDist) {
    this.x = x;
    this.y = y;
    this.title = title;
    this.pullquote = pullquote;
    this.description = desc;
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
  }

  draw(drawNewRhizomeItem) {}
}
