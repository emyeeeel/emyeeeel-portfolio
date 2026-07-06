import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import "./WorkRow.css";

function WorkRow({ project, onPeekStart, onPeekEnd, revealTitle = false }) {
  const isAiMl = project.tag === "ai / ml";

  return (
    <li className="work-row">
      <Link
        to={`/work/${project.slug}`}
        className="work-row__header"
        onMouseEnter={onPeekStart ? () => onPeekStart(project) : undefined}
        onMouseLeave={onPeekEnd}
      >
        <span className="work-row__index">{project.index}</span>
        {revealTitle ? (
          <Reveal as="span" className="work-row__title">
            {project.title}
          </Reveal>
        ) : (
          <span className="work-row__title">{project.title}</span>
        )}
        <span
          className={
            isAiMl ? "work-row__tag work-row__tag--ai" : "work-row__tag"
          }
        >
          {project.tag}
        </span>
      </Link>
    </li>
  );
}

export default WorkRow;
