import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./Cursor.css";

const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "a, button, [data-cursor]";

function Cursor() {
  const reducedMotion = useReducedMotion();
  const [fineHover, setFineHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_HOVER_QUERY).matches,
  );
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef(null);
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
        const dot = dotRef.current;
        if (dot) {
          dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
        }
      });
    }

    function onMove(e) {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      scheduleMove();
    }

    function onOver(e) {
      if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) {
        setHovering(true);
      }
    }

    function onOut(e) {
      if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) {
        setHovering(false);
      }
    }

    document.body.classList.add("cursor-none");
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={dotRef}
      className={hovering ? "cursor cursor--hover" : "cursor"}
      aria-hidden="true"
    />
  );
}

export default Cursor;
