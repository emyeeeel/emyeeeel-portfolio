import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects.js";
import WorkRow from "./WorkRow.jsx";
import MediaPeek from "./MediaPeek.jsx";
import Reveal from "./Reveal.jsx";
import "./WorkIndex.css";

function WorkIndex() {
  const [peeked, setPeeked] = useState(null);

  return (
    <section id="work" className="work">
      <div className="wrap">
        <Reveal as="p" className="section-label work__label">
          01 / selected work
        </Reveal>
        <ul className="work__list">
          {projects.map((project) => (
            <WorkRow
              key={project.slug}
              project={project}
              onPeekStart={setPeeked}
              onPeekEnd={() => setPeeked(null)}
            />
          ))}
        </ul>
        <Link to="/work" className="work__all-link">
          all work →
        </Link>
      </div>
      <MediaPeek project={peeked} />
    </section>
  );
}

export default WorkIndex;
