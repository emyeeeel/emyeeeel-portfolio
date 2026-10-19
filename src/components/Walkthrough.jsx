import { useState } from "react";
import "./Walkthrough.css";

// A step-by-step tour of a prototype that sits behind a sign-in, told in
// the site's terminal language rather than with screenshots. Every step
// title stays visible; the selected step's detail shows in the "screen".
function Walkthrough({ intro, steps }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="walkthrough">
      {intro && <p className="walkthrough__intro">{intro}</p>}

      <div className="walkthrough__body">
        <ol className="walkthrough__steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                className={`walkthrough__step${i === active ? " is-active" : ""}`}
                aria-current={i === active ? "step" : undefined}
                onClick={() => setActive(i)}
              >
                <span className="walkthrough__step-num">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>

        <div className="walkthrough__screen">
          <div className="walkthrough__screen-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="walkthrough__screen-path">
              step {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
          </div>
          <div className="walkthrough__screen-content" aria-live="polite">
            <p className="walkthrough__screen-prompt" aria-hidden="true">
              &gt; {step.title.toLowerCase()}
            </p>
            <h4 className="walkthrough__screen-title">{step.title}</h4>
            <p className="walkthrough__screen-text">{step.body}</p>
          </div>
          <div className="walkthrough__controls">
            <button
              type="button"
              className="walkthrough__nav"
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={active === 0}
            >
              ← prev
            </button>
            <button
              type="button"
              className="walkthrough__nav"
              onClick={() => setActive((i) => Math.min(steps.length - 1, i + 1))}
              disabled={active === steps.length - 1}
            >
              next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Walkthrough;
