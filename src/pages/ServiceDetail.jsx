import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import services from "../data/services.js";
import projects from "../data/projects.js";
import WorkRow from "../components/WorkRow.jsx";
import MediaPeek from "../components/MediaPeek.jsx";
import Reveal from "../components/Reveal.jsx";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [peeked, setPeeked] = useState(null);

  useEffect(() => {
    if (service) {
      document.title = `emyeeeel — ${service.title}`;
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const relatedProjects = projects.filter((p) =>
    service.projectTags.includes(p.tag),
  );

  return (
    <article className="service-detail" key={service.slug}>
      <div className="wrap">
        <Link to="/#services" className="service-detail__back">
          ← services
        </Link>

        <Reveal as="h1" className="service-detail__title">
          {service.title}
        </Reveal>
        <p className="service-detail__subtitle">{service.value}</p>

        <ul className="service-detail__bullets">
          {service.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <div className="service-detail__tools">
          {service.tools.map((tool) => (
            <span className="service-detail__tool" key={tool}>
              {tool}
            </span>
          ))}
        </div>

        <section className="service-detail__section">
          <Reveal as="p" className="service-detail__section-label">
            related work
          </Reveal>

          {relatedProjects.length > 0 ? (
            <ul className="service-detail__work-list">
              {relatedProjects.map((project) => (
                <WorkRow
                  key={project.slug}
                  project={project}
                  onPeekStart={setPeeked}
                  onPeekEnd={() => setPeeked(null)}
                />
              ))}
            </ul>
          ) : (
            <p className="service-detail__todo">
              Case studies coming soon — in the meantime,{" "}
              <a href="#contact">get in touch</a> to talk through this kind of
              work directly.
            </p>
          )}
        </section>
      </div>
      <MediaPeek project={peeked} />
    </article>
  );
}

export default ServiceDetail;
