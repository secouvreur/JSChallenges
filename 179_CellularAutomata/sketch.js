let a = 10
let w;
let h;
let grid = [];
rule = [];
ruleNumber = 54;
let gen = 0;

function setup() {
  createCanvas(600, 600);
  let nstr = ruleNumber.toString(2).padStart(8,'0');
  for(let i = 0; i<8; i++){
    rule.push(parseInt(nstr[i]));
  }
  w = Math.floor(width/a);
  h = Math.floor(height/a);
  for(let i = 0; i<h; i++){
    let line = new Array(w).fill(0);
    grid.push(line);
  }
  grid[0][Math.round(w/2)]=1;
}

function draw() {
  background(255);
  drawGrid();
  nextGen(gen);
  gen++;
  if(gen==h){
    noLoop();
  }
}

function drawGrid() {
  for(let i = 0; i<w; i++){
    for(let j = 0; j<h; j++){
      fill(255-grid[j][i]*255);
      noStroke();
      square(i*a,j*a,a);
    }
  }
}

function nextGen(n) {
  for(let i = 0; i<w; i++){
    if(i==0 || i==w-1){
      grid[n+1][i] = grid[n][i];
    }
    else{
      let index = grid[n][i-1]**3 + grid[n][i]**2 + grid[n][i+1];
      grid[n+1][i] = rule[index];
    }
  }
}


