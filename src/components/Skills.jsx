import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import skillGroups, { SKILL_ACCENTS } from "../data/skills.js";
import projects from "../data/projects.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import Reveal from "./Reveal.jsx";
import "./Skills.css";

// How many projects carry each tag — a tool with at least one project
// links to /work filtered to it; the rest are plain text. (Used only to
// decide linking; the count itself isn't shown.)
const tagCounts = projects.reduce((counts, project) => {
  project.tags?.forEach((tag) => {
    counts[tag] = (counts[tag] ?? 0) + 1;
  });
  return counts;
}, {});

// Line icons in the same 1.5px-stroke style as the services cards.
const ICON_PATHS = {
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="4" width="6" height="5" rx="1.5" />
      <rect x="15" y="15" width="6" height="5" rx="1.5" />
      <path d="M6 9v3a3 3 0 0 0 3 3h6" />
    </>
  ),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  plug: <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" />,
  check: (
    <>
      <path d="M12 3 4 6v6c0 4.4 3.4 7.8 8 9 4.6-1.2 8-4.6 8-9V6l-8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
};

function GroupIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      {ICON_PATHS[name] ?? ICON_PATHS.code}
    </svg>
  );
}

function Skills() {
  const reducedMotion = useReducedMotion();
  const gridRef = useRef(null);
  const [visible, setVisible] = useState(() => new Set());

  // Each card rises in once, when it scrolls into view — the same "reveal
  // once" behaviour as the section headings. Cards are watched one by one,
  // so cards still off-screen don't animate early.
  useEffect(() => {
    const cards = gridRef.current ? [...gridRef.current.children] : [];
    if (reducedMotion) {
      setVisible(new Set(cards.map((_, i) => i)));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const shown = entries.filter((e) => e.isIntersecting);
        if (!shown.length) return;
        setVisible((prev) => {
          const next = new Set(prev);
          shown.forEach((e) => {
            next.add(cards.indexOf(e.target));
            observer.unobserve(e.target);
          });
          return next;
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="wrap">
        <div className="skills__header">
          <div>
            <p className="section-label skills__label">02 / skills &amp; tools</p>
            <Reveal as="h2" className="skills__heading" id="skills-heading">
              What I build with.
            </Reveal>
          </div>
          <div className="skills__intro">
            <p className="skills__intro-text">
              The languages, frameworks and platforms behind the work, grouped
              the way you&rsquo;d look for them.
            </p>
            <ul className="skills__legend" aria-label="Colour key">
              {SKILL_ACCENTS.map((accent) => (
                <li className={`skills__legend-item skills--${accent.key}`} key={accent.key}>
                  {accent.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* A bento grid of small "terminal windows", one per category:
            a prompt line, then the icon, title, caption and tools. Each
            card's accent matches the /work filter colours. */}
        <ol ref={gridRef} className="skills__grid">
          {skillGroups.map((group, i) => (
            <li
              className={`skills__card skills--${group.accent}${visible.has(i) ? " is-visible" : ""}`}
              style={{ "--span": group.span, "--delay": `${(i % 3) * 70}ms` }}
              key={group.key}
            >
              <p className="skills__prompt" aria-hidden="true">
                <span className="skills__prompt-mark">&gt;</span> ls ~/stack/
                <span className="skills__prompt-dir">{group.key}</span>
                <span className="skills__prompt-num">{String(i + 1).padStart(2, "0")}</span>
              </p>
              <div className="skills__card-head">
                <span className="skills__card-icon" aria-hidden="true">
                  <GroupIcon name={group.icon} />
                </span>
                <div>
                  <h3 className="skills__card-title">{group.label}</h3>
                  {group.caption && <p className="skills__card-caption">{group.caption}</p>}
                </div>
              </div>
              <ul className="skills__items">
                {group.items.map((item) => {
                  const count = tagCounts[item];
                  return (
                    <li key={item}>
                      {count ? (
                        <Link
                          to={`/work?tag=${encodeURIComponent(item)}`}
                          className="skills__item"
                          aria-label={`${item} — see projects using it`}
                        >
                          {item}
                        </Link>
                      ) : (
                        <span className="skills__item">{item}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Skills;
