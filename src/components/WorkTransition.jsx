import { useLayoutEffect, useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./WorkTransition.css";

// Each entry is one word (plus its trailing punctuation, so it never
// breaks mid-token). `accent` colors the word; `noSpace` skips the
// leading space before it (for punctuation like the closing period).
const TOKENS = [
  "The",
  "work",
  "speaks",
  "first.",
  "Every",
  "project",
  "that",
  "lands",
  "on",
  "my",
  "desk",
  "leaves",
  { text: "bigger", accent: true },
  "than",
  "it",
  "arrived.",
  "You",
  "call",
  "the",
  "shot,",
  "I",
  "make",
  "it",
  { text: "real", accent: true },
  { text: ".", noSpace: true },
];

function WorkTransition() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const wordRefs = useRef([]);
  wordRefs.current = [];
  const [visible, setVisible] = useState(false);
  const [lineRects, setLineRects] = useState([]);

  // The paragraph flows as ordinary text (letting text-wrap: balance pick
  // the line breaks), then this measures where the browser actually put
  // each line and groups the words by row, so the per-line reveal blinds
  // below always match reality instead of a hand-authored line array
  // that goes stale whenever the copy or viewport changes.
  useLayoutEffect(() => {
    function measureLines() {
      const frame = frameRef.current;
      if (!frame) return;
      const frameRect = frame.getBoundingClientRect();
      const rows = [];

      wordRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = Math.round(rect.top - frameRect.top);
        const left = rect.left - frameRect.left;
        const right = rect.right - frameRect.left;
        const bottom = Math.round(rect.bottom - frameRect.top);

        let row = rows.find((r) => Math.abs(r.top - top) < 2);
        if (!row) {
          rows.push({ top, bottom, left, right });
        } else {
          row.left = Math.min(row.left, left);
          row.right = Math.max(row.right, right);
          row.bottom = Math.max(row.bottom, bottom);
        }
      });

      rows.sort((a, b) => a.top - b.top);
      setLineRects(
        rows.map((r) => ({
          top: r.top,
          left: r.left,
          width: r.right - r.left,
          height: r.bottom - r.top,
        })),
      );
    }

    let rafId = null;
    function handleResize() {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        measureLines();
      });
    }

    measureLines();
    window.addEventListener("resize", handleResize);
    document.fonts?.ready?.then(measureLines);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    // Kept observing (no disconnect) and toggled both ways, so the blinds
    // reset shut every time the section scrolls out of view and reopen
    // again the next time it scrolls back into view.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className="work-transition" ref={sectionRef}>
      <div className="wrap">
        <div className="work-transition__frame" ref={frameRef}>
          <p className="work-transition__text">
            {TOKENS.map((token, i) => {
              const isObj = typeof token === "object";
              const text = isObj ? token.text : token;
              const accent = isObj && token.accent;
              const noSpace = isObj && token.noSpace;

              return (
                <span
                  className="work-transition__word"
                  key={i}
                  ref={(node) => {
                    wordRefs.current[i] = node;
                  }}
                >
                  {i > 0 && !noSpace ? " " : ""}
                  {accent ? <span className="work-transition__accent">{text}</span> : text}
                </span>
              );
            })}
          </p>

          {lineRects.map((rect, i) => (
            <span
              key={i}
              className={`work-transition__blind${i % 2 === 1 ? " work-transition__blind--reverse" : ""}${visible ? " work-transition__blind--open" : ""}`}
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                transitionDelay: `${i * 250}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkTransition;
