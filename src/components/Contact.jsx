import useMagnetic from "../hooks/useMagnetic.js";
import Reveal from "./Reveal.jsx";
import resumeUrl from "../../dist/assets/resume/Amiel_Catado_Resume.pdf";
import "./Contact.css";

const AI_MAILTO =
  "mailto:maryamielcatado@gmail.com?subject=AI%20engineer%20role%20—%20via%20portfolio&body=Hi%20Amiel%2C%20saw%20your%20portfolio%20—%20are%20you%20available%20for%20a%20chat%3F";
const FULLSTACK_MAILTO =
  "mailto:maryamielcatado@gmail.com?subject=Fullstack%20developer%20role%20—%20via%20portfolio&body=Hi%20Amiel%2C%20saw%20your%20portfolio%20—%20are%20you%20available%20for%20a%20chat%3F";

function Contact() {
  const primaryMagnetic = useMagnetic();
  const secondaryMagnetic = useMagnetic();

  return (
    <>
      <section id="contact" className="contact">
        <div className="wrap contact__inner">
          <Reveal as="p" className="section-label contact__label">
            04 / contact
          </Reveal>
          <Reveal
            as="h2"
            className="contact__headline"
            lines={[
              <span>Let's build</span>,
              <span>
                something<span className="contact__period">.</span>
              </span>,
            ]}
          />
          <div className="contact__ctas">
            <a
              ref={primaryMagnetic}
              href={AI_MAILTO}
              className="contact__cta contact__cta--primary"
            >
              I need an AI engineer →
            </a>
            <a
              ref={secondaryMagnetic}
              href={FULLSTACK_MAILTO}
              className="contact__cta contact__cta--secondary"
            >
              I need a fullstack dev →
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume — PDF, opens in new tab"
              className="contact__cta contact__cta--secondary"
            >
              resume ↓
            </a>
          </div>
          <p className="contact__line">
            <a href="mailto:maryamielcatado@gmail.com">
              maryamielcatado@gmail.com
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/emyeeeel"
              target="_blank"
              rel="noreferrer"
            >
              github/emyeeeel
            </a>{" "}
            ·{" "}
            <a
              href="https://linkedin.com/in/emyeeeel"
              target="_blank"
              rel="noreferrer"
            >
              linkedin/emyeeeel
            </a>
          </p>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap footer__inner">
          <span>© 2026 emyeeeel — cebu, ph</span>
          <span>react + vite · designed &amp; built by me</span>
        </div>
      </footer>
    </>
  );
}

export default Contact;
