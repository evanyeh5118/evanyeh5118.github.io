import { el } from "./utils/dom.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initYear } from "./year.js";

export function initFullTimeline() {
  console.log("=== FULL TIMELINE INITIALIZATION START ===");
  
  const ul = document.getElementById("fullTimelineList");
  if (!ul) {
    console.error("Full timeline list element not found!");
    return;
  }

  console.log("Fetching full timeline data...");
  fetch("../data/timeline.json")
    .then((r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((items) => {
      console.log("Full timeline data loaded:", items);
      
      ul.innerHTML = "";
      ul.className = "space-y-6"; // Larger spacing for full timeline
      
      items.forEach((t, index) => {
        console.log(`Processing full timeline item ${index}:`, t);
        
        // Create full timeline block with enhanced styling
        const li = el(
          "li",
          { 
            class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          },
          el("div", { 
            class: "font-mono text-sm text-slate-500 dark:text-slate-400 mb-3 font-bold tracking-wide"
          }, t.year),
          // Title with larger, bolder font
          el("div", { 
            class: "text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight"
          }, t.title),
          // Description text with medium font size
          el("div", { 
            class: "text-base text-slate-600 dark:text-slate-300 leading-relaxed"
          }, t.text)
        );
        
        ul.appendChild(li);
      });
      
      console.log("Full timeline rendered successfully");
    })
    .catch((error) => {
      console.error("Error loading full timeline:", error);
      ul.innerHTML = `<li class="text-red-600 dark:text-red-400 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl">Error loading timeline: ${error.message}</li>`;
    });
    
  console.log("=== FULL TIMELINE INITIALIZATION END ===");
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initFullTimeline();
  initThemeToggle();
  initYear();
});
