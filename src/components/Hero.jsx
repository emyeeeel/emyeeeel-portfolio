import { useState } from "react";
import Reveal from "./Reveal.jsx";
import "./Hero.css";

function Hero() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="hero-section" className="hero" aria-label="Introduction">
      <div className="wrap hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">
            cebu · remote — open to work
          </p>
          <Reveal
            as="h1"
            className="hero__headline"
            lines={[
              <span>AI engineer.</span>,
              <span>Fullstack</span>,
              <span>
                developer<span className="hero__period">.</span>
              </span>,
            ]}
          />
          <p className="hero__intro">
            Hi, I'm Amiel Catado — but you can call me{" "}
            <span className="hero__name">emyeeeel</span>. I build systems
            that think, from model to production.
          </p>
        </div>
        <div className="hero__avatar" aria-hidden={avatarError ? "true" : undefined}>
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
        </div>
      </div>
    </section>
  );
}

export default Hero;
