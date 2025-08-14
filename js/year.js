export function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}
