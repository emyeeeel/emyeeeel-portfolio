import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useReducedMotion from "../hooks/useReducedMotion.js";
import servicesOffered from "../data/services-offered.js";
import services from "../data/services.js";
import "./ServicesJourney.css";

const THEMES = ["light", "accent", "dark"];

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <circle cx="6" cy="17" r="2.2" />
      <circle cx="18" cy="17" r="2.2" />
      <circle cx="12" cy="6" r="2.2" />
      <path d="M8 15.5 11 8M16 15.5 13 8" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  );
}

const ICONS = [SparkIcon, LayersIcon, PulseIcon];

function ServicesJourney() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      section.style.setProperty("--reveal-progress", "1");
      return;
    }

    let rafId = null;

    // The section is much taller than the viewport (see the 230vh height
    // in ServicesJourney.css) and its inner content is position: sticky,
    // so the content stays pinned — and perfectly centered — on screen
    // for the entire scroll distance while progress climbs from 0 to 1.
    function updateProgress() {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);
      const raw = -rect.top / scrollable;
      const progress = Math.min(1, Math.max(0, raw));
      section.style.setProperty("--reveal-progress", progress.toFixed(4));
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
    <section id="services" className="services-journey" ref={sectionRef}>
      <div className="services-journey__sticky">
        <div className="wrap">
          <h2 className="services-journey__heading">So, what are you building?</h2>

          <ul className="services-journey__list">
            {servicesOffered.map((offer, index) => {
              const service = services[index];
              const Icon = ICONS[index % ICONS.length];
              const theme = THEMES[index % THEMES.length];

              return (
                <li
                  key={service?.slug ?? offer.tag}
                  className={`services-journey__card services-journey__card--${theme}`}
                >
                  <Link
                    to={service ? `/services/${service.slug}` : "/"}
                    className="services-journey__card-link"
                  >
                    <div className="services-journey__card-flip">
                      <div
                        className="services-journey__card-face services-journey__card-face--back"
                        style={{ "--slice-x": `${-index * 260}px` }}
                      />
                      <div className="services-journey__card-face services-journey__card-face--front">
                        <span className="services-journey__icon">
                          <Icon />
                        </span>
                        <h3 className="services-journey__tag">{offer.tag}</h3>
                        <p className="services-journey__subtitle">{offer.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ServicesJourney;
