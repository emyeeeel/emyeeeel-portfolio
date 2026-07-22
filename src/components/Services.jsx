import { useState } from "react";
import { Link } from "react-router-dom";
import services from "../data/services.js";
import projects from "../data/projects.js";
import MediaPeek from "./MediaPeek.jsx";
import Reveal from "./Reveal.jsx";
import "./Services.css";

function Services() {
  const [peeked, setPeeked] = useState(null);

  return (
    <section id="services" className="services-section">
      <div className="wrap">
        <Reveal as="p" className="section-label services__label">
          01 / services
        </Reveal>
        <ul className="services__list">
          {services.map((service) => {
            const project = projects.find((p) =>
              service.projectTags.includes(p.tag),
            );
            return (
              <li className="service-row" key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="service-row__header"
                  onMouseEnter={project ? () => setPeeked(project) : undefined}
                  onMouseLeave={() => setPeeked(null)}
                >
                  <span className="service-row__index">{service.index}</span>
                  <span className="service-row__title">{service.title}</span>
                </Link>
                <p className="service-row__value">{service.value}</p>
                <ul className="service-row__bullets">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="service-row__tools">
                  {service.tools.map((tool) => (
                    <span className="service-row__tool" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <MediaPeek project={peeked} />
    </section>
  );
}

export default Services;
