import { Link } from "react-router-dom";
import MediaWithFallback from "./MediaWithFallback.jsx";
import Reveal from "./Reveal.jsx";
import "./About.css";

const STATS = [
  { number: "26", label: "weeks in taiwan" },
  { number: "2", label: "competition wins" },
  { number: "5", label: "orgs shipped for" },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="wrap about__inner">
        <Reveal as="p" className="section-label about__label">
          03 / about
        </Reveal>
        <div className="about__content">
          <MediaWithFallback
            src="/assets/klab.jpg"
            alt="K Lab photo, Tainan"
            label="K Lab photo, Tainan"
            className="about__photo-img"
            placeholderClassName="about__photo-placeholder"
          />
          <div className="about__text">
            <Reveal as="h2" className="about__title">
              From Cebu to Tainan and back
              <span className="about__period">.</span>
            </Reveal>
            <p className="about__paragraph">
              I spent 26 weeks at the K Laboratory in Taiwan building an AI
              dietary system now aimed at real long-term care facilities.
              Before that: government automation for two city LGUs, QA
              engineering, and a loyalty platform. I like shipping the whole
              thing — model, backend, and the UI people actually touch.
            </p>
            <div className="about__stats">
              {STATS.map((stat) => (
                <div className="about__stat" key={stat.label}>
                  <span className="about__stat-number">{stat.number}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="about__full-link">
              full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
