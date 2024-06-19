let queue = [];
let circles = [];
let nCircles;
let threshold = 2;

function setup() {
  createCanvas(600, 600);
  let r = 50;
  let x = sqrt((200-r)**2-r**2);
  let circle1 = new Circle(300,300,-1/200);
  let circle2 = new Circle(300,300-x,1/r);
  let circle3 = new Circle(300,300+x,1/r);

  circles.push(circle1);
  circles.push(circle2);
  circles.push(circle3);

  queue.push([circle1,circle2,circle3]);
  while(queue.length > 0){
    nextGen(queue.shift());
  }
}

function draw() {
  background(255);
  for(c of circles){
    c.show();
  }
}

function nextGen(triplet){
  nCircles = complexDescartes(triplet);
  //validate circles
  for(let circle of nCircles){
    if(isValid(circle,triplet[0],triplet[1],triplet[2])){
      circles.push(circle);
      
      queue.push([circle,triplet[0],triplet[1]]);
      queue.push([circle,triplet[0],triplet[2]]);
      queue.push([circle,triplet[2],triplet[1]]);
    }
  }
}

//create isValid
function  isValid(c,c1,c2,c3){
  if(c.r<threshold){
    return false;
  }
  let alreadyExist = false;
  for(let circle of circles){
    alreadyExist = alreadyExist || circle.complexCenter.equal(c.complexCenter);
  }
  return !alreadyExist && isTangent(c,c1) && isTangent(c,c2) && isTangent(c,c3);
}

function  isTangent(c,c1){
  let d = sqrt((c.x - c1.x)**2+(c.y - c1.y)**2);
  let result = d - Math.abs((1/c.k) + (1/c1.k)) < 0.01;
  return result;
}

function descartes(c1,c2,c3){
  let sum = c1.k + c2.k + c3.k;
  let root = 2 * sqrt(c1.k*c2.k + c2.k*c3.k + c3.k*c1.k);
  return [sum + root, sum - root];
}

function complexDescartes(c){
  let c1 = c[0];
  let c2 = c[1];
  let c3 = c[2];

  k = descartes(c1,c2,c3);
  let z1 = c1.complexCenter;
  let z2 = c2.complexCenter;
  let z3 = c3.complexCenter;

  let zk1 = z1.scale(c1.k);
  let zk2 = z2.scale(c2.k);
  let zk3 = z3.scale(c3.k);

  let sum = zk1.add(zk2).add(zk3);

  let root = zk1.mult(zk2).add(zk3.mult(zk2)).add(zk1.mult(zk3));
  root = root.sqrt().scale(2);

  let nc1 = sum.add(root).scale(1/k[0]);
  let nc2 = sum.sub(root).scale(1/k[0]);
  let nc3 = sum.add(root).scale(1/k[1]);
  let nc4 = sum.sub(root).scale(1/k[1]);

  return [
    new Circle(nc1.real,nc1.im,k[0]), 
    new Circle(nc2.real,nc2.im,k[0]), 
    new Circle(nc3.real,nc3.im,k[1]), 
    new Circle(nc4.real,nc4.im,k[1])
  ];
}