import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useReducedMotion from "../hooks/useReducedMotion.js";
import allProjects from "../data/projects.js";
import "./WorkStack.css";

// Percentage geometry (of the .work-stack box) for each tile. All tiles
// start identical — full-size, exactly overlapping, with the first
// project in front — and shrink directly into their own grid slot as the
// section scrolls. Once in the grid they stay there for the rest of the
// pinned scroll, so every project's name, stage and summary is readable
// before the section releases.
//
// .work-stack keeps a fixed aspect ratio, so a tile's real shape only
// stays constant if width% === height% scale together; the stacked
// (100/100) and grid (50/50 minus half the gap) keyframes both satisfy
// that, so linear interpolation keeps each tile rigid between them.
const STACKED = { top: 0, left: 0, width: 100, height: 100 };

// Percentage points opened up between tiles as they approach their grid
// slots — eased in across the same scroll range as the resize.
const GRID_GAP = 1.6;

// Share of the pinned scroll spent moving from stacked to grid; the rest
// holds the finished grid in place.
const GRID_PHASE_END = 0.55;

function gridRect(i, count, gap) {
  const rows = Math.max(1, Math.ceil(count / 2));
  const row = Math.floor(i / 2);
  const col = i % 2;
  const height = (100 - gap * (rows - 1)) / rows;
  const width = 50 - gap / 2;
  return {
    top: row * (height + gap),
    left: col === 0 ? 0 : 50 + gap / 2,
    width,
    height,
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpRect(a, b, t) {
  return {
    top: lerp(a.top, b.top, t),
    left: lerp(a.left, b.left, t),
    width: lerp(a.width, b.width, t),
    height: lerp(a.height, b.height, t),
  };
}

// Stacking depth while the tiles still overlap: the first project sits in
// front, the last one right behind it, then everyone else in order.
function depthRank(i, count) {
  if (count <= 2) return i;
  if (i === 0) return 0;
  if (i === count - 1) return 1;
  return i + 1;
}

// Applied to the artwork panel only, so the image is never darkened by
// the caption underneath.
function tileBackground(project) {
  if (!project.logoBg) return undefined;
  return {
    backgroundColor: project.iconBg,
    backgroundImage: `url(${project.logoBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

function WorkStack({ projects }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const layerRefs = useRef([]);
  layerRefs.current = [];
  const count = projects.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Below the desktop breakpoint (and under reduced motion) the pin and
    // scroll-driven geometry are disabled in CSS (see WorkStack.css),
    // which falls back to a static grid.
    if (reducedMotion || window.innerWidth <= 900) return;

    function applyProgress(progress) {
      const t = Math.min(1, progress / GRID_PHASE_END);
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = lerpRect(STACKED, gridRect(i, count, GRID_GAP * t), t);
        el.style.top = `${rect.top}%`;
        el.style.left = `${rect.left}%`;
        el.style.width = `${rect.width}%`;
        el.style.height = `${rect.height}%`;
        el.style.setProperty("--tile-progress", t.toFixed(3));
      });
    }

    let rafId = null;

    function updateProgress() {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);
      const raw = -rect.top / scrollable;
      applyProgress(Math.min(1, Math.max(0, raw)));
    }

    function onScroll() {
      if (rafId == null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
      // Clear inline geometry so the CSS fallback grid can take over.
      layerRefs.current.forEach((el) => {
        if (!el) return;
        ["top", "left", "width", "height", "--tile-progress"].forEach((prop) =>
          el.style.removeProperty(prop),
        );
      });
    };
  }, [reducedMotion, count]);

  // Keyboard users can tab into tiles that are still stacked behind the
  // front one; jump the pinned scroll to the finished grid so the focused
  // tile (and its focus ring) is actually visible.
  function revealGrid() {
    const section = sectionRef.current;
    if (!section || reducedMotion || window.innerWidth <= 900) return;
    const rect = section.getBoundingClientRect();
    const scrollable = Math.max(rect.height - window.innerHeight, 1);
    const progress = -rect.top / scrollable;
    if (progress >= GRID_PHASE_END) return;
    const sectionTop = rect.top + window.scrollY;
    window.scrollTo({ top: sectionTop + scrollable * GRID_PHASE_END, behavior: "auto" });
  }

  return (
    <section
      id="work"
      className="work-stack-section"
      ref={sectionRef}
      aria-labelledby="work-heading"
    >
      <div className="work-stack-sticky">
        <div className="wrap work-stack-inner">
          <div className="work-stack__header">
            <h2 className="section-label work-stack__label" id="work-heading">
              01 / selected work
            </h2>
          </div>

          <ul className="work-stack">
            {projects.map((project, i) => (
              <li
                key={project.slug}
                className={`work-stack__layer${project.logoBg ? "" : " work-stack__layer--type"}`}
                ref={(node) => {
                  layerRefs.current[i] = node;
                }}
                style={{ zIndex: count - depthRank(i, count) }}
              >
                <Link
                  to={`/work/${project.slug}`}
                  className="work-stack__link"
                  onFocus={revealGrid}
                >
                  <span className="work-stack__art" style={tileBackground(project)}>
                    {project.icon ? (
                      <img
                        src={project.icon}
                        alt=""
                        className="work-stack__icon"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="work-stack__wordmark" aria-hidden="true">
                        <span className="work-stack__wordmark-mark">&gt;</span>{" "}
                        {project.title.toLowerCase()}
                      </span>
                    )}
                  </span>

                  <span className="work-stack__caption">
                    <span className="work-stack__title">{project.title}</span>
                    <span className="work-stack__tagline">{project.tagline}</span>
                    <span className="work-stack__cta" aria-hidden="true">
                      read case study →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* How much of the work is on show, then the way to the rest —
              the same outline pill as the hero's "let's connect". */}
          <div className="work-stack__footer">
            <p className="work-stack__count">
              <span className="work-stack__count-mark" aria-hidden="true">
                &gt;
              </span>{" "}
              showing {projects.length} of {allProjects.length} projects
            </p>
            <Link to="/work" className="work-stack__all">
              view all projects
              <span className="work-stack__all-icon" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkStack;
