import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./PointerHighlight.css";

function PointerHighlight({ children, delay = 500, className = "" }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <span
      ref={ref}
      className={`pointer-highlight${visible ? " pointer-highlight--visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--pointer-highlight-delay": `${delay}ms` }}
    >
      <span className="pointer-highlight__rect" aria-hidden="true" />
      <span className="pointer-highlight__text">{children}</span>
    </span>
  );
}

export default PointerHighlight;
