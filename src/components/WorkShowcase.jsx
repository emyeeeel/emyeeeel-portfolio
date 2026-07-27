import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import WorkPreviewCard from "./WorkPreviewCard.jsx";
import "./WorkShowcase.css";

function WorkShowcase() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Below the desktop breakpoint (and under reduced motion) only the
    // first project is shown, statically (see WorkShowcase.css), so
    // there's nothing for this scroll-driven step to do.
    if (reducedMotion || window.innerWidth <= 900) return;

    let rafId = null;

    function updateProgress() {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);
      const raw = -rect.top / scrollable;
      const progress = Math.min(1, Math.max(0, raw));
      const index = Math.min(projects.length - 1, Math.floor(progress * projects.length));

      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }
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

  const marqueeText = `${projects[activeIndex].title.toUpperCase()} `.repeat(6);

  return (
    <section id="work" className="work-showcase" ref={sectionRef}>
      <div className="work-showcase__sticky">
        {/* <div className="work-showcase__marquee" aria-hidden="true">
          <div className="work-showcase__marquee-track">
            <span className="work-showcase__marquee-item">{marqueeText}</span>
            <span className="work-showcase__marquee-item">{marqueeText}</span>
          </div>
        </div> */}

        <div className="wrap work-showcase__inner">
          <div className="work-showcase__preview-stack">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className={`work-showcase__preview-slot${i === activeIndex ? " is-active" : ""}`}
              >
                <WorkPreviewCard project={project} />
              </div>
            ))}
          </div>

          <Link to="/work" className="work-showcase__all-link">
            see all works →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WorkShowcase;
