import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion.js";

const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const RADIUS = 110;
const FACTOR = 0.28;

function useMagnetic() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [fineHover, setFineHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_HOVER_QUERY).matches,
  );
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mql = window.matchMedia(FINE_HOVER_QUERY);
    const handler = (e) => setFineHover(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const active = fineHover && !reducedMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    function apply() {
      rafRef.current = null;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseRef.current.x - cx;
      const dy = mouseRef.current.y - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        el.style.transition = "transform 0ms linear";
        el.style.transform = `translate(${(dx * FACTOR).toFixed(2)}px, ${(dy * FACTOR).toFixed(2)}px)`;
      } else {
        el.style.transition = "transform 120ms ease-out";
        el.style.transform = "translate(0px, 0px)";
      }
    }

    function onMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      el.style.transition = "transform 120ms ease-out";
      el.style.transform = "translate(0px, 0px)";
    };
  }, [active]);

  return ref;
}

export default useMagnetic;
