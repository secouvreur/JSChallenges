hole;
whiteBall;
coloredBall;
function setup() {
  createCanvas(800, 800);
  hole = new ball(100,100,5,0);
  coloredBall = new ball(230,400,20,200);
}

// function mousePressed()
// {
//   whiteBall = new ball(mouseX,mouseY,18);
// }

function draw() {
  background(255);
  whiteBall = new ball(mouseX,mouseY,18);
  hole.show();
  coloredBall.show();
  if(typeof whiteBall === 'undefined')
  {
    return;
  }
  if(whiteBall.r+coloredBall.r > whiteBall.center.dist(coloredBall.center))
  {
    return;
  }
  whiteBall.show();
  line(whiteBall.x, whiteBall.y, coloredBall.x, coloredBall.y);
  let whitePrime = whitePrimePos(hole, coloredBall, whiteBall);
  if(whitePrime == null)
  {
    return;
  }
  whitePrime.show();
  let d = distanceOfWhiteCenter(whitePrime,whiteBall,coloredBall);
  showDistance(coloredBall,whiteBall,d);
}

function whitePrimePos(hole, coloredBall,whiteBall)
{
  let HC = createVector(coloredBall.x - hole.x, coloredBall.y - hole.y);
  let r = HC.copy().normalize().mult(whiteBall.r+coloredBall.r);
  let wPrime = r.add(coloredBall.center);
  let wIdealBall = new ball(wPrime.x,wPrime.y,whiteBall.r);
  let iwb = whiteMaxPos(hole,coloredBall,whiteBall);
  if(wIdealBall.center.dist(whiteBall.center)<= iwb.center.dist(whiteBall.center))
  {
    return wIdealBall;
  }
  return iwb;
}

function distanceOfWhiteCenter(wPrime,wBall,cBall)
{
  let wc = createVector(wBall.x - cBall.x, wBall.y - cBall.y);
  let wPc = createVector(wBall.x - wPrime.x, wBall.y - wPrime.y);
  let angle = wc.angleBetween(wPc);
  return tan(angle)*wc.mag();
}

function showDistance(cBall, wBall,d)
{
  let dAbs = Math.abs(d);
  let dd = createVector(wBall.x - cBall.x, wBall.y - cBall.y).normalize().mult(dAbs);
  let d1 = dd.copy().rotate(-HALF_PI*Math.sign(d)).add(cBall.center);
  line(d1.x, d1.y, cBall.x, cBall.y);
}

function whiteMaxPos(hole,coloredBall,whiteBall)
{
  let WC = createVector(coloredBall.x - whiteBall.x, coloredBall.y - whiteBall.y);
  let HC = createVector(coloredBall.x - hole.x, coloredBall.y - hole.y);
  let angle = HC.angleBetween(WC);
  let r = coloredBall.r + whiteBall.r;
  let cosWCI = r / WC.mag();
  let idealWB = coloredBall.center.copy().add(WC.copy().normalize().mult(r).rotate(PI+Math.sign(angle)*Math.acos(cosWCI)));
  return new ball(idealWB.x,idealWB.y,whiteBall.r);
}