import { useEffect, useMemo, useState } from "react";
import projects from "../data/projects.js";
import WorkRow from "../components/WorkRow.jsx";
import MediaPeek from "../components/MediaPeek.jsx";
import Reveal from "../components/Reveal.jsx";
import "../components/WorkIndex.css";
import "./WorkIndex.css";

const FILTERS = [
  { key: "all", label: "all" },
  { key: "ai / ml", label: "ai / ml" },
  { key: "fullstack", label: "fullstack" },
];

function WorkIndexPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [peeked, setPeeked] = useState(null);

  useEffect(() => {
    document.title = "emyeeeel — work";
  }, []);

  const filtered = useMemo(
    () =>
      activeTag === "all"
        ? projects
        : projects.filter((project) => project.tag === activeTag),
    [activeTag],
  );

  return (
    <section className="work work-page">
      <div className="wrap">
        <Reveal as="p" className="section-label work__label">
          01 / all work
        </Reveal>

        <div className="work-filters" role="group" aria-label="Filter by tag">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={
                activeTag === filter.key
                  ? "work-filters__pill work-filters__pill--active"
                  : "work-filters__pill"
              }
              aria-pressed={activeTag === filter.key}
              onClick={() => setActiveTag(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <ul className="work__list" key={activeTag}>
          {filtered.map((project) => (
            <WorkRow
              key={project.slug}
              project={project}
              onPeekStart={setPeeked}
              onPeekEnd={() => setPeeked(null)}
              revealTitle
            />
          ))}
        </ul>
      </div>
      <MediaPeek project={peeked} />
    </section>
  );
}

export default WorkIndexPage;
