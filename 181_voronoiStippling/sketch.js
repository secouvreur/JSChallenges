let seedPoints = [];
let currPoints = [];
let nextPoints;
let massCenters = [];
let totalMasses;
let delaunay;
let image;

function preload() {
  image = loadImage("image.webp");
  //image = loadImage("chien.avif");
}

function setup() {

  createCanvas(image.width, image.height);
  for(let i = 0; i<1000; i++){
    let x = random(width);
    let y = random(height);
    if(brightness(image.get(x,y)) < 50){
      seedPoints[i] = createVector(x, y);
    }
    else{
      i--;
    }
    currPoints[i] = seedPoints[i];
  }
  massCenters[0] = new Array(seedPoints.length);
  massCenters[1] = new Array(seedPoints.length);
  totalMasses = new Array(seedPoints.length);
  nextPoints = new Array(seedPoints.length);
}

function draw() {
  
  background(255);

  massCenters[0].fill(0);
  massCenters[1].fill(0);
  totalMasses.fill(0);

  //COMPUTE VORONOI
  delaunay = createDelaunay(currPoints);
  let voronoi = delaunay.voronoi([0,0,width,height]);
  let cells = computeVoronoiCells(voronoi)

  //COMPUTE CENTROIDS
  let centroids = cellCentroids(cells);
  let mCenters = computeMassCenters();

  //COMPUTE NEXT POINTS
  midRunPoints(currPoints, mCenters, len = 0.4);

  //DRAW
  drawPoint(currPoints);
  drawVoronoi(cells);
  //drawDelaunay(delaunay);

  currPoints = nextPoints;

  //noLoop();
}

function createDelaunay(seedPoints){
  let seedPointsArray = [];
  for(let v of seedPoints){
    seedPointsArray.push(v.x,v.y);
  }
  return new d3.Delaunay(seedPointsArray);
}

function drawPoint(points, color = 'black'){
  for(let v of points){
    stroke(color);
    strokeWeight(4);
    point(v.x, v.y);
  }
}

function drawDelaunay(delaunay)
{
  stroke(0);
  strokeWeight(1);
  noFill();
  let { points, triangles } = delaunay;
  for (let i = 0; i < triangles.length; i += 3) {
    let a = 2 * delaunay.triangles[i];
    let b = 2 * delaunay.triangles[i + 1];
    let c = 2 * delaunay.triangles[i + 2];
    triangle(
      points[a],
      points[a + 1],
      points[b],
      points[b + 1],
      points[c],
      points[c + 1]
    );
  }
}

function drawVoronoi(cells){

  for (let poly of cells) {
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < poly.length; i++) {
      vertex(poly[i][0], poly[i][1]);
    }
    endShape();
  }
}

function computeVoronoiCells(voronoi){
  let polygons = voronoi.cellPolygons();
  return Array.from(polygons);
}

function cellCentroids(cells){
  centroids = [];
  cells.forEach((cell) => {
    let area = 0;
    let x = 0;
    let y = 0;
    for(let i = 0; i< cell.length; i++){
        let j = (i+1) % cell.length;
        let crossProd = cell[i][0]*cell[j][1] - cell[j][0]*cell[i][1];
        area += crossProd;
        x += (cell[i][0] + cell[j][0]) * crossProd;
        y += (cell[i][1] + cell[j][1]) * crossProd;
    }
    alpha = 3 * area;
    x /= alpha;
    y /= alpha;
    centroids.push(createVector(x, y));
  });
  return centroids;
}

function midRunPoints(orig, dest, len = 0.5){
  for(let i = 0; i<orig.length;i++){
    nextPoints[i] = orig[i].lerp(dest[i], len);
  }
}

function computeMassCenters(){

  image.loadPixels();

  let index = 0;
  for(let i = 0; i < image.height ;i++){
    for(let j = 0; j < image.width ;j+=3){

      let ind = (j + i * width)*4;
      let bright = 255-(image.pixels[ind] + image.pixels[ind + 1] + image.pixels[ind + 2])/3;
      //let bright = 1;

      index = delaunay.find(i,j,index);
      massCenters[0][index] += i * bright;
      massCenters[1][index] += j * bright;
      totalMasses[index] += bright;
    }
  }


  let result = [];
  for(let w=0;w<totalMasses.length;w++){
    result.push(createVector(massCenters[0][w] / totalMasses[w], massCenters[1][w] / totalMasses[w]));
  }
  return result;
}