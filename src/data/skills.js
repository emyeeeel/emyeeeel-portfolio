// Skills & tools for the home "skills & tools" section.
//
// Grouped by *type of tool* (what a recruiter scans for), not by service.
// Only list what a project, the résumé or real client work can back up.
//
// Skills are plain text; they don't link anywhere.
//
// The full list appears as tabs in a terminal window (Skills.jsx): one
// tab per group, `key` is the folder name shown in the prompt and
// `caption` is printed as a comment above the list.
const skillGroups = [
  {
    key: "automation",
    label: "Automation Platforms",
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
    caption: "What I write in.",
    items: ["Python", "JavaScript", "TypeScript", "HTML & CSS", "SQL", "Java", "PHP", "Dart", "C / C++"],
  },
  {
    key: "frameworks",
    label: "Frameworks & Build",
    caption: "What the apps stand on.",
    items: ["React", "Angular", "Django", "Ionic", "Flutter", "Laravel", "Vite"],
  },
  {
    key: "data",
    label: "Data & Databases",
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
    caption: "How it connects and ships.",
    items: ["REST APIs", "Gmail", "Vercel", "Netlify", "Capacitor", "Tauri", "Git"],
  },
  {
    key: "testing",
    label: "Testing & QA",
    caption: "How I check it works.",
    items: ["Vitest", "Cypress", "Unit testing", "Regression testing", "User acceptance testing"],
  },
  {
    key: "practices",
    label: "Practices & Security",
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

export default skillGroups;
