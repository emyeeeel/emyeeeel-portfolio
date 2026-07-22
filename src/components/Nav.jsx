import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useSectionProgress from "../hooks/useSectionProgress.js";
import Logotype from "./Logotype.jsx";
import "./Nav.css";

function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { current, total } = useSectionProgress(isHome);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Close the mobile menu whenever the route (or hash) changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    function handlePointerDown(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="pill-nav" ref={navRef}>
      <div className="pill-nav__bar">
        <Link
          to="/"
          className="pill-nav__logo"
          aria-label="emyeeeel — home"
          onClick={closeMenu}
        >
          <Logotype blink />
        </Link>

        <div
          id="pill-nav-menu"
          className={`pill-nav__menu${open ? " is-open" : ""}`}
        >
          <ul className="pill-nav__links">
            <li>
              {isHome ? (
                <a href="#work" className="pill-nav__link" onClick={closeMenu}>
                  work
                </a>
              ) : (
                <Link to="/work" className="pill-nav__link" onClick={closeMenu}>
                  work
                </Link>
              )}
            </li>
            <li>
              {isHome ? (
                <a href="#services" className="pill-nav__link" onClick={closeMenu}>
                  services
                </a>
              ) : (
                <Link to="/#services" className="pill-nav__link" onClick={closeMenu}>
                  services
                </Link>
              )}
            </li>
            <li>
              {isHome ? (
                <a href="#about" className="pill-nav__link" onClick={closeMenu}>
                  about
                </a>
              ) : (
                <Link to="/about" className="pill-nav__link" onClick={closeMenu}>
                  about
                </Link>
              )}
            </li>
          </ul>
          {/* {isHome && (
            <span className="pill-nav__progress" aria-hidden="true">
              {String(current).padStart(2, "0")} —{" "}
              {String(total).padStart(2, "0")}
            </span>
          )} */}
          <a href="#contact" className="pill-nav__cta" onClick={closeMenu}>
            start a project →
          </a>
        </div>

        <button
          type="button"
          className="pill-nav__toggle"
          aria-expanded={open}
          aria-controls="pill-nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="pill-nav__toggle-bar" />
          <span className="pill-nav__toggle-bar" />
          <span className="pill-nav__toggle-bar" />
        </button>
      </div>
    </nav>
  );
}

export default Nav;
