import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./Reveal.css";

function Reveal({ children, lines, as: Tag = "div", className = "" }) {
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const items = lines ?? [children];

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " reveal--visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {items.map((line, i) => (
        <span className="reveal__line" key={i}>
          <span
            className="reveal__line-inner"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export default Reveal;
