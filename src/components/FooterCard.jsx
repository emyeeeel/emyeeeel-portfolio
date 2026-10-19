import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MailIcon, GitHubIcon, LinkedInIcon, DocIcon } from "./SocialIcons.jsx";
import "./FooterCard.css";

const CONTACT_EMAIL = "maryamielcatado@gmail.com";

// Local time in Cebu, so clients abroad can see when a reply is likely.
function useCebuTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Footer: a terminal-style panel like the site's other windows. Who and
// where on the left, the sitemap and links on the right, and a status
// bar with the copyright and back-to-top. The contact form sits right
// above it, so there's no second "contact me" call to action here.
function FooterCard() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const year = new Date().getFullYear();
  const cebuTime = useCebuTime();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // On home, jump to the section; elsewhere, go to its page or home anchor.
  const explore = [
    { label: "Work", hash: "#work", to: "/work" },
    { label: "Experience", hash: "#experience", to: "/#experience" },
    { label: "About", hash: "#about", to: "/about" },
    { label: "Services", hash: "#services", to: "/#services" },
    { label: "Contact", hash: "#contact", to: "#contact" },
  ];

  return (
    <footer className="footer-card">
      <div className="wrap">
        <div className="footer-card__panel">
          <p className="footer-card__prompt" aria-hidden="true">
            <span className="footer-card__mark">&gt;</span> whoami
          </p>

          <div className="footer-card__top">
            <div className="footer-card__id">
              <Link to="/" className="footer-card__brand" aria-label="emyeeeel, home">
                <img src="/assets/logo/logo-circle.png" alt="" className="footer-card__logo" />
                <span className="footer-card__name">emyeeeel</span>
              </Link>
              <p className="footer-card__role">
                Software development &amp; business automation, from Cebu, Philippines.
              </p>
              <p className="footer-card__status">
                <span className="footer-card__status-tag">[online]</span> open for freelance
                and remote work
              </p>
              <p className="footer-card__status footer-card__time">
                local time · {cebuTime} in Cebu (GMT+8)
              </p>
            </div>

            <nav className="footer-card__col" aria-label="Sitemap">
              <p className="footer-card__col-title">explore</p>
              <ul>
                {explore.map((item) => (
                  <li key={item.label}>
                    {isHome || item.to.startsWith("#") ? (
                      <a href={item.hash}>{item.label}</a>
                    ) : (
                      <Link to={item.to}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-card__col">
              <p className="footer-card__col-title">connect</p>
              <ul>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="footer-card__social-link">
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
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="/Amiel_Catado_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-card__social-link"
                  >
                    <DocIcon />
                    Résumé
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-card__bottom">
            <span className="footer-card__copyright">
              <span className="footer-card__mark" aria-hidden="true">
                &gt;
              </span>
              © {year} emyeeeel. All rights reserved.
            </span>
            <button
              type="button"
              className="footer-card__top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span className="footer-card__top-label">back to top</span>
              <span className="footer-card__top-icon" aria-hidden="true">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterCard;
