const BOX_SIZE = 20;
const BOXES_BETWEEN_NODES = 2;
const COLORS = ["#F05D5E", "#0F7173", "#272932", "#D8A47F"];
const NODES = [];

let canvas, colorPicker;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  canvas.mouseClicked(handleBoxSelect);
  const defaultColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  colorPicker = createColorPicker(defaultColor);
}

function draw() {
  drawGrid();
}

const drawGrid = () => {
  for (let i = 0; i <= height; i += BOX_SIZE) {
    line(i, 0, i, height);
    line(0, i, width, i);
  }
};

const handleBoxSelect = () => {
  let x = Math.floor(mouseX / BOX_SIZE) * BOX_SIZE;
  let y = Math.floor(mouseY / BOX_SIZE) * BOX_SIZE;
  addToOrCreateNode(x, y);
};

const fillBox = (x, y) => {
  const boxColor = get(x + 1, y + 1);
  let isFilled;
  for (let i = 0; i < 4; i++) {
    if (boxColor[i] > 0) {
      isFilled = true;
      break;
    }
  }
  if (isFilled) {
    erase();
    rect(x, y, BOX_SIZE, BOX_SIZE);
    noErase();
  } else {
    let colorIndex = Math.floor(Math.random() * COLORS.length);
    fill(colorPicker.color());
    rect(x, y, BOX_SIZE, BOX_SIZE);
  }
};

const addToOrCreateNode = (x, y) => {
  let adjToNode = false;
  for (let i = 0; i < NODES.length; i++) {
    if (adjToNode) break;
    for (let j = 0; j < NODES[i].boxes.length; j++) {
      if (adjToNode) break;
      if (checkAdjBoxes([x, y], NODES[i].boxes[j])) {
        adjToNode = true;
        if (colorPicker.color().toString() == NODES[i].color) {
          NODES[i].boxes.push([x, y]);
          fillBox(x, y);
          break;
        } else {
          console.log("Error: Too close to node of a different color");
        }
      }
    }
  }
  if (!adjToNode) {
    NODES.push({ boxes: [[x, y]], color: colorPicker.color().toString() });
    fillBox(x, y);
  }
};

const checkAdjBoxes = (box1, box2) => {
  let distance = 0;
  distance += Math.abs(box1[0] - box2[0]);
  distance += Math.abs(box1[1] - box2[1]);
  if (distance <= BOX_SIZE * BOXES_BETWEEN_NODES) return true;
  return false;
};
