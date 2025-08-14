export function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  // Initially set dark mode
  const root = document.documentElement;
  root.classList.add("dark");
  localStorage.setItem("theme", "dark");

  toggle.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
