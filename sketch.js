const BOX_SIZE = 20;
const COLORS = ["#F05D5E", "#0F7173", "#272932", "#D8A47F"];

let canvas, colorPicker;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  canvas.mouseClicked(handleBoxSelect);
  colorPicker = createColorPicker(
    COLORS[Math.floor(Math.random() * COLORS.length)]
  );
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
  fillBox(x, y);
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
