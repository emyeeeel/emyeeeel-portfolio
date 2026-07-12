import processSteps from "../data/process.js";
import Reveal from "./Reveal.jsx";
import "./Process.css";

function Process() {
  return (
    <section id="process" className="process-section">
      <div className="wrap">
        <Reveal as="p" className="section-label process__label">
          06 / process
        </Reveal>
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
