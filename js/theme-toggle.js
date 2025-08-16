export function initThemeToggle() {
  console.log("Initializing theme toggle...");
  
  const toggle = document.getElementById("themeToggle");
  if (!toggle) {
    console.error("Theme toggle button not found!");
    // Retry after a short delay
    setTimeout(() => {
      initThemeToggle();
    }, 200);
    return;
  }

  console.log("Theme toggle button found:", toggle);

  const root = document.documentElement;
  const body = document.body;
  
  // Get saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  console.log("Saved theme:", savedTheme);
  
  // Apply the saved theme
  if (savedTheme === "dark") {
    root.classList.add("dark");
    body.classList.add("dark");
    // Also ensure the theme is applied to the html element
    document.documentElement.setAttribute("data-theme", "dark");
    console.log("Applied dark theme");
  } else {
    root.classList.remove("dark");
    body.classList.remove("dark");
    // Also ensure the theme is applied to the html element
    document.documentElement.setAttribute("data-theme", "light");
    console.log("Applied light theme");
  }

  // Update button text
  updateToggleText();

  // Remove any existing event listeners to prevent duplicates
  toggle.removeEventListener("click", toggleClickHandler);
  toggle.addEventListener("click", toggleClickHandler);

  function toggleClickHandler() {
    console.log("Theme toggle clicked");
    const isDark = root.classList.toggle("dark");
    body.classList.toggle("dark", isDark);
    // Also ensure the theme is applied to the html element
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    console.log("Theme toggled to:", isDark ? "dark" : "light");
    updateToggleText();
  }

  function updateToggleText() {
    const isDark = root.classList.contains("dark");
    toggle.textContent = isDark ? "🌙 Light" : "☀️ Dark";
    console.log("Button text updated to:", toggle.textContent);
  }
}
