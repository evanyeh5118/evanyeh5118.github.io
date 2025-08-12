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

// Load Projects
fetch("/data/projects.json")
  .then(r => r.json())
  .then(items => {
    const grid = document.getElementById("projectsGrid");
    grid.innerHTML = "";
    items.forEach(p => {
      grid.appendChild(
        el("a",
          { href: p.link || "#", target: "_blank", rel: "noreferrer",
            class: "block rounded-2xl p-5 shadow-soft bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:translate-y-[-2px] hover:shadow-md transition"
          },
          el("div", { class:"font-semibold mb-1" }, p.title),
          el("div", { class:"text-sm text-slate-600 dark:text-slate-300 mb-3" }, p.desc),
          el("div", { class:"flex gap-2 flex-wrap" },
            (p.tags || []).map(t => el("span", { class:"text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500" }, t))
          )
        )
      );
    });
  })
  .catch(() => { /* optional: show fallback */ });

// Load Timeline
fetch("/data/timeline.json")
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
