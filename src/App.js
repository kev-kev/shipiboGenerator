import React from "react";
import Sketch from "react-p5";
import "./App.css";

const CANVAS_SIZE = 600;
const GRID_LENGTH = 50;

function App() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent(canvasParentRef);
    createGrid(p5);
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
}

function createGrid(p5) {
  const squareSize = CANVAS_SIZE / GRID_LENGTH;
  for (let i = 0; i <= 50; i++) {
    p5.line(0, i * squareSize, CANVAS_SIZE, i * squareSize);
  }

  for (let i = 0; i <= 50; i++) {
    p5.line(i * squareSize, 0, i * squareSize, CANVAS_SIZE);
  }
}

export default App;
