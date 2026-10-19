import projects from "./projects.js";

// The hero's figures strip — short, eye-catching highlights about the
// work itself. Most are counted from projects.js, so they grow as you add
// case studies:
//   - every project counts toward "projects built"
//   - each project's `savingsPerYear` (US$) adds to "saved per year"
//   - each project's `hoursSavedPerMonth` adds to "hours saved per year"
//   - Concreat Rewards' retention simulation gives "sales lift" (set by hand)
//
// Anything not yet proven gets `placeholder: true`. Placeholders show with
// a dashed "draft" style in `npm run dev`, and are left out of production
// builds automatically — so a made-up number can't ship. When you have the
// real figure, set the value and delete the flag.

// Total savings per year in US$ across projects in use (each project's
// `savingsPerYear`). Any estimated figure makes the total an estimate.
const savingsPerYear = projects.reduce((sum, project) => sum + (project.savingsPerYear ?? 0), 0);
const savingsAreEstimated = projects.some((project) => project.savingsPerYear && project.savingsEstimate);
const savingsValue = `$${Math.round(savingsPerYear / 1000)}K`;

// Manual hours saved per year across projects (each project's
// `hoursSavedPerMonth` × 12). Any estimated figure makes the total an
// estimate. Shown in thousands once it passes 1,000; the unit lives in
// the label so the value stays short enough for its column.
const hoursPerYear = projects.reduce((sum, project) => sum + (project.hoursSavedPerMonth ?? 0), 0) * 12;
const hoursAreEstimated = projects.some((project) => project.hoursSavedPerMonth && project.hoursEstimate);
const hoursValue = hoursPerYear >= 1000 ? `${(hoursPerYear / 1000).toFixed(1)}K` : String(Math.round(hoursPerYear));

// Order: money saved, the hours behind it, projected growth, then scale.
const highlights = [
  savingsPerYear > 0
    ? savingsAreEstimated
      ? { value: `~${savingsValue}`, label: "est. saved per year" }
      : { value: savingsValue, label: "saved per year" }
    : { value: "$XXK", label: "saved per year", placeholder: true },
  hoursPerYear > 0
    ? hoursAreEstimated
      ? { value: `~${hoursValue}`, label: "est. manual hours saved per year" }
      : { value: hoursValue, label: "manual hours saved per year" }
    : { value: "XX", label: "manual hours saved per year", placeholder: true },
  // SIMULATION (Concreat Rewards): each 5-point gain in partner retention
  // adds ~10% to five-year sales — see that case study's evidence cards.
  { value: "+10%", label: "5-yr sales lift (sim.)" },
  { value: String(projects.length), label: "projects built" },
];

// Other ready-to-use highlights:
//   { value: "2", label: "city LGU systems automated" }  — Naga & Carcar (Cylix)
//   { value: "ICBET '26", label: "research accepted" }
//   { value: String(projects.filter((p) => p.realWorld).length), label: "for real organizations" }
//   { value: "7", label: "industries" }  — distinct `sector`s in projects.js
//   { value: "90×", label: "faster meal records" }  — SpoonFull, ~15 min → ~10 s
//   { value: "XX", label: "clients served", placeholder: true }
//   { value: "XX%", label: "less manual entry", placeholder: true }

export const visibleHighlights = import.meta.env.DEV
  ? highlights
  : highlights.filter((item) => !item.placeholder);

export default highlights;
