import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { CATEGORIES } from "../data/projects.js";
import "./WorkRow.css";

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));

function WorkRow({ project, onPeekStart, onPeekEnd, revealTitle = false }) {
  const primary = CATEGORY_LABELS[project.category];

  return (
    <li className="work-row">
      <Link
        to={`/work/${project.slug}`}
        className="work-row__header"
        onMouseEnter={onPeekStart ? () => onPeekStart(project) : undefined}
        onMouseLeave={onPeekEnd}
      >
        <span className="work-row__index">{project.index}</span>
        <span className="work-row__main">
          {revealTitle ? (
            <Reveal as="span" className="work-row__title">
              {project.title}
            </Reveal>
          ) : (
            <span className="work-row__title">{project.title}</span>
          )}
          <span className="work-row__summary">{project.summary}</span>
          {(primary || project.tags?.length > 0) && (
            <span className="work-row__tags">
              {primary && (
                <span className="work-row__tag work-row__tag--primary">{primary}</span>
              )}
              {project.tags?.map((tag) => (
                <span className="work-row__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          )}
        </span>
        <span className="work-row__side">
          <span className="work-row__cta" aria-hidden="true">
            case study →
          </span>
        </span>
      </Link>
    </li>
  );
}

export default WorkRow;
