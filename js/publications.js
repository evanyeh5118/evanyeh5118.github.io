import { el } from "./utils/dom.js";

export function initPublications() {
  const track = document.getElementById("pubTrack");
  const scroller = document.getElementById("pubScroller");
  const status = document.getElementById("pubStatus");
  if (!track || !scroller) return;

  fetch("data/publications.json", { cache: "no-store" })
    .then((r) => r.json())
    .then((items) => {
      track.innerHTML = "";

      if (!Array.isArray(items) || items.length === 0) {
        if (status) status.textContent = "No publications found.";
        return;
      }

      items.sort((a, b) => (b.year || 0) - (a.year || 0));

      items.forEach((p) => {
        const links = [];
        Object.entries(p.links || {}).forEach(([k, v]) => {
          if (v && v !== "#")
            links.push(
              el(
                "a",
                {
                  href: v,
                  target: "_blank",
                  rel: "noreferrer",
                  class:
                    "text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 underline",
                },
                k
              )
            );
        });

        const tags = (p.tags || []).map((t) =>
          el(
            "span",
            {
              class:
                "text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500",
            },
            t
          )
        );

        const card = el(
          "div",
          {
            class:
              "snap-start shrink-0 w-[28rem] sm:w-[34rem] rounded-2xl p-5 shadow-soft " +
              "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700",
          },
          el("div", { class: "text-sm text-slate-500" }, String(p.year ?? "")),
          el("div", { class: "font-semibold mt-1" }, p.title ?? ""),
          el(
            "div",
            { class: "text-sm text-slate-600 dark:text-slate-300 mt-1" },
            p.authors ?? ""
          ),
          el("div", { class: "text-sm mt-1" }, p.venue ?? ""),
          links.length ? el("div", { class: "mt-3 flex gap-2 flex-wrap" }, links) : null,
          tags.length ? el("div", { class: "mt-2 flex gap-2 flex-wrap" }, tags) : null
        );
        track.appendChild(card);
      });

      const prevBtns = [
        document.getElementById("pubPrev"),
        document.getElementById("pubPrevM"),
      ].filter(Boolean);
      const nextBtns = [
        document.getElementById("pubNext"),
        document.getElementById("pubNextM"),
      ].filter(Boolean);

      function scrollByPage(dir = 1) {
        scroller.scrollBy({
          left: Math.max(360, Math.floor(scroller.clientWidth * 0.9)) * dir,
          behavior: "smooth",
        });
      }
      prevBtns.forEach((b) => b.addEventListener("click", () => scrollByPage(-1)));
      nextBtns.forEach((b) => b.addEventListener("click", () => scrollByPage(+1)));

      scroller.addEventListener(
        "wheel",
        (e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            scroller.scrollBy({ left: e.deltaY });
          }
        },
        { passive: false }
      );

      if (status) {
        status.textContent = `Loaded ${items.length} publication${items.length > 1 ? "s" : ""}.`;
        setTimeout(() => (status.textContent = ""), 1500);
      }
    })
    .catch((err) => {
      console.error("Error loading publications:", err);
      if (status) {
        status.className = "text-sm text-red-600 dark:text-red-400 mb-2";
        status.textContent = "Couldn't load publications.";
      }
      if (track) {
        track.innerHTML =
          "<div class='text-sm text-red-600 dark:text-red-400'>Couldn't load publications.json.</div>";
      }
    });
}
