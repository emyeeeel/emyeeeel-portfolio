import { useEffect, useState } from "react";
import HeroDevice from "./HeroDevice.jsx";
import { visibleHighlights } from "../data/highlights.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./Hero.css";

// Typed after "I'm Amiel," — each includes its own article so the
// sentence always reads correctly. Keep them to roles the work backs up.
const ROLES = ["a software developer", "an automation builder", "a data & reporting analyst"];

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 2000;

// Types each role out, holds it, deletes it, then moves to the next — the
// same prompt-and-cursor language as the logotype and the terminal.
function useTypedRole(roles, enabled) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(enabled ? 0 : roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const role = roles[roleIndex];
    let timer;

    if (!deleting && length < role.length) {
      timer = setTimeout(() => setLength(length + 1), TYPE_MS);
    } else if (!deleting && length === role.length) {
      timer = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && length > 0) {
      timer = setTimeout(() => setLength(length - 1), DELETE_MS);
    } else {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }
    return () => clearTimeout(timer);
  }, [enabled, roles, roleIndex, length, deleting]);

  return roles[roleIndex].slice(0, length);
}

function Hero() {
  const reducedMotion = useReducedMotion();
  const typedRole = useTypedRole(ROLES, !reducedMotion);

  return (
    <section id="hero-section" className="hero" aria-labelledby="hero-headline">
      <div className="wrap hero__inner">
        <div className="hero__text">
          {/* A status line, written like a terminal log entry. */}
          <p className="hero__status">
            <span className="hero__status-tag">[online]</span>
            <span>open for freelance work · cebu, ph</span>
          </p>

          {/* Name and role read as one sentence; the role types itself out
              like a command, in the site's single accent colour. */}
          <h1 className="hero__headline" id="hero-headline">
            <span className="hero__headline-name">I&rsquo;m Amiel,</span>
            <span className="visually-hidden">
              {" "}
              a software developer, automation builder, and data &amp; reporting analyst.
            </span>
            <span className="hero__headline-role" aria-hidden="true">
              {reducedMotion ? (
                ROLES[0]
              ) : (
                <>
                  {typedRole}
                  <span className="hero__cursor" />
                </>
              )}
            </span>
          </h1>

          <p className="hero__statement">
            I like turning &lsquo;there has to be a better way&rsquo; into{" "}
            <strong>something that works</strong>: building useful tools, cutting
            repetitive work, and making better use of the information your team
            already has.
          </p>

          {/* Two pills from the same family: filled primary (matches the
              footer's "Contact me"), outlined secondary. */}
          <div className="hero__ctas">
            <a href="#work" className="hero__primary">
              see selected work
              <span className="hero__primary-icon" aria-hidden="true">
                ↓
              </span>
            </a>
            <a href="#contact" className="hero__primary hero__primary--outline">
              let&rsquo;s connect
              <span className="hero__primary-icon" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          {/* Figures strip: real, checkable facts only — see highlights.js. */}
          <ul
            className="hero__stats"
            aria-label="Highlights"
            style={{ "--stat-count": visibleHighlights.length }}
          >
            {visibleHighlights.map((item) => (
              <li
                className={`hero__stat${item.placeholder ? " hero__stat--placeholder" : ""}`}
                key={item.label}
              >
                <span className="hero__stat-value">{item.value}</span>{" "}
                <span className="hero__stat-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__device-slot">
          <HeroDevice />
          <p className="hero__hint">
            <span className="hero__hint-mark" aria-hidden="true">&gt;</span> or type
            what&rsquo;s next — try <b>work</b>, <b>services</b>, <b>contact</b> or{" "}
            <b>help</b>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
