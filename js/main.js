import { initYear } from "./year.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initCopyEmail } from "./copy-email.js";
import { initProjects } from "./projects.js";
import { initTimeline } from "./timeline.js";
import { initPublications } from "./publications.js";
import { initRecent } from "./recent.js";

// Run after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  initYear();
  initCopyEmail("you@example.com"); // change if needed
  initProjects();
  initTimeline();
  initPublications();
  initRecent();
});
