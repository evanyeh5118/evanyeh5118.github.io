import { el } from "./utils/dom.js";
import { initThemeToggle } from "./theme-toggle.js";

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPublications();
  initProjects();
});

// Publications section
function initPublications() {
  const container = document.getElementById("publicationsList");
  const countElement = document.getElementById("pubCount");
  
  if (!container) return;

  fetch("data/publications.json", { cache: "no-store" })
    .then((r) => r.json())
    .then((items) => {
      container.innerHTML = "";

      if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = '<div class="text-center text-slate-500 py-8">No publications found.</div>';
        if (countElement) countElement.textContent = "0 publications";
        return;
      }

      // Sort by year (newest first)
      items.sort((a, b) => (b.year || 0) - (a.year || 0));

      // Group by year
      const groupedByYear = items.reduce((acc, pub) => {
        const year = pub.year || 'Unknown';
        if (!acc[year]) acc[year] = [];
        acc[year].push(pub);
        return acc;
      }, {});

      // Render publications grouped by year
      Object.entries(groupedByYear)
        .sort(([a], [b]) => b - a) // Sort years descending
        .forEach(([year, publications]) => {
          // Year header
          const yearHeader = el(
            "div",
            { class: "text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 pt-6 first:pt-0" },
            year
          );
          container.appendChild(yearHeader);

          // Publications for this year
          publications.forEach((pub) => {
            const links = [];
            Object.entries(pub.links || {}).forEach(([k, v]) => {
              if (v && v !== "#") {
                links.push(
                  el(
                    "a",
                    {
                      href: v,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 underline hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                    },
                    k
                  )
                );
              }
            });

            const tags = (pub.tags || []).map((t) =>
              el(
                "span",
                {
                  class: "text-xs px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 bg-slate-50 dark:bg-slate-800",
                },
                t
              )
            );

            const pubCard = el(
              "div",
              {
                class: "rounded-2xl p-6 shadow-soft bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow",
              },
              el("div", { class: "font-semibold text-lg mb-2" }, pub.title ?? ""),
              el(
                "div",
                { class: "text-sm text-slate-600 dark:text-slate-300 mb-2" },
                pub.authors ?? ""
              ),
              el("div", { class: "text-sm font-medium mb-3" }, pub.venue ?? ""),
              links.length ? el("div", { class: "mb-3 flex gap-2 flex-wrap" }, links) : null,
              tags.length ? el("div", { class: "flex gap-2 flex-wrap" }, tags) : null
            );
            
            container.appendChild(pubCard);
          });
        });

      if (countElement) {
        countElement.textContent = `${items.length} publication${items.length > 1 ? 's' : ''}`;
      }
    })
    .catch((err) => {
      console.error("Error loading publications:", err);
      container.innerHTML = '<div class="text-center text-red-600 dark:text-red-400 py-8">Couldn\'t load publications.</div>';
      if (countElement) countElement.textContent = "Error loading";
    });
}

// Projects section
function initProjects() {
  const container = document.getElementById("projectsList");
  const countElement = document.getElementById("projectCount");
  
  if (!container) return;

  fetch("data/projects.json", { cache: "no-store" })
    .then((r) => r.json())
    .then((items) => {
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
