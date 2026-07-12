import { Link, useLocation } from "react-router-dom";
import useSectionProgress from "../hooks/useSectionProgress.js";
import Logotype from "./Logotype.jsx";
import "./Nav.css";

function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { current, total } = useSectionProgress(isHome);

  return (
    <nav className="pill-nav">
      <div className="pill-nav__bar">
        <Link
          to="/"
          className="pill-nav__logo"
          aria-label="emyeeeel — home"
        >
          <Logotype blink />
        </Link>
        <ul className="pill-nav__links">
          <li>
            {isHome ? (
              <a href="#work" className="pill-nav__link">
                work
              </a>
            ) : (
              <Link to="/work" className="pill-nav__link">
                work
              </Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#services" className="pill-nav__link">
                services
              </a>
            ) : (
              <Link to="/#services" className="pill-nav__link">
                services
              </Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#about" className="pill-nav__link">
                about
              </a>
            ) : (
              <Link to="/about" className="pill-nav__link">
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
        <a href="#contact" className="pill-nav__cta">
          start a project →
        </a>
      </div>
    </nav>
  );
}

export default Nav;
