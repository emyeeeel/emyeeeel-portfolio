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

// Footer: a coral sheet with rounded top corners, so it reads as the end of
// the page rather than another dark section. Who and where on the left,
// links on the right, a huge "emyeeeel" wordmark, then a thin bottom bar.
// The contact form sits right above, so there's no second call to action.
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

  const connect = [
    { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: <MailIcon /> },
    { label: "GitHub", href: "https://github.com/emyeeeel", icon: <GitHubIcon />, external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/emyeeeel", icon: <LinkedInIcon />, external: true },
    { label: "Résumé", href: "/Amiel_Catado_Resume.pdf", icon: <DocIcon />, external: true },
  ];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__id">
            {/* Bookends the hero's "there has to be a better way". */}
            <p className="footer__lead">
              There&rsquo;s always a <span className="footer__lead-accent">better way</span>.
              <br />
              Let&rsquo;s build yours.
            </p>
            <p className="footer__status">
              <span className="footer__dot" aria-hidden="true" />
              open for freelance and remote work
            </p>
          </div>

          <nav className="footer__col" aria-label="Sitemap">
            <p className="footer__col-title">explore</p>
            <ul>
              {explore.map((item) => (
                <li key={item.label}>
                  {isHome || item.to.startsWith("#") ? (
                    <a href={item.hash} className="footer__link">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="footer__link">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__col-title">connect</p>
            <ul>
              {connect.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="footer__link footer__link--icon"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.icon}
                    {item.label}
                    {item.external && (
                      <span className="footer__ext" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The wordmark: the site's logotype, footer-sized. */}
        <Link to="/" className="footer__wordmark" aria-label="emyeeeel, back to home">
          <span className="footer__wordmark-chevron" aria-hidden="true">
            &gt;
          </span>
          <span aria-hidden="true">emyeeeel</span>
          <span className="footer__wordmark-cursor" aria-hidden="true" />
        </Link>

        <div className="footer__bottom">
          <span>© {year} emyeeeel. All rights reserved.</span>
          <span className="footer__time">
            {cebuTime} in Cebu · GMT+8
          </span>
          <button
            type="button"
            className="footer__top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            back to top
            <span className="footer__top-icon" aria-hidden="true">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default FooterCard;
