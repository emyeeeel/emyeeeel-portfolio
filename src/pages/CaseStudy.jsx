import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import projects, { CATEGORIES } from "../data/projects.js";
import Reveal from "../components/Reveal.jsx";
import Walkthrough from "../components/Walkthrough.jsx";
import ScreenTour from "../components/ScreenTour.jsx";
import Lightbox from "../components/Lightbox.jsx";
import CaseTemplate from "../components/CaseTemplate.jsx";
import "./CaseStudy.css";

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));

const EVIDENCE_LABELS = {
  milestone: "milestone",
  "controlled test": "test result",
  recognition: "recognition",
  implemented: "built",
  estimate: "estimate",
  projection: "projection",
  simulation: "simulation",
  measured: "measured",
};

const FACT_LABELS = [
  { key: "role", label: "role" },
  { key: "stack", label: "stack" },
  { key: "timeline", label: "timeline" },
  { key: "stage", label: "stage" },
];

const GLANCE = [
  { key: "problem", label: "the problem" },
  { key: "built", label: "what I built" },
  { key: "result", label: "the result" },
];

// Highlights the contents entry for the section currently in view.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

// The visual block under the glance row: a screen tour when the project
// has screenshots, otherwise a photo gallery (cover first).
function Showcase({ project, onZoom }) {
  const tourSteps = project.demo?.steps?.filter((step) => step.image) ?? [];
  if (project.demo?.kind === "walkthrough" && tourSteps.length) {
    return <ScreenTour intro={project.demo.intro} steps={tourSteps} />;
  }

  const media = project.demo?.kind === "media" ? [...project.demo.items] : [];
  if (project.cover && !media.some((item) => item.src === project.cover.src)) {
    media.unshift({ ...project.cover, caption: null });
  }
  if (!media.length) return null;

  return (
    // "stack": one image per row at its own proportions, for wide screenshots.
    <div
      className={`case__gallery case__gallery--${
        project.demo?.layout === "stack" ? "stack" : Math.min(media.length, 3)
      }`}
    >
      {media.map((item) => (
        <figure className="case__gallery-item" key={item.src}>
          <button
            type="button"
            className="case__gallery-btn"
            onClick={() => onZoom(item)}
            aria-label={`Enlarge image: ${item.alt}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
          </button>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function buildSections(project) {
  // Sections render only when their content exists — no empty headings.
  const sections = [];

  if (project.overview) {
    sections.push({
      id: "overview",
      label: "overview",
      content: <p className="case__lead">{project.overview}</p>,
    });
  }

  if (project.problem || project.users) {
    sections.push({
      id: "problem",
      label: "the problem",
      content: (
        <div className="case__split">
          {project.problem && <p className="case__text">{project.problem}</p>}
          {project.users && (
            <aside className="case__note-card">
              <span className="case__mini-label">who it&rsquo;s for</span>
              <p>{project.users}</p>
            </aside>
          )}
        </div>
      ),
    });
  }

  if (project.contribution || project.scope) {
    sections.push({
      id: "contribution",
      label: project.contribution ? "my contribution" : "scope",
      content: (
        <>
          {project.contribution?.text && <p className="case__text">{project.contribution.text}</p>}
          {project.contribution?.items && (
            <ul className="case__checklist">
              {project.contribution.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {project.scope && (
            <div className="case__scope">
              <p className="case__text">{project.scope.intro}</p>
              <ul className="case__chips">
                {project.scope.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ),
    });
  }

  if (project.decisions?.length) {
    sections.push({
      id: "decisions",
      label: project.decisionsLabel ?? "key decisions",
      content: (
        <ol className="case__decisions">
          {project.decisions.map((decision, i) => (
            <li className="case__decision" key={decision.title}>
              <span className="case__decision-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="case__decision-title">{decision.title.replace(/^\d+\.\s*/, "")}</h3>
              <p className="case__decision-body">{decision.body}</p>
            </li>
          ))}
        </ol>
      ),
    });
  }

  // A walkthrough without screenshots is still told, as text steps.
  const hasTourImages = project.demo?.steps?.some((step) => step.image);
  if (project.demo?.kind === "walkthrough" && !hasTourImages) {
    sections.push({
      id: "walkthrough",
      label: "walkthrough",
      content: <Walkthrough intro={project.demo.intro} steps={project.demo.steps} />,
    });
  }

  if (project.evidence?.length) {
    sections.push({
      id: "results",
      label: "results",
      content: (
        <>
          <ul className="case__evidence">
            {project.evidence.map((item) => (
              <li
                className={`case__evidence-card case__evidence-card--${item.kind.replace(/\s+/g, "-")}`}
                key={item.text}
              >
                <span className="case__mini-label">{EVIDENCE_LABELS[item.kind] ?? item.kind}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          {project.evidenceNote && <p className="case__footnote">{project.evidenceNote}</p>}
        </>
      ),
    });
  }

  if (project.limitations || project.nextSteps) {
    sections.push({
      id: "limits",
      label: "limitations & next steps",
      content: (
        <div className="case__callout">
          {project.limitations && <p>{project.limitations}</p>}
          {project.nextSteps && <p className="case__callout-next">{project.nextSteps}</p>}
        </div>
      ),
    });
  }

  return sections;
}

function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const nextProject = project ? projects.find((p) => p.slug === project.next) : null;
  const [zoomed, setZoomed] = useState(null);
  const sections = project ? buildSections(project) : [];
  const activeSection = useActiveSection(sections.map((s) => s.id));

  useEffect(() => {
    if (project) document.title = `emyeeeel — ${project.title}`;
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;
  // Projects moved to the template render there; the rest keep this layout.
  if (project.story) return <CaseTemplate project={project} nextProject={nextProject} />;

  const facts = { ...project.facts, stage: project.stage };
  // Primary category first, then any it's also listed under.
  const types = [project.category, ...(project.alsoIn ?? [])].filter((key) => CATEGORY_LABELS[key]);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <article className="case" key={project.slug}>
      <div className="wrap">
        <Link to="/work" className="case__back">
          ← all work
        </Link>

        {/* -------- header -------- */}
        <header className="case__header">
          <p className="case__index">
            {project.index}
            {types.map((key) => (
              <span className={`case__type case__type--${key}`} key={key}>
                {CATEGORY_LABELS[key].toLowerCase()}
              </span>
            ))}
          </p>
          <Reveal as="h1" className="case__title">
            {project.title}
          </Reveal>
          <p className="case__subtitle">{project.subtitle}</p>

          <dl className="case__facts">
            {FACT_LABELS.filter(({ key }) => facts[key]).map(({ key, label }) => (
              <div className="case__fact" key={key}>
                <dt>{label}</dt>
                <dd>{facts[key]}</dd>
              </div>
            ))}
          </dl>

          {project.links?.length > 0 && (
            <div className="case__links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case__link"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        {/* -------- at a glance -------- */}
        {project.glance && (
          <ul className="case__glance" aria-label="At a glance">
            {GLANCE.filter(({ key }) => project.glance[key]).map(({ key, label }) => (
              <li className={`case__glance-card case__glance-card--${key}`} key={key}>
                <span className="case__mini-label">{label}</span>
                <p>{project.glance[key]}</p>
              </li>
            ))}
          </ul>
        )}

        {/* -------- visuals -------- */}
        <div className="case__showcase">
          <Showcase project={project} onZoom={setZoomed} />
        </div>

        {/* -------- detail: contents + sections -------- */}
        <div className="case__body">
          <nav className="case__toc" aria-label="On this page">
            <p className="case__toc-label">on this page</p>
            <ol>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={activeSection === section.id ? "is-active" : undefined}
                    aria-current={activeSection === section.id ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({ block: "start" });
                    }}
                  >
                    <span>{pad(i + 1)}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case__sections">
            {sections.map((section, i) => (
              <section
                className="case__section"
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-label`}
              >
                <h2 className="case__section-label" id={`${section.id}-label`}>
                  <span>{pad(i + 1)}</span> / {section.label}
                </h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>

        {nextProject && (
          <Link to={`/work/${nextProject.slug}`} className="case__next">
            <span className="case__next-label">next project</span>
            <span className="case__next-title">
              {nextProject.title} <span className="case__next-arrow">→</span>
            </span>
          </Link>
        )}
      </div>

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </article>
  );
}

export default CaseStudy;
