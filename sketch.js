const BOX_SIZE = 20;
let canvas;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.mouseClicked(handleBoxSelect);
}

function draw() {
  drawGrid();
}

const handleBoxSelect = () => {
  let x = Math.floor(mouseX / BOX_SIZE);
  let y = Math.floor(mouseY / BOX_SIZE);
  fill("blue");
  rect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
};

const drawGrid = () => {
  for (let i = 0; i <= height; i += BOX_SIZE) {
    line(i, 0, i, height);
    line(0, i, width, i);
  }
};
