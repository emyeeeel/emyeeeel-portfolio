import { useState } from "react";
import testimonials from "../data/testimonials.js";
import Reveal from "./Reveal.jsx";
import "./Contact.css";

const CONTACT_EMAIL = "maryamielcatado@gmail.com";

const INQUIRY_TYPES = [
  "AI Engineering",
  "Fullstack Development",
  "Technical VA & Ops Support",
  "General / not sure yet",
];

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

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
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: INQUIRY_TYPES[0],
    details: "",
  });

  function goPrev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function goNext() {
    setIndex((i) => (i + 1) % total);
  }

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
      <section id="contact" className="contact-combined">
        <div className="contact-combined__media">
          <div className="contact-combined__scrim" aria-hidden="true" />
          <div className="quote-card">
            <p className="quote-card__mark" aria-hidden="true">
              &ldquo;
            </p>
            <p className="quote-card__text">{current.quote}</p>
            <div className="quote-card__person">
              {/* <span className="quote-card__avatar" aria-hidden="true">
                {initialsOf(current.name)}
              </span> */}
              <div className="quote-card__meta">
                <p className="quote-card__name">{current.name}</p>
                <p className="quote-card__role">
                  {current.role} — {current.company}
                </p>
              </div>
            </div>
            <div className="quote-card__nav">
              <button
                type="button"
                className="quote-card__nav-btn"
                aria-label="Previous testimonial"
                disabled={total <= 1}
                onClick={goPrev}
              >
                ←
              </button>
              <button
                type="button"
                className="quote-card__nav-btn"
                aria-label="Next testimonial"
                disabled={total <= 1}
                onClick={goNext}
              >
                →
              </button>
              <span className="quote-card__count">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="contact-combined__form">
          <div className="contact-combined__form-inner">
            <Reveal as="p" className="section-label">
              05 / contact
            </Reveal>
            <h2 className="form-title">
              Let's build <b>something.</b>
            </h2>
            {/* <p className="form-sub">
              One form, however you'd like to work together — or email
              directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p> */}

            <form onSubmit={handleSubmit}>
              <div className="field">
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
              <div className="field">
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
              {/* <div className="field">
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
              </div> */}
              <div className="field">
                <label htmlFor="contact-details">Project details</label>
                <textarea
                  id="contact-details"
                  required
                  placeholder="Tell me about your goals, current workflow, and timeline."
                  value={form.details}
                  onChange={handleChange("details")}
                />
              </div>
              <button type="submit" className="submit-btn">
                send inquiry
              </button>
              {/* <p className="form-note">
                Opens in your email app, pre-filled and ready to send.
              </p> */}
            </form>

            <div className="contact__socials">
              <a
                href="https://github.com/emyeeeel"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub — emyeeeel"
                className="contact__social-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/emyeeeel"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn — emyeeeel"
                className="contact__social-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap footer__inner">
          <span>© 2026 emyeeeel — cebu, ph</span>
        </div>
      </footer>
    </>
  );
}

export default Contact;
