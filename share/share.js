import { el } from "../js/utils/dom.js";
import { initYear } from "../js/year.js";

// Global variables
let allResources = [];
let filteredResources = [];
let currentCategory = 'all';

export function initShare() {
  console.log("=== SHARE PAGE INITIALIZATION START ===");
  
  // Initialize resources
  initResources();
  
  // Initialize tab functionality
  initTabs();
  
  // Initialize search functionality
  initSearch();
  
  console.log("=== SHARE PAGE INITIALIZATION END ===");
}

function initResources() {
  console.log("Initializing resources...");
  
  const grid = document.getElementById("resourcesGrid");
  if (!grid) {
    console.error("Resources grid element not found!");
    return;
  }

  console.log("Fetching resources data...");
  fetch("../data/resource.json")
    .then((r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then((resources) => {
      console.log("Resources data loaded:", resources);
      
      allResources = resources;
      filteredResources = resources;
      
      // Render initial resources
      renderResources();
      updateResourceCount();
      
      console.log("Resources initialized successfully");
    })
    .catch((error) => {
      console.error("Error loading resources:", error);
      grid.innerHTML = `<div class="col-span-full text-red-600 dark:text-red-400 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl">Error loading resources: ${error.message}</div>`;
    });
}

function renderResources() {
  const grid = document.getElementById("resourcesGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  if (filteredResources.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center p-12">
        <div class="text-slate-500 dark:text-slate-400 text-lg mb-2">No resources found</div>
        <div class="text-slate-400 dark:text-slate-500 text-sm">Try adjusting your search or category filter</div>
      </div>
    `;
    return;
  }
  
  filteredResources.forEach((resource) => {
    const card = createResourceCard(resource);
    grid.appendChild(card);
  });
}

function createResourceCard(resource) {
  // Create a placeholder image if the resource image fails to load
  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="#e2e8f0"/>
      <path d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM24 34C18.486 34 14 29.514 14 24C14 18.486 18.486 14 24 14C29.514 14 34 18.486 34 24C34 29.514 29.514 34 24 34Z" fill="#94a3b8"/>
      <path d="M24 16C19.589 16 16 19.589 16 24C16 28.411 19.589 32 24 32C28.411 32 32 28.411 32 24C32 19.589 28.411 16 24 16ZM24 30C20.691 30 18 27.309 18 24C18 20.691 20.691 18 24 18C27.309 18 30 20.691 30 24C30 27.309 27.309 30 24 30Z" fill="#94a3b8"/>
    </svg>
  `)}`;
  
  const card = el(
    "div",
    { 
      class: "resource-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-soft hover:shadow-lg overflow-hidden"
    },
    // Image container
    el("div", { 
      class: "flex justify-center mb-4"
    },
      el("img", { 
        src: resource.image || placeholderImage,
        alt: resource.title,
        class: "w-16 h-16 object-contain rounded-lg",
        onerror: `this.src='${placeholderImage}'`
      })
    ),
    // Title (clickable link)
    el("div", { 
      class: "mb-3"
    },
      el("a", { 
        href: resource.url,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
      }, resource.title)
    ),
    // Description
    el("div", { 
      class: "text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3"
    }, resource.description),
    // Category badge
    el("div", { 
      class: "mt-4 flex justify-end"
    },
      el("span", { 
        class: "px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full"
      }, resource.category)
    )
  );
  
  return card;
}

function updateResourceCount() {
  const countElement = document.getElementById("resourceCount");
  if (countElement) {
    const total = allResources.length;
    const filtered = filteredResources.length;
    
    if (filtered === total) {
      countElement.textContent = `${total} resources`;
    } else {
      countElement.textContent = `${filtered} of ${total} resources`;
    }
  }
}

function initTabs() {
  console.log("Initializing tabs...");
  
  const allTab = document.getElementById("allTab");
  const lecturesTab = document.getElementById("lecturesTab");
  const tutorialsTab = document.getElementById("tutorialsTab");
  const booksTab = document.getElementById("booksTab");
  const talksTab = document.getElementById("talksTab");
  
  if (!allTab || !lecturesTab || !tutorialsTab || !booksTab || !talksTab) {
    console.error("Tab elements not found!");
    return;
  }
  
  // Function to switch tabs
  function switchTab(activeTab, category) {
    // Update tab styles
    const allTabs = [allTab, lecturesTab, tutorialsTab, booksTab, talksTab];
    allTabs.forEach(tab => {
      tab.className = "tab-button px-6 py-3 rounded-lg font-medium transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100";
    });
    
    activeTab.className = "tab-button px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm";
    
    // Update current category and filter resources
    currentCategory = category;
    filterResources();
  }
  
  // Set initial state - All tab active
  switchTab(allTab, 'all');
  
  // Add click event listeners
  allTab.addEventListener("click", () => {
    switchTab(allTab, 'all');
  });
  
  lecturesTab.addEventListener("click", () => {
    switchTab(lecturesTab, 'Lectures');
  });
  
  tutorialsTab.addEventListener("click", () => {
    switchTab(tutorialsTab, 'Tutorials');
  });
  
  booksTab.addEventListener("click", () => {
    switchTab(booksTab, 'Books');
  });
  
  talksTab.addEventListener("click", () => {
    switchTab(talksTab, 'Talks');
  });
  
  console.log("Tabs initialized successfully");
}

function initSearch() {
  console.log("Initializing search...");
  
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) {
    console.error("Search input element not found!");
    return;
  }
  
  // Add input event listener with debouncing
  let searchTimeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterResources();
    }, 300);
  });
  
  console.log("Search initialized successfully");
}

function filterResources() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  
  // Filter by category and search term
  filteredResources = allResources.filter(resource => {
    const matchesCategory = currentCategory === 'all' || resource.category === currentCategory;
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm);
    
    return matchesCategory && matchesSearch;
  });
  
  // Render filtered resources
  renderResources();
  updateResourceCount();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initShare();
  initYear();
});
