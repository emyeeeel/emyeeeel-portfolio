import { useState } from "react";
import useMagnetic from "../hooks/useMagnetic.js";
import Reveal from "./Reveal.jsx";
import "./Contact.css";

const CONTACT_EMAIL = "maryamielcatado@gmail.com";

const INQUIRY_TYPES = [
  "AI Engineering",
  "Fullstack Development",
  "Technical VA & Ops Support",
  "General / not sure yet",
];

function buildMailto({ name, email, inquiryType, details }) {
  const subject = `${inquiryType} — via portfolio`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Inquiry type: ${inquiryType}`,
    "",
    details,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Contact() {
  const ctaMagnetic = useMagnetic();
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: INQUIRY_TYPES[0],
    details: "",
  });

  function handleChange(field) {
    return (event) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = buildMailto(form);
  }

  return (
    <>
      <section id="contact" className="contact">
        <div className="wrap contact__inner">
          <Reveal as="p" className="section-label contact__label">
            06 / contact
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
          <p className="contact__sub">
            One form, however you'd like to work together — the inquiry type
            below routes it.
          </p>

          <button
            ref={ctaMagnetic}
            type="button"
            className="contact__cta contact__cta--primary"
            aria-expanded={formOpen}
            aria-controls="contact-form"
            onClick={() => setFormOpen((open) => !open)}
          >
            send a message →
          </button>

          {formOpen && (
            <form
              className="contact-form"
              id="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>

              <div className="contact-form__field contact-form__field--full">
                <label htmlFor="contact-inquiry">Inquiry type</label>
                <select
                  id="contact-inquiry"
                  value={form.inquiryType}
                  onChange={handleChange("inquiryType")}
                >
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-form__field contact-form__field--full">
                <label htmlFor="contact-details">Project details</label>
                <textarea
                  id="contact-details"
                  required
                  placeholder="Tell me about your goals, current workflow, and timeline."
                  value={form.details}
                  onChange={handleChange("details")}
                />
              </div>

              <button type="submit" className="contact-form__submit">
                send inquiry →
              </button>
              <p className="contact-form__note">
                Opens in your email app, pre-filled and ready to send.
              </p>
            </form>
          )}

          <p className="contact__line">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ·{" "}
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
          {/* <span>react + vite · designed &amp; built by me</span> */}
        </div>
      </footer>
    </>
  );
}

export default Contact;
