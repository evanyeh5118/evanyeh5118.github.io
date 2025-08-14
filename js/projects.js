import { el } from "./utils/dom.js";

export function initProjects() {
  const track = document.getElementById("projectsTrack");
  const scroller = document.getElementById("projectsScroller");
  if (!track || !scroller) return;

  fetch("data/projects.json", { cache: "no-store" })
    .then((r) => r.json())
    .then((items) => {
      track.innerHTML = "";

      items.forEach((p) => {
        const card = el(
          "a",
          {
            href: p.link || "#",
            target: "_blank",
            rel: "noreferrer",
            class:
              "snap-start shrink-0 w-72 sm:w-80 md:w-96 " +
              "block rounded-2xl p-5 shadow-soft bg-white dark:bg-slate-900 " +
              "border border-slate-200 dark:border-slate-700 " +
              "hover:translate-y-[-2px] hover:shadow-md transition",
          },
          el("div", { class: "font-semibold mb-1" }, p.title),
          el(
            "div",
            { class: "text-sm text-slate-600 dark:text-slate-300 mb-3" },
            p.desc
          ),
          el(
            "div",
            { class: "flex gap-2 flex-wrap" },
            (p.tags || []).map((t) =>
              el(
                "span",
                {
                  class:
                    "text-xs px-2 py-0.5 rounded-full border " +
                    "border-slate-200 dark:border-slate-700 text-slate-500",
                },
                t
              )
            )
          )
        );
        track.appendChild(card);
      });

      const prevBtns = [
        document.getElementById("projectsPrev"),
        document.getElementById("projectsPrevMobile"),
      ].filter(Boolean);
      const nextBtns = [
        document.getElementById("projectsNext"),
        document.getElementById("projectsNextMobile"),
      ].filter(Boolean);

      function scrollByPage(dir = 1) {
        const amount = Math.max(320, Math.floor(scroller.clientWidth * 0.9)) * dir;
        scroller.scrollBy({ left: amount, behavior: "smooth" });
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
    })
    .catch(() => {
      track.innerHTML =
        "<div class='text-sm text-red-600 dark:text-red-400'>Couldn't load projects.json.</div>";
    });
}
