import { el } from "./utils/dom.js";

export function initTimeline() {
  console.log("=== TIMELINE INITIALIZATION START ===");
  console.log("Initializing timeline...");
  
  const ul = document.getElementById("timelineList");
  if (!ul) {
    console.error("Timeline list element not found!");
    return;
  }

  console.log("Timeline list element found:", ul);
  console.log("Current timeline content:", ul.innerHTML);

  console.log("Fetching timeline data from data/timeline.json...");
  fetch("./data/timeline.json")
    .then((r) => {
      console.log("Fetch response:", r);
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((items) => {
      console.log("Timeline data loaded:", items);
      console.log("Data type:", typeof items);
      console.log("Data length:", items.length);
      
      ul.innerHTML = "";
      ul.className = "space-y-4"; // Add spacing between timeline blocks
      
      // Only show first 2 events
      const displayItems = items.slice(0, 2);
      
      displayItems.forEach((t, index) => {
        console.log(`Processing item ${index}:`, t);
        
        // Create timeline block with year, title, and text
        const li = el(
          "li",
          { 
            class: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-soft hover:shadow-lg transition-shadow duration-200"
          },
          // Year/timestamp at the top
          el("div", { 
            class: "font-mono text-xs text-slate-500 dark:text-slate-400 mb-2 font-semibold"
          }, t.year),
          // Title with larger, bolder font
          el("div", { 
            class: "text-base font-semibold text-slate-900 dark:text-slate-100 mb-2 leading-tight"
          }, t.title),
          // Description text with smaller, lighter font
          el("div", { 
            class: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
          }, t.text)
        );
        
        ul.appendChild(li);
      });
      
      // Add "View Full Timeline" button if there are more than 2 events
      if (items.length > 2) {
        const buttonContainer = el(
          "div",
          { class: "mt-6 text-center" },
          el(
            "a",
            {
              href: "../timeline_full/timeline.html",
              class: "inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200 shadow-soft"
            },
            "View Full Timeline",
            el("span", { class: "ml-2 text-lg" }, "→")
          )
        );
        ul.appendChild(buttonContainer);
      }
      
      console.log("Timeline rendered successfully");
      console.log("Final timeline content:", ul.innerHTML);
    })
    .catch((error) => {
      console.error("Error loading timeline:", error);
      ul.innerHTML = `<li class="text-red-600 dark:text-red-400">Error loading timeline: ${error.message}</li>`;
    });
    
  console.log("=== TIMELINE INITIALIZATION END ===");
}
