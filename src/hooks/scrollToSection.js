// Scrolls smoothly to a home section by id. Pinned sections in LAND_AT_END
// (like #services) are scrolled to the end of their pinned range instead
// of the top, so a jump from the nav or a link lands on the finished state
// (the scroll plays the animation on the way, as normal scrolling would).
const LAND_AT_END = new Set(["services"]);

function targetTop(target, id) {
  const top = target.getBoundingClientRect().top + window.scrollY;
  // Only while the pinned layout is active (taller than the screen).
  const pinned = LAND_AT_END.has(id) && target.offsetHeight > window.innerHeight * 1.2;
  // A couple of pixels past the end, so the animation is fully finished.
  return pinned ? Math.ceil(top + target.offsetHeight - window.innerHeight) + 2 : Math.round(top);
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let cancelCurrent = null;

// Drives the scroll frame by frame rather than relying on the browser's
// smooth scrolling, which can be cancelled by other page activity. The
// target is re-measured every frame, so layout shifts on the way are
// absorbed. Any wheel, touch or key input from the visitor stops it.
export default function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  cancelCurrent?.();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startY = window.scrollY;
  const distance = Math.abs(targetTop(target, id) - startY);
  if (reduced || distance < 2) {
    window.scrollTo({ top: targetTop(target, id), behavior: "instant" });
    return true;
  }

  const duration = Math.min(1400, Math.max(500, distance * 0.35));
  let start = null;
  let rafId = null;

  function stop() {
    if (rafId != null) cancelAnimationFrame(rafId);
    rafId = null;
    ["wheel", "touchstart", "keydown"].forEach((type) =>
      window.removeEventListener(type, stop),
    );
    cancelCurrent = null;
  }

  function frame(now) {
    // Timed from the first frame, so a late first frame doesn't skip ahead.
    if (start == null) start = now;
    const t = Math.min(1, (now - start) / duration);
    const to = targetTop(target, id);
    window.scrollTo({ top: startY + (to - startY) * ease(t), behavior: "instant" });
    if (t < 1) rafId = requestAnimationFrame(frame);
    else stop();
  }

  ["wheel", "touchstart", "keydown"].forEach((type) =>
    window.addEventListener(type, stop, { passive: true }),
  );
  cancelCurrent = stop;
  rafId = requestAnimationFrame(frame);
  return true;
}
