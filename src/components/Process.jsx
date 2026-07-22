import processSteps from "../data/process.js";
import Reveal from "./Reveal.jsx";
import "./Process.css";

function Process() {
  return (
    <section id="process" className="process-section">
      <div className="wrap">
        <Reveal as="p" className="section-label process__label">
          04 / process
        </Reveal>
        <h2 className="process__heading">Get to know how it is done.</h2>
        <ul className="process__list">
          {processSteps.map((step) => (
            <li className="process__step" key={step.number}>
              {step.image ? (
                <img
                  className="process__media"
                  src={step.image}
                  alt={step.imageAlt}
                />
              ) : (
                <div className="process__placeholder">
                  <svg
                    className="process__placeholder-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="28"
                    height="28"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span>{step.placeholderLabel}</span>
                </div>
              )}
              <div className="process__scrim" aria-hidden="true" />
              <div className="process__content">
                <span className="process__eyebrow">step {step.number}</span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__description">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Process;
