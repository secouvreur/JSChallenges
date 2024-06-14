
// Detail level for drawing circles
// Maybe make dynamic based on circle radius?
const circleDetail = 1000;

class Drop {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.center = createVector(x,y)
    this.vertices = [];
    for (let i = 0;i<circleDetail;i++) {
        let v = createVector(cos(TWO_PI*i/circleDetail), sin(TWO_PI*i/circleDetail));
        v.mult(r);
        v.add(this.center);
        this.vertices.push(v);
    }
    this.color = random(0,255);
  }

  marbel(other){
    for(let v of this.vertices){
        let pc = v.copy();
        pc.sub(other.center);
        let r = other.r;
        let mag = pc.mag();
        let m = sqrt( 1 + ((r * r) / (mag * mag)));
        pc.mult(m);
        pc.add(other.center);
        v.set(pc);
    }
  }

  //B a point of the line. M the direction of the line (nomalized)
  tine(B, M, z, c){
    let N = createVector(-M.y,M.x);
    let u = 1/(2**(1/c));
    for (let v of this.vertices) {
        let pb = v.copy(); 
        pb.sub(B);
        let d = Math.abs(pb.dot(N));
        let mag = z * pow(u, d);
        let M2 = M.copy();
        M2.mult(mag);
        let result = v.copy();
        v.set(result.add(M2));
    }

  }

  //C the center of the deformation. R the radius
  circularTine(C,r,z,c){
    let u = 1/(2**(1/c));
    for (let v of this.vertices) {
        let pc = v.copy(); 
        pc.sub(C);
        let pcmag = pc.mag();
        let d = Math.abs(pcmag-r);
        let l = z * pow(u, d);
        let a = l / pcmag;
        let result = v.copy();
        result.sub(C);
        let x =result.x * cos(a) + result.y * -sin(a);
        let y =result.x * sin(a) + result.y * cos(a);
        result.set(x,y);
        v.set(result.add(C));
    }
  }

  //C the center of the deformation
  vortex(C,r,z,c){
    let u = 1/(2**(1/c));
    for (let v of this.vertices) {
        let pc = v.copy(); 
        pc.sub(C);
        let h = pc.mag();
        if(h != 0){
            let l = z * pow(u, h-r);
            let a = l / h;
            let result = v.copy();
            result.sub(C);
            let x =result.x * cos(a) + result.y * -sin(a);
            let y =result.x * sin(a) + result.y * cos(a);
            result.set(x,y);
            v.set(result.add(C));
        }
    }
  }

  yTine(xl,z,c){
    let u = 1/(2**(1/c));
    for (let v of this.vertices) {
        v.y = v.y + z*u**(abs(v.x-xl))
    }
  }

  show() {
    fill(this.color);
    noStroke();
    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}