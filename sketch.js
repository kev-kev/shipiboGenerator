const BOX_SIZE = 20;
const BOXES_BETWEEN_NODES = 2;
const MAX_NODE_SIZE = 7;
const COLORS = ["#F05D5E", "#0F7173", "#272932", "#D8A47F"];
const RAND_COLOR = COLORS[Math.floor(Math.random() * COLORS.length)];
const NODES = [];

let canvas, colorPicker;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  canvas.mouseClicked(handleBoxSelect);
  colorPicker = createColorPicker(RAND_COLOR);
  noLoop();
}

function draw() {
  drawGrid();
}

const drawGrid = () => {
  strokeWeight(2);
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
    drawGrid();
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
        if (checkValidNode(NODES[i], x, y)) addBoxToNode(x, y, NODES[i]);
      }
    }
  }
  if (!adjToNode) createNode(x, y);
};

const createNode = (x, y) => {
  NODES.push({ boxes: [[x, y]], color: colorPicker.color().toString() });
  fillBox(x, y);
};

const addBoxToNode = (x, y, node) => {
  node.boxes.push([x, y]);
  fillBox(x, y);
};

const checkValidNode = (node, x, y) => {
  if (colorPicker.color().toString() !== node.color) {
    console.log("Error: Too close to node of a different color");
    return false;
  }
  if (node.boxes.length < MAX_NODE_SIZE) {
    return true;
  } else {
    console.log(`Error: Nodes can't be larger than ${MAX_NODE_SIZE} boxes`);
    return false;
  }
};

const checkAdjBoxes = (box1, box2) => {
  let distance = 0;
  distance += Math.abs(box1[0] - box2[0]);
  distance += Math.abs(box1[1] - box2[1]);
  if (distance <= BOX_SIZE * BOXES_BETWEEN_NODES) return true;
  return false;
};
