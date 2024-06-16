const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const variant = formData.get("variant");
  const rule = formData.get("rule");
  const elementsPerLine = formData.get("elements-per-line");
  const squareSize = formData.get("square-size");

  changeAutomatonVariantAndRule({ variant, rule });
  changeAutomatonElementsPerLine({ elementsPerLine });
  changeAutomatonSquareSize({ newSquareSize: squareSize });
  redrawCanvas();
});
