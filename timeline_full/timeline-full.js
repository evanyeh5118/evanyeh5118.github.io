import { el } from "../js/utils/dom.js";
import { initYear } from "../js/year.js";

export function initFullTimeline() {
  console.log("=== FULL TIMELINE INITIALIZATION START ===");
  
  // Initialize all timeline sections
  initEducationTimeline();
  initWorkTimeline();
  initRecentTimeline();
  
  // Initialize tab functionality
  initTabs();
  
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

function initRecentTimeline() {
  console.log("=== RECENT EVENTS INITIALIZATION START ===");
  
  const recentContainer = document.getElementById("recentContainer");
  if (!recentContainer) {
    console.error("Recent container element not found!");
    return;
  }

  console.log("Recent container found:", recentContainer);

  console.log("Fetching recent events from data/recent.json...");
  fetch("../data/recent.json")
    .then((r) => {
      console.log("Fetch response:", r);
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((events) => {
      console.log("Recent events data loaded:", events);
      
      // Clear container
      recentContainer.innerHTML = "";
      
             // Create the scrolling box
       const scrollBox = el(
         "div",
         {
           class: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-soft h-64 overflow-y-auto"
         }
       );
      
             // Add events to the scroll box
       events.forEach((event, index) => {
         const eventItem = el(
           "div",
           {
             class: "flex items-start gap-4 py-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
           },
           // Year and month column
           el(
             "div",
             {
               class: "flex-shrink-0 w-24 text-right"
             },
             el(
               "div",
               {
                 class: "font-mono text-base text-slate-500 dark:text-slate-400 font-semibold"
               },
               event.year
             ),
             el(
               "div",
               {
                 class: "font-mono text-sm text-slate-400 dark:text-slate-500"
               },
               event.month
             )
           ),
           // Event text
           el(
             "div",
             {
               class: "flex-1 text-base text-slate-700 dark:text-slate-300 leading-relaxed"
             },
             event.event
           )
         );
        
        scrollBox.appendChild(eventItem);
      });
      
      recentContainer.appendChild(scrollBox);
      
      console.log("Recent events rendered successfully");
    })
    .catch((error) => {
      console.error("Error loading recent events:", error);
      recentContainer.innerHTML = `<div class="text-red-600 dark:text-red-400">Error loading recent events: ${error.message}</div>`;
    });
    
  console.log("=== RECENT EVENTS INITIALIZATION END ===");
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

function initTabs() {
  console.log("Initializing tabs...");
  
  const educationTab = document.getElementById("educationTab");
  const workTab = document.getElementById("workTab");
  const recentTab = document.getElementById("recentTab");
  const educationSection = document.getElementById("educationSection");
  const workSection = document.getElementById("workSection");
  const recentSection = document.getElementById("recentSection");
  
  if (!educationTab || !workTab || !recentTab || !educationSection || !workSection || !recentSection) {
    console.error("Tab elements not found!");
    return;
  }
  
  // Function to switch tabs
  function switchTab(activeTab, activeSection, inactiveTab1, inactiveSection1, inactiveTab2, inactiveSection2) {
    // Update tab styles
    activeTab.className = "tab-button px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm";
    inactiveTab1.className = "tab-button px-6 py-3 rounded-lg font-medium transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100";
    inactiveTab2.className = "tab-button px-6 py-3 rounded-lg font-medium transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100";
    
    // Show/hide sections
    activeSection.classList.remove("hidden");
    inactiveSection1.classList.add("hidden");
    inactiveSection2.classList.add("hidden");
  }
  
  // Set initial state - Recent tab active
  switchTab(recentTab, recentSection, educationTab, educationSection, workTab, workSection);
  
  // Add click event listeners
  educationTab.addEventListener("click", () => {
    switchTab(educationTab, educationSection, workTab, workSection, recentTab, recentSection);
  });
  
  workTab.addEventListener("click", () => {
    switchTab(workTab, workSection, educationTab, educationSection, recentTab, recentSection);
  });
  
  recentTab.addEventListener("click", () => {
    switchTab(recentTab, recentSection, educationTab, educationSection, workTab, workSection);
  });
  
  console.log("Tabs initialized successfully");
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initFullTimeline();
  initThemeToggle();
  initYear();
});
