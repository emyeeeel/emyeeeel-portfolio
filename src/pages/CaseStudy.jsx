import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import projects from "../data/projects.js";
import MediaWithFallback from "../components/MediaWithFallback.jsx";
import Reveal from "../components/Reveal.jsx";
import "./CaseStudy.css";

const FACT_LABELS = [
  { key: "role", label: "role" },
  { key: "stack", label: "stack" },
  { key: "timeline", label: "timeline" },
  { key: "recognition", label: "recognition" },
];

function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const nextProject = project
    ? projects.find((p) => p.slug === project.next)
    : null;

  useEffect(() => {
    if (project) {
      document.title = `emyeeeel — ${project.title}`;
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <article className="case" key={project.slug}>
      <div className="wrap">
        <Link to="/work" className="case__back">
          ← work
        </Link>

        <Reveal as="h1" className="case__title">
          {project.title}
        </Reveal>
        <p className="case__subtitle">{project.subtitle}</p>

        <dl className="case__facts">
          {FACT_LABELS.map(({ key, label }) => (
            <div className="case__fact" key={key}>
              <dt className="case__fact-label">{label}</dt>
              <dd className="case__fact-value">{project.facts[key]}</dd>
            </div>
          ))}
        </dl>

        <MediaWithFallback
          src={project.heroMedia.src}
          alt={`${project.title} — ${project.heroMedia.label}`}
          label={project.heroMedia.label}
          className="case__hero-img"
          placeholderClassName="case__hero-placeholder"
        />

        <section className="case__section">
          <Reveal as="p" className="case__section-label">
            01 / the problem
          </Reveal>
          <p className="case__section-text">{project.problem}</p>
        </section>

        <section className="case__section">
          <Reveal as="p" className="case__section-label">
            02 / the approach
          </Reveal>
          <p className="case__section-text">{project.approach}</p>
        </section>

        <div className="case__support-media">
          {project.supportMedia.map((media) => (
            <MediaWithFallback
              key={media.src}
              src={media.src}
              alt={`${project.title} — ${media.label}`}
              label={media.label}
              className="case__support-img"
              placeholderClassName="case__support-placeholder"
            />
          ))}
        </div>

        <section className="case__section">
          <Reveal as="p" className="case__section-label">
            03 / outcome
          </Reveal>
          {project.outcome && (
            <blockquote className="case__quote">{project.outcome}</blockquote>
          )}
          {project.outcomeTodo && (
            <p className="case__todo">{project.outcomeTodo}</p>
          )}
        </section>

        {nextProject && (
          <Link to={`/work/${nextProject.slug}`} className="case__next">
            <span className="case__next-label">next project</span>
            <span className="case__next-title">
              {nextProject.title} <span className="case__next-arrow">→</span>
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default CaseStudy;
