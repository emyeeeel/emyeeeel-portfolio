// Skills & tools for the home "skills & tools" section.
//
// Grouped by *type of tool* (what a recruiter scans for), not by service.
// Only list what a project, the résumé or real client work can back up.
//
// Linking is automatic: if an item's name exactly matches a tag in any
// project's `tags` (projects.js), its chip links to /work filtered to
// those projects. Linked and plain chips look identical. When a new
// project uses a tool, give it the same spelling in its `tags` and the
// chip here links up on its own.
//
// Each group is a card in a 12-column bento grid:
//   `icon`    one of the line icons in Skills.jsx
//   `accent`  colour family, matching the /work filters:
//             "build" (applications), "automate", "data", "craft" (neutral)
//   `span`    columns on wide screens; each row adds up to 12
//   `caption` one short line under the title
// Order matters: the first two are the widest, so they lead with the
// automation and AI work the portfolio is positioned on.
const skillGroups = [
  {
    key: "automation",
    label: "Automation Platforms",
    icon: "flow",
    accent: "automate",
    span: 7,
    caption: "What takes the repetitive work off people's plates.",
    items: [
      "n8n",
      "Make.com",
      "Google Apps Script",
      "HubSpot workflows",
      "Webhooks",
      "Selenium",
      "Python scripting",
    ],
  },
  {
    key: "ai",
    label: "AI & ML",
    icon: "spark",
    accent: "data",
    span: 5,
    caption: "Where models and language tools come in.",
    items: [
      "LLM integration",
      "Prompt engineering",
      "RAG",
      "Recommender systems",
      "Machine learning",
      "scikit-learn",
      "Computer vision",
      "Decision logic",
    ],
  },
  {
    key: "languages",
    label: "Languages",
    icon: "code",
    accent: "build",
    span: 4,
    caption: "What I write in.",
    items: ["Python", "JavaScript", "TypeScript", "HTML & CSS", "SQL", "Java", "PHP", "Dart", "C / C++"],
  },
  {
    key: "frameworks",
    label: "Frameworks & Build",
    icon: "layers",
    accent: "build",
    span: 4,
    caption: "What the apps stand on.",
    items: ["React", "Angular", "Django", "Ionic", "Flutter", "Laravel", "Vite"],
  },
  {
    key: "data",
    label: "Data & Databases",
    icon: "database",
    accent: "data",
    span: 4,
    caption: "Where the information lives.",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Firebase",
      "Pinecone",
      "Qdrant",
      "Google Sheets",
      "HubSpot CRM",
      "Data modeling",
    ],
  },
  {
    key: "integrations",
    label: "Integrations & Deployment",
    icon: "plug",
    accent: "automate",
    span: 4,
    caption: "How it connects and ships.",
    items: ["REST APIs", "Gmail", "Vercel", "Netlify", "Capacitor", "Tauri", "Git"],
  },
  {
    key: "testing",
    label: "Testing & QA",
    icon: "check",
    accent: "craft",
    span: 3,
    caption: "How I check it works.",
    items: ["Vitest", "Cypress", "Unit testing", "Regression testing", "User acceptance testing"],
  },
  {
    key: "practices",
    label: "Practices & Security",
    icon: "compass",
    accent: "craft",
    span: 5,
    caption: "How the work gets scoped, built and handed over.",
    items: [
      "Requirements analysis",
      "Workflow design",
      "Problem analysis",
      "Prototyping",
      "Pitching",
      "Role-based access",
      "Documentation",
      "Agile / Scrum",
    ],
  },
];

// Legend for the accent colours, in the order they first appear.
export const SKILL_ACCENTS = [
  { key: "build", label: "build" },
  { key: "automate", label: "automate" },
  { key: "data", label: "data & AI" },
  { key: "craft", label: "craft" },
];

export default skillGroups;
