let drops = [];

function setup() {

  createCanvas(500, 500);
  for(let i=0;i<50;i++){
    addDrop(width/2,height/2);
  }
}

function draw() {
  background(255);
  drops.forEach(d => {
    d.show()
  });
}

function mouseClicked() { 
  //addDrop(mouseX,mouseY);
  for(let d of drops){
    let C = createVector(mouseX,mouseY);
    d.vortex(C,200,10,10000);
  }
}

function addDrop(x, y){
  let drop = new Drop(x, y, 50);
  for(let d of drops){
    d.marbel(drop);
  }
  drops.push(drop);
}

