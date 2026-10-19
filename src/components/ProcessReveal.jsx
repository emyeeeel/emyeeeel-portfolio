import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import ProcessArt from "./ProcessArt.jsx";
import processSteps from "../data/process.js";
import "./ProcessReveal.css";

// Working approach: the heading and a terminal-style step list stay pinned
// on the left while the step cards scroll past on the right. The list
// marks the step in view as running and the ones above it as done.
function ProcessReveal() {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = [...list.children];
    let rafId = null;

    // The running step is the last card whose top has passed the middle
    // of the screen. Near the end of the list the last card can't reach
    // the middle before the section ends, so it takes over once the list
    // is fully on screen.
    function update() {
      rafId = null;
      const middle = window.innerHeight * 0.5;
      let next = 0;
      cards.forEach((card, i) => {
        if (card.getBoundingClientRect().top < middle) next = i;
      });
      if (list.getBoundingClientRect().bottom <= window.innerHeight) {
        next = cards.length - 1;
      }
      setActive(next);
    }

    function onScroll() {
      if (rafId == null) rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="process" className="approach" aria-labelledby="approach-heading">
      <div className="wrap approach__inner">
        <div className="approach__aside">
          <p className="section-label approach__label">05 / working approach</p>
          <Reveal as="h2" className="approach__heading" id="approach-heading">
            From &ldquo;better way&rdquo; to something that works.
          </Reveal>
          <p className="approach__caption">
            Map it, scope it, build it, hand it over, and measure the difference.
          </p>

          {/* Step list, written like a script running in a terminal. */}
          <div className="approach__run" aria-hidden="true">
            <p className="approach__run-cmd">
              <span className="approach__run-mark">&gt;</span> ./approach
            </p>
            <ol className="approach__run-list">
              {processSteps.map((step, i) => (
                <li
                  key={step.key}
                  className={`approach__run-step${
                    i < active ? " is-done" : i === active ? " is-active" : ""
                  }`}
                >
                  <span className="approach__run-num">{step.number}</span>
                  <span className="approach__run-name">{step.title.toLowerCase()}</span>
                  <span className="approach__run-state">
                    {i < active ? "done" : i === active ? "running" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="approach__steps" ref={listRef}>
          {processSteps.map((step, i) => (
            <li className={`approach__card${i === active ? " is-active" : ""}`} key={step.key}>
              <p className="approach__prompt" aria-hidden="true">
                <span className="approach__prompt-mark">&gt;</span> step {step.number}
                <span className="approach__prompt-key">--{step.key}</span>
              </p>

              <div className="approach__media">
                <ProcessArt name={step.key} label={step.artAlt} />
              </div>

              <div className="approach__body">
                <h3 className="approach__title">
                  <span className="visually-hidden">Step {step.number}: </span>
                  {step.title}
                </h3>
                <p className="approach__desc">{step.description}</p>

                <p className="approach__output">
                  <span className="approach__output-label">output</span>
                  {step.output}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProcessReveal;
