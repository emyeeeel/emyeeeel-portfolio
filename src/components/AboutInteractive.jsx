import { Link } from "react-router-dom";
import highlights from "../data/highlights.js";
import Reveal from "./Reveal.jsx";
import "./AboutInteractive.css";

// Portrait for the card. "/assets/about/portrait-smile.jpg" is the other
// option from the same shoot.
const PORTRAIT = "/assets/about/portrait-thinking.jpg";

// The yearly-savings figure from the hero strip, so the two always match.
const savings = highlights.find(
  (item) => item.label.endsWith("saved per year") && !item.label.includes("hours"),
);

// Home "about me": a portrait card beside a short intro with the key
// phrases highlighted, and the way to the full board.
function AboutInteractive() {
  return (
    <section id="about" className="about-interactive" aria-labelledby="about-heading">
      <div className="wrap about-interactive__inner">
        <figure className="about-card">
          <div className="about-card__frame">
            <img
              src={PORTRAIT}
              alt="Amiel, thinking it over"
              className="about-card__photo"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="about-card__caption">
              <span className="about-card__name">Amiel</span>
              <span className="about-card__role">Software development &amp; business automation</span>
            </figcaption>
          </div>
          <span className="about-card__chip about-card__chip--role" aria-hidden="true">
            <span className="about-card__chip-mark">&gt;</span> automation builder
          </span>
          {savings && !savings.placeholder && (
            <span className="about-card__chip about-card__chip--stat">
              <span className="about-card__chip-value">{savings.value}</span> {savings.label}
            </span>
          )}
        </figure>

        <div className="about-interactive__copy">
          <p className="section-label about-interactive__label">04 / about</p>
          <Reveal as="h2" className="about-interactive__headline" id="about-heading">
            about <span className="about-interactive__emphasis">me</span>.
          </Reveal>
          {/* A short, punchy promise in the display font, then one plain
              sentence that puts Amiel's name to it. */}
          <p className="about-interactive__punch">
            <span>
              Less <mark>busywork</mark>.
            </span>{" "}
            <span>
              Fewer <mark>manual steps</mark>.
            </span>{" "}
            <span>
              More <mark>hours back</mark>.
            </span>
          </p>
          <p className="about-interactive__text">
            I&rsquo;m Amiel, a developer who builds apps, automations and reports around how
            your team actually works, then shows you exactly what they saved.
          </p>

          <Link to="/about" className="about-interactive__cta">
            more about me
            <span className="about-interactive__cta-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutInteractive;
