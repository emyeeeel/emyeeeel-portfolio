import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import services, { SERVICE_ALIASES } from "../data/services.js";
import projects from "../data/projects.js";
import WorkCard from "../components/WorkCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      document.title = `emyeeeel — ${service.title}`;
    }
  }, [service]);

  if (!service) {
    const alias = SERVICE_ALIASES[slug];
    return <Navigate to={alias ? `/services/${alias}` : "/#services"} replace />;
  }

  const relatedProjects = projects.filter((p) => p.services?.includes(service.slug));
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <article className="service-detail" key={service.slug}>
      <div className="wrap">
        <Link to="/#services" className="service-detail__back">
          ← services
        </Link>

        <p className="service-detail__index">service {service.index}</p>
        <Reveal as="h1" className="service-detail__title">
          {service.title}
        </Reveal>
        <p className="service-detail__need">
          <span className="service-detail__need-label">when it helps</span>
          {service.need}
        </p>
        <p className="service-detail__subtitle">{service.value}</p>

        <section className="service-detail__section" aria-labelledby="scope-heading">
          <h2 className="service-detail__section-label" id="scope-heading">
            what&rsquo;s in scope
          </h2>
          <ul className="service-detail__bullets">
            {service.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="service-detail__tools-label">tools I typically use</p>
          <ul className="service-detail__tools">
            {service.tools.map((tool) => (
              <li className="service-detail__tool" key={tool}>
                {tool}
              </li>
            ))}
          </ul>
        </section>

        <section className="service-detail__section" aria-labelledby="related-heading">
          <h2 className="service-detail__section-label" id="related-heading">
            related work
          </h2>

          {relatedProjects.length > 0 && (
            <ul className="work-grid service-detail__work-list">
              {relatedProjects.map((project) => (
                <WorkCard key={project.slug} project={project} />
              ))}
            </ul>
          )}

          {service.privateWorkNote && (
            <p className="service-detail__note">{service.privateWorkNote}</p>
          )}
        </section>

        {/* The contact form is right below the page, so a single line
            pointing to it (with this service preselected) is enough. */}
        <p className="service-detail__cta">
          <span className="service-detail__cta-mark" aria-hidden="true">
            &gt;
          </span>{" "}
          Have something like this in mind?{" "}
          <a
            href="#contact"
            className="service-detail__cta-link"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("contact:inquiry", { detail: service.slug }))
            }
          >
            tell me about it <span aria-hidden="true">↓</span>
          </a>
        </p>

        <nav className="service-detail__others" aria-label="Other services">
          {otherServices.map((other) => (
            <Link key={other.slug} to={`/services/${other.slug}`} className="service-detail__other">
              <span className="service-detail__other-index">{other.index}</span>
              {other.title} →
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}

export default ServiceDetail;
