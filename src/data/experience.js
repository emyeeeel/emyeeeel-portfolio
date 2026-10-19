// Work history, newest first. Used by the home "experience" section and
// the /about timeline (which reads only `role`, `detail` and `dates`).
//
//   `key`       links testimonials (testimonials.js `experience`) to a role
//   `org`       where the work happened
//   `type`      employment type, shown beside the dates
//   `summary`   one line on what was built or done — results, not duties
//   `tags`      a few skills, shown as chips
//   `awardsFrom` project slugs whose awards (recognition.js) show on the
//               role; no case-study links are shown here
//   `current`   true for ongoing work
const experience = [
  {
    key: "realm",
    role: "AI Automation Specialist",
    org: "Realm Nexus Corporation · assigned through Rising Star Solutions · remote",
    detail: "Realm Nexus Corporation, assigned through Rising Star Solutions",
    dates: "Aug 2026 – present",
    current: true,
    summary:
      "Build AI automation pipelines and workflow integrations, and support marketing production, customer data analysis, lead generation and technical support.",
    tags: ["AI automation", "Make.com", "Workflow integration", "Data analysis"],
  },
  {
    key: "rss",
    role: "AI Automation & Workflow Integration Specialist",
    org: "Rising Star Solutions · remote",
    detail: "Rising Star Solutions",
    dates: "Aug 2026 – present",
    current: true,
    summary:
      "Set up plugins and AI tools, help the team with AI-related work, and build automation pipelines such as the Make.com workflow behind the weekly lead follow-up email.",
    tags: ["Workflow design", "Platform integration", "Prompt development", "Documentation"],
  },
  {
    key: "freelance",
    role: "Software & Automation Developer",
    org: "Self-employed · remote",
    detail: "Freelance software, CRM and workflow automation",
    dates: "Mar 2026 – present",
    type: "freelance",
    current: true,
    summary:
      "HubSpot data, reporting and automation for a US diagnostics company, Python tools for duplicate contacts and lead sources, and a full-stack ERP on React and Supabase.",
    tags: ["HubSpot", "Python", "React", "Supabase"],
  },
  {
    key: "klab",
    role: "Full Stack Engineer",
    org: "K Lab, Southern Taiwan University of Science and Technology · Tainan",
    detail: "K Lab, Southern Taiwan University of Science and Technology",
    dates: "Oct 2025 – Mar 2026",
    type: "internship",
    summary:
      "Built frontend and backend features, the database and ML pipelines for SpoonFull, an AI dietary monitoring system now in daily use in Chiayi.",
    tags: ["Angular", "Ionic", "Django", "Machine learning"],
    awardsFrom: ["spoonfull"],
  },
  {
    key: "concreat",
    role: "Software Developer",
    org: "Concreat Holdings Philippines, Inc. · Cebu",
    detail: "Concreat Holdings Philippines, Inc.",
    dates: "Jan 2025 – Jun 2025",
    type: "internship",
    summary:
      "Developed a rewards and loyalty platform and a store geolocator, turning business requirements into working web features.",
    tags: ["React", "TypeScript", "Full-stack development"],
  },
  {
    key: "raykan",
    role: "QA Engineer",
    org: "Raykan Technologies · remote",
    detail: "Raykan Technologies",
    dates: "Feb 2024 – Jun 2024",
    type: "internship",
    summary:
      "Built and maintained Cypress end-to-end test suites, and expanded automated regression coverage for release testing.",
    tags: ["Cypress", "End-to-end testing", "Regression testing"],
  },
  {
    key: "cylix",
    role: "System Integrator",
    org: "Cylix Technologies",
    detail: "Cylix Technologies, One-Stop-Shop automation for two city LGUs",
    dates: "Jan 2022 – Mar 2022",
    type: "contract",
    summary:
      "Led an automation system for One-Stop-Shop government services in two city LGUs, from digitizing manual processes to deployment, UAT and staff training.",
    tags: ["Process automation", "User acceptance testing", "End-user training"],
  },
];

export default experience;
