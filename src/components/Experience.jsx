import { useState } from "react";
import experience, { education } from "../data/experience.js";
import { visibleTestimonials } from "../data/testimonials.js";
import recognition from "../data/recognition.js";
import Reveal from "./Reveal.jsx";
import "./Experience.css";

const current = experience.filter((item) => item.current);
const past = experience.filter((item) => !item.current);

// "Jan 2022 – Mar 2026": from the oldest past role's start to the newest's end.
const pastSpan =
  past.length > 0
    ? `${past[past.length - 1].dates.split(" – ")[0]} – ${past[0].dates.split(" – ")[1] ?? ""}`
    : "";

const quotesFor = (item) => visibleTestimonials.filter((t) => t.experience === item.key);
const awardsFor = (item) => recognition.filter((r) => (item.awardsFrom ?? []).includes(r.project));

// The organisation's tile, in the same small tile Skills uses for tools.
// A logo is usually a single-colour mask, painted in the tile's text colour
// (bone, or coral for current roles), so it sits in the site's palette;
// `logoColor` logos keep their own colours. Without a logo, the tile shows
// the monogram.
function Mono({ item }) {
  if (item.logo && item.logoColor) {
    return (
      <span className="experience__mono experience__mono--logo experience__mono--color" aria-hidden="true">
        <img src={item.logo} alt="" />
      </span>
    );
  }
  if (item.logo) {
    return (
      <span
        className={`experience__mono experience__mono--logo${item.tile ? ` experience__mono--${item.tile}` : ""}`}
        aria-hidden="true"
      >
        <span className="experience__logo" style={{ "--logo": `url(${item.logo})` }} />
      </span>
    );
  }
  const long = (item.mono ?? "").length > 2;
  return (
    <span className={`experience__mono${long ? " experience__mono--long" : ""}`} aria-hidden="true">
      {item.mono}
    </span>
  );
}

function Testimonial({ item }) {
  return (
    <figure className={`experience__quote${item.placeholder ? " experience__quote--draft" : ""}`}>
      <span className="experience__quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="experience__quote-text">{item.quote}</blockquote>
      <figcaption className="experience__quote-person">
        <span className="experience__quote-name">{item.name}</span>
        <span className="experience__quote-role">
          {item.role}, {item.company}
        </span>
      </figcaption>
    </figure>
  );
}

// What a role adds below its summary: awards, then recommendations.
function Extras({ item }) {
  const awards = awardsFor(item);
  return (
    <>
      {awards.length > 0 && (
        <ul className="experience__awards" aria-label="Recognition">
          {awards.map((award) => (
            <li key={award.title}>
              <span className="experience__award-star" aria-hidden="true">
                ★
              </span>
              <span>{award.title}</span>
            </li>
          ))}
        </ul>
      )}
      {quotesFor(item).map((quote) => (
        <Testimonial item={quote} key={quote.name + quote.company} />
      ))}
    </>
  );
}

// One of the current roles, as a row inside the "now" card.
function CurrentRole({ item }) {
  return (
    <li className="experience__row">
      <Mono item={item} />
      <div className="experience__row-body">
        <div className="experience__row-head">
          <h3 className="experience__role">{item.role}</h3>
          <span className="experience__dates">{item.dates}</span>
        </div>
        <p className="experience__org">{item.org}</p>
        <p className="experience__summary">{item.summary}</p>
        <Extras item={item} />
      </div>
    </li>
  );
}

// An earlier role: a compact line (tile, role, org, dates) that opens to
// the full card.
function PastRole({ item, open, onToggle }) {
  const bodyId = `experience-${item.key}`;
  return (
    <li className={`experience__past${open ? " is-open" : ""}`}>
      <h3 className="experience__past-heading">
        <button
          type="button"
          className="experience__past-toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          <Mono item={item} />
          <span className="experience__past-main">
            <span className="experience__past-role">{item.role}</span>
            <span className="experience__past-org">{item.org}</span>
          </span>
          <span className="experience__past-side">
            <span className="experience__dates">{item.dates}</span>
          </span>
          <span className="experience__plus" aria-hidden="true" />
        </button>
      </h3>
      <div id={bodyId} className="experience__past-body" inert={!open}>
        <div className="experience__past-inner">
          <p className="experience__summary">{item.summary}</p>
          <Extras item={item} />
        </div>
      </div>
    </li>
  );
}

// Experience as a "git log" in three stops on a rail: the current roles
// together in one "now" card, the earlier roles as a compact list that
// opens to the full cards, then the degree.
function Experience() {
  const [openKeys, setOpenKeys] = useState(() => new Set());
  const allOpen = past.length > 0 && past.every((item) => openKeys.has(item.key));

  function toggle(key) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleAll() {
    setOpenKeys(allOpen ? new Set() : new Set(past.map((item) => item.key)));
  }

  return (
    <section id="experience" className="experience" aria-labelledby="experience-heading">
      <div className="wrap">
        <div className="experience__header">
          <p className="section-label experience__label">03 / experience</p>
          <Reveal as="h2" className="experience__heading" id="experience-heading">
            Where I&rsquo;ve done the work.
          </Reveal>
        </div>

        <p className="experience__cmd" aria-hidden="true">
          <span className="experience__cmd-mark">&gt;</span> git log --experience
        </p>

        <ol className="experience__list">
          {current.length > 0 && (
            <li className="experience__stop is-current">
              <div className="experience__when">
                <span className="experience__dot" aria-hidden="true" />
                <span className="experience__stop-label">now</span>
              </div>
              <article className="experience__card experience__card--now" aria-label="Current roles">
                <p className="experience__card-note">
                  {current.length} roles, running in parallel
                </p>
                <ul className="experience__rows">
                  {current.map((item) => (
                    <CurrentRole item={item} key={item.key} />
                  ))}
                </ul>
              </article>
            </li>
          )}

          {past.length > 0 && (
            <li className="experience__stop">
              <div className="experience__when">
                <span className="experience__dot" aria-hidden="true" />
                <span className="experience__stop-label">earlier</span>
              </div>
              <article className="experience__card experience__card--past" aria-label="Earlier roles">
                <div className="experience__card-bar">
                  <p className="experience__card-note">
                    {past.length} roles · {pastSpan}
                  </p>
                  <button type="button" className="experience__all" onClick={toggleAll}>
                    {allOpen ? "collapse all" : "expand all"}
                  </button>
                </div>
                <ul className="experience__past-list">
                  {past.map((item) => (
                    <PastRole
                      item={item}
                      key={item.key}
                      open={openKeys.has(item.key)}
                      onToggle={() => toggle(item.key)}
                    />
                  ))}
                </ul>
              </article>
            </li>
          )}

          {/* The degree closes the timeline, with school honours and roles. */}
          <li className="experience__stop">
            <div className="experience__when">
              <span className="experience__dot" aria-hidden="true" />
              <span className="experience__stop-label">{education.dates || education.type}</span>
            </div>
            <article className="experience__card experience__card--edu">
              <div className="experience__row">
                <Mono item={education} />
                <div className="experience__row-body">
                  <h3 className="experience__role">{education.role}</h3>
                  <p className="experience__org">{education.org}</p>
                  <p className="experience__summary">{education.summary}</p>
                  <ul className="experience__awards experience__awards--edu" aria-label="Honours and involvement">
                    {education.highlights.map((item) => (
                      <li key={item.title}>
                        <span
                          className={item.kind === "award" ? "experience__award-star" : "experience__role-mark"}
                          aria-hidden="true"
                        >
                          {item.kind === "award" ? "★" : "▸"}
                        </span>
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default Experience;
