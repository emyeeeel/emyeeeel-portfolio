import { useState } from "react";
import Reveal from "./Reveal.jsx";
import "./Hero.css";

const resumeUrl = "/Amiel_Catado_Resume.pdf";

const HERO_STATS = [
  { number: "26", label: "weeks in Taiwan" },
  { number: "2", label: "competition wins" },
  { number: "5", label: "orgs shipped for" },
];

function Hero() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="hero-section" className="hero" aria-label="Introduction">
      <div className="wrap hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">
            cebu · remote — open to work
          </p>
          <p className="hero__role">AI Engineer &amp; Fullstack Developer</p>
          <Reveal
            as="h1"
            className="hero__headline"
            lines={[
              <span>I build and support</span>,
              <span>the technical systems</span>,
              <span>
                that power growing businesses.
              </span>,
            ]}
          />
          <p className="hero__intro">
            Hi, I'm Amiel Catado — but you can call me{" "}
            <span className="hero__name">emyeeeel</span>. I help founders and small teams design AI systems, build the fullstack products they run on, and handle the technical work that keeps things moving — from model to production to your inbox.
          </p>
          <div className="hero__ctas">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume — PDF, opens in new tab"
              className="hero__cta hero__cta--primary"
            >
              resume ↓
            </a>
            <a href="#contact" className="hero__cta hero__cta--secondary">
              start a project →
            </a>
          </div>
        </div>
        {/* <div className="hero__avatar" aria-hidden={avatarError ? "true" : undefined}>
          {!avatarError ? (
            <img
              src="/assets/avatar.png"
              alt="Portrait of Mary Amiel Catado"
              className="hero__avatar-img"
              onError={() => setAvatarError(true)}
            />
          ) : (
            <div
              className="hero__avatar-placeholder"
              role="img"
              aria-label="Portrait placeholder"
            >
              <span>portrait</span>
            </div>
          )}
        </div> */}
      </div>
      <div className="wrap">
        <ul className="hero__stats">
          {HERO_STATS.map((stat) => (
            <li className="hero__stat" key={stat.label}>
              <span className="hero__stat-num">{stat.number}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
