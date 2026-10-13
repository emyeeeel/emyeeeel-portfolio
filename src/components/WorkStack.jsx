import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./WorkStack.css";

// Percentage geometry (of the .work-stack box) for each tile. All four
// start identical — full-size, exactly overlapping — and shrink
// directly to their own grid quadrant first, then continue on into two
// stacked pairs that hand off into the next section (see pairedRect
// below). Tile index maps 1:1 to project index throughout the grid
// phase — no intermediate "one bigger than the rest" shape, so there's
// never a moment where the tiles' sizes disagree with each other or
// leave uneven gaps.
//
// .work-stack is a fixed 16:9 box, so a tile's *real* aspect ratio only
// stays constant if width% === height% at every keyframe (both
// dimensions scale by the same factor as the container). Every tile is
// always the same size as every other tile through the stacked -> grid
// phase, and both the start (100/100) and end (50/50, minus half the
// gap) keyframes satisfy that, so linear interpolation keeps it true
// at every point in between too — each tile's shape stays rigid (just
// resizing/moving, never warping) the entire way from stacked to grid.
const STACKED = [0, 1, 2, 3].map(() => ({ top: 0, left: 0, width: 100, height: 100 }));

// Percentage points opened up between tiles as they approach their
// grid slots — eased in across the same scroll range as the resize,
// rather than appearing abruptly once they arrive.
const GRID_GAP = 1.6;

function gridRect(i, gap) {
  const row = i < 2 ? 0 : 1;
  const col = i % 2;
  return {
    top: row === 0 ? 0 : 50 + gap / 2,
    left: col === 0 ? 0 : 50 + gap / 2,
    width: 50 - gap / 2,
    height: 50 - gap / 2,
  };
}

// Part 1 of the ending transition: project 0 (1st) travels all the way
// down to project 2's (3rd's) grid slot, landing exactly on top of it
// — same position, same size, no resizing. Project 3 (4th) travels up
// to project 1's (2nd's) slot the same way. Projects 1 and 2 don't
// move at all. depthRank already gives project 0 a higher z-index than
// project 2, and project 3 a higher z-index than project 1, so the
// traveling card naturally ends up "above" (in front of) the one it
// lands on with no z-index changes needed — and since nothing targets
// the vacated top-left/bottom-right slots anymore, they're simply
// left empty.
const PART_1_TARGET_SLOT = { 0: 2, 1: 1, 2: 2, 3: 1 };

function pairedRect(i, gap) {
  return gridRect(PART_1_TARGET_SLOT[i], gap);
}

// Part 2: the two pairs (project 0+2, still low from part 1; project
// 1+3, still high) slide horizontally until they meet at the section's
// horizontal center — same width/height/top as wherever part 1 left
// them, only `left` changes, so both pairs land on the exact same
// centered x-position and converge into one top-over-bottom stack.
function centeredRect(i, gap) {
  const base = pairedRect(i, gap);
  return { ...base, left: (100 - base.width) / 2 };
}

// Part 3: group 1 (project 0+2, currently low) and group 2 (project
// 1+3, currently high) keep closing in on each other, this time
// vertically, until they fully overlap at the container's exact
// center — only `top` changes from wherever part 2 left them. project
// 0 already carries the single highest z-index of all four (see
// depthRank), so once every tile shares the same spot, group 1 is
// naturally what's left visible on top of group 2.
function mergedRect(i, gap) {
  const base = centeredRect(i, gap);
  return { ...base, top: (100 - base.height) / 2 };
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

// Each project's *position* (which grid slot it animates into) always
// matches its plain data order — index 0 is top-left, etc. Stacking
// *depth* (z-index, which only matters early on while the boxes still
// overlap) is a separate order: the last project sits right behind
// the front one, then everyone else trails in behind that, in their
// normal order.
function depthRank(i, count) {
  if (count <= 2) return i;
  if (i === 0) return 0;
  if (i === count - 1) return 1;
  return i + 1;
}

function WorkStack({ projects }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const layerRefs = useRef([]);
  layerRefs.current = [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Below the desktop breakpoint (and under reduced motion) the pin
    // and scroll-driven geometry are disabled entirely in CSS (see
    // WorkStack.css), which falls back to a static grid — so there's
    // nothing for this scroll math to do.
    if (reducedMotion || window.innerWidth <= 900) return;

    // Scroll is split into five phases: stacked -> grid, part 1 (grid
    // -> paired, see PART_1_TARGET_SLOT), part 2 (paired -> centered,
    // see centeredRect), part 3 (centered -> merged, see mergedRect),
    // then part 4 zooms the merged stack back out to full-size (the
    // same STACKED rect the whole thing started from) so the topmost
    // card fills the section as the pin releases.
    const GRID_PHASE_END = 0.35;
    const PART_1_PHASE_END = 0.55;
    const PART_2_PHASE_END = 0.7;
    const PART_3_PHASE_END = 0.85;

    function applyProgress(progress) {
      layerRefs.current.forEach((el, i) => {
        if (!el) return;

        let rect;
        if (progress <= GRID_PHASE_END) {
          const t = progress / GRID_PHASE_END;
          rect = lerpRect(STACKED[i], gridRect(i, GRID_GAP * t), t);
        } else if (progress <= PART_1_PHASE_END) {
          const t = (progress - GRID_PHASE_END) / (PART_1_PHASE_END - GRID_PHASE_END);
          rect = lerpRect(gridRect(i, GRID_GAP), pairedRect(i, GRID_GAP), t);
        } else if (progress <= PART_2_PHASE_END) {
          const t = (progress - PART_1_PHASE_END) / (PART_2_PHASE_END - PART_1_PHASE_END);
          rect = lerpRect(pairedRect(i, GRID_GAP), centeredRect(i, GRID_GAP), t);
        } else if (progress <= PART_3_PHASE_END) {
          const t = (progress - PART_2_PHASE_END) / (PART_3_PHASE_END - PART_2_PHASE_END);
          rect = lerpRect(centeredRect(i, GRID_GAP), mergedRect(i, GRID_GAP), t);
        } else {
          const t = (progress - PART_3_PHASE_END) / (1 - PART_3_PHASE_END);
          rect = lerpRect(mergedRect(i, GRID_GAP), STACKED[i], t);
        }

        el.style.top = `${rect.top}%`;
        el.style.left = `${rect.left}%`;
        el.style.width = `${rect.width}%`;
        el.style.height = `${rect.height}%`;
      });
    }

    let rafId = null;

    function updateProgress() {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(rect.height - vh, 1);
      const raw = -rect.top / scrollable;
      const progress = Math.min(1, Math.max(0, raw));
      applyProgress(progress);
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
    };
  }, [reducedMotion]);

  return (
    <section id="work" className="work-stack-section" ref={sectionRef}>
      <div className="work-stack-sticky">
        <div className="wrap work-stack-inner">
          <div className="work-stack">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className="work-stack__layer"
                ref={(node) => {
                  layerRefs.current[i] = node;
                }}
                style={{
                  zIndex: projects.length - depthRank(i, projects.length),
                  backgroundImage: `url(${project.logoBg}), linear-gradient(160deg, #1c1c22, #0a0a0d)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={project.project_logo_icon}
                  alt={project.title}
                  className="work-stack__icon"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkStack;
