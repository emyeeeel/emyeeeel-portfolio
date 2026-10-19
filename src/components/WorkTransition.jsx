import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./WorkTransition.css";

// The hero promises to turn "there has to be a better way" into something
// that works; this tagline shows that same before-and-after in the words of
// the people who used the result: From "this takes forever" (struck
// through) to "wait, that's it?" (large, on a coral band). It plays out in
// order when it scrolls into view.
function WorkTransition() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    // Toggled both ways, so it replays each time it scrolls back into view.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      className={`work-transition${visible ? " is-visible" : ""}`}
      ref={sectionRef}
      aria-labelledby="work-transition-line"
    >
      <div className="wrap">
        <p className="work-transition__prompt" aria-hidden="true">
          <span className="work-transition__prompt-mark">&gt;</span> cd ~/work
        </p>

        <h2 className="work-transition__line" id="work-transition-line">
          <span className="work-transition__before">
            <span className="work-transition__joiner">From</span>{" "}
            <span className="work-transition__quote">&ldquo;this takes forever&rdquo;</span>{" "}
            <span className="work-transition__joiner">to</span>
          </span>{" "}
          <span className="work-transition__after">
            <span className="work-transition__quote">
              <mark className="work-transition__mark">&ldquo;wait, that&rsquo;s it?&rdquo;</mark>
            </span>
          </span>
        </h2>

        {/* Points on to the projects right below. */}
        <a href="#work" className="work-transition__cue">
          see the work
          <span className="work-transition__cue-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}

export default WorkTransition;
