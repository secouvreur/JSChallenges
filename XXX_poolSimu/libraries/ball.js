class ball {
  constructor(x, y, r, color = 255) {
    this.x = x;
    this.y = y;
    this.r = r
    this.center = createVector(x,y);
    this.color = color;
  }

  show() {
    fill(this.color);
    circle(this.x,this.y,2*this.r);
  }
}