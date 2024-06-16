const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const variant = formData.get("variant");
  const rule = formData.get("rule");

  changeAutomatonVariantAndRule({ variant, rule });
});
