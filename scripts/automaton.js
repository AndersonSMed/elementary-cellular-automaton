const SQUARE_SIZE = 10;
const CURRENT_HEURISTIC_NUMBER = 150;
const SUPPORTED_AUTOMATON_TYPES = new Set(["default"]);

let currentGen = new Array(100).fill().map(() => Math.floor(Math.random() * 2));
let currentAutomatonType = "default";

function setup() {
  const existingCanvas = document.querySelector("#automaton-canvas");
  const canvasSize = currentGen.length * SQUARE_SIZE;
  createCanvas(canvasSize, canvasSize, existingCanvas);
}

function draw() {
  currentGen.forEach((value, index) => {
    const currentColor = color(256 * value);
    fill(currentColor);
    noStroke();
    square(SQUARE_SIZE * index, SQUARE_SIZE * (frameCount - 1), SQUARE_SIZE);
  });

  currentGen = currentGen.map((_, index) =>
    buildValueFromNeighborhood(
      currentGen[(currentGen.length + index - 1) % currentGen.length],
      currentGen[index],
      currentGen[(index + 1) % currentGen.length]
    )
  );
}

function buildValueFromNeighborhood(a, b, c) {
  const heuristicInBinary = CURRENT_HEURISTIC_NUMBER.toString(2).padStart(
    8,
    "0"
  );
  const position = heuristicInBinary.length - parseInt(`${a}${b}${c}`, 2) - 1;
  return parseInt(heuristicInBinary[position]);
}

function changeAutomatonType(newValue) {
  if (!SUPPORTED_AUTOMATON_TYPES.has(newValue)) {
    throw new Error(`Invalid automaton type: ${newValue}`);
  }

  currentAutomatonType = newValue;
}
