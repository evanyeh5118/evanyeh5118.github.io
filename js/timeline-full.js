import { el } from "./utils/dom.js";
import { initThemeToggle } from "./theme-toggle.js";
import { initYear } from "./year.js";

export function initFullTimeline() {
  console.log("=== FULL TIMELINE INITIALIZATION START ===");
  
  // Initialize both education and work timelines
  initEducationTimeline();
  initWorkTimeline();
  
  console.log("=== FULL TIMELINE INITIALIZATION END ===");
}

function initEducationTimeline() {
  console.log("Initializing education timeline...");
  
  const ul = document.getElementById("educationTimelineList");
  if (!ul) {
    console.error("Education timeline list element not found!");
    return;
  }

  console.log("Fetching education timeline data...");
  fetch("../data/education.json")
    .then((r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((items) => {
      console.log("Education timeline data loaded:", items);
      
      ul.innerHTML = "";
      ul.className = "space-y-6";
      
      items.forEach((t, index) => {
        console.log(`Processing education timeline item ${index}:`, t);
        
        const li = el(
          "div",
          { 
            class: "timeline-block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          },
          // Year and title in one line
          el("div", { 
            class: "flex items-center justify-between mb-0"
          },
            el("div", { 
              class: "font-mono text-sm text-slate-500 dark:text-slate-400 font-bold tracking-wide"
            }, t.year),
            el("div", { 
              class: "text-right flex-1 ml-4"
            },
              el("div", { 
                class: "text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight"
              }, t.title),
              el("div", { 
                class: "text-sm text-slate-600 dark:text-slate-400 mt-1"
              }, `${t.position} • ${t.place}, ${t.city}, ${t.country}`)
            )
          ),
          // Description (hidden by default, shown on hover)
          el("div", { 
            class: "timeline-description text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-0 max-h-0 opacity-0 transition-all duration-300 ease-in-out overflow-hidden"
          }, t.text)
        );
        
        // Add hover event listeners for expansion effect
        li.addEventListener('mouseenter', () => {
          const description = li.querySelector('.timeline-description');
          if (description) {
            description.style.maxHeight = '200px';
            description.style.opacity = '1';
            description.style.marginTop = '16px';
            li.style.padding = '24px';
          }
        });
        
        li.addEventListener('mouseleave', () => {
          const description = li.querySelector('.timeline-description');
          if (description) {
            description.style.maxHeight = '0px';
            description.style.opacity = '0';
            description.style.marginTop = '0px';
            li.style.padding = '16px';
          }
        });
        
        ul.appendChild(li);
      });
      
      console.log("Education timeline rendered successfully");
    })
    .catch((error) => {
      console.error("Error loading education timeline:", error);
      ul.innerHTML = `<div class="text-red-600 dark:text-red-400 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl">Error loading education timeline: ${error.message}</div>`;
    });
}

function initWorkTimeline() {
  console.log("Initializing work timeline...");
  
  const ul = document.getElementById("workTimelineList");
  if (!ul) {
    console.error("Work timeline list element not found!");
    return;
  }

  console.log("Fetching work timeline data...");
  fetch("../data/work.json")
    .then((r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((items) => {
      console.log("Work timeline data loaded:", items);
      
      ul.innerHTML = "";
      ul.className = "space-y-6";
      
      items.forEach((t, index) => {
        console.log(`Processing work timeline item ${index}:`, t);
        
        const li = el(
          "div",
          { 
            class: "timeline-block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          },
          // Year and title in one line
          el("div", { 
            class: "flex items-center justify-between mb-0"
          },
            el("div", { 
              class: "font-mono text-sm text-slate-500 dark:text-slate-400 font-bold tracking-wide"
            }, t.year),
            el("div", { 
              class: "text-right flex-1 ml-4"
            },
              el("div", { 
                class: "text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight"
              }, t.title),
              el("div", { 
                class: "text-sm text-slate-600 dark:text-slate-400 mt-1"
              }, `${t.position} • ${t.place}, ${t.city}, ${t.country}`)
            )
          ),
          // Description (hidden by default, shown on hover)
          el("div", { 
            class: "timeline-description text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-0 max-h-0 opacity-0 transition-all duration-300 ease-in-out overflow-hidden"
          }, t.text)
        );
        
        // Add hover event listeners for expansion effect
        li.addEventListener('mouseenter', () => {
          const description = li.querySelector('.timeline-description');
          if (description) {
            description.style.maxHeight = '200px';
            description.style.opacity = '1';
            description.style.marginTop = '16px';
            li.style.padding = '24px';
          }
        });
        
        li.addEventListener('mouseleave', () => {
          const description = li.querySelector('.timeline-description');
          if (description) {
            description.style.maxHeight = '0px';
            description.style.opacity = '0';
            description.style.marginTop = '0px';
            li.style.padding = '16px';
          }
        });
        
        ul.appendChild(li);
      });
      
      console.log("Work timeline rendered successfully");
    })
    .catch((error) => {
      console.error("Error loading work timeline:", error);
      ul.innerHTML = `<div class="text-red-600 dark:text-red-400 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl">Error loading work timeline: ${error.message}</div>`;
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initFullTimeline();
  initThemeToggle();
  initYear();
});
