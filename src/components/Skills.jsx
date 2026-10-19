import { useEffect, useLayoutEffect, useRef, useState } from "react";
import skillGroups from "../data/skills.js";
import stackIcons from "../data/stackIcons.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import Reveal from "./Reveal.jsx";
import "./Skills.css";

// Tools that get their logo in the chip (keys in stackIcons.js); the rest
// get a monogram of their first letter.
const ITEM_ICONS = {
  Python: "python",
  "Python scripting": "python",
  React: "react",
  Django: "django",
  n8n: "n8n",
  "Make.com": "make",
  "HubSpot workflows": "hubspot",
  "HubSpot CRM": "hubspot",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
};

function ChipMark({ name }) {
  const mark = stackIcons[ITEM_ICONS[name]];
  if (!mark) {
    return (
      <span className="skills__chip-mono" aria-hidden="true">
        {name.replace(/[^A-Za-z]/g, "").charAt(0)}
      </span>
    );
  }
  return (
    <span className="skills__chip-logo" style={{ "--brand": mark.color }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d={mark.path} />
      </svg>
    </span>
  );
}

// Types `text` out a character at a time whenever it changes.
function useTyped(text, enabled) {
  const [count, setCount] = useState(text.length);
  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [text, enabled]);
  return text.slice(0, count);
}

// Every skill in one terminal window, one tab per category. Switching tabs
// slides the lime indicator across, types the `ls` command out and pops
// the tools in as chips.
function Skills() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const group = skillGroups[active];
  const command = `ls ~/stack/${group.key}`;
  const typed = useTyped(command, !reducedMotion);

  // Keep the indicator under the active tab, and the tab in view inside the
  // (sideways-scrolling) tab strip on small screens. Only the strip
  // scrolls, never the page.
  useLayoutEffect(() => {
    function place() {
      const tab = tabRefs.current[active];
      if (!tab) return;
      setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    }
    place();
    const tab = tabRefs.current[active];
    const strip = tab?.parentElement;
    if (tab && strip) {
      const left = tab.offsetLeft;
      const right = left + tab.offsetWidth;
      if (left < strip.scrollLeft) strip.scrollLeft = left - 8;
      else if (right > strip.scrollLeft + strip.clientWidth) {
        strip.scrollLeft = right - strip.clientWidth + 8;
      }
    }
    window.addEventListener("resize", place);
    document.fonts?.ready?.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Arrow keys move between tabs, as in a standard tab list.
  function onTabKeyDown(event) {
    const last = skillGroups.length - 1;
    let next = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="wrap">
        <div className="skills__header">
          <p className="section-label skills__label">02 / skills &amp; tools</p>
          <Reveal as="h2" className="skills__heading" id="skills-heading">
            What I build <span className="skills__heading-accent">with</span>.
          </Reveal>
        </div>

        <div className="skills__stage">
          <div className="skills__term">
            <div className="skills__term-bar">
              <span className="skills__term-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <div className="skills__tabs" role="tablist" aria-label="Skill categories">
                <span
                  className="skills__tab-indicator"
                  style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
                  aria-hidden="true"
                />
                {skillGroups.map((g, i) => (
                  <button
                    key={g.key}
                    type="button"
                    role="tab"
                    id={`skills-tab-${g.key}`}
                    aria-selected={i === active}
                    aria-controls="skills-panel"
                    tabIndex={i === active ? 0 : -1}
                    className={`skills__tab${i === active ? " is-active" : ""}`}
                    onClick={() => setActive(i)}
                    onKeyDown={onTabKeyDown}
                    ref={(node) => {
                      tabRefs.current[i] = node;
                    }}
                  >
                    {g.key}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="skills__panel"
              role="tabpanel"
              id="skills-panel"
              aria-labelledby={`skills-tab-${group.key}`}
            >
              <div className="skills__panel-head">
                <p className="skills__cmd" aria-hidden="true">
                  <span className="skills__cmd-mark">&gt;</span> {typed}
                  <span className="skills__caret" />
                </p>
                <h3 className="skills__group-title" key={`t-${group.key}`}>
                  {group.label}
                </h3>
                {group.caption && (
                  <p className="skills__comment" key={`c-${group.key}`}>
                    # {group.caption}
                  </p>
                )}
              </div>

              <ul className="skills__chips" key={group.key}>
                {group.items.map((item, i) => (
                  <li className="skills__chip" key={item} style={{ "--i": i }}>
                    <ChipMark name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* a status bar, like an editor's */}
            <div className="skills__status" aria-hidden="true">
              <span className="skills__status-item skills__status-item--live">
                <i /> ready
              </span>
              <span className="skills__status-item">~/stack/{group.key}</span>
              <span className="skills__status-item skills__status-hint">← → to switch tabs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
