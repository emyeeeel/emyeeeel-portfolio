import experience from "../data/experience.js";
import { visibleTestimonials } from "../data/testimonials.js";
import recognition from "../data/recognition.js";
import Reveal from "./Reveal.jsx";
import "./Experience.css";

const AWARD_PROJECTS = new Set(experience.flatMap((item) => item.awardsFrom ?? []));

// Awards for projects that aren't tied to a role (e.g. hackathons) get
// their own line after the timeline.
const otherRecognition = recognition.filter((item) => !AWARD_PROJECTS.has(item.project));

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

// Experience as a timeline, newest first: dates on the left, a card per
// role on the right with what was built, the skills used, any awards and
// the recommendation from that role.
function Experience() {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-heading">
      <div className="wrap">
        <div className="experience__header">
          <div>
            <p className="section-label experience__label">03 / experience</p>
            <Reveal as="h2" className="experience__heading" id="experience-heading">
              Where I&rsquo;ve done the work.
            </Reveal>
          </div>
          <p className="experience__intro">
            Automation roles, client work and internships, newest first, with
            what the people I worked with had to say.
          </p>
        </div>

        <p className="experience__cmd" aria-hidden="true">
          <span className="experience__cmd-mark">&gt;</span> git log --experience
        </p>

        <ol className="experience__list">
          {experience.map((item) => {
            const quotes = visibleTestimonials.filter((t) => t.experience === item.key);
            const awards = recognition.filter((r) => (item.awardsFrom ?? []).includes(r.project));
            return (
              <li className={`experience__item${item.current ? " is-current" : ""}`} key={item.key}>
                <div className="experience__when">
                  <span className="experience__dot" aria-hidden="true" />
                  <span className="experience__dates">{item.dates}</span>
                  {item.current && <span className="experience__now">now</span>}
                  {item.type && <span className="experience__type">{item.type}</span>}
                </div>

                <article className="experience__card">
                  <h3 className="experience__role">{item.role}</h3>
                  <p className="experience__org">{item.org}</p>
                  <p className="experience__summary">{item.summary}</p>

                  {awards.length > 0 && (
                    <ul className="experience__awards" aria-label="Recognition">
                      {awards.map((award) => (
                        <li key={award.title}>
                          <span className="experience__award-star" aria-hidden="true">
                            ★
                          </span>
                          <span>
                            {award.title}
                            <span className="experience__award-event">
                              {award.event} · {award.year}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags?.length > 0 && (
                    <ul className="experience__tags" aria-label="Skills used">
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}

                  {quotes.map((quote) => (
                    <Testimonial item={quote} key={quote.name + quote.company} />
                  ))}
                </article>
              </li>
            );
          })}
        </ol>

        {otherRecognition.length > 0 && (
          <div className="experience__also">
            <p className="experience__also-label">also recognized</p>
            <ul className="experience__also-list">
              {otherRecognition.map((item) => (
                <li key={item.title}>
                  <span className="experience__also-star" aria-hidden="true">
                    ★
                  </span>
                  <span>
                    {item.title}
                    <span className="experience__award-year"> · {item.year}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
