let currentGen = new Array(100).fill().map(() => Math.floor(Math.random() * 2));
const squareSize = 10;
const canvasSize = currentGen.length * squareSize;
const currentHeuristic = 150;

function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  currentGen.forEach((value, index) => {
    const currentColor = color(256 * value);
    fill(currentColor);
    noStroke();
    square(squareSize * index, squareSize * (frameCount - 1), squareSize);
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
  const heuristicInBinary = currentHeuristic.toString(2).padStart(8, "0");
  const position = heuristicInBinary.length - parseInt(`${a}${b}${c}`, 2) - 1;
  return parseInt(heuristicInBinary[position]);
}
