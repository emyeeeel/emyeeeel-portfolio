const projects = [
  {
    slug: "spoonfull",
    index: "01",
    title: "SpoonFull",
    tag: "ai / ml",
    mediaSrc: "/assets/spoonfull.gif",
    mediaLabel: "food recognition demo gif",
    pitch:
      "AI dietary monitoring for long-term care facilities in Taiwan — food recognition, volume estimation, and personalized recommendations. 2nd place, Taiwan MOE DSP contest.",
    meta: "computer vision · healthcare · django · 2025—26 · tainan, tw",
    subtitle:
      "AI dietary monitoring and recommendation for long-term care facilities in Taiwan.",
    facts: {
      role: "End-to-end developer",
      stack: "YOLO · Django · Qdrant",
      timeline: "2025–26, Tainan",
      recognition: "MOE DSP · ICBET 2026",
    },
    problem:
      "Long-term care facilities in Taiwan track residents' dietary intake manually — slow, inconsistent, and hard to reconcile with Taiwan HPA dietary guidelines. Staff need intake captured from a photo and recommendations grounded in the official standards.",
    approach:
      "I built the pipeline end to end: YOLOv11s-seg with MobileNetV2 for food recognition and volume estimation over a dataset of 6,335 images across 64 food classes, a weighted KNN recommendation engine, a CatBoost pipeline for DRI modeling, and a RAG system over Taiwan HPA dietary guidelines using Qdrant with hybrid BM25 + dense retrieval, served through a Django backend.",
    // TODO(amiel): confirm the ICBET verb (accepted / presented / to be presented).
    outcome:
      "2nd place at the Taiwan MOE DSP contest, showcased at the 智慧雨林 AI 健康照護 產學交流媒合會 at CHUMT, and accepted to ICBET 2026 in Bali.",
    heroMedia: {
      src: "/assets/spoonfull-hero.png",
      label: "SpoonFull product screenshot",
    },
    supportMedia: [
      { src: "/assets/spoonfull-support-1.png", label: "food recognition output" },
      { src: "/assets/spoonfull-support-2.png", label: "recommendation dashboard" },
    ],
    next: "rcl-egg-trading",
  },
  {
    slug: "rcl-egg-trading",
    index: "02",
    title: "RCL Egg Trading",
    tag: "fullstack",
    mediaSrc: "/assets/rcl.png",
    mediaLabel: "dashboard screenshot",
    pitch:
      "Six-module business platform for a Philippine egg supplier — inventory, BIR-compliant invoicing, logistics, HR/payroll with PH statutory deductions, and accounting.",
    meta: "react · vite · supabase · rbac · 2026",
    subtitle:
      "Six-module business management platform for a Philippine egg supplier.",
    facts: {
      role: "Solo fullstack developer",
      stack: "React · Vite · Supabase",
      timeline: "2026, Cebu",
      recognition: "Portfolio project",
    },
    problem:
      "A small egg trading business runs inventory, sales, logistics, payroll, and accounting on spreadsheets and paper — no single source of truth, no role separation, and BIR-compliant invoicing done by hand.",
    approach:
      "I designed and built six integrated modules on React, Vite, and Supabase with role-based access control: livestock/farm management, inventory, sales with BIR-compliant invoicing, logistics, HR/payroll with Philippine statutory deductions, and accounting with QuickBooks CSV export.",
    // TODO(amiel): one plain sentence — e.g. what the platform replaces or covers end-to-end. No invented metrics.
    outcome: null,
    outcomeTodo:
      "TODO(amiel): one plain sentence — e.g. what the platform replaces or covers end-to-end. No invented metrics.",
    heroMedia: {
      src: "/assets/rcl-hero.png",
      label: "RCL Egg Trading dashboard screenshot",
    },
    supportMedia: [
      { src: "/assets/rcl-support-1.png", label: "invoicing module" },
      { src: "/assets/rcl-support-2.png", label: "logistics module" },
    ],
    next: "paagi",
  },
  {
    slug: "paagi",
    index: "03",
    title: "Paagi",
    tag: "ai / ml",
    mediaSrc: "/assets/paagi/paagi.gif",
    mediaLabel: "box-sizing visual",
    pitch:
      "Dynamic box-sizing algorithms to cut logistics packaging waste — pitched to Gothong Southern executives. 1st place of 38 teams.",
    meta: "optimization · python · 2024 · cebu, ph",
    subtitle: "AI packaging optimization to cut logistics waste.",
    facts: {
      role: "Algorithm design · pitch",
      stack: "Python · optimization",
      timeline: "2024, Cebu",
      recognition: "1st of 38 teams",
    },
    problem:
      "Oversized shipping boxes waste filler material, truck space, and money — packaging decisions are made by habit, not by the dimensions of what's actually being shipped.",
    approach:
      "We designed dynamic box-sizing algorithms that fit packaging to shipment contents, and presented the solution directly to Gothong Southern executives.",
    // TODO(amiel): add the projected waste/cost reduction figure if you have the deck number.
    outcome:
      "1st place of 38 teams.",
    // outcomeTodo:
    //   "TODO(amiel): add the projected waste/cost reduction figure if you have the deck number.",
    heroMedia: {
      src: "/assets/paagi/paagi.gif",
      label: "Paagi box-sizing visual",
    },
    supportMedia: [
      { src: "/assets/paagi/paagi_pitch_2.png", label: "algorithm diagram" },
      { src: "/assets/paagi/paagi_pitch.png", label: "pitch deck excerpt" },
    ],
    next: "gabai",
  },
  {
    slug: "gabai",
    index: "04",
    title: "GabAI",
    tag: "ai / ml",
    mediaSrc: "/assets/gabai/gabai.gif",
    mediaLabel: "box-sizing visual",
    pitch:
      "Dynamic box-sizing algorithms to cut logistics packaging waste — pitched to Gothong Southern executives. 1st place of 38 teams.",
    meta: "optimization · python · 2024 · cebu, ph",
    subtitle: "AI packaging optimization to cut logistics waste.",
    facts: {
      role: "Algorithm design · pitch",
      stack: "Python · optimization",
      timeline: "2024, Cebu",
      recognition: "1st of 38 teams",
    },
    problem:
      "Oversized shipping boxes waste filler material, truck space, and money — packaging decisions are made by habit, not by the dimensions of what's actually being shipped.",
    approach:
      "We designed dynamic box-sizing algorithms that fit packaging to shipment contents, and presented the solution directly to Gothong Southern executives.",
    outcome: null,
    heroMedia: {
      src: "/assets/gabai/gabai.gif",
      label: "Paagi box-sizing visual",
    },
    supportMedia: [
      { src: "/assets/gabai/gabai_1.png", label: "algorithm diagram" },
      { src: "/assets/gabai/gabai_2.png", label: "pitch deck excerpt" },
    ],
    next: "spoonfull",
  },
];

export default projects;
