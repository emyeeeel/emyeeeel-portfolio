import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion.js";

const DURATION_MS = 1200;

function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

function useCountUp(target) {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setValue(Math.round(easeOutQuad(progress) * target));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, target]);

  return { ref, value };
}

export default useCountUp;
