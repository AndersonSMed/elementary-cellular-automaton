function buildRandomColorFromValue(value) {
  return Math.round(Math.random() * 256) * value;
}

function populateNewLine(size) {
  return new Array(size).fill().map(() => Math.floor(Math.random() * 2));
}
