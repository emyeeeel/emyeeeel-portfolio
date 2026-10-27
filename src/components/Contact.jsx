import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import services from "../data/services.js";
import Reveal from "./Reveal.jsx";
import { MailIcon } from "./SocialIcons.jsx";
import "./Contact.css";

const CONTACT_EMAIL = "maryamielcatado@gmail.com";

// The inquiry choices, shown as chips. Each service keeps its /work filter
// colour; `subject` is what lands in the email's subject line.
const ACCENTS = {
  "business-applications": { short: "Business apps", accent: "build" },
  "workflow-automation": { short: "Automation", accent: "automate" },
  "data-reporting": { short: "Data & reporting", accent: "data" },
};

const INQUIRY_TYPES = [
  ...services.map((service) => ({
    key: service.slug,
    label: ACCENTS[service.slug]?.short ?? service.title,
    accent: ACCENTS[service.slug]?.accent ?? "craft",
    subject: service.title,
  })),
  { key: "general", label: "Not sure yet", accent: "craft", subject: "General inquiry" },
];

const NEXT_STEPS = [
  "Your email app opens with this message, ready to send.",
  "I reply with a few questions, or a time for a short call.",
  "We scope it together before anything gets built.",
];

function buildMailto({ name, email, inquiry, details }, about) {
  const type = INQUIRY_TYPES.find((item) => item.key === inquiry) ?? INQUIRY_TYPES[0];
  const subject = about ? `Re: ${about} — ${type.subject}` : `${type.subject} — via portfolio`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Inquiry type: ${type.subject}`,
    ...(about ? [`Re: ${about} case study`] : []),
    "",
    details,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// The "> new-inquiry" form card, shared by the contact section and the case
// study's slide-in panel. `about` names the project the visitor came from
// (it shows in the prompt and lands in the email's subject); `inquiry`
// preselects a service.
export function InquiryForm({ idPrefix = "contact", about, inquiry }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: INQUIRY_TYPES.some((type) => type.key === inquiry) ? inquiry : INQUIRY_TYPES[0].key,
    details: "",
  });

  // Service pages can preselect their service before jumping here.
  useEffect(() => {
    function preselect(event) {
      if (INQUIRY_TYPES.some((type) => type.key === event.detail)) {
        setForm((prev) => ({ ...prev, inquiry: event.detail }));
      }
    }
    window.addEventListener("contact:inquiry", preselect);
    return () => window.removeEventListener("contact:inquiry", preselect);
  }, []);

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = buildMailto(form, about);
  }

  return (
    <div className="contact__card">
      <p className="contact__prompt" aria-hidden="true">
        <span className="contact__prompt-mark">&gt;</span> new-inquiry
        {about && <span className="contact__prompt-about"> --re &ldquo;{about}&rdquo;</span>}
      </p>

      <form className="contact__form" onSubmit={handleSubmit}>
        {about && (
          <p className="contact__about">
            <span>re:</span> {about}
          </p>
        )}
        <fieldset className="contact__field contact__field--choices">
          <legend>what do you need help with?</legend>
          <div className="contact__chips">
            {INQUIRY_TYPES.map((type) => (
              <label key={type.key} className={`contact__chip contact--${type.accent}`}>
                <input
                  type="radio"
                  name={`${idPrefix}-inquiry`}
                  value={type.key}
                  checked={form.inquiry === type.key}
                  onChange={handleChange("inquiry")}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="contact__row">
          <div className="contact__field">
            <label htmlFor={`${idPrefix}-name`}>name</label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="contact__field">
            <label htmlFor={`${idPrefix}-email`}>email</label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>
        </div>

        <div className="contact__field">
          <label htmlFor={`${idPrefix}-details`}>project details</label>
          <textarea
            id={`${idPrefix}-details`}
            required
            rows={5}
            placeholder={
              about
                ? `What would you want built like ${about}, how does it work today, and when do you need it?`
                : "What are you trying to get done, how does it work today, and when do you need it?"
            }
            value={form.details}
            onChange={handleChange("details")}
          />
        </div>

        <div className="contact__actions">
          <p className="contact__note">Opens in your email app, pre-filled.</p>
          <button type="submit" className="contact__submit">
            send inquiry
            <span className="contact__submit-icon" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

// The direct email line, with one-click copy for visitors whose email lives
// in a browser tab.
export function DirectEmail() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // For visitors whose email lives in a browser tab: the form can't open
  // it for them, so give them the address in one click.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  }

  return (
    <div className="contact__direct">
      <a href={`mailto:${CONTACT_EMAIL}`} className="contact__email">
        <MailIcon />
        <span>{CONTACT_EMAIL}</span>
      </a>
      <button type="button" className="contact__copy" onClick={copyEmail}>
        {copied ? "copied ✓" : "copy"}
      </button>
      <span className="visually-hidden" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}

function Contact() {
  const { pathname, search } = useLocation();
  // A case study's "tell me about it" lands here with ?re=<project> and
  // ?service=<slug>, so the form arrives pre-filled.
  const params = new URLSearchParams(search);
  const about = params.get("re") ?? undefined;
  const inquiry = params.get("service") ?? undefined;

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="wrap contact__inner">
        {/* -------- left: heading, what happens next, direct email -------- */}
        <div className="contact__intro">
          <Reveal as="p" className="section-label contact__label">
            {pathname === "/" ? "07 / contact" : "contact"}
          </Reveal>
          <h2 className="contact__heading" id="contact-heading">
            Let&rsquo;s build <span className="contact__heading-accent">something.</span>
          </h2>
          <p className="contact__sub">
            Tell me what you&rsquo;re working on and what it should make easier.
          </p>

          <div className="contact__next">
            <p className="contact__next-title">what happens next</p>
            <ol className="contact__next-list">
              {NEXT_STEPS.map((step, i) => (
                <li key={step}>
                  <span className="contact__next-num">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <DirectEmail />
        </div>

        {/* -------- right: the form, in a terminal window -------- */}
        <InquiryForm key={`${about}-${inquiry}`} idPrefix="contact" about={about} inquiry={inquiry} />
      </div>
    </section>
  );
}

export default Contact;
