const btn = document.querySelector("#btn-action");
const text = document.querySelector("#decor-text");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  text.textContent = "JS работает 100%";
});
