// What the hero terminal answers on its own, built from the data folder so
// it stays current as projects, roles and skills change. It works with no
// network at all, so the terminal stays useful if the AI agent is down or
// rate-limited; anything not matched here goes to the agent (HeroDevice).
//
// Three layers, checked in order:
//   1. slash commands  — "/work", "/about", "/contact"… the ONLY inputs that
//                        move the page or open something
//   2. commands        — single words like "projects", "skills ai", "help"
//   3. FAQ intents     — plain questions matched by regex, e.g. "how many
//                        years of experience does she have?"
//
// runCommand(input, ctx) returns null (not handled) or
//   { lines: [{ text, ok?, dim?, down? }], action?: () => void, immediate?: boolean }
// ctx: { navigate, scrollToSection }
import projects, { CATEGORIES } from "../data/projects.js";
import experience, { education } from "../data/experience.js";
import skillGroups from "../data/skills.js";
import recognition from "../data/recognition.js";
import services from "../data/services.js";
import processSteps from "../data/process.js";
import highlights from "../data/highlights.js";
import { visibleTestimonials } from "../data/testimonials.js";

const EMAIL = "maryamielcatado@gmail.com";
const RESUME = "/Amiel_Catado_Resume.pdf";
const GITHUB = "https://github.com/emyeeeel";
const LINKEDIN = "https://linkedin.com/in/emyeeeel";

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));
const ok = (text) => ({ text, ok: true });
const dim = (text) => ({ text, dim: true });
const err = (text) => ({ text, down: true });
const reply = (...lines) => ({ lines });

const visible = (items) => (import.meta.env.DEV ? items : items.filter((item) => !item.placeholder));
const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

// ---------------------------------------------------------------- facts --

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function startOf(dates) {
  const m = /([A-Za-z]{3})\w*\s+(\d{4})/.exec(dates ?? "");
  if (!m) return null;
  return new Date(Number(m[2]), Math.max(0, MONTHS.indexOf(m[1].toLowerCase())), 1);
}

function yearsOfExperience() {
  const starts = experience.map((e) => startOf(e.dates)).filter(Boolean);
  const first = new Date(Math.min(...starts));
  const years = (Date.now() - first) / (365.25 * 24 * 3600 * 1000);
  return { years: Math.floor(years), first };
}

function cebuTime() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  }).format(new Date());
}

function findProject(term) {
  const t = squash(term);
  if (t.length < 3) return null;
  return (
    projects.find((p) => squash(p.slug) === t || squash(p.title) === t) ??
    projects.find((p) => squash(p.slug).startsWith(t) || squash(p.title).startsWith(t))
  );
}

// A project named anywhere in a sentence ("what is spoonfull?").
function mentionedProject(text) {
  const t = ` ${text.toLowerCase().replace(/[?!.,]/g, " ")} `;
  return projects.find((p) =>
    [p.title.toLowerCase(), p.slug.replace(/-/g, " ")].some((n) => t.includes(` ${n} `)),
  );
}

function figuresOf(project) {
  return visible(project.highlights ?? [])
    .slice(0, 2)
    .map((h) => `${h.trend === "down" ? "↓" : h.trend === "up" ? "↑" : ""}${h.value} ${h.label.toLowerCase()}`);
}

function projectCard(project) {
  return reply(
    ok(`${project.title} · ${CATEGORY_LABELS[project.category]?.toLowerCase() ?? ""}`),
    { text: project.summary },
    ...figuresOf(project).map((f) => dim(`  ${f}`)),
    dim(`  stack: ${(project.tags ?? []).slice(0, 4).join(", ")}`),
    dim(`→ /open ${project.slug} for the case study`),
  );
}

function skillMatches(term) {
  const t = squash(term);
  if (t.length < 2) return [];
  const hits = [];
  skillGroups.forEach((g) =>
    g.items.forEach((item) => {
      const s = squash(item);
      if (s === t || (t.length >= 3 && (s.includes(t) || (t.includes(s) && s.length >= 3)))) {
        hits.push({ item, group: g.label });
      }
    }),
  );
  return hits;
}

function projectsUsing(term) {
  const t = squash(term);
  if (t.length < 2) return [];
  return projects.filter((p) => (p.tags ?? []).some((tag) => squash(tag) === t || squash(tag).includes(t)));
}

// ------------------------------------------------------------- answers --

const ANSWERS = {
  help: () =>
    reply(
      ok('ask anything, e.g. "how many projects?"'),
      ok("commands: projects · skills · experience"),
      ok("  education · awards · services · impact"),
      ok("  process · testimonials · whoami · time"),
      ok("go to:  /work /about /experience /skills"),
      ok("  /services /process /contact /resume"),
      ok("  /open <project> · /github · /linkedin"),
      dim("scroll the screen ↑↓ to read long answers"),
    ),

  whoami: () =>
    reply(
      ok("Amiel · software developer & automation builder"),
      { text: "Builds apps, automations and reports that give teams their hours back." },
      dim("Cebu, Philippines · GMT+8 · open for freelance & remote work"),
    ),

  projects: () => {
    const counts = CATEGORIES.filter((c) => c.key !== "all").map(
      (c) => `${projects.filter((p) => p.category === c.key).length} ${c.label.toLowerCase()}`,
    );
    return reply(
      ok(`${projects.length} projects · ${counts.join(" · ")}`),
      ...projects.map((p) => dim(`  ${p.slug}`)),
      dim("→ type a name for details, /open <name> to read it"),
    );
  },

  experience: () => {
    const { years, first } = yearsOfExperience();
    return reply(
      ok(`${years}+ years since her first role (${first.getFullYear()}) · ${experience.length} roles`),
      ...experience.flatMap((e) => [
        { text: `${e.role}${e.current ? " · now" : ""}` },
        dim(`  ${e.detail} · ${e.dates}`),
      ]),
    );
  },

  current: () => {
    const now = experience.filter((e) => e.current);
    return reply(ok(`currently ${now.length} roles:`), ...now.map((e) => dim(`  ${e.role} · ${e.detail}`)));
  },

  education: () =>
    reply(
      ok(`${education.role} · ${education.org}`),
      { text: "First triple major in USJ-R's School of Computer Studies: AI, web and mobile." },
      ...education.highlights.map((h) => dim(`  ${h.kind === "award" ? "★" : "▸"} ${h.title}`)),
    ),

  awards: () => {
    const school = education.highlights.filter((h) => h.kind === "award");
    return reply(
      ok(`${recognition.length + school.length} awards & honours:`),
      ...recognition.map((r) => dim(`  ★ ${r.title} · ${r.year}`)),
      ...school.map((h) => dim(`  ★ ${h.title}`)),
    );
  },

  services: () =>
    reply(
      ok(`${services.length} services:`),
      ...services.flatMap((s) => [{ text: `${s.index} ${s.title}` }, dim(`   ${s.need}`)]),
      dim("→ /services to see them, /contact to start"),
    ),

  skills: () =>
    reply(
      ...skillGroups.map((g) => ok(`${g.key.padEnd(13)}${g.items.slice(0, 3).join(", ")}…`)),
      dim('→ "skills <group>" for the full list'),
    ),

  process: () => reply(ok("how a project runs:"), ...processSteps.map((s) => dim(`  ${s.number} ${s.title}`))),

  impact: () => reply(ok("results so far:"), ...visible(highlights).map((h) => dim(`  ${h.value.padEnd(7)}${h.label}`))),

  testimonials: () => {
    const quotes = visible(visibleTestimonials);
    if (!quotes.length) return reply(dim("no testimonials yet"));
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    return reply(
      ok(`${quotes.length} recommendation${quotes.length > 1 ? "s" : ""} · one of them:`),
      { text: `"${q.quote}"` },
      dim(`  — ${q.name}, ${q.role}, ${q.company}`),
    );
  },

  contact: () =>
    reply(
      ok(`email: ${EMAIL}`),
      { text: "Open for freelance and remote work." },
      dim("→ /contact for the form, /linkedin, /github"),
    ),

  location: () => reply(ok(`Cebu, Philippines · GMT+8 · now ${cebuTime()}`), dim("works remotely with teams anywhere")),
  time: () => reply(ok(`${cebuTime()} in Cebu (GMT+8)`)),
  resume: () => reply(ok("résumé (PDF) is available"), dim("→ /resume to open it")),
  rates: () =>
    reply(
      ok("pricing depends on scope and timeline"),
      { text: "Share what you need and you'll get a quote." },
      dim(`→ /contact or ${EMAIL}`),
    ),
  languages: () =>
    reply(
      ok("communicates in English and Japanese"),
      dim("bridged English–Japanese for her multinational iPBL team in Osaka"),
    ),
  remote: () =>
    reply(
      ok("yes, remote-ready"),
      dim("  backup internet and a generator for outages · GMT+8"),
      dim("  currently works remotely for clients and agencies"),
    ),
  ai: () => {
    const g = skillGroups.find((x) => x.key === "ai");
    const used = projects.filter((p) => (p.tags ?? []).some((t) => /llm|rag|machine|vision|scikit/i.test(t)));
    return reply(
      ok("yes, AI is part of her work"),
      { text: g ? g.items.join(" · ") : "" },
      dim(`  used in: ${used.map((p) => p.title).join(", ")}`),
    );
  },
  years: () => {
    const { years, first } = yearsOfExperience();
    const counts = experience.reduce((acc, e) => {
      const t = e.current ? "current" : "past";
      acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {});
    const parts = Object.entries(counts).map(([t, n]) => `${n} ${t}`);
    return reply(
      ok(`${years}+ years of hands-on experience`),
      {
        text: `Since her first role in ${first.toLocaleString("en-US", { month: "short" })} ${first.getFullYear()}, across ${experience.length} roles (${parts.join(", ")}).`,
      },
      dim('→ "experience" for the full list'),
    );
  },
};

// ----------------------------------------------- 1. slash commands (go) --

const go = (label, run) => ({ lines: [ok(`→ ${label} ...`)], action: run });
const openTab = (label, url) => ({
  lines: [ok(`→ opening ${label} ...`)],
  // Opened synchronously inside the submit handler so popup blockers still
  // treat it as user-initiated.
  immediate: true,
  action: () => window.open(url, "_blank", "noopener"),
});
const section = (id) => (_, { scrollToSection }) => go(`jumping to #${id}`, () => scrollToSection(id));

const SLASH = {
  home: () => go("back to the top", () => window.scrollTo({ top: 0, behavior: "smooth" })),
  top: () => SLASH.home(),
  work: section("work"),
  works: section("work"),
  skills: section("skills"),
  experience: section("experience"),
  exp: section("experience"),
  about: section("about"),
  process: section("process"),
  approach: section("process"),
  services: section("services"),
  contact: section("contact"),
  projects: (_, { navigate }) => go("opening /work", () => navigate("/work")),
  aboutme: (_, { navigate }) => go("opening /about", () => navigate("/about")),
  resume: () => openTab("résumé (PDF)", RESUME),
  cv: () => openTab("résumé (PDF)", RESUME),
  github: () => openTab("GitHub", GITHUB),
  linkedin: () => openTab("LinkedIn", LINKEDIN),
  open: (arg, { navigate }) => {
    const project = findProject(arg);
    if (!project) return reply(err(`no project called "${arg || "…"}"`), dim('→ type "projects" to list them'));
    return go(`opening ${project.title}`, () => navigate(`/work/${project.slug}`));
  },
};

// ------------------------------------------------------ 2. word commands --

const WORDS = {
  help: "help", "?": "help", commands: "help", menu: "help",
  whoami: "whoami", me: "whoami", about: "whoami", amiel: "whoami", bio: "whoami",
  projects: "projects", ls: "projects", work: "projects", works: "projects", portfolio: "projects",
  experience: "experience", exp: "experience", jobs: "experience", career: "experience",
  education: "education", edu: "education", school: "education", degree: "education",
  awards: "awards", recognition: "awards", achievements: "awards",
  services: "services", offer: "services",
  skills: "skills", stack: "skills", tools: "skills", tech: "skills",
  process: "process", approach: "process",
  impact: "impact", results: "impact", stats: "impact",
  testimonials: "testimonials", reviews: "testimonials", testimonial: "testimonials",
  contact: "contact", email: "contact", mail: "contact", hire: "contact",
  github: "contact", linkedin: "contact",
  time: "time", location: "location", where: "location",
  resume: "resume", cv: "resume", "résumé": "resume",
  rates: "rates", pricing: "rates", price: "rates",
};

// ------------------------------------------------------ 3. FAQ intents --
// Checked against the whole sentence, in order; the first match answers.
// Any subject works (she/her/he/you/amiel).

const FAQ = [
  [/\bhow (many|much)\b.*\b(years?|long)\b|\byears? of (experience|exp)\b|\bhow long (has|have)\b.*\b(work|cod|develop|been)/, "years"],
  [/\bhow many\b.*\b(projects?|works?|apps?|systems?|builds?)\b|\bnumber of projects\b|\bproject count\b/, "projects"],
  [/\bhow many\b.*\b(roles?|jobs?|companies|clients|positions?)\b/, "experience"],
  [/\bhow many\b.*\b(awards?|wins?|prizes?|competitions?)\b/, "awards"],
  [/\b(where|who)\b.*\b(works?|working|employ\w*)\b.*\b(now|currently|today)\b|\bcurrent(ly)?\b.*\b(job|role|work|position|employ\w*|company)\b|\bwhat does (she|he|amiel|you) do\b/, "current"],
  [/\b(services?|offer(s|ing)?|what can (she|he|amiel|you) (do|build|help)|help (me|us) with|what kind of (work|projects))\b/, "services"],
  [/\b(price|pricing|rates?|cost|charge|budget|quote)\b|\bhow much (does|do|would|is)\b/, "rates"],
  [/\b(hire|contact|reach|email|get in touch|talk to|book|available|availability|freelance)\b/, "contact"],
  [/\b(remote\w*|work from home|wfh|time ?zone|internet|outage|setup)\b/, "remote"],
  [/\b(where|location|based|live|country|city)\b/, "location"],
  [/\b(speak|spoken|japanese|english)\b|\blanguages? (does|do|can) (she|he|you)\b/, "languages"],
  [/\b(degree|educat\w*|school|stud(y|ied|ent)|graduat\w*|university|college|major|dean)\b/, "education"],
  [/\b(awards?|won|win|wins|recogni\w*|achievements?|hackathon|competition|prize|honou?rs?)\b/, "awards"],
  [/\b(experience|career|worked|jobs?|roles?|employment|background|internships?)\b/, "experience"],
  [/\b(ai|machine learning|ml|llm|rag|artificial intelligence|computer vision)\b/, "ai"],
  [/\b(skills?|stack|tech(nolog\w*)?|tools?|languages?|frameworks?|programming)\b/, "skills"],
  [/\b(process|approach|methodolog\w*|workflow)\b|\bhow (does|do) (she|he|amiel|you) work\b/, "process"],
  [/\b(impact|results?|sav(e|es|ed|ings)|roi|hours|money|numbers|metrics|outcomes?)\b/, "impact"],
  [/\b(testimonials?|reviews?|recommend\w*|references?)\b|\bwhat (do|did) (people|others|clients) say\b/, "testimonials"],
  [/\b(resume|résumé|cv)\b/, "resume"],
  [/\b(projects?|portfolio|works?|built|made|case stud(y|ies))\b/, "projects"],
  [/\b(who (is|are)|about (her|him|you|amiel)|tell me about (her|him|yourself|amiel)|introduce)\b/, "whoami"],
  [/\bwhat time\b/, "time"],
];

// "does she know python?", "has she used make.com?"
const KNOWS = /\b(?:know|knows|uses?|used|using|works? with|worked with|familiar with|experience (?:with|in)|skilled in|good at|code in)\s+(.+?)\??$/;

function answerKnows(term) {
  const clean = term.replace(/\b(the|a|an|any|some)\b/g, "").trim();
  const hits = skillMatches(clean);
  const used = projectsUsing(clean);
  if (!hits.length && !used.length) return null;
  const name = hits[0]?.item ?? clean;
  return reply(
    ok(`yes — ${name}${hits[0] ? ` (${hits[0].group})` : ""}`),
    used.length
      ? dim(`  used in: ${used.slice(0, 4).map((p) => p.title).join(", ")}`)
      : dim("  part of her toolkit"),
  );
}

// ------------------------------------------------------------ dispatch --

export default function runCommand(input, ctx) {
  const raw = input.trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();

  // 1. Slash commands are the only way to move the page.
  if (lower.startsWith("/")) {
    const head = lower.slice(1).split(/\s+/)[0];
    const handler = SLASH[head];
    if (handler) return handler(raw.slice(head.length + 1).trim(), ctx);
    return reply(err(`unknown: /${head}`), dim('→ type "help" for the list'));
  }

  // 2. Single-word commands (and "skills <group>", "open <project>").
  const words = lower.split(/\s+/);
  const [head, ...rest] = words;
  if (head === "skills" && rest.length) {
    const t = rest.join(" ");
    const group = skillGroups.find((g) => g.key === t || g.key.startsWith(t) || g.label.toLowerCase().startsWith(t));
    if (group) return reply(ok(`${group.label}:`), { text: group.items.join(" · ") });
    return reply(err(`no group "${t}"`), dim('→ "skills" to see the groups'));
  }
  if (head === "open" && rest.length) return SLASH.open(rest.join(" "), ctx);
  if (head === "sudo") return reply(err("nice try. permission denied."));
  if (/^(hi|hey|hello|yo|good (morning|afternoon|evening))\b/.test(lower) && words.length <= 3) {
    return reply(ok('hey! ask me anything, or type "help".'));
  }
  if (WORDS[lower]) return ANSWERS[WORDS[lower]]();

  // A project's name on its own, or named in a question.
  const project = (words.length <= 3 ? findProject(lower) : null) ?? mentionedProject(lower);
  if (project) return projectCard(project);

  // "does she know X?"
  const knows = KNOWS.exec(lower);
  if (knows) {
    const answer = answerKnows(knows[1]);
    if (answer) return answer;
  }

  // 3. Plain-language questions.
  for (const [pattern, intent] of FAQ) {
    if (pattern.test(lower)) return ANSWERS[intent]();
  }
  return null;
}
