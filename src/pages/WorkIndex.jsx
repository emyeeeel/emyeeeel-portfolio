import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import projects, { CATEGORIES, inCategory } from "../data/projects.js";
import WorkCard from "../components/WorkCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "../components/WorkIndex.css";
import "./WorkIndex.css";

function WorkIndexPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  // ?tag=React — set by the home skills & tools chips.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  useEffect(() => {
    document.title = "emyeeeel — work";
  }, []);

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          inCategory(project, activeCategory) &&
          (!activeTag || project.tags?.includes(activeTag)),
      ),
    [activeCategory, activeTag],
  );

  function clearTag() {
    setSearchParams({}, { replace: true });
  }

  // A filter with nothing behind it is a dead end, so only show
  // categories that currently have at least one project.
  const visibleCategories = CATEGORIES.filter(
    (category) =>
      category.key === "all" || projects.some((project) => inCategory(project, category.key)),
  );

  return (
    <section className="work work-page" aria-labelledby="work-page-heading">
      <div className="wrap">
        <Reveal as="p" className="section-label work__label">
          all work
        </Reveal>
        <h1 className="work-page__title" id="work-page-heading">
          Projects, and where each one actually stands.
        </h1>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {visibleCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              className={`work-filters__pill work-filters__pill--${category.key}${
                activeCategory === category.key ? " work-filters__pill--active" : ""
              }`}
              aria-pressed={activeCategory === category.key}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {activeTag && (
          <p className="work-tag-filter" role="status">
            <span>
              Showing projects using <b>{activeTag}</b> ({filtered.length})
            </span>
            <button type="button" className="work-tag-filter__clear" onClick={clearTag}>
              clear ✕
            </button>
          </p>
        )}

        {filtered.length === 0 && (
          <p className="work-empty">
            No projects match both filters yet. Try{" "}
            <button
              type="button"
              className="work-empty__reset"
              onClick={() => {
                setActiveCategory("all");
                clearTag();
              }}
            >
              showing everything
            </button>
            .
          </p>
        )}

        <ul className="work-grid work__list" key={`${activeCategory}-${activeTag ?? ""}`}>
          {filtered.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WorkIndexPage;
