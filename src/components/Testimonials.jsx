import { useState } from "react";
import testimonials from "../data/testimonials.js";
import Reveal from "./Reveal.jsx";
import "./Testimonials.css";

function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  function goPrev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function goNext() {
    setIndex((i) => (i + 1) % total);
  }

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="wrap">
        <Reveal as="p" className="section-label testimonials__label">
          05 / testimonials
        </Reveal>
        <div className="feature">
          <div className="deck">
            <div
              className="deck__card deck__card--back-2"
              aria-hidden="true"
            />
            <div
              className="deck__card deck__card--back-1"
              aria-hidden="true"
            />
            <div className="deck__card deck__card--active">
              <p className="deck__mark" aria-hidden="true">
                &ldquo;
              </p>
              <p className="deck__quote">{current.quote}</p>
            </div>
          </div>
          <div className="identity">
            <p className="identity__name">{current.name}</p>
            <p className="identity__role">
              {current.role} — {current.company}
            </p>
            <div className="identity__nav">
              <button
                type="button"
                className="identity__nav-btn"
                aria-label="Previous testimonial"
                disabled={total <= 1}
                onClick={goPrev}
              >
                ←
              </button>
              <button
                type="button"
                className="identity__nav-btn"
                aria-label="Next testimonial"
                disabled={total <= 1}
                onClick={goNext}
              >
                →
              </button>
            </div>
            <p className="identity__count">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
