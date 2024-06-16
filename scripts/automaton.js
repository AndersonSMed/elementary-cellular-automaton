const SUPPORTED_AUTOMATON_VARIANTS = new Set(["default", "noisy", "colored"]);

let squareSize = 10;
let currentGen = populateNewLine(100);
let currentAutomatonVariant = "default";
let currentAutomatonRule = 150;
let currentLine = 1;

function setup() {
  const existingCanvas = document.querySelector("#automaton-canvas");
  const canvasSize = currentGen.length * squareSize;
  createCanvas(canvasSize, canvasSize, existingCanvas);
}

function draw() {
  if (currentLine === currentGen.length + 1) {
    noLoop();
    return;
  }

  currentGen.forEach((value, index) => {
    let currentColor;

    switch (currentAutomatonVariant) {
      case "default":
        currentColor = color(256 * value);
        break;
      case "noisy":
        currentColor = color(buildRandomColorFromValue(value));
        break;
      case "colored":
        currentColor = color(
          buildRandomColorFromValue(value),
          buildRandomColorFromValue(value),
          buildRandomColorFromValue(value)
        );
        break;
    }

    fill(currentColor);

    noStroke();

    square(squareSize * index, squareSize * (currentLine - 1), squareSize);
  });

  currentGen = currentGen.map((_, index) =>
    buildValueFromNeighborhood(
      currentGen[(currentGen.length + index - 1) % currentGen.length],
      currentGen[index],
      currentGen[(index + 1) % currentGen.length]
    )
  );

  currentLine += 1;
}

function buildValueFromNeighborhood(a, b, c) {
  const heuristicInBinary = currentAutomatonRule.toString(2).padStart(8, "0");
  const position = heuristicInBinary.length - parseInt(`${a}${b}${c}`, 2) - 1;
  return parseInt(heuristicInBinary[position]);
}

function changeAutomatonVariantAndRule({ variant, rule }) {
  if (!SUPPORTED_AUTOMATON_VARIANTS.has(variant)) {
    throw new Error(`Invalid automaton variant: ${variant}`);
  }

  currentAutomatonVariant = variant;
  currentAutomatonRule = parseInt(rule);
}

function changeAutomatonElementsPerLine({ elementsPerLine }) {
  currentGen = populateNewLine(parseInt(elementsPerLine));
}

function changeAutomatonSquareSize({ newSquareSize }) {
  squareSize = parseInt(newSquareSize);
}

function redrawCanvas() {
  const canvasSize = currentGen.length * squareSize;
  resizeCanvas(canvasSize, canvasSize);
  clear();
  currentLine = 1;
  loop();
}
