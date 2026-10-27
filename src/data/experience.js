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
//   `logo`      the organisation's logo as a single-colour mask (white on
//               transparent, public/assets/experience); CSS paints it in
//               the site's palette
//   `logoColor` true when `logo` is a full-colour image kept as is
//   `tile`      optional tile style: "brand" = the favicon's ink tile
//   `mono`      monogram shown when there's no logo
const experience = [
  {
    key: "realm",
    mono: "RN",
    logo: "/assets/experience/realm-nexus.webp",
    logoColor: true,
    role: "AI Automation Specialist",
    org: "Realm Nexus Corporation · remote",
    detail: "Realm Nexus Corporation",
    dates: "Aug 2026 – present",
    current: true,
    summary:
      "Build AI automation pipelines and workflow integrations, and support marketing production, customer data analysis, lead generation and technical support.",
    tags: ["AI automation", "Make.com", "Workflow integration", "Data analysis"],
  },
  {
    key: "rss",
    mono: "RS",
    logo: "/assets/experience/rising-star-solutions.webp",
    logoColor: true,
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
    mono: ">",
    logo: "/assets/experience/self.webp",
    tile: "brand",
    role: "Software & Automation Developer",
    org: "Self-employed · remote",
    detail: "Freelance software, CRM and workflow automation",
    dates: "Mar 2026 – present",
    type: "",
    current: true,
    summary:
      "HubSpot data, reporting and automation for a US diagnostics company, Python tools for duplicate contacts and lead sources, and a full-stack ERP on React and Supabase.",
    tags: ["HubSpot", "Python", "React", "Supabase"],
  },
  {
    key: "klab",
    mono: "WL",
    logo: "/assets/experience/wise-laboratory.webp",
    role: "Full Stack Engineer",
    org: "Wise Laboratory, Southern Taiwan University of Science and Technology · Tainan",
    detail: "Wise Laboratory, Southern Taiwan University of Science and Technology",
    dates: "Oct 2025 – Mar 2026",
    type: "",
    summary:
      "Built frontend and backend features, the database and ML pipelines for SpoonFull, an AI dietary monitoring system now in daily use in Chiayi.",
    tags: ["Angular", "Ionic", "Django", "Machine learning"],
    awardsFrom: ["spoonfull"],
  },
  {
    key: "concreat",
    mono: "CH",
    logo: "/assets/experience/concreat.webp",
    role: "Software Developer",
    org: "Concreat Holdings Philippines, Inc. · Cebu",
    detail: "Concreat Holdings Philippines, Inc.",
    dates: "Jan 2025 – Jun 2025",
    type: "",
    summary:
      "Developed a rewards and loyalty platform and a store geolocator, turning business requirements into working web features.",
    tags: ["React", "TypeScript", "Full-stack development"],
  },
  {
    key: "raykan",
    mono: "RT",
    logo: "/assets/experience/raykan.webp",
    role: "QA Engineer",
    org: "Raykan Technologies · remote",
    detail: "Raykan Technologies",
    dates: "Feb 2024 – Jun 2024",
    type: "",
    summary:
      "Built and maintained Cypress end-to-end test suites, and expanded automated regression coverage for release testing.",
    tags: ["Cypress", "End-to-end testing", "Regression testing"],
  },
  {
    key: "cylix",
    mono: "CT",
    logo: "/assets/experience/cylix.webp",
    role: "System Integrator",
    org: "Cylix Technologies · Cebu",
    detail: "Cylix Technologies, One-Stop-Shop automation for two city LGUs",
    dates: "Jan 2022 – Mar 2022",
    type: "",
    summary:
      "Led an automation system for One-Stop-Shop government services in two city LGUs, from digitizing manual processes to deployment, UAT and staff training.",
    tags: ["Process automation", "User acceptance testing", "End-user training"],
  },
];

// The degree, shown as the last stop on the timeline. `highlights` are
// listed under it, one line each: `award` items get a lime star, `role`
// items a marker.
export const education = {
  key: "education",
  mono: "USJR",
  logo: "/assets/experience/usjr.webp?v=3",
  role: "BS Computer Science",
  org: "University of San Jose–Recoletos · Cebu",
  dates: "June 2026",
  type: "education",
  summary:
    "The first student in USJ-R's School of Computer Studies to complete a triple major: Artificial Intelligence, Web Application Development and Mobile Application Development.",
  highlights: [
    { kind: "award", title: "3× Dean's Lister" },
    { kind: "award", title: "Champion, SCS Days 2025 Hackathon" },
    { kind: "award", title: "2nd Place, SCS App Expo 2026" },
    { kind: "award", title: "Special Jury's Prize, iPBL 2025, Osaka" },
    { kind: "role", title: "Vice President for Education & Auditor, ICTO · 2021–2022" },
    { kind: "role", title: "Peer tutor, MPEG & JPEG tutoring guilds · 2020–2022" },
  ],
};

export default experience;
