const BOX_SIZE = 20;
let canvas;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.mouseClicked(handleBoxSelect);
}

function draw() {
  drawGrid();
  createBoxes();
}

const handleBoxSelect = () => {
  let x = Math.floor(mouseX / BOX_SIZE);
  let y = Math.floor(mouseY / BOX_SIZE);
  console.log(x, y);
};

const drawGrid = () => {
  for (let i = 0; i <= height; i += BOX_SIZE) {
    line(i, 0, i, height);
    line(0, i, width, i);
  }
};

const createBoxes = () => {
  for (let i = 0; i < height; i += BOX_SIZE) {
    for (let j = 0; j < width; j += BOX_SIZE) {
      rect(i, j, BOX_SIZE, BOX_SIZE);
    }
  }
};
