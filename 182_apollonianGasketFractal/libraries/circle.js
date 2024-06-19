class Circle {
  constructor(x, y, k) {
    this.x = x;
    this.y = y;
    this.r = Math.abs(1/k);
    this.k = k;
    this.center = createVector(x,y);
    this.complexCenter = new Complex(x,y);
    this.color = random(0,255);
  }

  show() {
    //fill(this.color);
    circle(this.x,this.y,2*this.r);
  }
}