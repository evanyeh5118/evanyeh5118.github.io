import { el } from "./utils/dom.js";

export function initTimeline() {
  const ul = document.getElementById("timelineList");
  if (!ul) return;

  fetch("data/timeline.json")
    .then((r) => r.json())
    .then((items) => {
      ul.innerHTML = "";
      items.forEach((t) => {
        ul.appendChild(
          el(
            "li",
            { class: "opacity-90" },
            el("span", { class: "font-mono text-xs mr-2 text-slate-500" }, t.year),
            t.text
          )
        );
      });
    })
    .catch(() => {});
}
