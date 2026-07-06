import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import MediaWithFallback from "./MediaWithFallback.jsx";
import "./MediaPeek.css";

const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const OFFSET_X = 200;
const OFFSET_Y = 130;

function MediaPeek({ project }) {
  const reducedMotion = useReducedMotion();
  const [fineHover, setFineHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_HOVER_QUERY).matches,
  );
  const boxRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia(FINE_HOVER_QUERY);
    const handler = (e) => setFineHover(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const active = fineHover && !reducedMotion;

  useEffect(() => {
    if (!active) return;

    function scheduleMove() {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const box = boxRef.current;
        if (box) {
          const { x, y } = posRef.current;
          box.style.transform = `translate(${x - OFFSET_X}px, ${y - OFFSET_Y}px) rotate(-2deg)`;
        }
      });
    }

    function onMove(e) {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      scheduleMove();
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={boxRef}
      className={project ? "media-peek media-peek--visible" : "media-peek"}
      aria-hidden="true"
    >
      {project && (
        <MediaWithFallback
          src={project.mediaSrc}
          alt=""
          label={project.mediaLabel}
          className="media-peek__img"
          placeholderClassName="media-peek__placeholder"
        />
      )}
    </div>
  );
}

export default MediaPeek;
