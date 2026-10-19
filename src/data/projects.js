// Project content for the home work stack, /work and /work/:slug.
//
// `stage` is shown wherever a project appears, so keep it accurate:
// it describes where the project actually is, not where it might go.
// `stageKind` only picks the badge color (prototype / research / concept).
//
// Case-study sections are all optional — CaseStudy.jsx skips any that are
// missing, so leave a field out rather than filling it with a placeholder.
// Evidence `kind` labels what sort of evidence a line is ("milestone",
// "controlled test", "recognition", "implemented") so results, tests and
// intentions never blur together.

const projects = [
  {
    slug: "concreat-rewards",
    index: "01",
    title: "Concreat Rewards",
    category: "applications",
    tags: ["React", "TypeScript", "Vite", "Vitest", "Role-based access", "Prototyping"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Building materials",
    // Made for a real organization: Concreat Holdings Philippines, Inc.
    realWorld: true,
    featured: true,
    stage: "Hosted prototype · Proposal approved",
    stageKind: "prototype",
    // Card highlights on /work: { value, label }. Mark anything not yet
    // proven with placeholder: true (shown as a draft in dev only).
    highlights: [
      { value: "Approved", label: "Rewards proposal" },
      { value: "10% sales", trend: "up", label: "5 yrs at +5 pts retention" },
    ],
    tagline: "Proposed rewards-program rules, turned into an app stakeholders could review.",
    summary:
      "A rewards portal where partners earn points per bag, share them and redeem rewards.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Partner rewards needed one place to keep partners buying and draw in new ones.",
      built: "A clickable portal covering every partner role, program and reward flow.",
      result: "Proposal approved; in simulation, each 5-point retention gain adds ~10% to 5-year sales.",
    },
    subtitle:
      "Concreat Rewards is a web application prototype designed to make a partner rewards programme easier to understand and manage.",
    icon: "/assets/concreat-rewards/icon.svg",
    // Tile + icon background built from the app's brand colours.
    logoBg: "/assets/concreat-rewards/bg.svg",
    // Solid background for the small /work icon square (the favicon's own
    // purple); also the tile's fallback while the image loads.
    iconBg: "#250E62",
    facts: {
      role: "Software Developer",
      stack: "React · TypeScript · Vite · Vitest",
      timeline: "2026, Cebu",
      stage: "Hosted prototype · Proposal approved",
    },
    overview:
      "Concreat Rewards is my pitch to bring the company's partner rewards into one portal, so dealers, retailers and contractors have a reason to keep buying from Concreat and new partners have a reason to join. A rules document is hard to judge, so I built the program as a working web prototype that the company could review screen by screen. The proposal was approved, and the prototype is hosted online for review. The company plans to have its own development team handle production.",
    problem:
      "A partner rewards program has to work differently for each kind of partner: who earns points, who can pass them down the network, which programs each partner can join and what they can redeem. Written down, those rules are easy to agree with and hard to test. The company needed to see how the program would behave for each partner type before deciding on it.",
    users:
      "Program owners and the marketing team reviewing the proposal, and the partner roles the program is designed for: dealers, sub-dealers, retailers and contractors, plus admins.",
    contribution: {
      text: "I built the prototype on my own, from turning requirements into screens and logic to hosting the review build.",
      items: [
        "Turned the proposed program rules into user flows for each partner role",
        "Built the front end and the program logic in React and TypeScript",
        "Wrote unit tests for access rules, program calculations and analytics",
        "Revised copy and layout against the company's own commercial and marketing reference material",
        "Hosted the prototype online for stakeholder review",
      ],
    },
    decisions: [
      {
        title: "One access matrix for every role",
        body: "Which roles can allocate points, manage a network or join each program is defined in one place. Navigation, screens and access messages all read from it, so a change to the rules appears everywhere at once.",
      },
      {
        title: "Rules as tested logic, not screen code",
        body: "Program calculations like enrollment by package and tier, monthly targets, point balances and admin totals are plain functions with unit tests. If a rule changes, a test fails before a wrong number reaches a screen.",
      },
      {
        title: "Simulated data for safe review",
        body: "The review build runs on deterministic demo data with a sign-in that stays in the browser. Reviewers can try every role without any real partner records.",
      },
    ],
    demo: {
      kind: "walkthrough",
      intro:
        "Screens from the hosted review build, using its demo accounts and simulated data.",
      steps: [
        {
          title: "Sign in",
          body: "Partners sign in to their own account. The review build lists a demo account for every role.",
          image: "/assets/concreat-rewards/login.webp",
          alt: "Concreat Rewards sign-in page with the partner sign-in form and demo accounts",
        },
        {
          title: "Dashboard",
          body: "A partner's points balance, bags purchased, monthly purchase chart and next steps.",
          image: "/assets/concreat-rewards/dashboard.webp",
          alt: "Partner dashboard showing available points, bags purchased, a monthly purchases chart and next steps",
        },
        {
          title: "Allocate points",
          body: "Dealers and sub-dealers pass points down to partners in their network.",
          image: "/assets/concreat-rewards/allocate.webp",
          alt: "Allocate points screen with available balance and a transfer form",
        },
        {
          title: "Vehicle program",
          body: "Enrollment status, monthly compliance tracking and the partner's vehicle plan.",
          image: "/assets/concreat-rewards/vehicle.webp",
          alt: "Vehicle incentive program screen with a compliance tracker and the partner's vehicle plan",
        },
        {
          title: "Trip program",
          body: "Domestic and international trips that unlock with lifetime points.",
          image: "/assets/concreat-rewards/trip.webp",
          alt: "Trip program screen showing domestic and international trip options",
        },
        {
          title: "Silo program",
          body: "For contractors: silo truck rental with a lock-in tracker for monthly volume.",
          image: "/assets/concreat-rewards/silo.webp",
          alt: "Silo program screen with a lock-in tracker and the contractor's silo truck",
        },
        {
          title: "Redeem rewards",
          body: "A rewards catalogue tied to the partner's available balance.",
          image: "/assets/concreat-rewards/redeem.webp",
          alt: "Redeem rewards catalogue with cement credits, condo rewards and merchandise",
        },
        {
          title: "Transactions",
          body: "A full history of points earned, allocated and redeemed, with search and CSV export.",
          image: "/assets/concreat-rewards/transactions.webp",
          alt: "Transaction history with totals and a searchable list of point activity",
        },
        {
          title: "Admin dashboard",
          body: "Program-wide volume, points liability, redemption rate and partners who need attention.",
          image: "/assets/concreat-rewards/admin.webp",
          alt: "Admin dashboard with program-wide metrics and a monthly volume chart",
        },
      ],
    },
    evidence: [
      { kind: "milestone", text: "Proposal approved by the company." },
      {
        kind: "simulation",
        text: "Each 5-point gain in partner retention adds about 10% to five-year sales. A partner network was modelled over five years at starting retention rates from 70% to 85%; the gain stays between 10.0% and 10.4% across that range.",
      },
      { kind: "milestone", text: "Prototype hosted online for stakeholder review." },
      {
        kind: "implemented",
        text: "Unit tests cover the role access matrix, program rules, demo-data simulation and admin and partner analytics.",
      },
    ],
    evidenceNote:
      "The simulation is conservative: it assumes each partner keeps buying the same volume and counts no new partners. It shows what retention is worth, not how much the program will raise it, which only real enrollment data can show. It uses no Concreat sales figures.",
    limitations:
      "This is a prototype running on simulated data. Hosting it for review doesn't mean the rewards program has launched. The development direction is still under discussion, and the company intends to have its own development team handle production deployment.",
    nextSteps:
      "The tested rule logic and screen flows are meant to be a usable reference for whichever team builds the production version. Once the program runs, comparing retention and volume for enrolled and non-enrolled partners would show its real effect on sales.",
    services: ["business-applications"],
    next: "rcl-egg-trading",
  },
  {
    slug: "rcl-egg-trading",
    index: "02",
    title: "RCL Egg Trading",
    category: "applications",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["data-reporting"],
    tags: ["React", "Vite", "Supabase", "PostgreSQL", "Role-based access", "Data modeling"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Agriculture & food trading",
    // Made for a real organization: a prospective client, RCL Egg Trading.
    realWorld: true,
    featured: false,
    stage: "Business application prototype",
    stageKind: "prototype",
    highlights: [
      { value: "6 modules", label: "In one system" },
      { value: "Role-based", label: "Access control" },
    ],
    tagline: "One role-based system for an egg supplier's day-to-day records.",
    summary:
      "One back office for an egg supplier, from flock and stock to invoices and payroll.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Stock, sales, deliveries and payroll lived in separate spreadsheets.",
      built: "One role-based web app across six areas of the business.",
      result: "Working prototype on React, Vite and Supabase.",
    },
    subtitle:
      "A business application prototype for a Philippine egg supplier's daily operations.",
    logo: "/assets/rcl-egg-trading/rcl-egg-trading_logo.png",
    logoBg: "/assets/rcl-egg-trading/rcl-egg-trading_bg.png",
    icon: "/assets/rcl-egg-trading/rcl-egg-trading_logo_icon.png",
    facts: {
      role: "Software Developer",
      stack: "React · Vite · Supabase (PostgreSQL)",
      timeline: "2026, Cebu",
      stage: "Business application prototype",
    },
    overview:
      "A small trading business keeps its operations across spreadsheets and paper. I scoped and built a prototype that brings those records into one application, with each role seeing the parts of the business it works with.",
    problem:
      "Inventory, sales, deliveries, staff and accounts were tracked in separate spreadsheets and on paper. There was no single source of truth, and no way to give staff access to only the records relevant to their work.",
    users:
      "The owner and managers, office and sales staff, and the people handling deliveries.",
    contribution: {
      text: "I worked solo, from requirements and data model to the application itself.",
      items: [
        "Mapped the business's day-to-day records into one relational data model",
        "Built the application in React and Vite on Supabase (PostgreSQL)",
        "Implemented role-based access control across modules",
      ],
    },
    scope: {
      intro: "The prototype's scope covers six connected areas of the business:",
      items: [
        "Farm and flock records",
        "Inventory",
        "Sales and invoicing",
        "Logistics and deliveries",
        "HR and payroll",
        "Accounting, with a CSV export for QuickBooks",
      ],
    },
    decisions: [
      {
        title: "One data model instead of six spreadsheets",
        body: "The modules share one PostgreSQL database, so records like products, customers and staff are defined once and referenced everywhere, not re-typed per sheet.",
      },
      {
        title: "Access by role",
        body: "Role-based access keeps each person to the modules and actions their job needs, which matters once payroll and accounting live in the same system as sales.",
      },
      {
        title: "Export, don't replace, the accounting tool",
        body: "Accounting output is scoped as a CSV export for QuickBooks, so the prototype fits around the tool the business's books already use.",
      },
    ],
    evidence: [
      {
        kind: "implemented",
        text: "Working prototype on React, Vite and Supabase with role-based access control.",
      },
    ],
    limitations:
      "This is a prototype, not a production deployment. It isn't presented as tax- or payroll-compliant software: those rules would need checking by the business and its accountant before any real use.",
    services: ["business-applications"],
    next: "spoonfull",
  },
  {
    slug: "spoonfull",
    index: "03",
    title: "SpoonFull",
    category: "data-reporting",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["applications"],
    tags: ["Django", "Angular", "Tauri", "MySQL", "Selenium", "Computer vision", "Data modeling", "Documentation"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Healthcare",
    // Made for a real organization: in daily use at a long-term care facility in Chiayi.
    realWorld: true,
    featured: true,
    stage: "In daily use · LTC facility, Chiayi",
    stageKind: "live",
    // Net savings per year in US$ — feeds the hero total. ESTIMATE:
    // ~US$1,900/month net of hardware × 12 (see the evidence cards).
    savingsPerYear: 22800,
    savingsEstimate: true,
    // Hours saved per month — feeds the hero total. ESTIMATE: ~310
    // caregiver hours a month for a typical Chiayi facility (see the
    // evidence cards).
    hoursSavedPerMonth: 310,
    hoursEstimate: true,
    highlights: [
      // ESTIMATE, net of the station's hardware cost (≈ NT$60,000 at
      // ~NT$31.8 per US$) — see the "estimate" evidence cards for inputs.
      { value: "~$23K/yr", label: "Net operating savings" },
      { value: "15m → 10s", label: "Per intake record time reduction" },
    ],
    tagline: "Tray photo and weight in; intake records and guideline-based feedback out.",
    summary:
      "Scans each tray to measure what residents ate, then recommends diet adjustments.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Caregivers estimated residents' food intake by eye.",
      built: "A measurement station, its desktop app and a live tracking website.",
      result: "In daily use by staff at a long-term care facility in Chiayi.",
    },
    subtitle:
      "AI-assisted dietary monitoring, in daily use at a long-term care facility in Chiayi, Taiwan.",
    logo: "/assets/spoonfull/spoonfull_logo.png",
    logoBg: "/assets/spoonfull/spoonfull_bg.png",
    icon: "/assets/spoonfull/spoonfull_logo_icon.png",
    cover: {
      src: "/assets/about/dsp-lab.jpg",
      alt: "The SpoonFull team beside their measurement station at the 21st DSP Creative Design Contest",
    },
    facts: {
      role: "Backend, desktop and web app developer, team of three",
      stack: "Django · Angular · Tauri · MySQL · YOLOv11",
      timeline: "2025–26, Tainan",
      stage: "In daily use · LTC facility, Chiayi",
    },
    links: [
      {
        label: "view the project presentation",
        href: "https://canva.link/bfnnw6uxun3n262",
        note: "22 slides: the problem, the sensing pipeline, the recommendation design and the station in use.",
      },
    ],
    overview:
      "SpoonFull came out of my TEEP research internship at Wise Laboratory, Southern Taiwan University of Science and Technology. With two teammates, I worked on a system that estimates how much a long-term care resident ate. It records intake and compares it with Taiwan Health Promotion Administration (HPA) dietary guidelines. SpoonFull is in daily use at a long-term care facility in Chiayi: staff capture and record each meal with a desktop app on the measurement station, and track and monitor residents' intake on a live website.",
    problem:
      "In long-term care facilities, caregivers usually record food intake by estimating portions by eye. It takes time, it's subjective, and portion estimates are known to be biased: large portions tend to be underestimated and small ones overestimated. Undetected under-eating is a real risk for older residents.",
    users:
      "Caregivers recording meals, nutrition staff reviewing intake against guidelines, and facility staff managing residents and menus.",
    contribution: {
      text: "This was a team project. I built the Django backend, the desktop app that runs on the measurement station, and the web app staff use to track intake. Teammates led the guideline-retrieval (RAG) backend and most of the mobile app.",
      items: [
        "Designed the backend data model for residents, meals, meal cycles and intake records, and moved it from SQLite to MySQL",
        "Connected the measurement station to the backend: intake images, segmentation results and weight readings stored with each intake",
        "Built the live web app staff use to track and monitor intake: residents, meal assignments, intake history and nutrition analysis views",
        "Added Excel import for facility meal cycles, with duplicate meals merged on import",
        "Automated data collection with Selenium, populating dietary reference (DRI) values from a DRI calculator",
        "Added a weight-based fallback for meals where food segmentation is poor",
        "Built the measurement station's desktop app with Tauri, so the embedded system captures each meal and records intake on site",
        "Wrote technical documentation and progress reports",
      ],
    },
    decisions: [
      {
        title: "Weight as a physical check on vision",
        body: "The station pairs a depth camera with a load cell. The measured weight corrects the camera's volume estimate, and the app falls back on weight when segmentation is unreliable.",
      },
      {
        title: "Fit the caregiver's routine",
        body: "Scanning a resident's code fills in the meal assignment from the date and time, so caregivers confirm a record instead of typing it.",
      },
      {
        title: "Start from the facility's own menus",
        body: "Meal cycles come in from the spreadsheets the facility already keeps, rather than being re-entered by hand.",
      },
      {
        title: "Recommendations anchored to HPA guidelines",
        body: "The team's recommendation layer gives the language model only computed intake values and the matching HPA reference thresholds, so its feedback stays tied to the national guidelines.",
      },
    ],
    demo: {
      kind: "media",
      items: [
        {
          src: "/assets/about/dsp-lab.jpg",
          alt: "The SpoonFull team beside their measurement station at the 21st DSP Creative Design Contest",
          caption: "The measurement station (right) at the 21st DSP Creative Design Contest.",
        },
        {
          src: "/assets/about/chiayi-ltc.jpg",
          alt: "The SpoonFull team with staff at a long-term care facility in Chiayi",
          caption: "With staff at the long-term care facility in Chiayi where SpoonFull is used daily.",
        },
      ],
    },
    evidence: [
      {
        kind: "milestone",
        text: "In daily use by staff at a long-term care facility in Chiayi: a desktop app on the measurement station records intake, and a live website lets staff track and monitor it.",
      },
      {
        kind: "estimate",
        text: "Recording a resident's intake by hand — eyeballing the tray and going through the checklist — takes about 15 minutes; with SpoonFull it's under 10 seconds per record. Based on my observation at the facility.",
      },
      {
        kind: "estimate",
        text: "For a typical Chiayi facility, that frees about 310 caregiver hours a month — roughly NT$61,000 of staff time, or close to two full-time caregivers in a team of about 20. Inputs: ~42 residents (Chiayi County's 27 registered elderly-care facilities average 51 beds, per the county roster revised May 2024, at Taiwan's 83% national occupancy, MOHW end-2024), one intake record per resident per day, ~14.8 minutes saved each, valued at Taiwan's 2026 minimum hourly wage of NT$196 (Ministry of Labor) as a conservative floor.",
      },
      {
        kind: "estimate",
        text: "Net of the station's cost: about US$1,900 a month (≈ NT$60,000), or roughly US$23,000 a year. The hardware — Intel RealSense D435i, Jetson Orin Nano, Arduino Uno, load cell, LCD, frame and wiring — comes to roughly NT$25,000 (≈ US$790), spread over three years (~NT$700/month), plus ~NT$100/month of electricity. At that rate the station pays for itself in under two weeks. These figures are time freed up for care, not cash saved.",
      },
      {
        kind: "controlled test",
        text: "Food segmentation reached mAP@0.5 of 0.55, trained on 250 annotated meal images from care settings. That's moderate accuracy, but achieved with a small dataset.",
      },
      {
        kind: "controlled test",
        text: "Synchronous processing took under 4 seconds per multi-dish meal on a Jetson Orin Nano edge device. Recommendations generate separately, in about 12 seconds.",
      },
      {
        kind: "controlled test",
        text: "Load-cell calibration held R² = 0.9999 against reference weights.",
      },
      {
        kind: "recognition",
        text: "Second Place, International Category, 21st DSP Creative Design Contest (Taiwan Ministry of Education): 2nd of 25 international finalists, in a contest of 193 teams from seven countries.",
      },
      {
        kind: "recognition",
        text: "Second Place, SCS App Expo 2026, at SCS Days 2026 of USJ-R's School of Computer Studies.",
      },
      {
        kind: "recognition",
        text: "Paper accepted for publication and presentation at the 16th International Conference on Biomedical Engineering and Technology (ICBET 2026) in Bali, Indonesia; presented by Prof. Qian-Bei Hong.",
      },
      {
        kind: "recognition",
        text: "Showcased at healthcare events in Taiwan, including STUST's AI for Healthcare Conference and the CHUNGHWA Healthcare Conference.",
      },
    ],
    evidenceNote:
      "Test figures come from the team's contest report and reflect lab and demonstration conditions.",
    limitations:
      "The accuracy figures above come from lab and demonstration testing on a small dataset, and SpoonFull hasn't been clinically evaluated. It supports caregivers' intake records rather than replacing clinical judgment.",
    services: ["data-reporting", "business-applications"],
    next: "paagi",
  },
  {
    slug: "paagi",
    index: "04",
    title: "Paagi",
    category: "automation",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["applications"],
    tags: ["Angular", "Django", "Roboflow", "Computer vision", "Decision logic"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Logistics",
    featured: false,
    stage: "Hackathon prototype",
    stageKind: "prototype",
    highlights: [
      { value: "Champion", label: "SCS Days 2025 Hackathon" },
      { value: "72%", trend: "down", label: "Wasted box space reduction" },
    ],
    tagline: "Recommending packaging and transport from an item's size, limits and priorities.",
    summary:
      "Recognizes an item and recommends the packaging and transport that fit it best.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Packaging and transport were chosen by habit, not by the item.",
      built: "A web demo of the recommendation flow, built during the hackathon.",
      result: "Hackathon champion; in simulation, 72% less wasted box space and 42% less cardboard.",
    },
    subtitle:
      "A web app that recognizes an item from a photo and recommends packaging and transport based on what's actually being shipped.",
    logo: "/assets/paagi/paagi_logo.png",
    logoBg: "/assets/paagi/paagi_bg.png",
    icon: "/assets/paagi/paagi_logo_icon.png",
    cover: {
      src: "/assets/paagi/paagi_pitch.png",
      alt: "Paagi pitch visual showing the Paagi app icon on a phone home screen",
    },
    facts: {
      role: "Problem analysis · web demo · pitch",
      timeline: "2025, Cebu",
      stage: "Hackathon prototype",
    },
    overview:
      "Paagi recognizes an item from a photo, retrieves its details and recommends how to pack and move it. During the SCS Days 2025 Hackathon (Jaguars' Lair) I built the working demo: an Angular front end and a Django API that sends the photo to an object detection model, matches the result to a product record, and walks through packaging and transport options. The project won the hackathon, and Gothong Southern's CTO invited me to present it to the company's IT and R&D teams.",
    problem:
      "Packaging and vehicle choices are often made by habit or rough estimate. Boxes end up oversized, filler gets wasted, and vehicle space goes unused. Better choices need the item's real dimensions and constraints, and those aren't usually in front of the person packing.",
    users:
      "Shippers and logistics counter staff choosing packaging, and customers who care about cost, speed or protection.",
    contribution: {
      text: "I worked on the problem analysis and the decision logic, built the demo end to end (the Angular screens, the Django product API and the hook into the Roboflow detection workflow) and helped deliver the pitch.",
    },
    decisions: [
      {
        title: "1. Identify",
        body: "A photo goes to a Roboflow detection workflow. The detected class is matched to a product record with its dimensions, weight and handling flags (fragile, refrigerated, food grade).",
      },
      {
        title: "2. Apply constraints",
        body: "Keep only the packaging and transport options that fit those dimensions, protection needs and carrier limits.",
      },
      {
        title: "3. Rank by priority",
        body: "Order what's left by what the customer cares about most: cost, speed, protection or less waste.",
      },
      {
        title: "4. Recommend, with reasons",
        body: "Show the suggested configuration and why, so staff can check it and override it.",
      },
    ],
    decisionsLabel: "decision logic",
    demo: {
      kind: "media",
      items: [
        {
          src: "/assets/about/gothong.jpg",
          alt: "Amiel presenting the Paagi pitch in a meeting room",
          caption: "Presenting Paagi to Gothong Southern's IT and R&D teams.",
        },
        {
          src: "/assets/paagi/paagi_pitch_2.png",
          alt: "Paagi pitch visual with branded packaging and a delivery staff member",
          caption: "Pitch deck visual: brand and packaging concept.",
        },
      ],
    },
    evidence: [
      {
        kind: "recognition",
        text: "Champion, SCS Days 2025 Hackathon (Jaguars' Lair).",
      },
      {
        kind: "milestone",
        text: "Invited by Gothong Southern's CTO to present Paagi to the company's IT and R&D teams; the only team member invited.",
      },
      {
        kind: "implemented",
        text: "Working demo: photo → object detection → product record → packaging and transport pages, built in Angular and Django during the hackathon.",
      },
      {
        kind: "simulation",
        text: "Box-fit simulation on 1,000 randomly sized items. Picking each box from the item's dimensions, in 5 cm size steps, cut the empty space inside boxes by 72% and the cardboard used by 42%, compared with taking the smallest of three stock boxes that fits. Total box volume fell by 58% (47% against five stock sizes), which also means less filler and more parcels per truck.",
      },
      {
        kind: "simulation",
        text: "Priced at PHLPost's published domestic parcel rates from the Visayas to Metro Manila, the smaller boxes cut postage by 62%: about ₱1,050 (≈ US$18) per parcel, or roughly ₱1 million (≈ US$18,000) per 1,000 parcels. Couriers bill the higher of actual and volumetric weight, so oversized boxes are paid for even when the item is light.",
      },
    ],
    evidenceNote:
      "Simulation inputs: items 5–38 cm per side, 3 cm padding for fragile items and 1 cm otherwise, volumetric weight at PHLPost's 5,000 cm³/kg divisor, and PHLPost's 2023 domestic parcel rates (Administrative Order 21-14) at ₱58 per US$. It uses synthetic items and assumed box sizes, not shipment data. The demo's own packaging and freight figures were placeholders and aren't reported here.",
    limitations:
      "The demo was built within the hackathon's time limit. Detection and product matching work, but the product table holds a single trained item (a kettle), and the packaging and freight pages show placeholder figures. It hasn't been used for real shipments, so the box and postage savings are simulated results, not measured ones.",
    nextSteps:
      "Training detection on a real product catalogue, replacing the placeholder packaging logic with the box-fit rules from the simulation, and comparing against a shipper's actual box choices would show whether the saving holds.",
    services: ["workflow-automation"],
    next: "gabai",
  },
  {
    slug: "gabai",
    index: "05",
    title: "GabAI",
    category: "applications",
    tags: ["Machine learning", "scikit-learn", "Ionic", "Angular", "Django", "Firebase", "LLM integration"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Family & education",
    featured: false,
    stage: "App prototype",
    stageKind: "prototype",
    highlights: [
      { value: "Free", label: "SNAP-IV-based screening" },
      { value: "130 hrs/yr", trend: "down", label: "Screen time reduction per child" },
    ],
    tagline: "Attention-risk screening from screen habits, turned into family quests and nudges.",
    summary:
      "Predicts attention risk from screen-time habits, then nudges kids toward family quests.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Screen habits can affect attention, and families rarely see the signs early.",
      built: "ML models from school survey data, inside a gamified family app.",
      result: "Projected ~130 fewer screen hours a year per child; reviewed by a licensed psychometrician.",
    },
    subtitle:
      "A family habit app for children aged 6–15, built around a machine learning model that screens attention risk from screen-time habits.",
    logo: "/assets/gabai/gabai_logo.png",
    logoBg: "/assets/gabai/gabai_bg.png",
    icon: "/assets/gabai/gabai_logo_icon.png",
    cover: {
      src: "/assets/gabai/gabai_1.png",
      alt: "GabAI welcome screen and home screen with quests, badges and recent adventures",
    },
    facts: {
      role: "ML model · app development",
      stack: "scikit-learn · Ionic · Angular · Django · Firebase",
      timeline: "2025",
      stage: "App prototype",
    },
    overview:
      "GabAI is a habit companion for families, built on an attention-risk model I developed. A child answers a few playful questions about their screen habits during onboarding, and the model estimates where they sit on three attention and behaviour scales. Those levels shape the offline quests and nudges the child gets, so the app responds to the child's actual habits instead of giving everyone the same tips.",
    problem:
      "Parents want to encourage offline habits and family time without turning it into another screen-time negotiation. GabAI explores whether small, profile-matched activities and rewards make that easier to keep up.",
    users: "Children aged 6–15 and the family members who join them in the app.",
    contribution: {
      text: "Beyond the app, I developed the machine learning model. We collected survey responses from teachers and students in public and private elementary schools, and I trained three Random Forest classifiers on them, served them from the Django API and connected them to the app's onboarding and nudges.",
    },
    scope: {
      intro: "The prototype includes:",
      items: [
        "A gamified onboarding assessment that feeds the attention-risk models",
        "Family accounts that members can join",
        "Quests, points, badges and a family leaderboard",
        "Reward redemption and a wishlist",
        "A mood tracker and reminders",
        "AI-generated nudges and a chat assistant",
      ],
    },
    decisions: [
      {
        title: "A model trained on real school surveys",
        body: "Students answered a ScreenQ-based questionnaire on screen access, daily hours, content and adult co-viewing, and teachers rated the same students on the SNAP-IV 26-item scale. Those ratings became the labels: one Random Forest per subscale (inattention, hyperactivity-impulsivity, oppositional-defiant), using 8 inputs from the questionnaire and demographics.",
      },
      {
        title: "Three levels, not a diagnosis",
        body: "Each model returns Within Typical Range, Elevated or High Risk. The app uses these levels to tailor activities and guidance, and never shows them to a child as a label.",
      },
      {
        title: "Questions a child can answer",
        body: "The questionnaire is rewritten as short, friendly onboarding questions (\"Do you use screens while eating meals?\") and mapped back to the model's inputs, so the assessment feels like part of the game.",
      },
      {
        title: "Pre-generated nudges for children",
        body: "Instead of generating text live, the backend generates batches of short offline nudges, each tagged with the profile it suits, including the three risk levels. They're stored and matched to the child, so the content can be reviewed before a child sees it.",
      },
      {
        title: "Ionic and Capacitor for one codebase",
        body: "The app is built with Ionic and Angular and packaged for Android with Capacitor, with a Django backend and Firebase for profiles and stored nudges.",
      },
    ],
    demo: {
      kind: "media",
      items: [
        {
          src: "/assets/gabai/gabai_1.png",
          alt: "GabAI welcome screen and home screen with quests, badges and recent adventures",
          caption: "Welcome and home screens from the prototype.",
        },
        {
          src: "/assets/gabai/gabai_2.png",
          alt: "GabAI pitch visual of a parent and child making shadow puppets",
          caption: "Pitch visual.",
        },
      ],
    },
    evidence: [
      {
        kind: "projection",
        text: "About 22 minutes less screen time a day, or ~130 hours a year per child. Interventions that combine goals, feedback and planning cut children's screen time the most in a 204-trial meta-analysis, and GabAI builds in all three: quests, points and badges, and reminders.",
      },
      {
        kind: "implemented",
        text: "A free first attention screen at home, built on SNAP-IV, a standard rating scale for attention and behaviour. Instead of a teacher or parent rating its 26 items (about 10 minutes), the child and family answer 8 short onboarding questions (about 2 minutes, estimated) and the model returns the same three risk levels, so families get an early signal of whether to talk to a specialist.",
      },
      {
        kind: "milestone",
        text: "Reviewed by a licensed psychometrician (RPm).",
      },
      {
        kind: "implemented",
        text: "Three scikit-learn Random Forest classifiers (200, 200 and 100 trees), one per SNAP-IV subscale, served from a Django endpoint. The predicted levels are stored on the child's profile to match nudges and inform the parent chat assistant.",
      },
    ],
    evidenceNote:
      "The screen-time figure is a projection, not a result measured with GabAI users. It applies the meta-analysis's effect for goals, feedback and planning (0.145 standard deviations; Jones et al., 2021, International Journal of Behavioral Nutrition and Physical Activity) to an assumed spread of 2.5 hours a day. Using its overall effect instead gives ~105 hours a year.",
    limitations:
      "GabAI is a prototype, and its model is a screening aid, not a diagnostic tool. It was trained on a limited survey sample from local public and private elementary schools, so its levels are indicative only, and its agreement with full SNAP-IV ratings isn't reported here. The app hasn't been released, so the screen-time saving is projected, not measured.",
    nextSteps:
      "A pilot with families that logs screen time before and during use would show whether the projected saving holds, and checking the model against full SNAP-IV ratings on new children would show how far its levels can be trusted.",
    services: [],
    next: "gender-reveal-rsvp",
  },
  {
    slug: "gender-reveal-rsvp",
    index: "06",
    title: "Gender Reveal RSVP",
    category: "automation",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["data-reporting"],
    tags: ["HTML & CSS", "JavaScript", "Supabase", "Netlify", "Google Apps Script", "Google Sheets", "REST APIs"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Events",
    featured: false,
    stage: "Live · In use",
    stageKind: "live",
    // One-off event, so no monthly figure for the hero total.
    hoursSavedPerMonth: null,
    // ESTIMATE of tallying by hand over the RSVP period: ~1 min to log each
    // of 71 replies (~71 min) + ~6 re-checks of totals and who's missing at
    // ~10 min each (~60 min) ≈ 2 hrs. The dashboard does all of it.
    highlights: [
      // Key feature rather than a number: the dashboard keeps a live list
      // of guests who haven't replied, so hosts know exactly who to nudge.
      { value: "Follow-ups", label: "Who hasn't replied, listed live" },
      { value: "~2h → 0", label: "Manual tallying" },
    ],
    // 16:7 artwork for the /work card (replaces the typed placeholder).
    cardArt: "/assets/gender-reveal-rsvp/card.webp",
    tagline: "Guests reply on their phones; the hosts' dashboard fills itself in.",
    summary:
      "Guests RSVP and guess from their phones; replies sync to the hosts' live dashboard.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "RSVPs were scattered across group chats.",
      built: "An RSVP site plus a Google Sheets dashboard that updates itself.",
      result: "Live and in use; the hosts follow replies at a glance.",
    },
    subtitle:
      "An RSVP site and self-updating dashboard for a family gender reveal.",
    facts: {
      role: "Software Developer",
      stack: "HTML · JavaScript · Supabase · Netlify · Google Apps Script",
      timeline: "2026, Cebu",
    },
    overview:
      "My brother and sister-in-law were planning a gender reveal and needed to know who was coming without chasing replies across group chats. I built a lightweight RSVP site for their guest list and connected it to a Google Sheets dashboard, so they could follow replies, guesses and messages without ever opening a database.",
    problem:
      "Party RSVPs usually end up scattered across chats and memory. The hosts had three simple questions — who's coming, who still hasn't replied, and what guests are guessing — but no single place to see the answers, and no time to keep a list up to date by hand.",
    users:
      "Invited guests replying from their phones, and the two hosts following replies as they come in.",
    contribution: {
      text: "I built it on my own, from the guest flow to the hosts' dashboard.",
      items: [
        "Built the RSVP site as a lightweight HTML and JavaScript page: guests find their name on the hosts' list, confirm whether they're coming, and can add a boy-or-girl guess and a short message",
        "Stored replies in Supabase (PostgreSQL)",
        "Wrote a Google Apps Script that pulls replies from Supabase through its API into Google Sheets",
        "Built the hosts' dashboard: headline counts, response rate, head count, replies over time, guesses, latest messages and a list of who hasn't replied yet",
        "Deployed the site on Netlify, with a shareable link and QR code for the family group chat",
      ],
    },
    decisions: [
      {
        title: "A fixed guest list, not a free-text name field",
        body: "Guests type a few letters and tap their name from the hosts' list. Every reply matches an invited guest, which is what lets the dashboard show exactly who hasn't answered yet.",
      },
      {
        title: "A dashboard where the hosts already are",
        body: "Instead of building an admin panel, the dashboard lives in Google Sheets — something the hosts already know how to open and share from their phones.",
      },
      {
        title: "Pulled through the API, not copied by hand",
        body: "A Google Apps Script reads replies straight from Supabase, and the sheet shows when it last synced, so the hosts always know how fresh the numbers are.",
      },
      {
        title: "Keep the reply quick",
        body: "Attendance is the only required step; the guess and the message are optional, so replying takes seconds on a phone.",
      },
    ],
    demo: {
      kind: "walkthrough",
      intro:
        "Screens from the live site and the hosts' Google Sheets dashboard. Contact numbers, guest messages and the list of guests yet to reply are blurred.",
      steps: [
        {
          title: "Open the invite",
          body: "Guests open the link or scan the QR code from the family group chat. The page shows the date, venue, dress code and RSVP deadline.",
          image: "/assets/gender-reveal-rsvp/landing.webp",
          alt: "RSVP landing page with event details and a 'Find your name' search box",
        },
        {
          title: "Find your name",
          body: "Typing two or more letters of a first name or nickname narrows the hosts' guest list; guests tap their own name.",
          image: "/assets/gender-reveal-rsvp/search.webp",
          alt: "Name search showing matching guests after typing two letters",
        },
        {
          title: "Confirm it's you",
          body: "Guests check they picked the right name before replying, so replies always land on the right person.",
          image: "/assets/gender-reveal-rsvp/confirm.webp",
          alt: "Confirmation step asking 'Is this you?' with the selected guest's name",
        },
        {
          title: "Reply",
          body: "Guests say whether they're coming and can add a boy-or-girl guess and a short message, then send.",
          image: "/assets/gender-reveal-rsvp/reply.webp",
          alt: "Reply form with attendance options, a boy-or-girl guess and a message box",
        },
        {
          title: "Hosts: dashboard",
          body: "In Google Sheets: invited, coming, not coming, waiting, response rate and head count, plus replies, guesses and replies-over-time charts, the shared link and QR code, and the RSVP deadline.",
          image: "/assets/gender-reveal-rsvp/dashboard.webp",
          alt: "Google Sheets RSVP dashboard with headline counts, a replies donut chart and a guesses bar chart",
        },
        {
          title: "Hosts: follow-ups & messages",
          body: "Below the charts: a list of who still hasn't replied, so the hosts know who to follow up with, and the latest messages from guests.",
          image: "/assets/gender-reveal-rsvp/dashboard-lists.webp",
          alt: "Dashboard section with the replies-over-time chart and the follow-up and message lists, blurred for privacy",
        },
      ],
    },
    evidence: [
      {
        kind: "milestone",
        text: "Live and in use for the event, with replies coming in from invited guests.",
      },
      {
        kind: "implemented",
        text: "The hosts track replies, guesses and messages from the Google Sheets dashboard instead of the database.",
      },
      {
        kind: "implemented",
        text: "Every reply is matched to an invited guest: guests pick their own name from the hosts' list and confirm it, so there are no misspelled or unknown names to sort out.",
      },
      {
        kind: "estimate",
        text: "Tallying by hand would take about 2 hours over the RSVP period: roughly a minute to log each of the 71 guests' replies, plus several re-checks of the totals and of who's still missing. The dashboard tallies replies, guesses and head count on its own, so that time drops to zero, with no re-typing and no tally mistakes from manual entry.",
      },
    ],
    limitations:
      "It's built for one private family event. Anyone with the link can reply for any name on the list — fine among family and friends, but a public event would need per-guest links or codes.",
    services: ["workflow-automation", "data-reporting"],
    next: "lead-follow-up-reminder",
  },
  {
    slug: "lead-follow-up-reminder",
    index: "07",
    title: "Lead Follow-up Reminder",
    category: "automation",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["data-reporting"],
    tags: ["Make.com", "Google Sheets", "Gmail", "Workflow design"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Real estate finance",
    // Made for a real organization: a client's finance team (kept confidential).
    realWorld: true,
    featured: true,
    stage: "Built · Tested in manual runs",
    stageKind: "prototype",
    // Hours saved per month — feeds the hero total. ESTIMATE, from an
    // observed ~1 min per lead × 67 leads = ~67 min/week reviewing the
    // tracker (excludes compiling the list), vs ~5 min reading the email
    // (assumed): 62 min/week × 52 ÷ 12 ≈ 4.5 hrs/month. Set
    // hoursEstimate to false once both sides are timed.
    hoursSavedPerMonth: 4.48,
    hoursEstimate: true,
    // Net savings per year in US$ — feeds the hero total. ESTIMATE: the
    // hours above at US$39.31/hr, at today's 67 leads.
    savingsPerYear: 2100,
    savingsEstimate: true,
    // Value at today's 67 leads, at US$39.31/hr (US real-estate finance
    // average pay, Oct 2026): ~62 min/week saved → ~54 hrs/yr → ~US$2,100/yr.
    // Each added lead saves ~1 min/week ≈ US$34/yr more.
    highlights: [
      // A percentage holds at any lead count (67 → ~5 min today).
      { value: "93%", trend: "down", label: "Weekly review time reduction" },
      { value: "~$2.1K/yr", label: "Estimated savings, +$34/yr per lead" },
    ],
    // 16:7 artwork for the /work card (replaces the typed placeholder).
    cardArt: "/assets/lead-follow-up-reminder/card.webp",
    tagline: "A lead tracker that emails the finance manager each week's follow-ups.",
    summary:
      "Reads the lead tracker and emails one weekly list of follow-ups, owners and actions.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Follow-ups across dozens of lender leads were easy to lose track of.",
      built: "A Make.com scenario that turns the lead tracker into one weekly email.",
      result: "Tested end to end: every active lead, its owner and next action in one email.",
    },
    subtitle:
      "A weekly follow-up overview, built from a finance team's lead tracker and sent automatically.",
    facts: {
      role: "Software Developer",
      stack: "Make.com · Google Sheets · Gmail",
      timeline: "2026",
    },
    overview:
      "A finance team tracks its lender and financing leads in a shared Google Sheet. I built a Make.com scenario that reads that tracker and sends the finance manager one weekly email listing every lead due for follow-up, so the team can agree on next steps without combing through the sheet. Client and lead details are confidential, so this case study shows the workflow rather than real data.",
    problem:
      "With dozens of lenders at different stages — documents requested, meetings pending, no reply yet — it's easy for a follow-up to slip. The tracker held the right information, but someone had to read through it every week to see what was due, who owned it and what should happen next.",
    users:
      "The finance manager who coordinates follow-ups, and the lead owners who act on them.",
    contribution: {
      text: "I designed and built the automation, from reading the tracker to the email the manager receives.",
      items: [
        "Built the Make.com scenario that reads the lead tracker from Google Sheets",
        "Filtered it down to active leads with a follow-up due, and aggregated them into one email",
        "Designed the email: each lead with its status, priority, owner, follow-up date and next action, plus a link back to the tracker",
        "Added a data store check so the weekly email is only sent once, even if the scenario runs again",
        "Recorded each send in the data store, so there's a log of which weekly reminders went out",
      ],
    },
    decisions: [
      {
        title: "The tracker stays the source of truth",
        body: "The team keeps working in the Google Sheet they already use. The automation only reads it, so there's no second system to keep in sync.",
      },
      {
        title: "Send once per week, no matter what",
        body: "Before sending, the scenario checks a data store for this week's reminder. A re-run or retry can't send the manager a duplicate email.",
      },
      {
        title: "Built to scale with the pipeline",
        body: "Reviewing by hand costs about a minute per lead, so the work grows with every new lender. The scenario filters and compiles the list automatically whether there are 40 leads or 400, and sorts them by priority and follow-up date, so the week's follow-ups are already planned when the email arrives.",
      },
      {
        title: "Written for action, not for reading",
        body: "Every row says who owns the lead, when to follow up and what to do next, sorted with high-priority leads first. The email ends by asking owners to update the tracker after each follow-up, which keeps next week's email accurate.",
      },
    ],
    demo: {
      kind: "media",
      items: [
        {
          src: "/assets/lead-follow-up-reminder/scenario.webp",
          alt: "Make.com scenario: JSON, Iterator, Google Sheets search, a follow-up filter, text aggregator, data store check, a weekly-reminder filter, Gmail and a data store record",
          caption: "The scenario in Make.com: read the tracker, filter active follow-ups, build the email, check it hasn't been sent this week, send it, and log it.",
        },
      ],
    },
    evidence: [
      {
        kind: "implemented",
        text: "Runs successfully end to end in Make.com, in under 10 seconds per run.",
      },
      {
        kind: "implemented",
        text: "One email covers every active lead with its owner, follow-up date and next action, with high-priority leads first.",
      },
      {
        kind: "estimate",
        text: "Weekly follow-up review: about 1 minute per lead across 67 leads is roughly 67 minutes reviewing the tracker by hand — before compiling the list — vs. about 5 minutes reading the email. That's ~93% less review time, or about 4.5 hours a month.",
      },
      {
        kind: "estimate",
        text: "At US$39.31 an hour (average US pay for real-estate finance roles, as of Oct 2026), that time is worth about US$2,100 a year at today's 67 leads. Because manual review grows with every lead while the scenario doesn't, each added lead is worth about US$34 a year more. Running cost is negligible — about 30 Make credits a month, within the free allowance. This is time freed up, not cash saved.",
      },
    ],
    limitations:
      "It has been tested with manual runs; the weekly schedule isn't switched on yet. The time saved is an estimate until the manual review and the email are timed side by side.",
    nextSteps:
      "Once it runs on schedule, compare how long the weekly review takes before and after, and track how many follow-ups are updated in the tracker.",
    services: ["workflow-automation", "data-reporting"],
    next: "hubspot-crm-cleanup",
  },
  {
    slug: "hubspot-crm-cleanup",
    index: "08",
    title: "HubSpot CRM Cleanup",
    category: "data-reporting",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["automation"],
    tags: ["HubSpot CRM", "HubSpot workflows", "Python scripting", "Data cleaning", "Dashboards"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Medical diagnostics",
    // Made for a real organization: a US diagnostic company (kept confidential).
    realWorld: true,
    featured: true,
    stage: "Live · client CRM",
    stageKind: "live",
    // MEASURED from the client's exports: 324 of 597 leads had no source;
    // 302 got a High/Medium suggestion, 22 were flagged for review. A
    // campaign list of 493 entries had 64 cross-source duplicates and 331
    // contacts already in HubSpot.
    highlights: [
      { value: "324 → 22", label: "Leads needing manual review" },
      { value: "395", label: "Duplicates caught before import" },
    ],
    // 16:7 artwork for the /work card: the dashboard, with dummy labels.
    cardArt: "/assets/hubspot-crm-cleanup/card.webp",
    tagline: "Cleaning, maintaining and reporting on a US diagnostic company's HubSpot CRM.",
    summary:
      "Traces duplicate contacts, tags lead sources, fills missing addresses and reports daily.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Lead sources went untagged, duplicates crept in and addresses were missing.",
      built: "A cleanup process, an address workflow and a daily dashboard in HubSpot.",
      result: "Manual lead review cut from 324 leads to 22; 395 duplicates caught before import.",
    },
    subtitle:
      "Data cleanup, automation and reporting for a US diagnostic company's HubSpot CRM.",
    facts: {
      role: "Software Developer",
      stack: "HubSpot · Python · Spreadsheets",
      timeline: "2026",
    },
    overview:
      "A US diagnostic company runs its sales on HubSpot. Its CRM had three problems: leads with no source tag, duplicate contacts, and contacts missing addresses their company record already had. I cleaned the existing data, set up a workflow to keep addresses filled in, and built a dashboard for the team's daily activity. Client details are confidential, so this case study shows the approach rather than real records.",
    problem:
      "HubSpot can't tag a lead's source in bulk: someone has to open each lead and read through its associated contacts' activity to decide where it came from. Across a whole pipeline that's hours of manual review, and duplicate contacts and missing addresses made the data harder to trust and report on.",
    users: "The client's sales team and the managers who report on its pipeline.",
    contribution: {
      text: "I handled the CRM work end to end, from cleaning the existing data to the automation and reporting that keep it useful.",
      items: [
        "Exported contacts and leads, then joined and cleaned them with spreadsheets and Python",
        "Merged a new campaign list from three sources and checked it against the CRM, so only new contacts were added",
        "Suggested a source tag for each lead from its record source, with a confidence level so uncertain rows get a human check",
        "Re-imported the cleaned data into HubSpot",
        "Built a workflow that copies a company's address onto its contacts when theirs is missing",
        "Built a daily dashboard of deals by type, activities and KPIs",
      ],
    },
    decisions: [
      {
        title: "Work around the CRM's limit, not inside it",
        body: "Instead of reviewing leads one by one in HubSpot, the data is exported, matched and tagged outside it, then imported back. The same steps can be rerun whenever new leads come in.",
      },
      {
        title: "Confidence, not just a tag",
        body: "Each suggested source tag comes with a High or Medium confidence based on how clear the record source is. High-confidence rows go straight in; Medium ones are flagged for a quick check.",
      },
      {
        title: "Only fill what's missing",
        body: "The address workflow enrolls contacts with no street address but a known company, and copies city, state, postal code and country one field at a time, skipping any the company doesn't have. Existing contact data is never overwritten.",
      },
    ],
    demo: {
      kind: "media",
      layout: "stack",
      items: [
        {
          src: "/assets/hubspot-crm-cleanup/lead-tagging.webp",
          alt: "Slide describing the exported contacts and leads data, next to a table of leads with record source, suggested source tag and confidence",
          caption: "Lead source tagging: each lead's record source mapped to a suggested tag and a confidence level. Lead names removed; file names replaced with placeholders.",
        },
        {
          src: "/assets/hubspot-crm-cleanup/workflow.webp",
          alt: "HubSpot workflow that copies a company's city, state, postal code and country onto a contact, with branches that skip missing values",
          caption: "The address workflow, shown in test mode before it went live. Contact and record ID replaced with sample values.",
        },
        {
          src: "/assets/hubspot-crm-cleanup/dashboard.webp",
          alt: "HubSpot dashboard with a deals distribution pie chart, activity KPIs and an activity bar chart",
          caption: "The daily dashboard: deals by type, today's activities and KPIs. Deal categories and names replaced with dummy labels.",
        },
      ],
    },
    evidence: [
      {
        kind: "measured",
        text: "Lead source tagging: 324 of 597 leads had no source. The process suggested one for 302 of them (93%) with High or Medium confidence, leaving 22 for manual review instead of all 324.",
      },
      {
        kind: "measured",
        text: "Duplicate tracing on a new campaign list: 493 entries from three sources held 64 duplicates and 331 contacts already in HubSpot. That's 395 caught before import, leaving 98 genuinely new contacts, while the existing records were used to fill in missing names and phone numbers.",
      },
      {
        kind: "implemented",
        text: "Live HubSpot workflow that fills a contact's missing address from its company record, field by field.",
      },
      {
        kind: "implemented",
        text: "Daily dashboard of deal distribution by type, activities and activity KPIs.",
      },
    ],
    limitations:
      "Client data is confidential, so the screenshots here have names, IDs, file names and deal categories replaced with sample values, and no real records are shown.",
    services: ["data-reporting", "workflow-automation"],
    next: "portfolio-terminal-agent",
  },
  {
    slug: "portfolio-terminal-agent",
    index: "09",
    title: "Portfolio Terminal Agent",
    category: "automation",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["applications"],
    tags: ["n8n", "RAG", "LLM integration", "React", "Vercel"],
    // Feeds the hero figures strip (highlights.js).
    sector: "AI assistants",
    featured: false,
    stage: "Built into this portfolio · being improved",
    stageKind: "live",
    // Counted from src/components/terminalCommands.js. "20" is the question
    // topics in ANSWERS that need no agent (years, projects, services,
    // skills, rates, location, ...; "help" not counted). "14" is the slash
    // commands (/home /work /skills /experience /about /process /services
    // /contact /projects /aboutme /resume /github /linkedin /open), aliases
    // not counted. Update both if those lists change.
    highlights: [
      { value: "20", label: "Question topics answered instantly" },
      { value: "14", label: "Slash commands to move around" },
    ],
    // 16:7 artwork for the /work card: the real terminal answering "how many projects?".
    cardArt: "/assets/portfolio-terminal-agent/card.webp",
    tagline: "A retro terminal on this site that answers questions about my work.",
    summary:
      "A retro terminal that answers visitors' questions about my work through an n8n RAG agent.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Visitors had to dig through pages to find out if I'd done what they need.",
      built: "A terminal on the home page, backed by an n8n RAG agent.",
      result: "Common questions answer instantly; anything else goes to the agent.",
    },
    subtitle:
      "An AI agent built into this portfolio's retro terminal, so visitors can simply ask about my work.",
    facts: {
      role: "Software Developer",
      stack: "React · Vercel Functions · n8n",
      timeline: "2026",
    },
    overview:
      "The computer on this portfolio's home page is a working terminal. Visitors can ask a question in plain words or type a slash command like /work to jump around the site. Common questions are answered on the page straight away, and anything else goes to an AI agent I built in n8n, which answers from what it knows about my work. I'm still improving the agent's workflow; the parts below describe how the pieces fit together today.",
    problem:
      "A recruiter or client usually has one question: has she done the thing I need? Answering it means reading several case studies and the résumé. A terminal they can just ask turns that search into a sentence, and fits the site's terminal style.",
    users: "Recruiters and potential clients visiting the portfolio.",
    contribution: {
      text: "I built the whole chain, from the terminal on the page to the agent that answers.",
      items: [
        "Built the terminal in React, with slash commands for moving around the site",
        "Wrote built-in answers to common questions, matched by pattern and built from the site's own data",
        "Wrote a Vercel serverless function that checks each question and passes it on",
        "Connected it to an n8n webhook that runs the RAG agent, with the webhook's address and auth kept server-side",
        "Gave each browser session an ID, so the agent can remember the conversation",
        "Built the n8n agent workflow, which I'm still improving",
      ],
    },
    decisions: [
      {
        title: "Common questions stay in the browser",
        body: "Questions like \"how many years of experience does she have?\" or \"does she know Python?\" are matched by pattern and answered on the page from the same data the site shows, so the answers stay current and cost nothing to run. Only questions that match nothing go to the agent.",
      },
      {
        title: "Only slash commands move the page",
        body: "Typing \"about\" answers the question; typing /about jumps to the section. Visitors asking a question never get scrolled away from the answer.",
      },
      {
        title: "The browser never talks to n8n",
        body: "Questions go to a serverless function on the site, which calls the n8n webhook. The webhook's address and auth header live in environment variables, so they never reach the visitor's browser.",
      },
      {
        title: "Checked at the door",
        body: "The function only accepts simple requests, and questions over 300 characters are turned away before they reach the agent.",
      },
      {
        title: "Tolerant of the workflow changing",
        body: "The function reads the agent's answer whether n8n returns plain text or JSON with a reply, answer, output or text field. The workflow can be reworked without touching the site.",
      },
      {
        title: "A graceful \"no signal\"",
        body: "If the agent is unreachable or rate-limited, the screen shows a CRT-style \"NO SIGNAL\" message instead of an error, and the built-in answers keep working.",
      },
    ],
    demo: {
      kind: "media",
      layout: "stack",
      items: [
        {
          src: "/assets/portfolio-terminal-agent/card.webp",
          alt: "The retro computer on the home page, its terminal answering “how many projects?” with the project count by category and the list of projects",
          caption: "Asked “how many projects?”, the terminal answers on the page from the site's own data. Questions it can't answer go to the agent.",
        },
      ],
    },
    evidence: [
      {
        kind: "implemented",
        text: "Built-in answers for 20 question topics and 14 slash commands, handled in the browser without calling the agent.",
      },
      {
        kind: "implemented",
        text: "Serverless function that checks each question and forwards it to the n8n agent, with its credentials kept server-side.",
      },
      {
        kind: "implemented",
        text: "Session IDs per browser, so the agent can keep the thread of a conversation.",
      },
    ],
    limitations:
      "The agent's workflow is still being improved, so its knowledge and answers will change. Reply times and answer quality haven't been measured yet.",
    nextSteps:
      "Finish the agent's workflow, then test it on a fixed set of visitor questions to measure reply time and how often it answers correctly.",
    services: ["workflow-automation"],
    next: "qa-test-automation",
  },
  {
    slug: "qa-test-automation",
    index: "10",
    title: "End-to-End Test Automation",
    category: "automation",
    tags: ["Cypress", "JavaScript", "Mocha", "Page Object Model", "Regression testing"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Logistics",
    // Made for a real organization: Raykan Technologies' client, a US
    // logistics company (kept confidential).
    realWorld: true,
    featured: false,
    stage: "Delivered · handed over with an SOP",
    stageKind: "live",
    // Counted from the suite's spec files: 8 customer-side + 10
    // employee-side.
    highlights: [
      { value: "18", label: "End-to-end test suites" },
      { value: "2", label: "User portals covered" },
    ],
    // 16:7 artwork for the /work card: the suite's folder layout.
    cardArt: "/assets/qa-test-automation/card.webp",
    tagline: "Automated release checks for a logistics platform's two portals.",
    summary:
      "End-to-end Cypress tests for a logistics platform's customer and employee portals.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "A rebuilt platform with many modules had to be checked by hand every release.",
      built: "Cypress test suites for both portals, with reports and a handover SOP.",
      result: "18 suites the next tester could run, read and extend.",
    },
    subtitle:
      "Cypress end-to-end testing for a US logistics company's operations platform, built during my QA internship at Raykan Technologies.",
    facts: {
      role: "QA Engineer",
      stack: "Cypress · JavaScript · Mocha · Mochawesome",
      timeline: "Feb – Jun 2024",
    },
    overview:
      "Raykan Technologies was rebuilding the operations platform of a US logistics company, covering user management, customer care, sales, warehousing and accounting, for both its customers and its employees. In Raykan's QA team I built the Cypress end-to-end tests that check those portals before each release, and co-wrote the SOP that lets the next tester run and extend them. Client details, screens and data are confidential, so this case study shows how the testing was done rather than the application.",
    problem:
      "Every release touched a large app with two portals and dozens of screens. Checking the main flows by hand each time was slow and easy to get inconsistent, and the app's elements had no test IDs, so tests needed a careful way to find what to click.",
    users:
      "Raykan's QA and development teams, and the client, who received the test reports.",
    contribution: {
      text: "I wrote and maintained the automated tests, and documented how to run and extend them.",
      items: [
        "Wrote Cypress test suites for the customer and employee portals, organised by module",
        "Built page objects and navigation helpers so each screen is described once and reused",
        "Checked actions with no visible result by watching the backend request and its response",
        "Set up HTML reports per portal, with a screenshot of every failed step",
        "Co-wrote the team's SOP on the suite's structure, conventions and how to run it",
      ],
    },
    decisions: [
      {
        title: "Page objects, one file per screen",
        body: "Each screen's elements live in one place, grouped by form or page. When the UI changes, one file changes, not every test that touches it.",
      },
      {
        title: "Selectors that work without test IDs",
        body: "With no unique IDs in the app, tests target an element by its type and text in a single query, instead of collecting every match and filtering. That stays fast on screens with hundreds of similar elements.",
      },
      {
        title: "Automate the paths that must always work",
        body: "Automated tests cover the main success paths of each module. Edge cases and negative inputs stayed with the manual testers, which kept the suite quick to write and reliable to run.",
      },
      {
        title: "Check the backend when the screen can't tell",
        body: "Some actions, like generating a PDF, show nothing on screen. For those, the test watches the backend request and passes only if it comes back successful.",
      },
      {
        title: "Built to be handed over",
        body: "Suites are numbered to match the app's sidebar, and the SOP explains the structure, naming, setup and report steps, so a new tester can pick it up without the original team.",
      },
    ],
    demo: {
      kind: "media",
      layout: "stack",
      items: [
        {
          src: "/assets/qa-test-automation/card.webp",
          alt: "Terminal window showing the test suite's folders: customer-side and employee-side suites, navigation, page objects, shared commands and reports",
          caption: "How the suite is organised. The client's screens and data are confidential, so none are shown.",
        },
      ],
    },
    evidence: [
      {
        kind: "implemented",
        text: "18 end-to-end test suites: 8 for the customer portal and 10 for the employee portal, from login through sales, warehousing and accounting.",
      },
      {
        kind: "implemented",
        text: "HTML test reports for each portal, with screenshots of failed steps, used to show the client and team what passed and what broke.",
      },
      {
        kind: "milestone",
        text: "Handed over with an SOP co-written with Raykan's QA team, covering setup, structure, conventions and report generation.",
      },
    ],
    limitations:
      "The automated tests cover the main success paths; negative cases were tested manually by the QA team. Client details, screens and data are confidential, so this case study describes the approach rather than the application.",
    nextSteps:
      "The SOP recommends running the suite in Docker as part of the deployment pipeline, so every release is checked automatically.",
    services: ["business-applications"],
    next: "concreat-rewards",
  },
];

// Primary tag for each project (`category`), shown on its card. Projects
// can also appear under other filters through `alsoIn`. Secondary `tags`
// list the skills and tools involved and are display-only.
export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "applications", label: "Applications" },
  { key: "automation", label: "Automation" },
  { key: "data-reporting", label: "Data & Reporting" },
];

// True when a project belongs to a filter, as its primary category or
// through `alsoIn`.
export function inCategory(project, key) {
  return key === "all" || project.category === key || (project.alsoIn ?? []).includes(key);
}

export default projects;
