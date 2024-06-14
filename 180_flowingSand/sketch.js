function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++){
    arr[i] = new Array(rows);
  }

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      arr[i][j] = 0;
    }
  }

  return arr;
}

function nextState(grid){
  let cols = grid.length;
  let rows = 0;
  if(cols > 0){
    rows = grid[0].length;
  }
  let nextGrid = make2DArray(cols, rows);

  //compute next step
  for(let j = 1; j <= rows; j++){
    for(let i = 0; i < cols; i++){
      if(j>1){
        if(grid[i][rows-j]!=0){
          if(nextGrid[i][rows-j+1] != 0){
            let sides = [];
            if(i>0 && nextGrid[i-1][rows-j+1] === 0){
              sides.push(-1);
            }
            if(i<cols - 1 && nextGrid[i+1][rows-j+1] === 0){
              sides.push(1);
            }
            let l = sides.length;
            if(l > 0){
              let rand = Math.floor(Math.random() * l);
              nextGrid[i+sides[rand]][rows-j+1] = grid[i][rows-j];
            }
            else{
              nextGrid[i][rows-j] = grid[i][rows-j];
            }
          }
          else{
            nextGrid[i][rows-j+1] = grid[i][rows-j];
          }
        }
      }
      else {
        nextGrid[i][rows-j] = grid[i][rows-j];
      }
    }
  }

  return nextGrid;
}

let grid
let w = 8;
let cols, rows;
let hueValue = 1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 255, 255);
  cols = width/w;
  rows = height/w;
  grid = make2DArray(cols, rows);
}

function draw() {
  background(0, 0, 0);

  let x = Math.floor(mouseX/w);
  let y = Math.floor(mouseY/w);

  if(x < width / w && y < height / w){
    grid[x][y] = hueValue;
  }

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      noStroke();
      if(grid[i][j]===0){
        fill(0);
      }
      else{
        fill(grid[i][j], 255, 255);
      }
      let x = i * w;
      let y = j * w;
      square(x, y , w);
    }
  }

  grid = nextState(grid);
  if(hueValue < 360){
    hueValue ++;
  }
  else{
    hueValue = 1;
  }
}