const BOX_SIZE = 20;
const NODES = [];
const MAX_NODE_COUNT = 5;
const BOXES_BETWEEN_NODES = 2;
const MAX_NODE_SIZE = 7;
const COLORS = ["#F05D5E", "#0F7173", "#272932", "#D8A47F"];
const RAND_COLOR = COLORS[Math.floor(Math.random() * COLORS.length)];

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
  fillOrErase(isFilled, x, y);
};

const fillOrErase = (isFilled, x, y) => {
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
        if (colorPicker.color().toString() == NODES[i].color) {
          if (NODES[i].boxes.length < MAX_NODE_SIZE) {
            NODES[i].boxes.push([x, y]);
            fillBox(x, y);
          } else {
            console.log(
              `Error: Nodes can't be larger than ${MAX_NODE_SIZE} boxes`
            );
          }

          break;
        } else {
          console.log("Error: Too close to node of a different color");
        }
      }
    }
  }
  if (!adjToNode) {
    if (NODES.length < MAX_NODE_COUNT) {
      NODES.push({ boxes: [[x, y]], color: colorPicker.color().toString() });
      fillBox(x, y);
    } else {
      console.log("Error: that's just too many nodes, yo");
    }
  }
};

const checkAdjBoxes = (box1, box2) => {
  let distance = 0;
  distance += Math.abs(box1[0] - box2[0]);
  distance += Math.abs(box1[1] - box2[1]);
  if (distance <= BOX_SIZE * BOXES_BETWEEN_NODES) return true;
  return false;
};
