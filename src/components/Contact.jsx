import { useState } from "react";
import testimonials from "../data/testimonials.js";
import Reveal from "./Reveal.jsx";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons.jsx";
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
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/emyeeeel"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn — emyeeeel"
              className="contact__social-link"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
