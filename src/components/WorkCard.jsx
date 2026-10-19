import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/projects.js";
import "./WorkCard.css";

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));
const MAX_STACK = 4;

// Placeholder highlights (results not yet measured) show as drafts while
// developing and are left out of production builds.
function visibleHighlights(project) {
  const items = project.highlights ?? [];
  return import.meta.env.DEV ? items : items.filter((item) => !item.placeholder);
}

// Same artwork as the home work tiles, so /work and home read as one system.
function artStyle(project) {
  if (!project.logoBg) return undefined;
  return {
    backgroundColor: project.iconBg,
    backgroundImage: `url(${project.logoBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

// One card = one link to the case study: artwork panel, then index and
// type, title, summary, a two-figure results strip and the tool stack.
function WorkCard({ project }) {
  const primary = CATEGORY_LABELS[project.category];
  const highlights = visibleHighlights(project).slice(0, 2);
  const tags = project.tags ?? [];
  const shownTags = tags.slice(0, MAX_STACK);
  const moreTags = tags.length - shownTags.length;

  return (
    <li className="project-card">
      <Link to={`/work/${project.slug}`} className="project-card__link">
        <span
          className={`project-card__art${project.logoBg || project.cardArt ? "" : " project-card__art--type"}`}
          style={project.cardArt ? undefined : artStyle(project)}
          aria-hidden="true"
        >
          {project.cardArt ? (
            <img src={project.cardArt} alt="" className="project-card__cover" loading="lazy" />
          ) : project.icon ? (
            <img src={project.icon} alt="" className="project-card__icon" />
          ) : (
            <span className="project-card__wordmark">
              <span className="project-card__wordmark-mark">&gt;</span> {project.title.toLowerCase()}
            </span>
          )}
        </span>

        <span className="project-card__body">
          <span className="project-card__meta">
            <span className="project-card__index">{project.index}</span>
            {primary && <span className="project-card__type">{primary.toLowerCase()}</span>}
            <span className="project-card__arrow" aria-hidden="true">
              →
            </span>
          </span>

          <span className="project-card__title">{project.title}</span>
          <span className="project-card__summary">{project.summary}</span>

          {highlights.length > 0 && (
            <span className="project-card__figures">
              {highlights.map((item) => (
                <span
                  className={`project-card__figure${item.placeholder ? " project-card__figure--draft" : ""}`}
                  key={item.label}
                >
                  <span className="project-card__figure-value">
                    {item.trend && (
                      <svg
                        className={`project-card__trend project-card__trend--${item.trend}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 4v15M5 12l7 7 7-7" />
                      </svg>
                    )}
                    {item.trend === "down" && <span className="visually-hidden">Down </span>}
                    {item.trend === "up" && <span className="visually-hidden">Up </span>}
                    {item.value}
                  </span>
                  <span className="project-card__figure-label">{item.label}</span>
                </span>
              ))}
            </span>
          )}

          {tags.length > 0 && (
            <span className="project-card__stack">
              <span className="visually-hidden">Built with: {tags.join(", ")}</span>
              <span aria-hidden="true">
                <span className="project-card__stack-mark">stack:</span>{" "}
                <span className="project-card__stack-short">
                  {shownTags.join(" · ")}
                  {moreTags > 0 && <span className="project-card__stack-more"> +{moreTags}</span>}
                </span>
                <span className="project-card__stack-full">{tags.join(" · ")}</span>
              </span>
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

export default WorkCard;
