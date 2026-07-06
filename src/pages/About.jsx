import { useEffect } from "react";
import MediaWithFallback from "../components/MediaWithFallback.jsx";
import Reveal from "../components/Reveal.jsx";
import "../components/About.css";
import "./About.css";

const STATS = [
  { number: "26", label: "weeks in taiwan" },
  { number: "2", label: "competition wins" },
  { number: "5", label: "orgs shipped for" },
  // TODO(amiel): verify count
  { number: "4", label: "countries presented in" },
];

const PHOTOS = [
  { label: "K Lab, Tainan", src: "/assets/about-klab.jpg" },
  { label: "IPBL, Osaka", src: "/assets/about-ipbl.jpg" },
  { label: "presenting SpoonFull", src: "/assets/about-spoonfull.jpg" },
];

function PlaceholderParagraph() {
  return (
    <div className="about-page__todo" role="img" aria-label="TODO placeholder paragraph">
      <span className="about-page__todo-label">TODO(amiel): write</span>
      <span className="about-page__todo-bar about-page__todo-bar--full" />
      <span className="about-page__todo-bar about-page__todo-bar--full" />
      <span className="about-page__todo-bar about-page__todo-bar--short" />
    </div>
  );
}

function AboutPage() {
  useEffect(() => {
    document.title = "emyeeeel — about";
  }, []);

  return (
    <section className="about about-page">
      <div className="wrap about__inner">
        <Reveal as="p" className="section-label about__label">
          02 / about
        </Reveal>
        <div className="about__content about-page__content">
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
            <PlaceholderParagraph />
            <PlaceholderParagraph />
            <div className="about__stats">
              {STATS.map((stat) => (
                <div className="about__stat" key={stat.label}>
                  <span className="about__stat-number">{stat.number}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-page__photo-strip">
          {PHOTOS.map((photo) => (
            <MediaWithFallback
              key={photo.label}
              src={photo.src}
              alt={photo.label}
              label={photo.label}
              className="about-page__photo-img"
              placeholderClassName="about-page__photo-placeholder"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
