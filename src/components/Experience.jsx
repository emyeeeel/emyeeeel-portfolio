import experience from "../data/experience.js";
import Reveal from "./Reveal.jsx";
import "./Experience.css";

function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="wrap">
        <Reveal as="p" className="section-label experience__label">
          03 / experience
        </Reveal>
        <ul className="experience__list">
          {experience.map((job) => (
            <li className="experience__row" key={job.role}>
              <p className="experience__role">
                {job.role}
                <span className="experience__detail"> — {job.detail}</span>
              </p>
              <p className="experience__dates">{job.dates}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Experience;
