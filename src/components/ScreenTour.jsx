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
//
// `variant="stage"` (the case study template): the steps are browser tabs
// on a full-width frame, an address bar shows the screen's route under
// `host`, and the description and arrows sit under the screenshot. No
// zoom; the screen is already large.
// An SVG arrow, so it centres exactly in its round button (a text arrow
// sits wherever the font's metrics put it).
function Arrow({ direction }) {
  return (
    <svg
      className="tour__arrow"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ScreenTour({ intro, steps, variant, host }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(null);
  const step = steps[active];
  const pad = (n) => String(n).padStart(2, "0");
  const stage = variant === "stage";

  const nav = (
    <span className="tour__nav">
      <button
        type="button"
        className="tour__nav-btn"
        onClick={() => setActive((i) => Math.max(0, i - 1))}
        disabled={active === 0}
        aria-label="Previous screen"
      >
        <Arrow direction="left" />
      </button>
      <button
        type="button"
        className="tour__nav-btn"
        onClick={() => setActive((i) => Math.min(steps.length - 1, i + 1))}
        disabled={active === steps.length - 1}
        aria-label="Next screen"
      >
        <Arrow direction="right" />
      </button>
    </span>
  );

  const list = (
    <ol className="tour__steps" aria-label="Screens">
      {steps.map((s, i) => (
        <li key={s.title}>
          <button
            type="button"
            className={`tour__step${i === active ? " is-active" : ""}`}
            aria-current={i === active ? "step" : undefined}
            onClick={() => setActive(i)}
          >
            <span className="tour__step-head">
              <span className="tour__step-num">{pad(i + 1)}</span>
              {s.title}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );

  const screen =
    step.device === "phone" ? (
      <span className="tour__phone">
        <img key={step.image} src={step.image} alt={step.alt} className="tour__img" decoding="async" />
      </span>
    ) : (
      <img key={step.image} src={step.image} alt={step.alt} className="tour__img" decoding="async" />
    );
  const shotClass = `tour__shot${step.device === "phone" ? " tour__shot--phone" : ""}${
    step.fit === "contain" ? " tour__shot--contain" : ""
  }`;

  const frame = (
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
        className={shotClass}
        onClick={() => setZoomed({ src: step.image, alt: step.alt, caption: step.title })}
        aria-label={`Enlarge screenshot: ${step.alt}`}
      >
        {screen}
        <span className="tour__zoom" aria-hidden="true">
          ⤢ enlarge
        </span>
      </button>
    </div>
  );

  const preload = (
    // Preload the other screens so switching steps is instant.
    <div className="tour__preload" aria-hidden="true">
      {steps.map((s) => (
        <img key={s.image} src={s.image} alt="" loading="lazy" />
      ))}
    </div>
  );

  if (stage) {
    return (
      <div className="tour tour--stage">
        <figure className="tour__stage">
          <div className="tour__frame">
            <div className="tour__tabs" role="group" aria-label="Screens">
              {steps.map((s, i) => (
                <button
                  type="button"
                  key={s.title}
                  className={`tour__tab${i === active ? " is-active" : ""}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className="tour__step-num">{pad(i + 1)}</span>
                  <span className="tour__tab-title">{s.title}</span>
                </button>
              ))}
            </div>
            <div className="tour__address" aria-hidden="true">
              <span className="tour__dots">
                <span />
                <span />
                <span />
              </span>
              <span className="tour__url">
                {host && <span className="tour__host">{host}</span>}
                {/* without a host, the bar names the screen instead */}
                <strong>{step.route ?? (host ? "" : step.title.toLowerCase())}</strong>
              </span>
              <span className="tour__frame-count">
                {pad(active + 1)} / {pad(steps.length)}
              </span>
            </div>
            <div className={shotClass}>{screen}</div>
          </div>

          <figcaption className="tour__lede-row">
            <span className="tour__lede" aria-live="polite">
              <strong>{step.title}.</strong> {step.body}
            </span>
            {nav}
          </figcaption>
        </figure>
        {intro && <p className="tour__intro">{intro}</p>}
        {preload}
      </div>
    );
  }

  return (
    <div className="tour">
      {intro && <p className="tour__intro">{intro}</p>}

      <div className="tour__body">
        {list}

        <figure className="tour__stage">
          {frame}
          <figcaption className="tour__caption" aria-live="polite">
            <span className="tour__caption-text">
              <strong>{step.title}.</strong> {step.body}
            </span>
            {nav}
          </figcaption>
        </figure>
      </div>

      {preload}
      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </div>
  );
}

export default ScreenTour;
