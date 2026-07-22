import { Link, useLocation } from "react-router-dom";
import Logotype from "./Logotype.jsx";
import { MailIcon, GitHubIcon, LinkedInIcon } from "./SocialIcons.jsx";
import services from "../data/services.js";
import "./Footer.css";

const CONTACT_EMAIL = "maryamielcatado@gmail.com";

function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="emyeeeel — home">
              <Logotype />
            </Link>
            <p className="footer__tagline">
              Fullstack development, AI systems, and the ops work in
              between — for founders who need someone who ships.
            </p>
            <p className="footer__status">
              <span className="footer__status-dot" aria-hidden="true" />
              open to work — cebu, remote
            </p>
          </div>

          <nav className="footer__col" aria-label="Sitemap">
            <p className="footer__col-title">sitemap</p>
            <ul>
              <li>
                {isHome ? (
                  <a href="#work">work</a>
                ) : (
                  <Link to="/work">work</Link>
                )}
              </li>
              <li>
                {isHome ? (
                  <a href="#services">services</a>
                ) : (
                  <Link to="/#services">services</Link>
                )}
              </li>
              <li>
                {isHome ? (
                  <a href="#about">about</a>
                ) : (
                  <Link to="/about">about</Link>
                )}
              </li>
              <li>
                <a href="#contact">contact</a>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <p className="footer__col-title">services</p>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--connect">
            <p className="footer__col-title">connect</p>
            <div className="footer__socials">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email — emyeeeel"
                className="footer__social-link"
              >
                <MailIcon />
              </a>
              <a
                href="https://github.com/emyeeeel"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub — emyeeeel"
                className="footer__social-link"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://linkedin.com/in/emyeeeel"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn — emyeeeel"
                className="footer__social-link"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} emyeeeel — cebu, ph</span>
          <button
            type="button"
            className="footer__top-btn"
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

export default Footer;
