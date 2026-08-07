import { initYear } from "./year.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initPublications } from "./publications.js";
import { initRecent } from "./recent.js";
import { initHeader } from "./header.js";
import { initParallaxBackground } from "./parallax-background.js";
import { renderHeroProfile } from "../data/descriptions.js";

// Run after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  initParallaxBackground();
  initYear();
  renderHeroProfile();
  fetch('/partials/banner.html')
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('banner-slot').innerHTML = html;
      initHeader();
      initThemeToggle();
    });
  initPublications({ limit: 3 });
  initRecent({ limit: 4 });
});
