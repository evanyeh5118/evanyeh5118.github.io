import { el } from "../js/utils/dom.js";

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initPublications();
});

// Publications section
function initPublications() {
  const container = document.getElementById("publicationsList");
  const countElement = document.getElementById("pubCount");
  
  if (!container) return;

  fetch("../data/publications.json", { cache: "no-store" })
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
              "article",
              {
                class: "publication-block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-soft",
              },
              // Basic info (always visible)
              el("div", { class: "font-semibold text-lg mb-2" }, pub.title ?? ""),
              el(
                "div",
                { class: "text-sm text-slate-600 dark:text-slate-300 mb-2" },
                pub.authors ?? ""
              ),
              el("div", { class: "text-sm font-medium mb-3" }, pub.venue ?? ""),
              links.length ? el("div", { class: "my-4 flex gap-2 flex-wrap" }, links) : null,
              tags.length ? el("div", { class: "mb-3 flex gap-2 flex-wrap" }, tags) : null,
              pub.abstract ? el("details", { class: "mt-4 border-t border-slate-200 dark:border-slate-700 pt-4" },
                el("summary", { class: "cursor-pointer text-sm font-medium text-blue-600 dark:text-blue-400" }, "Read abstract"),
                el("p", { class: "text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed" }, pub.abstract)
              ) : null
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
