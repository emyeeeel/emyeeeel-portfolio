import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import aboutFacets from "../data/aboutFacets.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./AboutInteractive.css";

const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const ADVANCE_DISTANCE = 90;
const OFFSET_X = -20;
const OFFSET_Y = 120;
const HOLD_MS = 450;
const FADE_MS = 650;
const MAX_TRAIL = 5;

let trailIdCounter = 0;

function AboutTrailImage({ facet }) {
  const [status, setStatus] = useState("loading");

  return (
    <>
      {status !== "errored" && (
        <img
          src={facet.mediaSrc}
          alt={facet.mediaLabel}
          className="about-interactive__trail-img"
          style={{ opacity: status === "loaded" ? 1 : 0 }}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("errored")}
        />
      )}
      {status === "errored" && (
        <div className="about-interactive__trail-placeholder">
          <span>{facet.mediaLabel}</span>
        </div>
      )}
    </>
  );
}

function AboutInteractive() {
  const reducedMotion = useReducedMotion();
  const [fineHover, setFineHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_HOVER_QUERY).matches,
  );
  const [trail, setTrail] = useState([]);
  const [visibleIds, setVisibleIds] = useState(() => new Set());
  const fieldRef = useRef(null);
  const indexRef = useRef(0);
  const lastAdvanceRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mql = window.matchMedia(FINE_HOVER_QUERY);
    const handler = (e) => setFineHover(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const enabled = fineHover && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const field = fieldRef.current;
    if (!field) return;
    const timeouts = new Map();

    function spawn(x, y) {
      const id = ++trailIdCounter;
      const facet = aboutFacets[indexRef.current % aboutFacets.length];
      indexRef.current += 1;

      setTrail((prev) => {
        const next = [...prev, { id, facet, x, y }];
        return next.length > MAX_TRAIL ? next.slice(next.length - MAX_TRAIL) : next;
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisibleIds((prev) => new Set(prev).add(id));
        });
      });

      timeouts.set(
        `fade-${id}`,
        setTimeout(() => {
          setVisibleIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, HOLD_MS),
      );

      timeouts.set(
        `remove-${id}`,
        setTimeout(() => {
          setTrail((prev) => prev.filter((item) => item.id !== id));
          timeouts.delete(`fade-${id}`);
          timeouts.delete(`remove-${id}`);
        }, HOLD_MS + FADE_MS),
      );
    }

    function onMove(e) {
      const rect = field.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastAdvanceRef.current.x;
      const dy = y - lastAdvanceRef.current.y;
      if (Math.hypot(dx, dy) > ADVANCE_DISTANCE) {
        lastAdvanceRef.current = { x, y };
        spawn(x, y);
      }
    }

    function onEnter(e) {
      const rect = field.getBoundingClientRect();
      const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      lastAdvanceRef.current = point;
      spawn(point.x, point.y);
    }

    field.addEventListener("mousemove", onMove);
    field.addEventListener("mouseenter", onEnter);
    return () => {
      field.removeEventListener("mousemove", onMove);
      field.removeEventListener("mouseenter", onEnter);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [enabled]);

  return (
    <section id="about" className="about-interactive">
      <div className="wrap about-interactive__inner">
        <div className="about-interactive__field" ref={fieldRef}>
          <h2 className="about-interactive__headline">
            about{" "}
            <Link to="/about" className="about-interactive__emphasis">
              me
            </Link>
            .
          </h2>

          {enabled &&
            trail.map((item) => {
              const rotate = ((item.id * 47) % 12) - 6;
              return (
                <div
                  key={item.id}
                  className={`about-interactive__trail${visibleIds.has(item.id) ? " is-visible" : ""}`}
                  style={{
                    transform: `translate(${item.x + OFFSET_X}px, ${item.y - OFFSET_Y}px) rotate(${rotate}deg)`,
                  }}
                  aria-hidden="true"
                >
                  <AboutTrailImage facet={item.facet} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default AboutInteractive;
