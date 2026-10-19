import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useReducedMotion from "../hooks/useReducedMotion.js";
import allProjects from "../data/projects.js";
import Reveal from "./Reveal.jsx";
import "./WorkStack.css";

const MAX_STACK = 4;

// The project's headline figures, minus any drafts in production builds.
function figuresFor(project) {
  const items = project.highlights ?? [];
  return (import.meta.env.DEV ? items : items.filter((item) => !item.placeholder)).slice(0, 2);
}

function TrendArrow({ trend }) {
  return (
    <>
      <svg
        className={`work-file__trend work-file__trend--${trend}`}
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
      <span className="visually-hidden">{trend === "down" ? "Down " : "Up "}</span>
    </>
  );
}

// The artwork tile: the card image if there is one, otherwise the logo on
// its brand background, otherwise a typed wordmark.
function Artwork({ project }) {
  if (project.cardArt) {
    return (
      <span className="work-file__art">
        <img src={project.cardArt} alt="" className="work-file__cover" loading="lazy" />
      </span>
    );
  }
  if (project.logoBg) {
    return (
      <span
        className="work-file__art"
        style={{
          backgroundColor: project.iconBg,
          backgroundImage: `url(${project.logoBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {project.icon && <img src={project.icon} alt="" className="work-file__icon" />}
      </span>
    );
  }
  return (
    <span className="work-file__art work-file__art--type">
      <span className="work-file__wordmark">
        <span className="work-file__wordmark-mark">&gt;</span> {project.title.toLowerCase()}
      </span>
    </span>
  );
}

// One featured project as a small terminal window: a title bar with its
// path, the artwork as a cover with the title and summary over its lower
// part, a readout of its two headline figures, and its stack as a
// command line.
function WorkFile({ project }) {
  const figures = figuresFor(project);
  const tags = project.tags ?? [];
  const shown = tags.slice(0, MAX_STACK);
  const more = tags.length - shown.length;

  return (
    <li className="work-file">
      <article className="work-file__card" aria-labelledby={`work-file-${project.slug}`}>
        <div className="work-file__bar">
          <span className="work-file__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="work-file__path" aria-hidden="true">
            ~/work/{project.slug}
          </span>
        </div>

        <div className="work-file__body">
          <Artwork project={project} />
          <div className="work-file__text">
            <h3 className="work-file__title" id={`work-file-${project.slug}`}>
              {project.title}
            </h3>
            <p className="work-file__summary">{project.summary}</p>
          </div>
        </div>

        {figures.length > 0 && (
          <div className="work-file__readout">
            {figures.map((item) => (
              <span
                className={`work-file__figure${item.placeholder ? " work-file__figure--draft" : ""}`}
                key={item.label}
              >
                <span className="work-file__figure-value">
                  {item.trend && <TrendArrow trend={item.trend} />}
                  {item.value}
                </span>
                <span className="work-file__figure-label">{item.label}</span>
              </span>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <p className="work-file__stack">
            <span className="visually-hidden">Built with: {tags.join(", ")}</span>
            <span aria-hidden="true">
              <span className="work-file__stack-mark">$ stack</span> {shown.join(" · ")}
              {more > 0 && <span className="work-file__stack-more"> +{more}</span>}
            </span>
          </p>
        )}
      </article>
    </li>
  );
}

// Home "selected work": the featured projects as terminal-window cards,
// two per row. They rise in one after another the first time the grid
// scrolls into view.
function WorkStack({ projects }) {
  const reducedMotion = useReducedMotion();
  const gridRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setShown(true);
      return;
    }
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="work" className="work-home" aria-labelledby="work-heading">
      <div className="wrap">
        <div className="work-home__header">
          <p className="section-label work-home__label">01 / selected work</p>
          <Reveal as="h2" className="work-home__heading" id="work-heading">
            Things that took hours, now take{" "}
            <span className="work-home__heading-accent">minutes</span>.
          </Reveal>
        </div>

        <ul ref={gridRef} className={`work-home__grid${shown ? " is-shown" : ""}`}>
          {projects.map((project) => (
            <WorkFile key={project.slug} project={project} />
          ))}
        </ul>

        {/* How much of the work is on show, then the way to the rest. */}
        <div className="work-home__footer">
          <p className="work-home__count">
            <span className="work-home__count-mark" aria-hidden="true">
              &gt;
            </span>{" "}
            showing {projects.length} of {allProjects.length} projects
          </p>
          <Link to="/work" className="work-home__all">
            view all projects
            <span className="work-home__all-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WorkStack;
