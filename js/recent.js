import { el } from "./utils/dom.js";

export function initRecent() {
  console.log("=== RECENT EVENTS INITIALIZATION START ===");
  
  const recentContainer = document.getElementById("recentContainer");
  if (!recentContainer) {
    console.error("Recent container element not found!");
    return;
  }

  console.log("Recent container found:", recentContainer);

  console.log("Fetching recent events from data/recent.json...");
  fetch("./data/recent.json")
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
