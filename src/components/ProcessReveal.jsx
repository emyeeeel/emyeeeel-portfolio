import { useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import ProcessFrame from "./ProcessFrame.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";
import processSteps from "../data/process.js";
import "./ProcessReveal.css";

// Horizontal placement per image, so they don't all stack in the exact
// same spot as they travel through — mirrors the reference's varied
// positions (roughly centered, then shifted right, left, right).
const POSITIONS = ["50%", "64%", "36%", "60%"];

// Each image gets its own slice of the overall 0-1 scroll progress to
// travel through — evenly spaced but wider than a plain 1/4 split, so
// neighboring slices overlap a bit at the handoff (one image is still
// finishing its exit while the next has already started entering)
// instead of a hard cut between them.
const SLOT_WIDTH = 0.4;

function ProcessReveal() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  imageRefs.current = [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Below the desktop breakpoint (and under reduced motion) the reel
    // mechanic is disabled entirely in CSS (see ProcessReveal.css), so
    // there's nothing for this scroll-driven positioning to do.
    if (reducedMotion || window.innerWidth <= 900) return;

    const count = processSteps.length;
    const slotStep = count > 1 ? (1 - SLOT_WIDTH) / (count - 1) : 0;

    function applyProgress(progress) {
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i * slotStep;
        const local = Math.min(1, Math.max(0, (progress - start) / SLOT_WIDTH));

        const travelVh = 130;
        const y = (0.5 - local) * travelVh;
        const fadeIn = Math.min(1, local / 0.15);
        const fadeOut = Math.min(1, (1 - local) / 0.15);
        const opacity = Math.max(0, Math.min(fadeIn, fadeOut));

        el.style.transform = `translate(-50%, ${y.toFixed(2)}vh)`;
        el.style.opacity = opacity.toFixed(3);
      });
    }

    let rafId = null;

    function updateProgress() {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);
      const raw = -rect.top / scrollable;
      const progress = Math.min(1, Math.max(0, raw));
      applyProgress(progress);
    }

    function onScroll() {
      if (rafId == null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <section id="process" className="process-reveal" ref={sectionRef}>
      <div className="process-reveal__sticky">
        <div className="wrap process-reveal__inner">
          <div className="process-reveal__header">
            <Reveal as="h2" className="process-reveal__heading">
              Get to know how it is done.
            </Reveal>
            <p className="process-reveal__caption">Scroll to walk through it, step by step.</p>
          </div>

          <div className="process-reveal__reel">
            {processSteps.map((step, i) => (
              <ProcessFrame
                key={step.number}
                step={step}
                style={{ left: POSITIONS[i % POSITIONS.length] }}
                ref={(node) => {
                  imageRefs.current[i] = node;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessReveal;
