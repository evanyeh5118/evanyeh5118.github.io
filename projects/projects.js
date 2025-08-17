import { el } from "../js/utils/dom.js";

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initProjects();
});

// Projects section
function initProjects() {
  console.log("Initializing projects...");
  const container = document.getElementById("projectsList");
  const countElement = document.getElementById("projectCount");
  
  console.log("Container element:", container);
  console.log("Count element:", countElement);
  
  if (!container) {
    console.error("Projects container not found!");
    return;
  }

  console.log("Fetching projects from /data/projects.json...");
  // Try absolute path first, then relative path as fallback
  fetch("/data/projects.json", { cache: "no-store" })
    .catch(() => {
      console.log("Absolute path failed, trying relative path...");
      return fetch("../data/projects.json", { cache: "no-store" });
    })
    .then((r) => {
      console.log("Fetch response:", r);
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((items) => {
      console.log("Projects data received:", items);
      container.innerHTML = "";

      if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = '<div class="text-center text-slate-500 py-8">No projects found.</div>';
        if (countElement) countElement.textContent = "0 projects";
        return;
      }

      items.forEach((project) => {
        const tags = (project.tags || []).map((t) =>
          el(
            "span",
            {
              class: "text-xs px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 bg-slate-50 dark:bg-slate-800",
            },
            t
          )
        );

        const projectCard = el(
          "div",
          {
            class: "rounded-2xl p-6 shadow-soft bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow",
          },
          el("div", { class: "font-semibold text-lg mb-2" }, project.title),
          el(
            "div",
            { class: "text-sm text-slate-600 dark:text-slate-300 mb-3" },
            project.desc
          ),
          tags.length ? el("div", { class: "mb-4 flex gap-2 flex-wrap" }, tags) : null,
          el(
            "a",
            {
              href: project.link || "#",
              target: "_blank",
              rel: "noreferrer",
              class: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm hover:opacity-90 transition-opacity",
            },
            "View Project →"
          )
        );
        
        container.appendChild(projectCard);
      });

      if (countElement) {
        countElement.textContent = `${items.length} project${items.length > 1 ? 's' : ''}`;
      }
    })
    .catch((err) => {
      console.error("Error loading projects:", err);
      container.innerHTML = '<div class="text-center text-red-600 dark:text-red-400 py-8">Couldn\'t load projects.</div>';
      if (countElement) countElement.textContent = "Error loading";
    });
}
