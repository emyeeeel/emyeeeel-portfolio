import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects.js";
import Reveal from "./Reveal.jsx";
import ScreenTour from "./ScreenTour.jsx";
import Lightbox from "./Lightbox.jsx";
import MediaSlot from "./MediaSlot.jsx";
import BrandMark from "./BrandMarks.jsx";
import "./CaseTemplate.css";

// The case study template, in the portfolio's own language: ink pages,
// Clash headlines, mono labels, coral accents, terminal windows and one
// bone sheet. The project shows up only through its content (video,
// screens, cover art).
//
// It reads problem → product → process → result, and every fact has one
// home, so nothing is said twice:
//   hero          what is it, and did it work?   (title, figures, spec, video)
//   01 challenge  why was it hard?               (quote + role switcher)
//   02 solution   what does it do?               (screen tour)
//   03 built      what did she do, and why?      (bone sheet: process + decisions)
//   04 outcome    what happened next?            (one statement)
// then skills, a prompt to get in touch and the next project.

const pad = (n) => String(n).padStart(2, "0");

// Evidence kinds that explain how a figure was reached, behind the
// outcome's "how the estimates were made" toggle.
const METHOD_KINDS = new Set(["estimate", "simulation", "projection"]);

// The same artwork as the project's /work card.
function ProjectCover({ project }) {
  if (project.cardArt) {
    return (
      <img src={project.cardArt} alt="" className="cs-cover cs-cover--image" />
    );
  }
  const style = project.logoBg
    ? {
        backgroundColor: project.iconBg,
        backgroundImage: `url(${project.logoBg})`,
      }
    : undefined;
  return (
    <div className="cs-cover" style={style} aria-hidden="true">
      {project.icon ? (
        <img src={project.icon} alt="" className="cs-cover-icon" />
      ) : (
        <span className="cs-cover-wordmark">
          <span>&gt;</span> {project.title.toLowerCase()}
        </span>
      )}
    </div>
  );
}

// A line with chosen words set apart (`words` lists them, punctuation
// aside); neighbouring chosen words are joined into one run.
function Accented({ text, words = [] }) {
  const parts = [];
  let gap = "";
  for (const token of text.split(/(\s+)/)) {
    if (!token) continue;
    if (!token.trim()) {
      gap += token;
      continue;
    }
    const chosen = words.includes(token.replace(/[^\w]/g, ""));
    const last = parts[parts.length - 1];
    if (chosen && last?.chosen) last.text += gap + token;
    else {
      if (gap) parts.push({ text: gap, chosen: false });
      parts.push({ text: token, chosen });
    }
    gap = "";
  }
  return parts.map((part, i) => (part.chosen ? <strong key={i}>{part.text}</strong> : part.text));
}

// The full-screen cover that opens a case study, in the project's own
// colours (the one place they lead). Flat fills only, no gradients.
//   layout "stage"  a giant wordmark with a product shot in front of it
//                   (image.kind "cutout": a transparent PNG; "screen": a
//                   screenshot shown in a tilted frame)
//   layout "photo"  a full-bleed photo under a flat dark overlay
//   layout "slide"  a finished cover image (e.g. a deck's title slide) shown
//                   as is; it already carries the name, so the title is
//                   kept for screen readers only. `focus` sets which part
//                   stays in view on narrow screens (object-position).
//   layout "devices" the name in giant type (`lines`) behind a laptop and a
//                   phone showing the real screens (`laptop`, `phone`),
//                   with the tagline in front; `stripes` adds a band of the
//                   project's accent colours behind the devices; `mockup`
//                   (a transparent device render) replaces the two devices,
//                   and `slab` adds a diagonal colour block behind it
//   layout "split"  a full-bleed mockup photo (subject on the right) with a
//                   flat panel in `background` on the left, cut on a
//                   diagonal, holding a kicker, the name (`lines`, in
//                   `font`), and the tagline with `accent` words highlighted
//   layout "overlay" the same title block laid straight over a full-bleed
//                   photo (no panel), in dark ink for a light photo; a
//                   `logo` image ({ src, alt }) replaces the typed name, with
//                   the tagline tucked under it, right-aligned; `backdrop`
//                   marks an image with no subject, so phones fill with it;
//                   `focus` sets the photo's crop (object-position);
//                   `image.frame` shows the image as a framed card on the
//                   right instead, for a project with no photo or backdrop
//   layout "brand"  the project's logo (`mark`, from BrandMarks) and
//                   tagline beside a framed photo; `accent` lists tagline
//                   words to set in the logo's colour.
function Cover({ title, cover }) {
  const style = {
    "--cover-bg": cover.background ?? "#17171c",
    "--cover-ink": cover.ink ?? "var(--bone)",
    "--cover-text": cover.text ?? "var(--bone)",
    "--cover-highlight": cover.highlight ?? "var(--coral)",
    // the wordmark is sized to its length so it always fits the screen
    "--chars": (cover.wordmark ?? title).length,
  };
  const layout = cover.layout ?? "stage";

  return (
    <section
      className={`cs-cover-page cs-cover-page--${layout}${cover.logo ? " cs-cover-page--logo" : ""}${cover.backdrop ? " cs-cover-page--backdrop" : ""}${cover.image?.frame ? " cs-cover-page--card" : ""}`}
      style={style}
      aria-label={`${title} cover`}
    >
      {(layout === "photo" || layout === "slide") && cover.image && (
        <img
          className="cs-cover-page__photo"
          src={cover.image.src}
          alt={cover.image.alt}
          style={cover.focus ? { objectPosition: cover.focus } : undefined}
        />
      )}

      <Link to="/work" className="cs-cover-page__back">
        ← all work
      </Link>

      {(layout === "split" || layout === "overlay") && (
        <>
          {cover.image.frame ? (
            <figure className="cs-cover-page__card">
              <img src={cover.image.src} alt={cover.image.alt} />
            </figure>
          ) : (
            <img
              className={`cs-cover-page__photo ${
                layout === "overlay" ? "cs-cover-page__photo--full" : "cs-cover-page__photo--right"
              }`}
              src={cover.image.src}
              alt={cover.image.alt}
              style={cover.focus ? { objectPosition: cover.focus } : undefined}
            />
          )}
          {layout === "split" && (
            <div className="cs-cover-page__panel" aria-hidden="true">
              {cover.stripes?.map((colour) => (
                <span key={colour} style={{ background: colour }} />
              ))}
            </div>
          )}
          <div className="cs-cover-page__split">
            {cover.kicker && <p className="cs-cover-page__kicker">{cover.kicker}</p>}
            {cover.logo ? (
              <h1 className="cs-cover-page__logo">
                <img src={cover.logo.src} alt={cover.logo.alt ?? title} />
              </h1>
            ) : (
              <h1
                className="cs-cover-page__name"
                style={cover.font ? { fontFamily: cover.font, fontStyle: cover.fontStyle } : undefined}
              >
                {(cover.lines ?? [title]).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
            )}
            {cover.tagline && (
              <p
                style={cover.font ? { fontFamily: cover.font } : undefined}
                className={
                  layout === "overlay"
                    ? "cs-cover-page__sub"
                    : "cs-cover-page__headline cs-cover-page__headline--inline"
                }
              >
                <Accented text={cover.tagline} words={cover.accent} />
              </p>
            )}
          </div>
        </>
      )}

      {layout === "brand" && (
        <div className="cs-cover-page__brand">
          <div className="cs-cover-page__identity">
            <h1 className="cs-cover-page__mark">
              <BrandMark name={cover.mark} />
              <span className="visually-hidden">{title}</span>
            </h1>
            {cover.tagline && (
              <p className="cs-cover-page__motto">
                <Accented text={cover.tagline} words={cover.accent} />
              </p>
            )}
          </div>
          {cover.image && (
            <figure className="cs-cover-page__frame">
              <img src={cover.image.src} alt={cover.image.alt} />
            </figure>
          )}
        </div>
      )}

      {/* a short wordmark is shown; the full title stays for screen readers */}
      {layout === "devices" && (
        <>
          <h1
            className={`cs-cover-page__lines${cover.mockup ? " cs-cover-page__lines--top" : ""}`}
            style={cover.font ? { fontFamily: cover.font, fontStyle: cover.fontStyle } : undefined}
          >
            {(cover.lines ?? [title]).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          {cover.slab && (
            <div
              className="cs-cover-page__slab"
              style={{ background: cover.slab }}
              aria-hidden="true"
            />
          )}
          {cover.stripes && (
            <div className="cs-cover-page__stripes" aria-hidden="true">
              {cover.stripes.map((colour) => (
                <span key={colour} style={{ background: colour }} />
              ))}
            </div>
          )}
          {cover.mockup && (
            <figure className="cs-cover-page__mockup">
              <img src={cover.mockup.src} alt={cover.mockup.alt} />
            </figure>
          )}
          {!cover.mockup && (
          <div className="cs-cover-page__devices">
            {cover.laptop && (
              <figure className="cs-device-laptop">
                <div className="cs-device-laptop__screen">
                  <img src={cover.laptop.src} alt={cover.laptop.alt} />
                </div>
                <div className="cs-device-laptop__base" aria-hidden="true" />
              </figure>
            )}
            {cover.phone && (
              <figure className="cs-device-phone">
                <img src={cover.phone.src} alt={cover.phone.alt} />
              </figure>
            )}
          </div>
          )}
          {cover.tagline && (
            <p className="cs-cover-page__headline">
              <Accented text={cover.tagline} words={cover.accent} />
            </p>
          )}
        </>
      )}

      {!["brand", "devices", "split", "overlay"].includes(layout) && (
        <h1
          className={
            layout === "slide" ? "visually-hidden" : "cs-cover-page__title"
          }
        >
          {cover.wordmark && cover.wordmark !== title ? (
            <>
              <span aria-hidden="true">{cover.wordmark}</span>
              <span className="visually-hidden">{title}</span>
            </>
          ) : (
            title
          )}
        </h1>
      )}

      {layout === "stage" && cover.image && (
        <div
          className={`cs-cover-page__shot cs-cover-page__shot--${cover.image.kind ?? "cutout"}`}
        >
          <img src={cover.image.src} alt={cover.image.alt} />
        </div>
      )}

      <div className="cs-cover-page__foot">
        {cover.tagline && !["brand", "devices", "split", "overlay"].includes(layout) && (
          <p className="cs-cover-page__tagline">{cover.tagline}</p>
        )}
        <span className="cs-cover-page__cue" aria-hidden="true">
          scroll ↓
        </span>
      </div>
    </section>
  );
}

// The overview slide right after the cover: a light "canvas" with an image
// card and a two-tone statement (what it is, then what it does), then the
// project's details and the kinds of work as pill tags. Set in the
// project's own typeface (`font`) on its own slide colour (`background`).
// `thumb: "tile"` shows the project's /work tile (its background art and
// logo icon) on the video card in place of the video's poster frame, or as
// a still card when there's no video; `thumb: "card"` shows its /work card
// art in that frame, for a project without a logo tile; `thumb: "logo"`
// centres a tool's logo (`logo.src`) on a flat tile (`logo.background`).
function Overview({ overview, video, project }) {
  const [playing, setPlaying] = useState(false);
  const style = {
    "--slide-bg": overview.background ?? "var(--bone)",
    "--slide-ink": overview.ink ?? "var(--ink)",
    "--slide-muted": overview.muted ?? "#8f8a99",
    "--slide-font": overview.font ?? "var(--font-display)",
    "--slide-accent": overview.accent ?? "var(--coral)",
  };
  return (
    <section className="cs-overview" style={style} aria-labelledby="cs-overview">
      <div className="cs-overview__slide">
        <p className="cs-overview__label" id="cs-overview">
          <span /> overview
        </p>
        <div className="cs-overview__intro">
          {/* the project's video as a thumbnail; it opens and plays in a popup */}
          {video?.src ? (
            <figure className="media-slot cs-overview__card cs-overview__card--video" style={{ "--ratio": "16 / 9" }}>
              {overview.thumb === "tile" && project.logoBg ? (
                <span
                  className="media-slot__media cs-overview__tile"
                  style={{ backgroundColor: project.iconBg, backgroundImage: `url(${project.logoBg})` }}
                >
                  {project.icon && <img src={project.icon} alt="" />}
                </span>
              ) : (
                <img className="media-slot__media" src={video.poster} alt="" loading="lazy" decoding="async" />
              )}
              <button
                type="button"
                className="media-slot__play"
                aria-label={`Play video: ${video.alt}`}
                onClick={() => setPlaying(true)}
              >
                <span className="media-slot__play-badge">
                  <span className="media-slot__play-icon" aria-hidden="true" />
                </span>
              </button>
            </figure>
          ) : overview.thumb === "tile" && project.logoBg ? (
            // the same frame as the video card, without the play button
            <figure className="media-slot cs-overview__card cs-overview__card--video" style={{ "--ratio": "16 / 9" }}>
              <span
                className="media-slot__media cs-overview__tile"
                style={{ backgroundColor: project.iconBg, backgroundImage: `url(${project.logoBg})` }}
              >
                {project.icon && <img src={project.icon} alt="" />}
              </span>
            </figure>
          ) : overview.thumb === "logo" && overview.logo ? (
            <figure className="media-slot cs-overview__card cs-overview__card--video" style={{ "--ratio": "16 / 9" }}>
              <span className="media-slot__media cs-overview__tile" style={{ backgroundColor: overview.logo.background }}>
                <img src={overview.logo.src} alt={overview.logo.alt} />
              </span>
            </figure>
          ) : overview.thumb === "card" && project.cardArt ? (
            <figure className="media-slot cs-overview__card cs-overview__card--video" style={{ "--ratio": "16 / 9" }}>
              <img className="media-slot__media cs-overview__art" src={project.cardArt} alt="" loading="lazy" decoding="async" />
            </figure>
          ) : (
            overview.image && (
              <figure className="cs-overview__card">
                <img src={overview.image.src} alt={overview.image.alt} loading="lazy" decoding="async" />
              </figure>
            )
          )}
          <p className="cs-overview__statement">
            {overview.lead} <span>{overview.rest}</span>
          </p>
        </div>
        <div className="cs-overview__foot">
          <dl className="cs-overview__meta">
            {overview.meta.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {overview.tags?.length > 0 && (
            <ul className="cs-overview__tags" aria-label="Work involved">
              {overview.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Lightbox
        image={playing ? { ...video, video: true } : null}
        onClose={() => setPlaying(false)}
      />
    </section>
  );
}

// The "why" slide after the overview, in the project's own branding: the
// question and its answer side by side, then the features that solve the
// problem as a row of cards, each a big figure, a title and one line.
// `slab` and `stripes` echo the project's own decoration; `cardAccents`
// colours each card's top edge, like the app's dashboard cards.
// `titleStyle: "plain"` sets the title and figures upright in normal case,
// for a brand without a heavy italic; `image.frame` shows a photo inside the
// margins with rounded corners instead of bleeding off the edge;
// `image.ratio` and `image.position` crop a framed photo to its subject;
// `image.cutout` stands a cut-out product in a solid arch (`image.panel`);
// `image.placeholder` holds that frame open, labelled, until the photo exists.
function Why({ why }) {
  const style = {
    "--slide-bg": why.background ?? "var(--bone)",
    "--slide-ink": why.ink ?? "var(--ink)",
    "--slide-muted": why.muted ?? "#8f8a99",
    "--slide-font": why.font ?? "var(--font-display)",
    "--slide-accent": why.accent ?? "var(--coral)",
    "--card-ink": why.cardInk ?? "var(--ink)",
    "--card-muted": why.cardMuted ?? "#6f6a80",
    "--card-unit": why.cardUnit ?? "var(--coral)",
  };
  return (
    <section
      className={`cs-why${why.titleStyle === "plain" ? " cs-why--plain" : ""}`}
      style={style}
      aria-labelledby="cs-why"
    >
      <div className="cs-why__slide">
        {why.slab && <div className="cs-why__slab" style={{ background: why.slab }} aria-hidden="true" />}
        {why.stripes && (
          <div className="cs-why__stripes" aria-hidden="true">
            {why.stripes.map((colour) => (
              <span key={colour} style={{ background: colour }} />
            ))}
          </div>
        )}
        <div className="cs-why__copy">
          <h2 className="cs-why__title" id="cs-why">
            {why.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="cs-why__answer">
            <p className="cs-why__subhead">{why.subhead}</p>
            <p className="cs-why__text">{why.text}</p>
          </div>
          {/* the features as rows: figure, then what it means */}
          <ol className="cs-why__points">
            {why.points.map((point) => (
              <li key={point.title}>
                <span className="cs-why__value">
                  {point.value}
                  {point.unit && <span>{point.unit}</span>}
                </span>
                <span className="cs-why__point-body">
                  <span className="cs-why__point-title">{point.title}</span>
                  <span className="cs-why__point-text">{point.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        {why.image?.placeholder ? (
          <figure className="cs-why__art cs-why__art--frame cs-why__art--todo" aria-hidden="true">
            <span>image placeholder</span>
            <span>{why.image.placeholder}</span>
          </figure>
        ) : (
          why.image && (
            <figure
              className={`cs-why__art${why.image.frame ? " cs-why__art--frame" : ""}${
                why.image.cutout ? " cs-why__art--cutout" : ""
              }`}
              style={{
                "--art-ratio": why.image.ratio,
                "--art-pos": why.image.position,
                "--art-panel": why.image.panel,
              }}
            >
              <img src={why.image.src} alt={why.image.alt} loading="lazy" decoding="async" />
            </figure>
          )
        )}
      </div>
    </section>
  );
}

// ---- the deck: sections 4–7 as full-bleed slides ----
// A slide's colours and type come from `theme` (background, ink, muted,
// accent, font); the label is the slide's number and name, like
// "04 · the journey".
// `theme.plain` sets the slide's titles and figures upright in normal case,
// for a brand without a heavy italic.
function Slide({ theme = {}, index, label, className = "", children }) {
  const style = {
    "--slide-bg": theme.background ?? "var(--ink)",
    "--slide-ink": theme.ink ?? "var(--bone)",
    "--slide-muted": theme.muted ?? "var(--body-on-ink)",
    "--slide-font": theme.font ?? "var(--font-display)",
    "--slide-accent": theme.accent ?? "var(--coral)",
  };
  const id = `cs-slide-${index}`;
  return (
    <section
      className={`cs-slide ${className}${theme.plain ? " cs-slide--plain" : ""}`}
      style={style}
      aria-labelledby={id}
    >
      <div className="cs-slide__inner">
        <p className="cs-slide__label" id={id}>
          <span aria-hidden="true" /> {pad(index)} · {label}
        </p>
        {children}
      </div>
    </section>
  );
}

// 04 — one user's journey as a bento grid: tiles of different sizes, each
// a step with its visual and a floating stat card from the live app.
// Per step: `tile` ("wide" spans two columns), `tint` (the tile colour),
// `image` + `fit` ("phone" frames a phone screenshot; "mockup" shows a
// transparent device render as is), `place` (optional CSS for the render:
// width, left, top, to crop in on the device) and `chip` ({ label, value }).
function Journey({ journey }) {
  return (
    <Slide theme={journey.theme} index={4} label="the journey" className="cs-journey">
      <div className="cs-slide__head">
        <h2 className="cs-slide__title">
          <Accented text={journey.title} words={journey.titleAccent} />
        </h2>
        <p className="cs-slide__intro">{journey.intro}</p>
      </div>
      <ol className="cs-bento">
        {journey.steps.map((step, i) => (
          <li
            key={step.label}
            className={`cs-bento__tile cs-bento__tile--${step.tile ?? "single"} cs-bento__tile--${step.fit ?? "phone"}`}
            style={{ background: step.tint }}
          >
            <div className="cs-bento__copy">
              <p className="cs-bento__step">
                <span>{pad(i + 1)}</span> {step.label}
              </p>
              <h3 className="cs-bento__title">{step.title}</h3>
              <p className="cs-bento__text">{step.text}</p>
            </div>
            {step.image ? (
              <figure className="cs-bento__art">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  decoding="async"
                  className={step.place ? "is-placed" : undefined}
                  style={step.place}
                />
              </figure>
            ) : (
              // no visual yet: a frame to fill, shown in dev only
              import.meta.env.DEV && (
                <figure className="cs-bento__art cs-bento__art--todo" aria-hidden="true">
                  <span>add a screenshot</span>
                </figure>
              )
            )}
            {step.chip && (
              <p className="cs-bento__chip">
                <span>{step.chip.label}</span>
                <strong>{step.chip.value}</strong>
              </p>
            )}
          </li>
        ))}
      </ol>
    </Slide>
  );
}

// 05 — the title with the phases as a stepper beside it, then the three
// decisions as cards. A decision with a `visual` shows that real artifact
// from the build (a code excerpt, test output or a piece of the app's UI)
// in place of its body text; its payoff closes the card.
function Built({ theme, ownership, decisions, headline, titleAccent }) {
  return (
    <Slide theme={theme} index={5} label="how I built it" className="cs-built">
      <div className="cs-built__head">
        <h2 className="cs-slide__title">
          <Accented text={ownership.summary} words={titleAccent} />
        </h2>
        <ol className="cs-built__phases">
          {ownership.phases.map((phase, i) => (
            <li key={phase.label}>
              <span className="cs-built__node" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <span className="cs-built__phase">{phase.label}</span>
              <span className="cs-built__phase-text">{phase.text}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="cs-built__calls">
        <h3 className="cs-built__subhead">{headline}</h3>
        <ol className="cs-built__cards">
          {decisions.slice(0, 3).map((decision, i) => (
            <li key={decision.title} className="cs-built__card">
              <span className="cs-built__num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h4 className="cs-built__card-title">{decision.title}</h4>
              {decision.visual ? (
                <BuiltVisual visual={decision.visual} />
              ) : (
                <p className="cs-built__card-text">{decision.body}</p>
              )}
              {decision.payoff && (
                <p className="cs-built__payoff">
                  <span aria-hidden="true">→</span> {decision.payoff}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}

// A decision's artifact. "code": an excerpt in an editor frame, strings in
// the accent. "tests": test-runner lines and their summary. "demo": the
// app's demo-accounts panel, with its reset action. "image": a photo or
// screen from the build, framed.
function BuiltVisual({ visual }) {
  if (visual.kind === "image") {
    return (
      <figure className="cs-built__shot">
        <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
      </figure>
    );
  }
  if (visual.kind === "code") {
    return (
      <figure className="cs-built__window">
        <figcaption className="cs-built__window-bar">{visual.file}</figcaption>
        <pre className="cs-built__code">
          {visual.lines.map((line, i) => (
            <span key={i} className="cs-built__line">
              {line.split(/("[^"]*")/).map((part, k) =>
                part.startsWith('"') ? <em key={k}>{part}</em> : part,
              )}
            </span>
          ))}
        </pre>
      </figure>
    );
  }
  if (visual.kind === "tests") {
    return (
      <figure className="cs-built__window">
        <figcaption className="cs-built__window-bar">{visual.command}</figcaption>
        <pre className="cs-built__code">
          {visual.lines.map((line) => (
            <span key={line} className="cs-built__line">
              <em>✓</em> {line}
            </span>
          ))}
          <span className="cs-built__line cs-built__line--summary">{visual.summary}</span>
        </pre>
      </figure>
    );
  }
  return (
    <figure className="cs-built__demo">
      <figcaption>
        <span>{visual.title}</span>
        <span className="cs-built__demo-action">↺ {visual.action}</span>
      </figcaption>
      <ul>
        {visual.accounts.map(([email, role]) => (
          <li key={email}>
            <span>{email}</span>
            <span>{role}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

// 06 — the outcome: the story on the left, and on the right the effects of
// the work as impact cards, each a figure, what it means and, where the data
// allows, a bar chart of it: `chart.groups`, each with one value or two
// (without → with), the "with" bars solid and the rest faint. Values show
// only where a group has `text`. Keep each card to a figure, a short line and
// one chart; conditions go once in `impactsLabel`.
function Outcome({ theme, outcome, kpis, method, note }) {
  const impacts = outcome.impacts ?? kpis.map((kpi) => ({ value: kpi.value, label: kpi.label }));
  return (
    <Slide theme={theme} index={6} label="outcome" className="cs-result">
      <div className="cs-result__grid">
        <div className="cs-result__copy">
          {outcome.status && <p className="cs-result__status">{outcome.status}</p>}
          <h2 className="cs-slide__title">
            <Accented text={outcome.headline} words={outcome.titleAccent} />
          </h2>
          <p className="cs-slide__intro">{outcome.text}</p>
          {(method.length > 0 || note) && (
            <details className="cs-result__details">
              <summary>{outcome.noteLabel ?? "how the estimates were made"}</summary>
              {method.map((item) => (
                <p key={item.text}>{item.text}</p>
              ))}
              {note && <p>{note}</p>}
            </details>
          )}
        </div>
        <div className="cs-result__impacts">
          {outcome.impactsLabel && <h3 className="cs-result__impacts-label">{outcome.impactsLabel}</h3>}
          <ul className="cs-impacts" aria-label="Impact">
            {impacts.map((impact) => (
              <li key={impact.label} className={`cs-impact cs-impact--${impact.tone ?? "light"}`}>
                <span className="cs-impact__value">{impact.value}</span>
                <span className="cs-impact__label">
                  {impact.label}
                  {impact.tag && <em> ({impact.tag})</em>}
                </span>
                {impact.chart && <ImpactBars chart={impact.chart} />}
                {impact.note && <span className="cs-impact__note">{impact.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  );
}

// Bars from zero on one scale. A group with one value is a single bar
// (solid if `on`); a group with two is a faint "without" bar beside a solid
// "with" bar. `text` labels sit on top of their bars.
function ImpactBars({ chart }) {
  const max = Math.max(...chart.groups.flatMap((group) => group.values));
  return (
    <figure className="cs-bars" aria-label={chart.summary}>
      {chart.caption && <figcaption className="cs-bars__caption">{chart.caption}</figcaption>}
      <div className="cs-bars__plot">
        {chart.groups.map((group) => (
          <div key={group.label} className="cs-bars__group">
            <span className="cs-bars__track">
              {group.values.map((value, k) => {
                const on = group.values.length > 1 ? k === 1 : group.on;
                return (
                  <span
                    key={k}
                    className={`cs-bars__bar${on ? " is-on" : ""}`}
                    style={{ height: `${(value / max) * 100}%` }}
                  >
                    {group.text?.[k] && <span className="cs-bars__value">{group.text[k]}</span>}
                  </span>
                );
              })}
            </span>
            <span className="cs-bars__label">{group.label}</span>
          </div>
        ))}
      </div>
      {chart.legend && (
        <p className="cs-bars__legend">
          <span>
            <i className="cs-bars__key" />
            {chart.legend[0]}
          </span>
          <span>
            <i className="cs-bars__key is-on" />
            {chart.legend[1]}
          </span>
        </p>
      )}
    </figure>
  );
}

// 07 — the closing slide: a big question with the call to action beside
// it and one supporting line, over either a full-bleed photo (`image`) or a
// flat colour with a transparent cutout rising from the bottom right
// (`cutout`).
// `narrow` sets the question smaller and on more lines, for a photo whose
// subject reaches further left; `cutout.mark` sizes the cutout as a logo
// mark beside the text rather than a figure rising from the bottom;
// `cutout.height`, `cutout.bottom` and `cutout.right` size and place a
// figure that's wider than the default hand.
function Closing({ closing, contactTo }) {
  const style = {
    "--slide-bg": closing.background ?? "var(--bone)",
    "--slide-ink": closing.ink ?? "var(--ink)",
    "--slide-font": closing.font ?? "var(--font-display)",
    "--slide-accent": closing.accent ?? "var(--coral)",
    "--slide-muted": closing.muted ?? "var(--slide-ink)",
  };
  return (
    <section
      className={`cs-end${closing.cutout ? " cs-end--cutout" : ""}${closing.cutout?.mark ? " cs-end--mark" : ""}${closing.narrow ? " cs-end--narrow" : ""}`}
      style={style}
      aria-labelledby="cs-end"
    >
      {closing.image && (
        <img className="cs-end__photo" src={closing.image.src} alt={closing.image.alt} loading="lazy" decoding="async" />
      )}
      {closing.cutout && (
        <img
          className="cs-end__cutout"
          src={closing.cutout.src}
          alt={closing.cutout.alt}
          loading="lazy"
          decoding="async"
          style={{
            "--cutout-h": closing.cutout.height,
            "--cutout-bottom": closing.cutout.bottom,
            "--cutout-right": closing.cutout.right,
          }}
        />
      )}
      <div className="cs-end__inner">
        <div className="cs-end__top">
          <h2 className="cs-end__title" id="cs-end">
            {closing.title}{" "}
            {/* the portfolio's pill (label, then a white circle with an arrow),
                in the project's accent */}
            <Link to={contactTo} className="cs-end__button">
              {closing.cta}
              <span className="cs-end__icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </span>
            </Link>
          </h2>
        </div>
        <p className="cs-end__text">{closing.text}</p>
      </div>
    </section>
  );
}

// Where a case study's call to action goes: the home page's contact form,
// pre-filled with the project (`re`) and its service (`service`).
function contactLink(project) {
  const params = new URLSearchParams({ re: project.title });
  if (project.services?.[0]) params.set("service", project.services[0]);
  return `/?${params.toString()}#contact`;
}

// The handoff to the next case study, in the site's own colours: its /work
// tile as a small preview, then its name, summary and an arrow. Below it,
// the previous project and the way back to all work.
function NextTeaser({ next, prev }) {
  return (
    <nav className="cs-nextband" aria-label="More case studies">
      <div className="wrap">
        <Link to={`/work/${next.slug}`} className="cs-nextband__link">
          <span className="cs-nextband__tile" aria-hidden="true">
            <ProjectCover project={next} />
          </span>
          <span className="cs-nextband__text">
            <span className="cs-nextband__kicker">next case study</span>
            <span className="cs-nextband__title">{next.title}</span>
            <span className="cs-nextband__summary">{next.summary}</span>
          </span>
          <span className="cs-nextband__go" aria-hidden="true">
            →
          </span>
        </Link>
        <div className="cs-nextband__row">
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="cs-nextband__small">
              <span aria-hidden="true">←</span> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          <Link to="/work" className="cs-nextband__small">
            all work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// A terminal window, like the site's "> new-inquiry" form.
function Window({ title, aside, className = "", children }) {
  return (
    <div className={`cs-window ${className}`}>
      <p className="cs-window__bar">
        <span>
          <span className="cs-window__mark">&gt;</span> {title}
        </span>
        {aside && <span className="cs-window__aside">{aside}</span>}
      </p>
      {children}
    </div>
  );
}

// The challenge's role-based access, shown the way the app shows it: one
// app, a different menu per role. Picking a role lights up the screens
// its menu has and locks the rest.
function RoleSwitcher({ access }) {
  const [active, setActive] = useState(0);
  const role = access.roles[active];
  const allowed = new Set(role.screens);

  return (
    <Window
      title={`signed in as ${role.role.toLowerCase()}`}
      aside="role-based access"
      className="cs-roles"
    >
      <div className="cs-roles__tabs" role="group" aria-label="Sign in as">
        {access.roles.map((item, i) => (
          <button
            type="button"
            key={item.role}
            className={i === active ? "is-active" : undefined}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            {item.role}
          </button>
        ))}
      </div>

      <ul
        className="cs-roles__menu"
        aria-live="polite"
        aria-label={`${role.role} menu`}
      >
        {access.screens.map((screen) => {
          const open = allowed.has(screen);
          return (
            <li key={screen} className={open ? "is-open" : undefined}>
              <span className="cs-roles__mark" aria-hidden="true" />
              <span className="cs-roles__screen">{screen}</span>
              <span className="cs-roles__state">
                {open ? "open" : "locked"}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="cs-roles__key">
        <strong>
          {role.screens.length} of {access.screens.length}
        </strong>{" "}
        screens · each role&rsquo;s real menu in the live build
      </p>
    </Window>
  );
}

// "who it's for", under the challenge copy.
function Audience({ text }) {
  if (!text) return null;
  return (
    <p className="cs-small">
      <span>who it&rsquo;s for</span>
      {text}
    </p>
  );
}

// The solution's visual, by what the project has to show:
//   "tour"     screenshots as browser tabs (steps: title, route?, body, image, alt)
//   "gallery"  framed photos (items: src, alt, caption); `layout: "stack"`
//              shows wide screenshots one per row at their own proportions
//   "features" numbered capability cards, for work without screens (items: title, body)
function Solution({ flow }) {
  if (flow.kind === "gallery") {
    return (
      <div
        className={`cs-gallery${flow.layout === "stack" || flow.items.length === 1 ? " cs-gallery--stack" : ""}`}
        style={{ "--cols": Math.min(flow.items.length, 2) }}
      >
        {flow.items.map((item) => (
          <figure key={item.src}>
            <div className="cs-gallery__frame">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }

  if (flow.kind === "features") {
    return (
      <ol className="cs-features">
        {flow.items.map((item, i) => (
          <li key={item.title}>
            <span className="cs-features__num">{pad(i + 1)}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
    );
  }

  return <ScreenTour steps={flow.steps} host={flow.host} variant="stage" />;
}

// A section's label and headline: "01 / the challenge", then one sentence.
function Heading({ index, label, children }) {
  return (
    <header className="cs-heading">
      <p className="cs-label" id={`cs-${index}`}>
        <span>{pad(index)}</span> / {label}
      </p>
      {children && (
        <Reveal as="h2" className="cs-headline">
          {children}
        </Reveal>
      )}
    </header>
  );
}

function CaseTemplate({ project, nextProject }) {
  const { story } = project;
  // The project's details as tags: role, then timeline, then each tool.
  const tags = [
    project.facts?.role && { kind: "role", text: project.facts.role },
    project.facts?.timeline && { kind: "time", text: project.facts.timeline },
    ...(project.facts?.stack ?? "")
      .split("·")
      .map((tool) => tool.trim())
      .filter(Boolean)
      .map((tool) => ({ kind: "tool", text: tool })),
  ].filter(Boolean);
  const slug = project.slug;
  const phases = story.ownership.phases;
  const hasTeammates = phases.some((phase) => !phase.mine);
  const method =
    project.evidence?.filter((item) => METHOD_KINDS.has(item.kind)) ?? [];

  // what it shows about me, and the next step; a slide of its own in the deck
  const close = (
  <section
    className="wrap cs-close"
    aria-label="Skills shown and next step"
  >
    <div className="cs-close__skills">
      <p className="cs-label">skills shown</p>
      <ul className="cs-skills__list">
        {story.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>

    <div className="cs-cta">
      <p className="cs-cta__title">Need something like this?</p>
      <p className="cs-cta__text">
        {story.ctaText ??
          "Turn your rules and spreadsheets into an app your team can click through."}
      </p>
      {/* the home hero's pill, in a flat fill */}
      <Link to={contactLink(project)} className="cs-cta__button">
        tell me about it
        <span className="cs-cta__icon" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3v10M4 9l4 4 4-4" />
          </svg>
        </span>
      </Link>
    </div>
  </section>
  );

  return (
    <article className={`cs${story.cover ? " cs--covered" : ""}`} key={slug}>
      {story.cover && <Cover title={project.title} cover={story.cover} />}
      {story.overview && <Overview overview={story.overview} video={story.overview.showVideo ? story.video : null} project={project} />}
      {story.why && <Why why={story.why} />}

      {/* the deck: with a journey, sections 4–7 are slides */}
      {story.journey && (
        <>
          <Journey journey={story.journey} />
          <Built
            theme={story.builtTheme}
            ownership={story.ownership}
            decisions={project.decisions}
            headline={story.decisionsHeadline ?? "The calls that shaped it."}
            titleAccent={story.builtTitleAccent}
          />
          {story.outcome && (
            <Outcome
              theme={story.outcomeTheme}
              outcome={story.outcome}
              kpis={story.kpis}
              method={method}
              note={project.evidenceNote}
            />
          )}
          {story.closing ? (
            <Closing closing={story.closing} contactTo={contactLink(project)} />
          ) : (
            <Slide theme={story.closeTheme} index={7} label="skills & contact" className="cs-deck-close">
              {close}
            </Slide>
          )}
        </>
      )}

      {/* without a journey: the earlier single-page layout */}
      {!story.journey && (
        <>

      {/* -------- hero: title and tags, then the highlights, then the video -------- */}
      <header className="wrap cs-hero">
        {/* with a cover, the cover carries the title and the way back */}
        {!story.cover && (
          <>
            <Link to="/work" className="cs-back">
              ← all work
            </Link>
            <Reveal as="h1" className="cs-hero__title">
              {project.title}
              <span className="cs-hero__cursor" aria-hidden="true" />
            </Reveal>
          </>
        )}

        {/* the details as tags: role first, then when and where, then the stack */}
        {/* the overview slide carries the details when there is one */}
        {!story.overview && (
        <ul className="cs-tags" aria-label="Project details">
          {tags.map((tag) => (
            <li
              className={`cs-tags__item cs-tags__item--${tag.kind}`}
              key={tag.text}
            >
              {tag.text}
            </li>
          ))}
          {project.links?.map((link) => (
            <li className="cs-tags__item cs-tags__item--link" key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
        )}

        {/* the highlights: the home hero's stats strip */}
        <ul
          className="cs-stats"
          style={{ "--cols": story.kpis.length }}
          aria-label="Highlights"
        >
          {story.kpis.map((kpi) => (
            <li key={kpi.label}>
              <span className="cs-stats__value">{kpi.value}</span>
              <span className="cs-stats__label">{kpi.label}</span>
            </li>
          ))}
        </ul>
      </header>

      {/* the video runs edge to edge, unless the overview already plays it */}
      {!story.overview?.showVideo && (
        <div className="cs-video">
          <MediaSlot media={story.video} kind="video" cover={<ProjectCover project={project} />} />
        </div>
      )}

      {/* -------- 01 challenge: the problem, then the rules it meant -------- */}
      <section className="wrap cs-section" aria-labelledby="cs-1">
        <Heading index={1} label="the challenge" />
        {story.context.access ? (
          <div className="cs-challenge">
            <div className="cs-challenge__copy">
              <Reveal as="blockquote" className="cs-quote">
                {project.glance.problem}
              </Reveal>
              <p className="cs-text">{story.context.text}</p>
              <Audience text={story.context.audience} />
            </div>
            <RoleSwitcher access={story.context.access} />
          </div>
        ) : (
          // no visual: the quote left, the explanation right
          <div className="cs-challenge cs-challenge--split">
            <Reveal as="blockquote" className="cs-quote">
              {project.glance.problem}
            </Reveal>
            <div className="cs-challenge__copy">
              <p className="cs-text">{story.context.text}</p>
              <Audience text={story.context.audience} />
            </div>
          </div>
        )}
      </section>

      {/* -------- 02 solution: the product -------- */}
      <section className="wrap cs-section" aria-labelledby="cs-2">
        <Heading index={2} label="the solution">
          {project.glance.built}
        </Heading>
        <Solution flow={story.flow} />
      </section>

      {/* -------- 03 how I built it: the process, then the reasoning, on the bone sheet -------- */}
      <section className="cs-sheet" aria-labelledby="cs-3">
        <div className="wrap">
          <Heading index={3} label="how I built it">
            {story.ownership.summary}
          </Heading>

          <ol
            className="cs-process"
            style={{ "--phase-count": phases.length }}
            aria-label="Phases of the work"
          >
            {phases.map((phase, i) => (
              <li
                className={phase.mine ? undefined : "is-team"}
                key={phase.label}
              >
                <span className="cs-process__node" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className="cs-process__label">{phase.label}</span>
                <span className="cs-process__text">{phase.text}</span>
                {hasTeammates && (
                  <span className="cs-process__owner">
                    {phase.mine ? "me" : "teammate"}
                  </span>
                )}
              </li>
            ))}
          </ol>

          <h3 className="cs-sheet__subhead">
            {story.decisionsHeadline ?? "The calls that shaped it."}
          </h3>
          {/* number · decision · what it is and what it bought */}
          <ol className="cs-decisions">
            {project.decisions.slice(0, 3).map((decision, i) => (
              <li key={decision.title}>
                <span className="cs-decisions__num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h4>{decision.title}</h4>
                <div className="cs-decisions__main">
                  <p>{decision.body}</p>
                  {decision.payoff && (
                    <p className="cs-decisions__payoff">
                      <span aria-hidden="true">→</span> {decision.payoff}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------- 04 outcome: one statement, the method one click away -------- */}
      {story.outcome && (
        <section className="wrap cs-section cs-outcome" aria-labelledby="cs-4">
          <Heading index={4} label="outcome">
            {story.outcome.headline}
          </Heading>
          <div className="cs-outcome__body">
            <p className="cs-text">{story.outcome.text}</p>
            {(method.length > 0 || project.evidenceNote) && (
              <details className="cs-details">
                <summary>
                  {story.outcome.noteLabel ?? "how the estimates were made"}
                </summary>
                {method.map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
                {project.evidenceNote && <p>{project.evidenceNote}</p>}
              </details>
            )}
          </div>
        </section>
      )}

          {close}
        </>
      )}

      {/* -------- next case study -------- */}
      {nextProject && (
        <NextTeaser next={nextProject} prev={projects.find((p) => p.next === project.slug)} />
      )}

    </article>
  );
}

export default CaseTemplate;
