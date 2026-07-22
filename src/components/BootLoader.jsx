import { useEffect, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./BootLoader.css";

const TOTAL_MS = 3000;
const FADE_MS = 300;

function BootLoader({ onDone }) {
  const reducedMotion = useReducedMotion();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      onDone();
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), TOTAL_MS - FADE_MS);
    const doneTimer = setTimeout(onDone, TOTAL_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [reducedMotion, onDone]);

  if (reducedMotion) return null;

  return (
    <div
      className={`boot-loader${fading ? " boot-loader--fading" : ""}`}
      aria-hidden="true"
    >
      <div className="boot-loader__terminal">
        <p className="boot-loader__line boot-loader__line--1">
          <span className="boot-loader__prompt">&gt;</span> booting
          emyeeeel_
        </p>
        <p className="boot-loader__line boot-loader__line--2">
          loading assets...
        </p>
        <div className="boot-loader__fill-row">
          <span>[</span>
          <span className="boot-loader__fill-track">
            <span className="boot-loader__fill-bar" />
          </span>
          <span>]</span>
        </div>
      </div>
    </div>
  );
}

export default BootLoader;
