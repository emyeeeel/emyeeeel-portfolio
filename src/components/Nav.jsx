import { Link, useLocation } from "react-router-dom";
import useSectionProgress from "../hooks/useSectionProgress.js";
import Logotype from "./Logotype.jsx";
import "./Nav.css";

function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { current, total } = useSectionProgress(isHome);

  return (
    <nav className="nav">
      <div className="wrap nav__inner">
        <Link to="/" className="nav__wordmark" aria-label="emyeeeel — home">
          <Logotype blink />
        </Link>
        <div className="nav__right">
          <ul className="nav__links">
            <li>
              <Link to="/work" className="nav__link">
                work
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav__link">
                about
              </Link>
            </li>
            <li>
              <a href="#contact" className="nav__link nav__link--contact">
                contact
              </a>
            </li>
          </ul>
          {isHome && (
            <span className="nav__progress" aria-hidden="true">
              {String(current).padStart(2, "0")} —{" "}
              {String(total).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
