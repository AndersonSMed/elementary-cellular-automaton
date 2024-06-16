const SQUARE_SIZE = 10;
const SUPPORTED_AUTOMATON_VARIANTS = new Set(["default", "noisy", "colored"]);

let currentGen = new Array(100).fill().map(() => Math.floor(Math.random() * 2));
let currentAutomatonVariant = "default";
let currentAutomatonRule = 150;
let currentLine = 1;

function setup() {
  const existingCanvas = document.querySelector("#automaton-canvas");
  const canvasSize = currentGen.length * SQUARE_SIZE;
  createCanvas(canvasSize, canvasSize, existingCanvas);
}

function draw() {
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

    square(SQUARE_SIZE * index, SQUARE_SIZE * (currentLine - 1), SQUARE_SIZE);
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
  currentLine = 1;

  clear();
}
