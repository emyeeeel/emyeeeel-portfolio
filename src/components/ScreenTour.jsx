import { useState } from "react";
import Lightbox from "./Lightbox.jsx";
import "./ScreenTour.css";

// A guided tour of an app through real screenshots: numbered steps on one
// side, the selected screen in a browser frame on the other. Every step
// title stays visible; the screenshot opens full size on click.
//
// Per step: `device: "phone"` shows a mobile screenshot inside a phone
// frame; `fit: "contain"` shows a wide screenshot whole instead of
// cropping it to the frame.
function ScreenTour({ intro, steps }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(null);
  const step = steps[active];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="tour">
      {intro && <p className="tour__intro">{intro}</p>}

      <div className="tour__body">
        <ol className="tour__steps" aria-label="Screens">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                className={`tour__step${i === active ? " is-active" : ""}`}
                aria-current={i === active ? "step" : undefined}
                onClick={() => setActive(i)}
              >
                <span className="tour__step-num">{pad(i + 1)}</span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>

        <figure className="tour__stage">
          <div className="tour__frame">
            <div className="tour__frame-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <span className="tour__frame-count">
                {pad(active + 1)} / {pad(steps.length)}
              </span>
            </div>
            <button
              type="button"
              className={`tour__shot${step.device === "phone" ? " tour__shot--phone" : ""}${
                step.fit === "contain" ? " tour__shot--contain" : ""
              }`}
              onClick={() => setZoomed({ src: step.image, alt: step.alt, caption: step.title })}
              aria-label={`Enlarge screenshot: ${step.alt}`}
            >
              {step.device === "phone" ? (
                <span className="tour__phone">
                  <img
                    key={step.image}
                    src={step.image}
                    alt={step.alt}
                    className="tour__img"
                    decoding="async"
                  />
                </span>
              ) : (
                <img
                  key={step.image}
                  src={step.image}
                  alt={step.alt}
                  className="tour__img"
                  decoding="async"
                />
              )}
              <span className="tour__zoom" aria-hidden="true">
                ⤢ enlarge
              </span>
            </button>
          </div>

          <figcaption className="tour__caption" aria-live="polite">
            <span className="tour__caption-text">
              <strong>{step.title}.</strong> {step.body}
            </span>
            <span className="tour__nav">
              <button
                type="button"
                className="tour__nav-btn"
                onClick={() => setActive((i) => Math.max(0, i - 1))}
                disabled={active === 0}
                aria-label="Previous screen"
              >
                ←
              </button>
              <button
                type="button"
                className="tour__nav-btn"
                onClick={() => setActive((i) => Math.min(steps.length - 1, i + 1))}
                disabled={active === steps.length - 1}
                aria-label="Next screen"
              >
                →
              </button>
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Preload the other screens so switching steps is instant. */}
      <div className="tour__preload" aria-hidden="true">
        {steps.map((s) => (
          <img key={s.image} src={s.image} alt="" loading="lazy" />
        ))}
      </div>

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </div>
  );
}

export default ScreenTour;
