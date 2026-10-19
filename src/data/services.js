// The three service groups, in priority order. `need` is the short,
// business-side line shown on the home cards; `value`, `scope` and
// `tools` fill /services/:slug. Related case studies are found through
// each project's `services` list in projects.js.
const services = [
  {
    index: "01",
    slug: "business-applications",
    title: "Business Application Development",
    need: "A process lives in spreadsheets, or an idea needs to be seen before anyone says yes.",
    value:
      "I turn requirements and business rules into an application people can review, test and use. That can be a clickable prototype for a proposal or an internal tool with real roles and records.",
    scope: [
      "Requirements and business rules mapped into user flows and a data model",
      "Web app prototypes for proposals and stakeholder review",
      "Internal tools with role-based access",
      "Tests around the rules that matter most",
      "Documentation for whoever maintains or rebuilds it next",
    ],
    tools: ["React", "TypeScript", "Django", "Angular", "Supabase / PostgreSQL", "MySQL"],
  },
  {
    index: "02",
    slug: "workflow-automation",
    title: "Workflow Automation & Integrations",
    need: "The same steps get repeated by hand, or information gets copied from one tool to another.",
    value:
      "I map how work moves between people and tools, then automate the repetitive steps and connect the systems. That includes practical AI-assisted steps where they actually help.",
    scope: [
      "Mapping the current workflow and where time goes",
      "Automations and integrations between business tools through APIs and webhooks",
      "AI-assisted steps like extraction, classification or drafting, with a human check where it matters",
      "Python scripts for recurring data tasks",
      "Short runbooks so the automation can be understood and maintained",
    ],
    tools: ["n8n", "Python", "REST APIs", "Webhooks", "HubSpot workflows", "LLM APIs"],
  },
  {
    index: "03",
    slug: "data-reporting",
    title: "Data Management & Reporting",
    need: "Records are duplicated or inconsistent, and the reports don't match how the team actually works.",
    value:
      "I clean up and maintain business data, set up workflows that keep it consistent, and build reporting that answers the questions your team actually asks. Most of this work happens in a CRM, usually HubSpot.",
    scope: [
      "Duplicate tracing, field standardization and data clean-up",
      "Workflows that keep records consistent, like contact and company syncing",
      "Lead source and lifecycle tagging",
      "Dashboards and activity reports",
      "Python analysis of exported CRM data",
    ],
    tools: ["HubSpot", "Python", "Spreadsheets"],
  },
];

// Older service URLs that may still be linked from elsewhere.
export const SERVICE_ALIASES = {
  fullstack: "business-applications",
  "ai-ml": "workflow-automation",
  "technical-va": "data-reporting",
  "crm-reporting": "data-reporting",
};

export default services;
