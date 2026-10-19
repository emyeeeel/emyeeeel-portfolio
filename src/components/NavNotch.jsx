import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavNotch.css";

const TOP_THRESHOLD = 40;
const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function NavNotch() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(
    () => typeof window === "undefined" || window.scrollY < TOP_THRESHOLD,
  );
  // Touch screens can't hover to reveal a collapsed notch, and the center
  // icon is a home link rather than a toggle, so there the links stay out.
  const [canHover, setCanHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia(FINE_HOVER_QUERY).matches,
  );
  const navRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia(FINE_HOVER_QUERY);
    const handler = (e) => setCanHover(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // The notch sits expanded at the top of the page so the links are
  // obvious on arrival, then tucks away once the visitor scrolls.
  useEffect(() => {
    function onScroll() {
      setAtTop(window.scrollY < TOP_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Close whenever the route (or hash) changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const expanded = !canHover || open || atTop;
  const closeMenu = () => setOpen(false);

  function handleBlur(event) {
    if (!navRef.current?.contains(event.relatedTarget)) setOpen(false);
  }

  // Already home: the router sees no page change, so scroll back up here.
  function handleHomeClick() {
    closeMenu();
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function sectionLink(hash, label) {
    return isHome ? (
      <a href={`#${hash}`} onClick={closeMenu}>
        {label}
      </a>
    ) : (
      <Link to={`/#${hash}`} onClick={closeMenu}>
        {label}
      </Link>
    );
  }

  return (
    <>
      <div className="nav-notch__bg" aria-hidden="true" />

      <nav
        className={`nav-notch${expanded ? " is-open" : ""}`}
        ref={navRef}
        aria-label="Main"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
      >
        <div className="nav-notch__content">
          <div className="nav-notch__side nav-notch__side--left" inert={!expanded}>
            <ul className="nav-notch__list">
              <li>
                {isHome ? (
                  <a href="#work" onClick={closeMenu}>
                    work
                  </a>
                ) : (
                  <Link to="/work" onClick={closeMenu}>
                    work
                  </Link>
                )}
              </li>
              <li>{sectionLink("services", "services")}</li>
            </ul>
          </div>

          <Link
            to="/"
            className="nav-notch__home"
            aria-label="emyeeeel — home"
            onClick={handleHomeClick}
          >
            <img src="/assets/logo/logo-circle.png" alt="" className="nav-notch__icon" />
          </Link>

          <div className="nav-notch__side nav-notch__side--right" inert={!expanded}>
            <ul className="nav-notch__list">
              {/* the home page's "about me" section, not the /about page */}
              <li>{sectionLink("about", "about")}</li>
              <li>
                {/* The contact section is part of every page's layout, so
                    this stays on the current page instead of going home. */}
                <a href="#contact" onClick={closeMenu}>
                  contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavNotch;
