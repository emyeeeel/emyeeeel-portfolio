import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavNotch.css";

function NavNotch() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Close whenever the route (or hash) changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

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
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="nav-notch__bg" aria-hidden="true" />

      <nav
        className={`nav-notch${open ? " is-open" : ""}`}
        ref={navRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="nav-notch__content">
          <div className="nav-notch__side nav-notch__side--left">
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
              <li>
                {isHome ? (
                  <a href="#services" onClick={closeMenu}>
                    services
                  </a>
                ) : (
                  <Link to="/#services" onClick={closeMenu}>
                    services
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="nav-notch__trigger"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <img
              src="/assets/logo/logo-circle.png"
              alt="emyeeeel — home"
              className="nav-notch__icon"
            />
          </button>

          <div className="nav-notch__side nav-notch__side--right">
            <ul className="nav-notch__list">
              <li>
                {isHome ? (
                  <a href="#about" onClick={closeMenu}>
                    about
                  </a>
                ) : (
                  <Link to="/about" onClick={closeMenu}>
                    about
                  </Link>
                )}
              </li>
              <li>
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
