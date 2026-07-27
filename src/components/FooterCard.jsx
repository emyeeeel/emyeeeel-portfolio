import { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MailIcon, GitHubIcon, LinkedInIcon } from "./SocialIcons.jsx";
import useReducedMotion from "../hooks/useReducedMotion.js";
import "./FooterCard.css";

const CONTACT_EMAIL = "maryamielcatado@gmail.com";
const START_RADIUS = 40;
const END_RADIUS = 999;
const FADE_START = 0.92;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function FooterCard() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const year = new Date().getFullYear();
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const contactPillRef = useRef(null);
  const duplicateRef = useRef(null);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // The bone-colored duplicate starts covering the whole panel, then
  // shrinks and moves to match the actions box's exact size/position as
  // the footer scrolls into view, fading out right as it finishes —
  // revealing the real panel content (which was there underneath all
  // along) as if it had "become" the actions box.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const contactPill = contactPillRef.current;
    const duplicate = duplicateRef.current;
    if (!section || !panel || !contactPill || !duplicate) return;

    if (reducedMotion) {
      duplicate.style.opacity = "0";
      return;
    }

    let target = null;
    let fromSize = null;
    let rafId = null;

    function measure() {
      const panelRect = panel.getBoundingClientRect();
      const pillRect = contactPill.getBoundingClientRect();
      fromSize = { width: panelRect.width, height: panelRect.height };
      target = {
        top: pillRect.top - panelRect.top,
        left: pillRect.left - panelRect.left,
        width: pillRect.width,
        height: pillRect.height,
      };
    }

    function updateProgress() {
      rafId = null;
      // Driven by distance to the true bottom of the page, not the
      // section's own rect.top — the footer is the last thing on the
      // page, so if it's shorter than a viewport, its top can never
      // actually scroll up to 0 (the page runs out of room to scroll
      // first), which left this permanently stuck mid-animation.
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - vh);
      const remaining = maxScroll - window.scrollY;
      const range = vh * 0.3;
      const raw = 1 - remaining / range;
      const progress = Math.min(1, Math.max(0, raw));

      const top = lerp(0, target.top, progress);
      const left = lerp(0, target.left, progress);
      const width = lerp(fromSize.width, target.width, progress);
      const height = lerp(fromSize.height, target.height, progress);
      const radius = lerp(START_RADIUS, END_RADIUS, progress);
      const opacity =
        progress < FADE_START ? 1 : Math.max(0, 1 - (progress - FADE_START) / (1 - FADE_START));

      duplicate.style.top = `${top}px`;
      duplicate.style.left = `${left}px`;
      duplicate.style.width = `${width}px`;
      duplicate.style.height = `${height}px`;
      duplicate.style.borderRadius = `${radius}px`;
      duplicate.style.opacity = opacity.toFixed(3);
    }

    function onScroll() {
      if (rafId == null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    }

    function onResize() {
      measure();
      onScroll();
    }

    measure();
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <footer className="footer-card" ref={sectionRef}>
      <div className="wrap">
        <div className="footer-card__panel" ref={panelRef}>
          <div className="footer-card__panel-duplicate" ref={duplicateRef} aria-hidden="true" />

          <div className="footer-card__top">
            <p className="footer-card__blurb">
              Got something worth building? Let's make it real.
            </p>

            <nav className="footer-card__col" aria-label="Sitemap">
              <p className="footer-card__col-title">Explore</p>
              <ul>
                <li>
                  {isHome ? <a href="#work">Work</a> : <Link to="/work">Work</Link>}
                </li>
                <li>
                  {isHome ? (
                    <a href="#services">Services</a>
                  ) : (
                    <Link to="/#services">Services</Link>
                  )}
                </li>
                <li>
                  {isHome ? <a href="#about">About</a> : <Link to="/about">About</Link>}
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>

            <div className="footer-card__col" aria-label="Connect">
              <p className="footer-card__col-title">Connect</p>
              <ul className="footer-card__socials">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="footer-card__social-link"
                    aria-label="Email — emyeeeel"
                  >
                    <MailIcon />
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/emyeeeel"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-card__social-link"
                    aria-label="GitHub — emyeeeel"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/emyeeeel"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-card__social-link"
                    aria-label="LinkedIn — emyeeeel"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-card__actions">
              <a href="#contact" className="footer-card__pill" ref={contactPillRef}>
                Contact me
                <span className="footer-card__pill-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
              <Link to="/work" className="footer-card__pill footer-card__pill--ghost">
                See work
                <span className="footer-card__pill-icon" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-card__bottom">
          <span className="footer-card__copyright">
            <span className="footer-card__copyright-mark" aria-hidden="true">
              {">"}
            </span>
            Copyright © {year} emyeeeel. All rights reserved.
          </span>
          <button
            type="button"
            className="footer-card__top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default FooterCard;
