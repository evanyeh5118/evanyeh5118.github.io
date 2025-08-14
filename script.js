// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const toggle = document.getElementById("themeToggle");
toggle?.addEventListener("click", () => {
  const root = document.documentElement;
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Copy email
const email = "you@example.com";
const btn = document.getElementById("copyEmail");
const note = document.getElementById("copied");
btn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    note.textContent = "Email copied.";
  } catch {
    note.textContent = email;
  }
  setTimeout(() => (note.textContent = ""), 1600);
});

// Render helper
function el(tag, attrs = {}, ...children) {
  const n = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else n.setAttribute(k, v);
  });
  children.flat().forEach((c) => {
    if (typeof c === "string") n.appendChild(document.createTextNode(c));
    else if (c) n.appendChild(c);
  });
  return n;
}

// Load Projects (horizontal scroller)
fetch("data/projects.json", { cache: "no-store" })
  .then(r => r.json())
  .then(items => {
    const track = document.getElementById("projectsTrack");
    const scroller = document.getElementById("projectsScroller");
    track.innerHTML = "";

    items.forEach(p => {
      // a single "card" with fixed min width so it scrolls horizontally
      const card = el(
        "a",
        {
          href: p.link || "#",
          target: "_blank",
          rel: "noreferrer",
          class:
            "snap-start shrink-0 w-72 sm:w-80 md:w-96 " + // width of each slide
            "block rounded-2xl p-5 shadow-soft bg-white dark:bg-slate-900 " +
            "border border-slate-200 dark:border-slate-700 " +
            "hover:translate-y-[-2px] hover:shadow-md transition"
        },
        el("div", { class: "font-semibold mb-1" }, p.title),
        el("div", { class: "text-sm text-slate-600 dark:text-slate-300 mb-3" }, p.desc),
        el(
          "div",
          { class: "flex gap-2 flex-wrap" },
          (p.tags || []).map(t =>
            el("span", {
              class:
                "text-xs px-2 py-0.5 rounded-full border " +
                "border-slate-200 dark:border-slate-700 text-slate-500"
            }, t)
          )
        )
      );
      track.appendChild(card);
    });

    // Arrow buttons
    const prevBtns = [document.getElementById("projectsPrev"), document.getElementById("projectsPrevMobile")].filter(Boolean);
    const nextBtns = [document.getElementById("projectsNext"), document.getElementById("projectsNextMobile")].filter(Boolean);

    function scrollByPage(dir = 1) {
      const amount = Math.max(320, Math.floor(scroller.clientWidth * 0.9)) * dir;
      scroller.scrollBy({ left: amount, behavior: "smooth" });
    }
    prevBtns.forEach(b => b.addEventListener("click", () => scrollByPage(-1)));
    nextBtns.forEach(b => b.addEventListener("click", () => scrollByPage(+1)));

    // Make vertical wheel scroll move horizontally (nice on laptops)
    scroller.addEventListener("wheel", (e) => {
      // allow native horizontal wheel; convert vertical to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scroller.scrollBy({ left: e.deltaY });
      }
    }, { passive: false });
  })
  .catch(() => {
    const track = document.getElementById("projectsTrack");
    track.innerHTML = "<div class='text-sm text-red-600 dark:text-red-400'>Couldn't load projects.json.</div>";
  });

// Load Timeline
fetch("data/timeline.json")
  .then(r => r.json())
  .then(items => {
    const ul = document.getElementById("timelineList");
    ul.innerHTML = "";
    items.forEach(t => {
      ul.appendChild(
        el("li", { class:"opacity-90" },
          el("span", { class:"font-mono text-xs mr-2 text-slate-500" }, t.year),
          t.text
        )
      );
    });
  })
  .catch(() => {});

// Load Publications
fetch("data/publications.json", { cache: "no-store" })
  .then(r => r.json())
  .then(items => {
    const track = document.getElementById("pubTrack");
    const scroller = document.getElementById("pubScroller");
    const status = document.getElementById("pubStatus");
    
    if (!track || !scroller) return;
    
    track.innerHTML = "";
    
    if (!Array.isArray(items) || items.length === 0) {
      status.textContent = "No publications found.";
      return;
    }

    // Sort by year desc
    items.sort((a,b) => (b.year||0) - (a.year||0));

    items.forEach(p => {
      const links = [];
      Object.entries(p.links || {}).forEach(([k,v]) => {
        if (v && v !== "#") links.push(
          el("a", {
            href: v, target: "_blank", rel: "noreferrer",
            class: "text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 underline"
          }, k)
        );
      });
      
      const tags = (p.tags || []).map(t =>
        el("span", {
          class: "text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500"
        }, t)
      );

      const card = el("div",
        { class: "snap-start shrink-0 w-[28rem] sm:w-[34rem] rounded-2xl p-5 shadow-soft bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700" },
        el("div", { class: "text-sm text-slate-500" }, String(p.year ?? "")),
        el("div", { class: "font-semibold mt-1" }, p.title ?? ""),
        el("div", { class: "text-sm text-slate-600 dark:text-slate-300 mt-1" }, p.authors ?? ""),
        el("div", { class: "text-sm mt-1" }, p.venue ?? ""),
        links.length ? el("div", { class: "mt-3 flex gap-2 flex-wrap" }, links) : null,
        tags.length ? el("div", { class: "mt-2 flex gap-2 flex-wrap" }, tags) : null
      );
      track.appendChild(card);
    });

    // Wire arrows (if present)
    const prevBtns = [document.getElementById("pubPrev"), document.getElementById("pubPrevM")].filter(Boolean);
    const nextBtns = [document.getElementById("pubNext"), document.getElementById("pubNextM")].filter(Boolean);
    
    function scrollByPage(dir=1){ 
      scroller.scrollBy({ 
        left: Math.max(360, Math.floor(scroller.clientWidth*0.9))*dir, 
        behavior: "smooth" 
      }); 
    }
    
    prevBtns.forEach(b => b.addEventListener("click", () => scrollByPage(-1)));
    nextBtns.forEach(b => b.addEventListener("click", () => scrollByPage(+1)));

    // Nice wheel behavior
    scroller.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { 
        e.preventDefault(); 
        scroller.scrollBy({ left: e.deltaY }); 
      } 
    }, { passive: false });

    status.textContent = `Loaded ${items.length} publication${items.length>1?"s":""}.`;
    setTimeout(() => (status.textContent = ""), 1500);
  })
  .catch((err) => {
    console.error("Error loading publications:", err);
    const status = document.getElementById("pubStatus");
    const track = document.getElementById("pubTrack");
    
    if (status) {
      status.className = "text-sm text-red-600 dark:text-red-400 mb-2";
      status.textContent = "Couldn't load publications.";
    }
    
    if (track) {
      track.innerHTML = "<div class='text-sm text-red-600 dark:text-red-400'>Couldn't load publications.json.</div>";
    }
  });
