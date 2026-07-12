import processSteps from "../data/process.js";
import Reveal from "./Reveal.jsx";
import "./Process.css";

function Process() {
  return (
    <section id="process" className="process-section">
      <div className="wrap">
        <Reveal as="p" className="section-label process__label">
          05 / process
        </Reveal>
        <ul className="process__list">
          {processSteps.map((step) => (
            <li className="process__step" key={step.number}>
              <p className="process__number">{step.number}</p>
              <p className="process__title">{step.title}</p>
              <p className="process__description">{step.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Process;
