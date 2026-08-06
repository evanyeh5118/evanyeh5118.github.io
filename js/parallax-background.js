export function initParallaxBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const update = () => {
    // The image travels much less than the document, creating visual depth.
    const offset = Math.min(window.scrollY * 0.075, 140);
    document.documentElement.style.setProperty('--background-shift', `-${offset}px`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}
