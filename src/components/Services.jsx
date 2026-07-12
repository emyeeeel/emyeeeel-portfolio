import services from "../data/services.js";
import Reveal from "./Reveal.jsx";
import "./Services.css";

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="wrap">
        <Reveal as="p" className="section-label services__label">
          02 / services
        </Reveal>
        <ul className="services__list">
          {services.map((service) => (
            <li className="service" key={service.title}>
              <div className="service__intro">
                <p className="service__index">{service.index}</p>
                <h3 className="service__title">{service.title}</h3>
                <p className="service__value">{service.value}</p>
              </div>
              <div className="service__detail">
                <ul className="service__bullets">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="service__tools">
                  {service.tools.map((tool) => (
                    <span className="service__tool" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
