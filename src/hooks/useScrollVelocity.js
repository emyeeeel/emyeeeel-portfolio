import { useEffect, useRef } from "react";
import useReducedMotion from "./useReducedMotion.js";

const REST_DURATION = 40;
const FAST_DURATION = 24;
const MAX_VELOCITY = 45;
const DECAY = 0.92;

function useScrollVelocity() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let rafId;

    function tick() {
      const y = window.scrollY;
      const instant = Math.abs(y - lastY);
      lastY = y;
      velocity = velocity * DECAY + instant * (1 - DECAY);

      const normalized = Math.min(velocity / MAX_VELOCITY, 1);
      const duration = REST_DURATION - normalized * (REST_DURATION - FAST_DURATION);
      el.style.setProperty("--mq-dur", `${duration.toFixed(2)}s`);

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      el.style.removeProperty("--mq-dur");
    };
  }, [reducedMotion]);

  return ref;
}

export default useScrollVelocity;
