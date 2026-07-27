import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects.js";
import WorkPreviewCard from "./WorkPreviewCard.jsx";
import "./WorkShowcase.css";

function WorkShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const marqueeText = `${projects[activeIndex].title.toUpperCase()} `.repeat(6);

  return (
    <section id="work" className="work-showcase">
      <div className="work-showcase__sticky">
        {/* <div className="work-showcase__marquee" aria-hidden="true">
          <div className="work-showcase__marquee-track">
            <span className="work-showcase__marquee-item">{marqueeText}</span>
            <span className="work-showcase__marquee-item">{marqueeText}</span>
          </div>
        </div> */}

        <div className="wrap work-showcase__inner">
          <div className="work-showcase__layout">
            <div className="work-showcase__preview-stack">
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className={`work-showcase__preview-slot${i === activeIndex ? " is-active" : ""}`}
                >
                  <WorkPreviewCard project={project} />
                </div>
              ))}
            </div>

            {/* The other featured works (everything but the currently
                active one) — clicking one makes it the highlighted work. */}
            <div className="work-showcase__options">
              {projects
                .map((project, i) => ({ project, i }))
                .filter(({ i }) => i !== activeIndex)
                .map(({ project, i }) => (
                  <button
                    key={project.slug}
                    type="button"
                    className="work-showcase__option-box"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show ${project.title}`}
                    style={{
                      backgroundImage: `url(${project.logoBg}), linear-gradient(160deg, #1c1c22, #0a0a0d)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src={project.project_logo_icon}
                      alt={project.title}
                      className="work-showcase__option-icon"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </button>
                ))}
            </div>
          </div>

          <Link to="/work" className="work-showcase__all-link">
            see all works →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WorkShowcase;
