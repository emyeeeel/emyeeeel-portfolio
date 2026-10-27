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
      problem: "Five partner types. One rulebook. No way to test it on paper.",
      built: "One portal. Every role. Ready to click through.",
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
    // `payoff` is the one-line benefit shown under each decision in the
    // case study template.
    decisions: [
      {
        title: "One source of truth for every role",
        body: "Who can allocate points, manage a network or join a program lives in a single access matrix. Menus, screens and access messages all read from it.",
        payoff: "Change a rule once; every screen follows.",
        // copied from the app's src/lib/access.ts
        visual: {
          kind: "code",
          file: "src/lib/access.ts",
          lines: [
            "const ACCESS: Record<Feature, UserRole[]> = {",
            '  allocate: ["dealer", "sub-dealer"],',
            '  network:  ["dealer", "sub-dealer"],',
            '  vehicle:  ["dealer", "contractor"],',
            '  trip:     ["dealer", "contractor"],',
            '  silo:     ["contractor"],',
            "};",
          ],
        },
      },
      {
        title: "Business rules backed by tests",
        body: "Enrollment tiers, monthly targets, point balances and admin totals are plain functions with unit tests, kept apart from the screens that show them.",
        payoff: "A broken rule fails a test, not a demo.",
        // test names (shortened) and the total from a `vitest run` of the app
        visual: {
          kind: "tests",
          command: "vitest run",
          lines: [
            "access › matches the agreed matrix",
            "silo › waives rental for met months",
            "silo › flags lock-in at risk",
            "vehicle › no tier has a peso value",
            "analytics › every total reconciles",
          ],
          summary: "Tests  38 passed (38)",
        },
      },
      {
        title: "Demo data that's safe to share",
        body: "The review build runs on seeded data and a sign-in that stays in the browser, with a one-click reset.",
        payoff: "Anyone can explore it without real partner data.",
        // the sign-in page's demo-accounts panel
        visual: {
          kind: "demo",
          title: "Demo accounts · any password",
          action: "Reset demo data",
          accounts: [
            ["carlos@concreat.ph", "Dealer"],
            ["maria@concreat.ph", "Sub-dealer"],
            ["jose@concreat.ph", "Retailer"],
            ["daniel@concreat.ph", "Contractor"],
          ],
        },
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
        text: "Each 5-point gain in partner retention adds about 10% to five-year sales. A partner network was modelled over five years at starting retention rates from 70% to 85%; the gain stays between 10.0% and 10.4% across that range. The same model leaves 24 of every 100 partners still buying in year five at 70% retention, and about 32 at 75%.",
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
    // The case study template (see CaseTemplate.jsx). A project with a
    // `story` renders in the template; the fields above still feed the
    // cards and the terminal.
    story: {
      // The full-screen opener: the app on a phone, with the name and the
      // tagline (from the live sign-in page) laid over the photo in the
      // app's purple and red. The photo is widened on the left with soft
      // floor so the phone reads as an accent on the right.
      cover: {
        layout: "overlay",
        kicker: "Case study · Partner rewards platform",
        lines: ["Concreat", "Rewards"],
        // the live app's typeface, in its heavy italic
        font: "Urbanist, sans-serif",
        fontStyle: "italic",
        background: "#dcdcdc",
        text: "#1f0b55",
        highlight: "#C8102E",
        tagline: "Every bag earns more.",
        accent: ["earns", "more"],
        image: {
          src: "/assets/concreat-rewards/cover-phone-hand.webp",
          alt: "A hand holding a phone showing the Concreat Rewards redeem screen",
        },
      },
      // The slide after the cover: what it is, then the project's details.
      overview: {
        background: "#f3f3f7",
        ink: "#1f0b55",
        muted: "#8e8aa3",
        accent: "#C8102E",
        font: "Urbanist, sans-serif",
        // plays the case study's video (story.video) from the card, in a popup
        showVideo: true,
        image: {
          src: "/assets/concreat-rewards/overview-redeem.webp",
          alt: "The Concreat Rewards redeem screen: a 279,350-point balance over the APO, Rizal and Island cement banner",
        },
        lead: "Concreat Rewards is a loyalty portal where dealers, retailers and contractors earn a point on every bag of cement,",
        rest: "pass points down their network, and redeem them for cement, merchandise and trips.",
        meta: [
          ["Client", "Concreat Holdings PH"],
          ["Year", "2026"],
          ["Platform", "Web · responsive"],
          ["Role", "Solo developer"],
        ],
        tags: ["Requirements", "User flows", "Front-end", "Role-based access", "Unit testing", "Prototyping"],
      },
      // The slide after the overview: why the app exists, then the features
      // that solve the problem, each as a figure. All taken from the live app.
      why: {
        // the live app's sign-in look: purple, its red slab, its header stripe
        background: "#250E62",
        ink: "#ffffff",
        muted: "#b8b0dc",
        accent: "#86CDEA",
        slab: "#C8102E",
        stripes: ["#86CDEA", "#C8102E", "#22409A", "#250E62"],
        // the cards, like the app's dashboard cards
        cardInk: "#1f0b55",
        cardMuted: "#6f6a8a",
        cardUnit: "#C8102E",
        cardAccents: ["#C8102E", "#22409A", "#C8102E"],
        font: "Urbanist, sans-serif",
        image: {
          src: "/assets/concreat-rewards/why-laptop.webp",
          alt: "The Concreat Rewards sign-in page on a laptop: Every bag earns more",
        },
        lines: ["Why", "Concreat", "Rewards?"],
        subhead: "Because a rulebook can't keep partners buying.",
        text: "Partners needed to see what every bag was worth and what their loyalty could unlock. The portal turns the program's rules into something they can check, share and spend.",
        points: [
          {
            value: "₱1",
            unit: "/ bag",
            title: "Every bag earns a point",
            text: "1 bag = 1 point = ₱1 on every APO, Rizal and Island bag, so a partner can count their reward at the counter.",
          },
          {
            value: "5",
            unit: "roles",
            title: "One portal, the right menu for each",
            text: "Dealers, sub-dealers, retailers, contractors and admins each see only the screens their role can use.",
          },
          {
            value: "3",
            unit: "programs",
            title: "Loyalty that unlocks more",
            text: "Vehicle, trip and silo-truck programs, each with a monthly tracker that shows how close a partner is.",
          },
        ],
      },
      // ---- the deck, sections 4–7 ----
      // 04: one dealer's journey through the real phone screens (demo data)
      journey: {
        theme: {
          background: "#f3f3f7",
          ink: "#1f0b55",
          muted: "#6f6a8a",
          accent: "#C8102E",
          font: "Urbanist, sans-serif",
        },
        title: "From bag to reward.",
        titleAccent: ["reward"],
        intro: "Follow Carlos, a dealer in Quezon City, from his latest delivery to his next reward, through the screens he actually uses.",
        // a bento grid: tile ("wide" spans two columns), tint, a visual and a
        // stat card. Figures are Carlos's, from the live demo data.
        steps: [
          {
            label: "Earn",
            title: "Every bag lands as points",
            text: "Purchases, product mix and points in one view, on desktop and phone, with nudges like falling behind vehicle-program pace.",
            image: "/assets/concreat-rewards/mock-multi-dashboard.webp",
            alt: "The dealer dashboard on a laptop and on a phone: 279,350 points available and 1,791,000 bags purchased",
            fit: "mockup",
            tile: "wide",
            tint: "#ffffff",
            chip: { label: "Latest delivery", value: "+19,400 pts" },
          },
          {
            label: "Share",
            title: "Points flow down his network",
            text: "He allocates points to the sub-dealers and retailers who buy through him.",
            image: "/assets/concreat-rewards/mock-phone-allocate.webp",
            alt: "A phone showing the allocate points screen: 279,350 points available and the transfer form",
            fit: "mockup",
            place: { width: "56%", left: "22%", top: "0" },
            tint: "#e3f2fa",
            chip: { label: "To Maria Santos", value: "−4,300 pts" },
          },
          {
            label: "Unlock",
            title: "Programs that keep him buying",
            text: "A 36-month vehicle program counts each compliant month toward his shuttle van.",
            image: "/assets/concreat-rewards/mock-hand-vehicle-plan.webp",
            alt: "A hand holding a phone with the vehicle program: 19 of 36 compliant months and the Silver business package",
            fit: "mockup",
            place: { width: "190%", left: "-108%", top: "0" },
            tint: "#e9e6f7",
            chip: { label: "Compliant months", value: "19 / 36" },
          },
          {
            label: "Redeem",
            title: "Points turn into rewards",
            text: "Cement credits and merchandise, or trips that unlock with lifetime points, from an island stay to flights abroad.",
            image: "/assets/concreat-rewards/mock-tablet-trip.webp",
            alt: "Hands holding a tablet with the trip program: Travel on your points, with domestic and international trips unlocked",
            fit: "mockup",
            // anchored to the bottom edge: the wrists meet it, the right arm runs off the side
            place: { width: "100%", left: "0", top: "auto", bottom: "0" },
            tile: "wide",
            tint: "#fbe8eb",
            chip: { label: "Trips unlocked", value: "2 of 2" },
          },
        ],
      },
      // 05: the process and decisions, on the app's purple
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#250E62",
        ink: "#ffffff",
        muted: "#b8b0dc",
        accent: "#86CDEA",
        font: "Urbanist, sans-serif",
      },
      // 06: the outcome, on a soft lavender
      outcomeTheme: {
        background: "#e9e7f5",
        ink: "#1f0b55",
        muted: "#6f6a8a",
        accent: "#C8102E",
        font: "Urbanist, sans-serif",
      },
      // 07: the closing slide, on a photo of the app in use
      closing: {
        // a hand holding the app's sign-in page, on light concrete
        background: "#d8d8d6",
        ink: "#1f0b55",
        muted: "#4a3f78",
        accent: "#C8102E",
        font: "Urbanist, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn your rules and spreadsheets into an app your team can click through.",
        image: {
          src: "/assets/concreat-rewards/closing-wall.webp",
          alt: "A hand holding a phone showing the Concreat Rewards sign-in page: Every bag earns more",
        },
      },
      team: "Solo",
      // The case study's one video, under the header. Media: { src,
      // poster?, alt } once it exists; until then `placeholder` describes
      // what to make (shown in dev only) and the project's /work card
      // artwork stands in.
      video: {
        src: "/assets/concreat-rewards/promo.mp4",
        poster: "/assets/concreat-rewards/promo-poster.jpg",
        duration: "0:30",
        alt: "Concreat Rewards promotional video: how partners earn, share and redeem points",
      },
      // Exactly 3, all numbers. Figures carry no evidence tag here, so say
      // "est." or "simulated" in the label when a figure isn't a fact.
      kpis: [
        { value: "+10%", label: "5-yr sales per 5-pt retention gain (simulated)" },
        { value: "9", label: "Screens across the partner and admin views" },
        { value: "13", label: "Demo accounts in the live review build" },
      ],
      context: {
        text: "Every bag of APO, Rizal or Island cement earns a point worth ₱1. What a partner can do next depends on who they are: dealers and sub-dealers pass points down their network, contractors run silo-truck lock-ins, and only some roles unlock the vehicle and trip programs. Concreat needed to see it working before saying yes.",
        audience: "Concreat's program owners and marketing team, deciding whether to approve the program.",
        // Role-based access: every screen in the app, and the ones each role's
        // menu shows. Copied from each demo account's sidebar in the live
        // review build. Rendered as a "sign in as" switcher.
        access: {
          screens: [
            "Dashboard",
            "Allocate points",
            "Redeem rewards",
            "Transactions",
            "Vehicle program",
            "Trip program",
            "Silo program",
            "My profile",
            "Admin console",
          ],
          roles: [
            {
              role: "Dealer",
              screens: ["Dashboard", "Allocate points", "Redeem rewards", "Transactions", "Vehicle program", "Trip program", "My profile"],
            },
            { role: "Sub-dealer", screens: ["Dashboard", "Allocate points", "Redeem rewards", "Transactions", "My profile"] },
            { role: "Retailer", screens: ["Dashboard", "Redeem rewards", "Transactions", "My profile"] },
            {
              role: "Contractor",
              screens: ["Dashboard", "Redeem rewards", "Transactions", "Vehicle program", "Trip program", "Silo program", "My profile"],
            },
            { role: "Admin", screens: ["Admin console"] },
          ],
        },
      },
      ownership: {
        summary: "Solo, end to end.",
        // Every phase of the work in a few words; `mine: false` marks a
        // teammate's part. The detail lives in the decisions, not here.
        phases: [
          { label: "Requirements", mine: true, text: "Rules mapped to each role" },
          { label: "User flows", mine: true, text: "A flow per partner type" },
          { label: "Build", mine: true, text: "Screens and rule logic" },
          { label: "Testing", mine: true, text: "Vitest across every rule" },
          { label: "Hosting", mine: true, text: "Live review build on Vercel" },
        ],
      },
      flow: {
        // Shown in the frame's address bar with each step's `route`.
        host: "concreat-rewards.vercel.app",
        // 3–5 steps: the screens that tell the story best.
        steps: [
          {
            title: "See your points",
            route: "/dashboard",
            body: "Balance, bags bought, product mix and next-step nudges, like falling behind vehicle-program pace.",
            image: "/assets/concreat-rewards/dashboard.webp",
            alt: "Dealer dashboard with available points, bags purchased, a monthly purchases chart by product and next-step insights",
          },
          {
            title: "Pass points down",
            route: "/allocate",
            body: "Dealers allocate points to the sub-dealers and retailers in their network, at 1 point = ₱1.",
            image: "/assets/concreat-rewards/allocate.webp",
            alt: "Allocate points screen with the dealer's balance and a transfer of 5,000 points to a sub-dealer",
          },
          {
            title: "Join a program",
            route: "/vehicle-program",
            body: "A 36-month vehicle program with a monthly compliance tracker, alongside trip and silo-truck programs.",
            image: "/assets/concreat-rewards/vehicle.webp",
            alt: "Vehicle incentive program with 19 of 36 compliant months, a monthly tracker and the partner's shuttle van",
          },
          {
            title: "Redeem rewards",
            route: "/redeem",
            body: "Cement credits, condo rewards, merchandise, safety signage and CPD training, priced in points.",
            image: "/assets/concreat-rewards/redeem.webp",
            alt: "Redeem rewards catalogue with cement credits, condo rewards and Concreat merchandise",
          },
          {
            title: "Oversee the program",
            route: "/admin",
            body: "Volume, points liability, redemption rate and a needs-attention queue, with an exportable scorecard.",
            image: "/assets/concreat-rewards/admin.webp",
            alt: "Admin dashboard with bags purchased, points liability, redemption rate, a monthly volume chart and a needs-attention list",
          },
        ],
      },
      decisionsHeadline: "Three decisions that made it easy to review.",
      // The closing section: what happened, and what comes next.
      outcome: {
        titleAccent: ["production"],
        // What the program could be worth to Concreat, from the retention
        // simulation (see the evidence). The condition is said once, in the
        // label; each card is a figure, a short line and one chart.
        impactsLabel: "If the program keeps 5 more of every 100 partners a year (simulated)",
        impacts: [
          {
            value: "+10%",
            label: "more sales over five years",
            tone: "accent",
            // total sales to date, year one = 100: the sum of 100 × r^t, at
            // 70% retention without the program and 75% with it
            chart: {
              caption: "Total sales to date, year one = 100",
              summary: "Total sales to date, with year one at 100: without the program 100, 170, 219, 253 and 277; with it 100, 175, 231, 273 and 305.",
              legend: ["Without", "With program"],
              groups: [
                { label: "Yr 1", values: [100, 100] },
                { label: "Yr 2", values: [170, 175] },
                { label: "Yr 3", values: [219, 231.3] },
                { label: "Yr 4", values: [253.3, 273.4] },
                { label: "Yr 5", values: [277.3, 305.1], text: ["277", "305"] },
              ],
            },
          },
          {
            value: "+32%",
            label: "more partners still buying in year five",
            tone: "ink",
            // of 100 starting partners, 100 × r^(year − 1) are still buying:
            // at 70% retention without the program, 75% with it
            chart: {
              caption: "Partners still buying, of every 100",
              summary: "Partners still buying each year, of every 100: without the program 100, 70, 49, 34 and 24; with it 100, 75, 56, 42 and 32.",
              legend: ["Without", "With program"],
              groups: [
                { label: "Yr 1", values: [100, 100] },
                { label: "Yr 2", values: [70, 75] },
                { label: "Yr 3", values: [49, 56.3] },
                { label: "Yr 4", values: [34.3, 42.2] },
                { label: "Yr 5", values: [24, 31.6], text: ["24", "32"] },
              ],
            },
          },
        ],
        headline: "Proposal approved. Next: production.",
        text: "The company plans to build production in-house, using the tested rules and screen flows as its reference. Once it runs, comparing enrolled and non-enrolled partners will show the program's real effect on sales.",
        noteLabel: "how these were simulated",
      },
      // Abilities a hiring manager is screening for, not the tech stack.
      skills: [
        "Requirements → user flows",
        "Business-rule modelling",
        "Role-based access design",
        "Unit testing",
        "Stakeholder prototyping",
        "React · TypeScript",
      ],
    },
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
      problem: "Every part of the business kept its own spreadsheet.",
      built: "One back office for the whole business, split by role.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "One data model, not six spreadsheets",
        body: "The modules share one PostgreSQL database, so products, customers and staff are defined once and referenced everywhere instead of re-typed per sheet.",
        payoff: "Define a record once; use it everywhere.",
      },
      {
        title: "Access by role",
        body: "Each person reaches only the modules and actions their job needs, which matters once payroll and accounting sit in the same system as sales.",
        payoff: "Each person sees only their part.",
      },
      {
        title: "Export to the accounting tool, don't replace it",
        body: "Accounting output is a CSV export for QuickBooks, so the prototype fits around the tool the business's books already use.",
        payoff: "The books stay where they are.",
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
    story: {
      kpis: [
        { value: "6", label: "Connected modules, from flock records to accounting" },
        { value: "1", label: "Shared PostgreSQL database in place of separate sheets" },
        { value: "3", label: "User groups, each seeing only its own modules" },
      ],
      context: {
        text: "Flocks, stock, sales, deliveries, staff and accounts were tracked in separate spreadsheets and on paper. Nothing was the single source of truth, and there was no way to show staff only the records their job needed.",
        audience: "The owner and managers, office and sales staff, and the people handling deliveries.",
      },
      ownership: {
        summary: "Solo, from requirements to a working app.",
        phases: [
          { label: "Requirements", mine: true, text: "Daily records mapped" },
          { label: "Data model", mine: true, text: "One PostgreSQL schema" },
          { label: "Build", mine: true, text: "React and Vite on Supabase" },
          { label: "Access", mine: true, text: "Roles across every module" },
        ],
      },
      flow: {
        kind: "features",
        items: [
          { title: "Farm and flock", body: "Flock and farm records, kept in the same system as everything they feed." },
          { title: "Inventory", body: "Stock on hand, drawn from the same product records sales uses." },
          { title: "Sales and invoicing", body: "Sales and invoices tied to shared customer and product records." },
          { title: "Logistics", body: "Deliveries tracked alongside the sales they fulfil." },
          { title: "HR and payroll", body: "Staff and payroll, open only to the roles allowed to see them." },
          { title: "Accounting", body: "The books, with a CSV export for QuickBooks." },
        ],
      },
      decisionsHeadline: "Three decisions behind one back office.",
      // The deck. Draft structure: the journey's steps have no screenshots
      // yet (dev shows a frame to fill), and the copy comes from the fields
      // above.
      cover: {
        layout: "overlay",
        backdrop: true,
        background: "#f9d64a",
        text: "#123f6b",
        highlight: "#1a66a6",
        font: "Poppins, sans-serif",
        kicker: "Business application · prototype",
        logo: { src: "/assets/rcl-egg-trading/rcl-egg-trading_logo.png", alt: "RCL Egg Trading" },
        tagline: "“One back office, from flock to books.”",
        accent: ["flock", "books"],
        image: {
          src: "/assets/rcl-egg-trading/rcl-egg-trading_bg.png",
          alt: "RCL Egg Trading's yellow brand backdrop",
        },
      },
      overview: {
        background: "#fbf8ee",
        ink: "#123f6b",
        muted: "#8a8f9a",
        accent: "#1a66a6",
        font: "Poppins, sans-serif",
        thumb: "tile",
        lead: "RCL Egg Trading's back office brings an egg supplier's records into one app,",
        rest: "from flock and stock to invoices, deliveries and payroll, split by role.",
        meta: [
          ["Client", "RCL Egg Trading"],
          ["Year", "2026"],
          ["Platform", "Web app"],
          ["Role", "Solo developer"],
        ],
        tags: ["Requirements", "Data modeling", "Front-end", "Supabase", "Role-based access", "Prototyping"],
      },
      why: {
        background: "#1a66a6",
        ink: "#ffffff",
        muted: "#cfe0f2",
        accent: "#f9d64a",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/rcl-egg-trading/rcl-egg-trading_logo_icon.png",
          alt: "RCL Egg Trading's mascot, an egg-shaped chick",
        },
        lines: ["Why one", "back office?"],
        subhead: "Because every part of the business kept its own spreadsheet.",
        text: "Flocks, stock, sales, deliveries, staff and accounts lived in separate sheets and on paper, with no single source of truth and no way to show staff only what their job needed.",
        points: [
          {
            value: "6",
            unit: "modules",
            title: "The whole business, one app",
            text: "Flock, inventory, sales, deliveries, payroll and accounting.",
          },
          {
            value: "1",
            unit: "database",
            title: "Define it once",
            text: "Products, customers and staff live in one PostgreSQL database, referenced everywhere.",
          },
          {
            value: "3",
            unit: "user groups",
            title: "Each role sees its part",
            text: "Owner and managers, office and sales staff, and deliveries each reach only their modules.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#fbf8ee",
          ink: "#123f6b",
          muted: "#6b7280",
          accent: "#1a66a6",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From flock to the books.",
        titleAccent: ["books"],
        intro: "Follow a day's eggs through the six modules of the prototype I built, each role seeing only its part.",
        steps: [
          {
            label: "Flock",
            title: "Eggs in from the farm",
            text: "Farm and flock records feed the same product list that stock and sales use.",
            tint: "#ffffff",
          },
          {
            label: "Stock",
            title: "Stock on hand",
            text: "Inventory draws on the shared product records, so counts match what's sold.",
            tile: "wide",
            tint: "#fdf3c7",
          },
          {
            label: "Sell",
            title: "Sale, invoice, delivery",
            text: "An order becomes an invoice and a delivery, all tied to one customer record.",
            tile: "wide",
            tint: "#e6eef7",
          },
          {
            label: "Close",
            title: "Payroll and the books",
            text: "Payroll stays with the roles allowed to see it; the books export to QuickBooks as CSV.",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#123f6b",
        ink: "#ffffff",
        muted: "#b9cbe0",
        accent: "#f9d64a",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#fdf6d8",
        ink: "#123f6b",
        muted: "#6b7280",
        accent: "#1a66a6",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "A working prototype of one shared back office.",
        titleAccent: ["working", "prototype"],
        text: "It runs on React, Vite and Supabase, with role-based access across all six modules. Before any real use, the business and its accountant would need to check its tax and payroll rules.",
      },
      closing: {
        background: "#f9d64a",
        ink: "#123f6b",
        muted: "#123f6b",
        accent: "#1a66a6",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn scattered spreadsheets into one system your team shares.",
        cutout: {
          src: "/assets/rcl-egg-trading/rcl-egg-trading_logo_icon.png",
          alt: "RCL Egg Trading's mascot",
          mark: true,
        },
      },
      skills: [
        "Requirements → data model",
        "Relational data modelling",
        "Role-based access control",
        "React · Supabase",
        "Business-process mapping",
      ],
    },
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
      problem: "Caregivers judged how much each resident ate by eye.",
      built: "A station that weighs and scans each tray, and a site to track it.",
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
      role: "Backend & app developer",
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
      text: "This was a team project. I built the Django backend, the desktop app that runs on the measurement station, and the web app staff use to track intake. I also built the guideline-retrieval (RAG) layer behind its recommendations. The web app is responsive, so staff use it on the station's tablet instead of a separate mobile app.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Weight as a check on the camera",
        body: "The station pairs a depth camera with a load cell. The measured weight corrects the camera's volume estimate, and the app falls back on weight when segmentation is unreliable.",
        payoff: "Pixels don't weigh food. Physics does.",
        // the station camera's view, with the load cell's reading
        visual: {
          kind: "image",
          src: "/assets/spoonfull/weigh.webp",
          alt: "Station camera view of a meal tray labelled CLASS: BIG_METAL_TRAY and WEIGHT: 375.24 g",
        },
      },
      {
        title: "Fit the caregiver's routine",
        body: "Scanning a resident's code fills in the meal assignment from the date and time, so caregivers confirm a record instead of typing it.",
        payoff: "Caregivers confirm instead of type.",
        visual: {
          kind: "image",
          src: "/assets/about/spoonfull-in-use.jpg",
          alt: "A caregiver at the Chiayi facility tapping the station's touchscreen with a resident's meal tray in hand",
        },
      },
      {
        title: "Recommendations anchored to HPA guidelines",
        body: "The recommendation layer gives the language model only computed intake values and the matching HPA reference thresholds, so its feedback stays tied to the national guidelines.",
        payoff: "Feedback stays within the guidelines.",
        visual: {
          kind: "image",
          src: "/assets/spoonfull/pipeline.webp",
          alt: "Diagram of the dual-retriever pipeline: a PDF retriever over the HPA corpus and a MySQL patient retriever, fused into context for the LLM generator",
        },
      },
      {
        title: "Start from the facility's own menus",
        body: "Meal cycles come in from the spreadsheets the facility already keeps, with duplicate meals merged on import.",
        payoff: "No menu re-entered by hand.",
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
    story: {
      // The full-screen opener: a caregiver with a resident in a bright room,
      // the dark logo and the tagline from the team's deck on its light left.
      cover: {
        layout: "overlay",
        background: "#f4f6f5",
        text: "#0b3438",
        highlight: "#2a9d89",
        font: "Poppins, sans-serif",
        kicker: "Meal-intake station · in daily use, Chiayi",
        logo: { src: "/assets/spoonfull/logo-dark.webp", alt: "SpoonFull" },
        tagline: "“When sensing meets care.”",
        accent: ["sensing", "care"],
        image: {
          src: "/assets/spoonfull/cover-care.webp",
          alt: "A smiling caregiver in scrubs holding an older woman's hands by a sunlit window",
        },
        // centred: the caregiver clears the logo, the resident stays in frame
        focus: "50% center",
      },
      // The slide after the cover: what it is, then the project's details,
      // in SpoonFull's off-white, dark teal and Poppins.
      overview: {
        background: "#f5f4f2",
        ink: "#0b3438",
        muted: "#8a9a9b",
        accent: "#40c1ac",
        font: "Poppins, sans-serif",
        // plays the case study's video (story.video) from the card, in a
        // popup; the card shows the /work tile as its thumbnail
        showVideo: true,
        thumb: "tile",
        lead: "SpoonFull is a meal-intake station for long-term care that weighs and scans each tray,",
        rest: "then checks intake against Taiwan's dietary guidelines.",
        meta: [
          ["Lab", "Wise Lab, STUST"],
          ["Year", "2025–26"],
          ["Platform", "Station app · web"],
          ["Role", "Full-stack & AI Engineer"],
        ],
        tags: ["Data modeling", "Backend API", "Desktop app", "Web app", "RAG recommendations", "Documentation"],
      },
      // The slide after the overview: why it exists, then the three things
      // that answer it, in SpoonFull's dark teal and Poppins.
      why: {
        background: "#0b3438",
        ink: "#f5f4f2",
        muted: "#9fbcbc",
        accent: "#40c1ac",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        // the station, cut out, standing in a lighter teal arch
        image: {
          src: "/assets/spoonfull/station-cutout.webp",
          alt: "The SpoonFull measurement station, with its camera enclosure, lit tray chamber and touchscreen",
          cutout: true,
          panel: "#11474c",
        },
        lines: ["Why", "SpoonFull?"],
        subhead: "Malnutrition hides in half-eaten trays.",
        text: "About 1 in 3 residents in Taiwan's long-term care homes are malnourished or at risk, yet caregivers still judge what's eaten by eye. SpoonFull weighs and scans every tray, so staff know who isn't eating enough.",
        points: [
          {
            value: "<10",
            unit: "s / record",
            title: "Seconds, not minutes",
            text: "Replaces about 15 minutes of eyeballing and paper checklists per record, as observed on site.",
          },
          {
            // ICBET 2026 paper: gravimetric MAE under 0.30 g on all seven
            // container types, none past the 0.5 g clinical tolerance
            value: "<0.3",
            unit: "g error",
            title: "Weighed, not guessed",
            text: "The load cell weighs every tray to within 0.3 g in lab tests, and checks what the camera sees.",
          },
          {
            value: "HPA",
            unit: "guidelines",
            title: "Advice by the book",
            text: "Recommendations draw only on measured intake and Taiwan's HPA thresholds.",
          },
        ],
      },
      // Daily use at the long-term care facility in Chiayi.
      video: {
        src: "/assets/spoonfull/ltc-use.mp4",
        poster: "/assets/spoonfull/ltc-poster.jpg",
        duration: "0:25",
        alt: "A caregiver at the long-term care facility in Chiayi recording meals on the SpoonFull station",
      },
      kpis: [
        { value: "15m → 10s", label: "Per intake record, by hand vs. SpoonFull (est.)" },
        { value: "~$23K", label: "Net staff time a year for a typical facility (est.)" },
        { value: "2nd", label: "Of 25 international finalists, 21st DSP Creative Design Contest" },
      ],
      context: {
        text: "About 1 in 3 long-term care residents in Taiwan are malnourished or at risk (Wang & Tsay, 2012), yet intake is still recorded by eyeballing each tray. Automating it hits two walls: cameras misjudge scale and fail on shiny metal trays, and language-model advice drifts from the guidelines it should follow.",
        audience: "Caregivers recording meals, nutrition staff checking intake against guidelines, and staff managing residents and menus.",
      },
      ownership: {
        summary: "Full stack and AI, in a team of three.",
        phases: [
          { label: "Data model", mine: true, text: "Residents, meals and intake" },
          { label: "Backend", mine: true, text: "Django API on MySQL" },
          { label: "Station app", mine: true, text: "Tauri capture on site" },
          { label: "Web app", mine: true, text: "Live intake tracking" },
          { label: "Recommendations", mine: true, text: "RAG on HPA guidelines" },
        ],
      },
      // The team's system, from the App Expo deck. My part is the backend,
      // the station app, the tracking site and the recommendations (see the
      // timeline).
      flow: {
        kind: "tour",
        steps: [
          {
            title: "The station",
            body: "A Jetson Orin Nano, an Intel RealSense D435i depth camera, LED lighting and a load cell on an Arduino, in one enclosure with a touchscreen.",
            image: "/assets/spoonfull/deployed.webp",
            alt: "The SpoonFull station deployed at the facility: an aluminium enclosure with a lit tray bay, a touchscreen and a control box on the side",
            fit: "contain",
          },
          {
            title: "See each food",
            body: "YOLOv11 instance segmentation outlines every food on the tray, pixel by pixel.",
            image: "/assets/spoonfull/segment.webp",
            alt: "Two views of a metal tray with eggs: a detection box labelled egg 0.81, and the same eggs outlined as separate segmentation masks",
            fit: "contain",
          },
          {
            title: "Depth to volume",
            body: "Each food's mask is multiplied by the restored depth map, turning pixels into a volume estimate.",
            image: "/assets/spoonfull/volume.webp",
            alt: "Diagram of an RGB-D camera projecting pixel rays onto food in a container, used to compute food depth and volume",
            fit: "contain",
          },
          {
            title: "Weigh it",
            body: "The load cell weighs the meal and tares the tray automatically, checking the camera with physics.",
            image: "/assets/spoonfull/weigh.webp",
            alt: "Station camera view of a meal tray labelled CLASS: BIG_METAL_TRAY and WEIGHT: 375.24 g",
            fit: "contain",
          },
          {
            title: "Ground the advice",
            body: "A dual-retriever pipeline joins resident data from MySQL with HPA guideline text before the model answers.",
            image: "/assets/spoonfull/pipeline.webp",
            alt: "Diagram of the dual-retriever pipeline: a PDF retriever over the HPA corpus and a MySQL patient retriever, fused into context for the LLM generator",
            fit: "contain",
          },
        ],
      },
      decisionsHeadline: "Three calls that made it fit a care facility.",
      // 04: one resident's meal through the apps I built, as a bento grid.
      // Screens and figures are from the team's recorded demo.
      journey: {
        theme: {
          background: "#f5f4f2",
          ink: "#0b3438",
          muted: "#5f7576",
          accent: "#2a9d89",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From tray to care plan.",
        titleAccent: ["care", "plan"],
        intro: "Follow one resident's lunch through the apps I built, from the QR scan at the station to the advice staff read.",
        steps: [
          {
            label: "Scan",
            title: "Scan the resident's code",
            text: "The caregiver scans the resident's QR code at the station; the meal fills in from the date and time.",
            image: "/assets/spoonfull/app-scan.webp",
            alt: "The SpoonFull app scanning a resident's QR code through the station camera",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Resident", value: "Room 1001-01" },
          },
          {
            label: "Weigh",
            title: "The tray, before and after",
            text: "The station photographs and weighs the tray at both ends of the meal, and outlines every food it finds.",
            image: "/assets/spoonfull/app-before-after.webp",
            alt: "Before and after views of a meal tray, each food outlined, with broccoli, chicken and rice listed, a weight of 215.31 g before and 43.01 g after",
            fit: "screen",
            tile: "wide",
            tint: "#e0f1ec",
            chip: { label: "Tray weight", value: "215 → 43 g" },
          },
          {
            label: "Measure",
            title: "What was eaten, dish by dish",
            text: "Volumes before and after give the share of each dish eaten: here, all of the chicken and 80% of the rice.",
            image: "/assets/spoonfull/app-intake.webp",
            alt: "Intake breakdown: 87.3% of the meal eaten, with broccoli at 89.71%, chicken at 100% and rice at 79.87%",
            fit: "screen",
            tile: "wide",
            tint: "#eaf0ef",
            chip: { label: "Meal eaten", value: "87.3%" },
          },
          {
            label: "Advise",
            title: "Intake over time, with advice",
            text: "Staff follow each resident week by week against a target line, with advice drawn from Taiwan's dietary reference intakes.",
            image: "/assets/spoonfull/app-analysis.webp",
            alt: "A resident's weekly intake charts against a target line, above recommendations based on Taiwan's dietary reference intakes",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Protein, men 71+", value: "66 g a day" },
          },
        ],
      },
      // 05: how I built it, on SpoonFull's dark teal
      builtTitleAccent: ["Full", "stack", "and", "AI"],
      builtTheme: {
        background: "#0b3438",
        ink: "#ffffff",
        muted: "#9fbcbc",
        accent: "#40c1ac",
        font: "Poppins, sans-serif",
        plain: true,
      },
      // 06: the outcome, on a soft mint
      outcomeTheme: {
        background: "#e6f1ee",
        ink: "#0b3438",
        muted: "#5f7576",
        accent: "#2a9d89",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "In daily use at a care facility in Chiayi.",
        titleAccent: ["daily", "use"],
        text: "Staff record each meal at the station and follow residents' intake on the live site. The paper was accepted at ICBET 2026; the accuracy figures come from lab testing, not a clinical evaluation.",
        noteLabel: "how the savings were estimated",
        // the estimates from the evidence, each with a chart of its numbers
        impactsLabel: "At a typical Chiayi facility (estimated)",
        impacts: [
          {
            value: "<10 s",
            label: "per intake record, down from about 15 minutes by hand",
            tone: "accent",
            chart: {
              summary: "Time per intake record: about 15 minutes by hand, under 10 seconds with SpoonFull.",
              groups: [
                { label: "By hand", values: [900], text: ["15 min"] },
                { label: "SpoonFull", values: [10], text: ["<10 s"], on: true },
              ],
            },
          },
          {
            value: "~US$23K",
            label: "of staff time freed a year, net of the station's cost",
            tone: "ink",
            // a month: ~NT$61,000 of staff time freed vs ~NT$800 for the
            // station (hardware over three years, plus electricity)
            chart: {
              summary: "A month at a typical facility: about NT$800 for the station, about NT$61,000 of staff time freed.",
              groups: [
                { label: "Station / mo", values: [0.8], text: ["NT$800"] },
                { label: "Time freed / mo", values: [61], text: ["NT$61K"], on: true },
              ],
            },
          },
        ],
      },
      // 07: the closing slide: the staff app on two phones, rising from the
      // bottom right of SpoonFull's dark teal
      closing: {
        background: "#0b3438",
        ink: "#f5f4f2",
        muted: "#9fbcbc",
        accent: "#2a9d89",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn a slow manual record into one that takes seconds.",
        // the phones sink low, rising under the two-line question
        cutout: {
          height: "100%",
          bottom: "-30%",
          src: "/assets/spoonfull/phones-cutout.webp",
          alt: "Two phones showing the SpoonFull staff app: the intake-record menu and the weekly summary dashboard",
        },
      },
      skills: [
        "Django backend",
        "Data modelling",
        "Edge-device integration",
        "Desktop apps (Tauri)",
        "Web dashboards",
        "RAG pipelines",
        "Technical documentation",
      ],
      ctaText: "Turn a slow manual record into one that takes seconds.",
    },
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
      problem: "Boxes are chosen by habit, not by what goes inside.",
      built: "Snap the item, get the right box and transport.",
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
      stack: "Angular · Django · Roboflow",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Constraints before preferences",
        body: "Options that don't fit the item's dimensions, protection needs or carrier limits are dropped first. Only then is the rest ranked by what the customer cares about: cost, speed, protection or less waste.",
        payoff: "Nothing recommended that can't ship.",
      },
      {
        title: "Reasons, not just answers",
        body: "Every suggestion shows why it was picked, so counter staff can check it and override it.",
        payoff: "Staff keep the final call.",
      },
      {
        title: "Box-fit rules, tested in simulation",
        body: "Alongside the demo, a 1,000-item simulation picked each box from the item's dimensions in 5 cm steps, against the smallest of three stock boxes that fits.",
        payoff: "72% less empty box space, simulated.",
      },
    ],
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
    story: {
      kpis: [
        { value: "1st", label: "Place, SCS Days 2025 Hackathon (Jaguars' Lair)" },
        { value: "−72%", label: "Empty box space across 1,000 items (simulated)" },
        { value: "₱1M", label: "Less postage per 1,000 parcels (simulated)" },
      ],
      context: {
        text: "Packing is usually done by habit or rough estimate: boxes come out oversized, filler is wasted and truck space goes unused. Better choices need the item's real size and handling needs, and those are rarely in front of the person packing.",
        audience: "Shippers and counter staff choosing packaging, and customers weighing cost, speed or protection.",
      },
      ownership: {
        summary: "Problem, logic and demo, built in one hackathon.",
        phases: [
          { label: "Problem", mine: true, text: "Why boxes go wrong" },
          { label: "Decision logic", mine: true, text: "Constraints, then priorities" },
          { label: "Demo", mine: true, text: "Angular, Django, Roboflow" },
          { label: "Pitch", mine: true, text: "Delivered with the team" },
        ],
      },
      flow: {
        kind: "features",
        items: [
          { title: "Snap the item", body: "A photo goes to a Roboflow object-detection workflow." },
          { title: "Match the record", body: "The detected item is matched to its dimensions, weight and handling flags." },
          { title: "Get a recommendation", body: "Packaging and transport options that fit, ranked by the customer's priority, with the reasons shown." },
        ],
      },
      decisionsHeadline: "Three rules behind every recommendation.",
      // The deck. Draft structure: the journey's steps have no screenshots
      // yet (dev shows a frame to fill).
      cover: {
        layout: "overlay",
        backdrop: true,
        background: "#0a1a2b",
        text: "#f2f2f2",
        highlight: "#f7841f",
        font: "Urbanist, sans-serif",
        kicker: "Hackathon champion · SCS Days 2025",
        logo: { src: "/assets/paagi/paagi_logo.png", alt: "Paagi" },
        // from the team's pitch deck
        tagline: "“Perfect fit. Zero waste.”",
        accent: ["fit", "waste"],
        image: {
          src: "/assets/paagi/paagi_bg.png",
          alt: "Paagi's dark blue brand backdrop",
        },
      },
      overview: {
        background: "#f4f5f7",
        ink: "#0a1a2b",
        muted: "#8a94a3",
        accent: "#f7841f",
        font: "Urbanist, sans-serif",
        thumb: "tile",
        lead: "Paagi recognizes an item from a photo and recommends how to pack it,",
        rest: "then picks the transport that fits, with the reasons shown.",
        meta: [
          ["Event", "SCS Days 2025 Hackathon"],
          ["Year", "2025"],
          ["Platform", "Web app"],
          ["Role", "Full-stack developer"],
        ],
        tags: ["Problem analysis", "Decision logic", "Front-end", "Django API", "Computer vision", "Pitching"],
      },
      why: {
        background: "#0a1a2b",
        ink: "#ffffff",
        muted: "#a9b6c6",
        accent: "#f7841f",
        font: "Urbanist, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/paagi/paagi_pitch.png",
          alt: "Paagi pitch visual: the Paagi app icon on a phone's home screen",
          frame: true,
        },
        lines: ["Why", "Paagi?"],
        subhead: "Because boxes are picked by habit, not by what goes inside.",
        text: "Oversized boxes waste filler and truck space. Better choices need the item's real size and handling needs, and those are rarely in front of the person packing.",
        points: [
          {
            value: "1",
            unit: "photo",
            title: "Snap, don't measure",
            text: "Detection finds the item and its record, so nobody measures by hand.",
          },
          {
            value: "4",
            unit: "priorities",
            title: "Ranked by what matters",
            text: "Cost, speed, protection or less waste, once options that can't fit are dropped.",
          },
          {
            value: "−72%",
            unit: "box space",
            title: "Boxes that fit",
            text: "Sizing each box to the item cut empty space by 72% in a 1,000-item simulation.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#f4f5f7",
          ink: "#0a1a2b",
          muted: "#5f6b7a",
          accent: "#e0701a",
          font: "Urbanist, sans-serif",
          plain: true,
        },
        title: "From photo to the right box.",
        titleAccent: ["right", "box"],
        intro: "Follow one parcel through the demo I built: a photo in, a packaging and transport pick out, with its reasons.",
        steps: [
          {
            label: "Snap",
            title: "Snap the item",
            text: "A photo of the item goes to an object-detection model.",
            tint: "#ffffff",
            chip: { label: "Trained item", value: "Kettle" },
          },
          {
            label: "Match",
            title: "Match the record",
            text: "The detected item is matched to its dimensions, weight and handling flags.",
            tile: "wide",
            tint: "#fde9d6",
          },
          {
            label: "Rank",
            title: "Options that fit, ranked",
            text: "Packaging and transport that can't fit are dropped; the rest are ranked by the customer's priority.",
            tile: "wide",
            tint: "#e7ebf1",
            chip: { label: "Box space, simulated", value: "−72%" },
          },
          {
            label: "Explain",
            title: "The reasons, shown",
            text: "Each pick shows why it was chosen, so counter staff can check it and override it.",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["one", "hackathon"],
      builtTheme: {
        background: "#0a1a2b",
        ink: "#ffffff",
        muted: "#a9b6c6",
        accent: "#f7841f",
        font: "Urbanist, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#fdf1e6",
        ink: "#0a1a2b",
        muted: "#6b7686",
        accent: "#e0701a",
        font: "Urbanist, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "Hackathon champion, then a pitch to Gothong Southern.",
        titleAccent: ["champion"],
        text: "Gothong Southern's CTO invited me, the only team member invited, to present Paagi to the company's IT and R&D teams. The demo detects one trained item and shows placeholder packaging figures, so the savings come from simulation, not shipments.",
        noteLabel: "how the savings were simulated",
        impactsLabel: "In a 1,000-item simulation",
        impacts: [
          {
            value: "−72%",
            label: "empty space inside boxes, sizing each one to the item",
            tone: "accent",
            chart: {
              caption: "Empty box space, stock boxes = 100%",
              summary: "Empty box space: 100% with stock boxes, 28% with boxes sized to the item.",
              groups: [
                { label: "Stock boxes", values: [100], text: ["100%"] },
                { label: "Fitted", values: [28], text: ["28%"], on: true },
              ],
            },
          },
          {
            value: "₱1M",
            label: "less postage per 1,000 parcels, at PHLPost's rates",
            tone: "ink",
            // the evidence's 62% cut, about ₱1,050 a parcel, puts stock-box
            // postage near ₱1,690 and fitted-box postage near ₱640
            chart: {
              caption: "Postage per parcel, Visayas to Metro Manila",
              summary: "Postage per parcel: about ₱1,690 in stock boxes, about ₱640 in fitted boxes.",
              groups: [
                { label: "Stock boxes", values: [1690], text: ["≈₱1,690"] },
                { label: "Fitted", values: [640], text: ["≈₱640"], on: true },
              ],
            },
          },
        ],
      },
      closing: {
        background: "#0a1a2b",
        ink: "#f2f2f2",
        muted: "#c9d2dd",
        accent: "#e0701a",
        font: "Urbanist, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn a judgement call into a recommendation your team can check.",
        cutout: {
          src: "/assets/paagi/paagi_logo_icon.png",
          alt: "Paagi's logo mark",
          mark: true,
        },
      },
      skills: [
        "Problem analysis",
        "Decision-logic design",
        "Computer vision integration",
        "Angular · Django",
        "Simulation and estimation",
        "Pitching",
      ],
      ctaText: "Turn a judgement call into a recommendation your team can check.",
    },
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
      problem: "Screen habits shape attention, and families notice late.",
      built: "Eight playful questions in, a family plan of quests out.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "A model trained on real school surveys",
        body: "Students answered a ScreenQ-based questionnaire and teachers rated the same students on the 26-item SNAP-IV. Those ratings became the labels for three Random Forests, one per subscale, using 8 inputs.",
        payoff: "Labels from teachers, not guesses.",
      },
      {
        title: "Three levels, not a diagnosis",
        body: "Each model returns Within Typical Range, Elevated or High Risk. The app uses the levels to tailor activities and never shows them to a child as a label.",
        payoff: "Guidance for families, no labels for kids.",
      },
      {
        title: "Pre-generated nudges for children",
        body: "Instead of generating text live, the backend creates batches of short offline nudges, each tagged with the profile it suits, and matches them to the child.",
        payoff: "Every message can be reviewed first.",
      },
      {
        title: "Questions a child can answer",
        body: "The questionnaire is rewritten as short, friendly onboarding questions and mapped back to the model's inputs, so the assessment feels like part of the game.",
        payoff: "The screening feels like play.",
      },
      {
        title: "Ionic and Capacitor for one codebase",
        body: "The app is built with Ionic and Angular and packaged for Android with Capacitor, with a Django backend and Firebase for profiles and stored nudges.",
        payoff: "One codebase, packaged for Android.",
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
    story: {
      kpis: [
        { value: "8", label: "Short questions in place of a 26-item rating scale" },
        { value: "~130", label: "Fewer screen hours a year per child (projected)" },
        { value: "3", label: "Random Forest models, one per SNAP-IV subscale" },
      ],
      context: {
        text: "Parents want more offline time without another screen-time fight, and attention concerns often surface late. A standard screen like SNAP-IV asks a teacher or parent to rate 26 items, which few families do at home.",
        audience: "Children aged 6–15 and the family members who join them in the app.",
      },
      ownership: {
        summary: "The model and the app, end to end.",
        phases: [
          { label: "Survey data", mine: true, text: "Collected with the team" },
          { label: "Models", mine: true, text: "Three Random Forests" },
          { label: "API", mine: true, text: "Served from Django" },
          { label: "App", mine: true, text: "Ionic and Angular, Android" },
          { label: "Nudges", mine: true, text: "Pre-generated, reviewable" },
        ],
      },
      flow: {
        kind: "features",
        items: [
          { title: "Playful onboarding", body: "Eight short questions that feed the attention-risk models." },
          { title: "Family accounts", body: "Family members join one account and play together." },
          { title: "Quests and badges", body: "Offline quests, points, badges and a family leaderboard." },
          { title: "Rewards", body: "Points redeemed for rewards, with a wishlist." },
          { title: "Mood and reminders", body: "A mood tracker and reminders that keep habits going." },
          { title: "Nudges and chat", body: "Nudges matched to the child, and a chat assistant for parents." },
        ],
      },
      decisionsHeadline: "Three choices that keep a child-facing model safe.",
      // The deck. Draft structure: most journey steps have no screenshots
      // yet (dev shows a frame to fill).
      cover: {
        layout: "overlay",
        backdrop: true,
        background: "#0a1838",
        text: "#ffffff",
        highlight: "#1aa7e6",
        font: "Poppins, sans-serif",
        kicker: "Family habit app · attention screening",
        logo: { src: "/assets/gabai/gabai_logo.png", alt: "GabAI" },
        // from the team's pitch deck
        tagline: "“A habit companion that learns your family's rhythm.”",
        accent: ["family's", "rhythm"],
        image: {
          src: "/assets/gabai/gabai_bg.png",
          alt: "GabAI's deep blue brand backdrop",
        },
      },
      overview: {
        background: "#f3f7fb",
        ink: "#0a1838",
        muted: "#8a96ab",
        accent: "#1aa7e6",
        font: "Poppins, sans-serif",
        thumb: "tile",
        lead: "GabAI is a family habit app that screens a child's attention risk from screen habits,",
        rest: "then turns it into offline quests and nudges the whole family can join.",
        meta: [
          ["Users", "Children 6–15"],
          ["Year", "2025"],
          ["Platform", "Android (Ionic)"],
          ["Role", "ML & app developer"],
        ],
        tags: ["Survey data", "Machine learning", "Django API", "Mobile app", "LLM nudges", "Child-safe design"],
      },
      why: {
        background: "#0a1838",
        ink: "#ffffff",
        muted: "#a8b8d8",
        accent: "#1aa7e6",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/gabai/gabai_2.png",
          alt: "GabAI pitch visual of a parent and child making shadow puppets",
          frame: true,
        },
        lines: ["Why", "GabAI?"],
        subhead: "Because attention concerns surface late, and screen rules start fights.",
        text: "A standard screen like SNAP-IV asks a teacher or parent to rate 26 items, which few families do at home. GabAI makes the screen part of play, then shapes offline habits around it.",
        points: [
          {
            value: "8",
            unit: "questions",
            title: "A screen a child can take",
            text: "Eight playful questions stand in for SNAP-IV's 26-item rating scale.",
          },
          {
            value: "3",
            unit: "levels",
            title: "Guidance, not a diagnosis",
            text: "Typical, elevated or high risk, used to tailor activities and never shown as a label.",
          },
          {
            value: "~130",
            unit: "hrs / yr",
            title: "Less screen time, projected",
            text: "Quests, feedback and reminders: the mix tied to the biggest drops in a 204-trial meta-analysis.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#f3f7fb",
          ink: "#0a1838",
          muted: "#5f6b80",
          accent: "#1590c8",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From eight questions to family quests.",
        titleAccent: ["family", "quests"],
        intro: "Follow one child from onboarding to the quests and nudges the app picks for them.",
        steps: [
          {
            label: "Answer",
            title: "Eight playful questions",
            text: "During onboarding, the child answers short questions about their screen habits.",
            tint: "#ffffff",
            chip: { label: "In place of", value: "26 items" },
          },
          {
            label: "Screen",
            title: "Three levels, kept private",
            text: "Three Random Forests place the child on each SNAP-IV subscale; the levels shape the plan, never a label.",
            tile: "wide",
            tint: "#e1f1fb",
            chip: { label: "Models", value: "3 Random Forests" },
          },
          {
            label: "Play",
            title: "Quests the family does together",
            text: "Offline quests earn points and badges on a family leaderboard.",
            image: "/assets/gabai/gabai_1.png",
            alt: "GabAI welcome screen and home screen with quests, badges and recent adventures",
            fit: "screen",
            tile: "wide",
            tint: "#e9eef6",
          },
          {
            label: "Nudge",
            title: "Nudges that fit the child",
            text: "Pre-generated nudges matched to the child's profile, and a chat assistant for parents.",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["end", "to"],
      builtTheme: {
        background: "#0a1838",
        ink: "#ffffff",
        muted: "#a8b8d8",
        accent: "#1aa7e6",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#e8f4fb",
        ink: "#0a1838",
        muted: "#5f6b80",
        accent: "#1590c8",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        // a soft hyphen (­) lets the long word break if it must
        headline: "A working prototype, reviewed by a psycho­metrician.",
        titleAccent: ["reviewed"],
        text: "The models run behind the app's onboarding and shape every quest and nudge. It hasn't been released, so the screen-time saving is projected, and the model is a screening aid, not a diagnosis.",
        noteLabel: "how the projection was made",
        impactsLabel: "Estimated and projected, not yet measured",
        impacts: [
          {
            value: "~2 min",
            label: "for a first attention screen, down from about 10 for SNAP-IV's 26 items (est.)",
            tone: "accent",
            chart: {
              summary: "Time for a first attention screen: about 10 minutes for SNAP-IV's 26 items, about 2 minutes for GabAI's 8 questions.",
              groups: [
                { label: "SNAP-IV, 26 items", values: [10], text: ["~10 min"] },
                { label: "GabAI, 8 questions", values: [2], text: ["~2 min"], on: true },
              ],
            },
          },
          {
            value: "~130 h",
            label: "fewer screen hours a year per child (projected)",
            tone: "ink",
            chart: {
              caption: "Projected hours a year, by the effect applied",
              summary: "Projected screen time saved a year: about 105 hours with the meta-analysis's overall effect, about 130 with the effect for goals, feedback and planning.",
              groups: [
                { label: "Overall effect", values: [105], text: ["~105 h"] },
                { label: "GabAI's mix", values: [130], text: ["~130 h"], on: true },
              ],
            },
          },
        ],
      },
      closing: {
        background: "#0a1838",
        ink: "#ffffff",
        muted: "#c9d6ec",
        accent: "#1590c8",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn your data into a model people can actually use.",
        cutout: {
          src: "/assets/gabai/gabai_logo_icon.png",
          alt: "GabAI's logo",
          mark: true,
        },
      },
      skills: [
        "Machine learning (scikit-learn)",
        "Survey-to-model pipeline",
        "Django APIs",
        "Ionic · Angular",
        "LLM integration",
        "Child-safe product design",
      ],
      ctaText: "Turn your data into a model people can actually use.",
    },
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
      problem: "71 guests, three questions, replies lost in group chats.",
      built: "Guests reply in seconds; the hosts' sheet fills itself in.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "A fixed guest list, not a free-text name",
        body: "Guests type a few letters and tap their name from the hosts' list, so every reply matches an invited guest.",
        payoff: "The hosts see exactly who hasn't replied.",
      },
      {
        title: "A dashboard where the hosts already are",
        body: "Instead of an admin panel, the dashboard lives in Google Sheets, which the hosts already open and share from their phones.",
        payoff: "Nothing new for the hosts to learn.",
      },
      {
        title: "Pulled through the API, not copied by hand",
        body: "A Google Apps Script reads replies straight from Supabase, and the sheet shows when it last synced.",
        payoff: "The hosts always know how fresh it is.",
      },
      {
        title: "Keep the reply quick",
        body: "Attendance is the only required step; the guess and the message are optional, so replying takes seconds on a phone.",
        payoff: "Replying takes seconds.",
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
    story: {
      kpis: [
        { value: "71", label: "Invited guests, each reply matched to a name" },
        { value: "~2h → 0", label: "Manual tallying over the RSVP period (est.)" },
        { value: "0", label: "Misspelled or unknown names to sort out" },
      ],
      context: {
        text: "My brother and sister-in-law needed three answers for their gender reveal: who's coming, who hasn't replied, and what guests are guessing. Replies were scattered across chats, and there was no time to keep a list by hand.",
        audience: "Invited guests replying from their phones, and the two hosts following along.",
      },
      ownership: {
        summary: "Solo, from the guest flow to the dashboard.",
        phases: [
          { label: "Guest flow", mine: true, text: "Find, confirm, reply" },
          { label: "Storage", mine: true, text: "Replies in Supabase" },
          { label: "Sync", mine: true, text: "Apps Script via the API" },
          { label: "Dashboard", mine: true, text: "Google Sheets, live" },
          { label: "Launch", mine: true, text: "Netlify link and QR code" },
        ],
      },
      flow: {
        kind: "tour",
        steps: [
          {
            title: "Open the invite",
            body: "Guests open the link or scan the QR code from the family chat: date, venue, dress code and deadline.",
            image: "/assets/gender-reveal-rsvp/landing.webp",
            alt: "RSVP landing page with event details and a 'Find your name' search box",
          },
          {
            title: "Find your name",
            body: "Two letters of a first name or nickname narrow the hosts' list; guests tap their own name.",
            image: "/assets/gender-reveal-rsvp/search.webp",
            alt: "Name search showing matching guests after typing two letters",
          },
          {
            title: "Confirm it's you",
            body: "A quick check before replying, so every reply lands on the right person.",
            image: "/assets/gender-reveal-rsvp/confirm.webp",
            alt: "Confirmation step asking 'Is this you?' with the selected guest's name",
          },
          {
            title: "Reply",
            body: "Coming or not, plus an optional boy-or-girl guess and a short message.",
            image: "/assets/gender-reveal-rsvp/reply.webp",
            alt: "Reply form with attendance options, a boy-or-girl guess and a message box",
          },
          {
            title: "Hosts' dashboard",
            body: "In Google Sheets: head count, response rate, replies, guesses and replies over time.",
            image: "/assets/gender-reveal-rsvp/dashboard.webp",
            alt: "Google Sheets RSVP dashboard with headline counts, a replies donut chart and a guesses bar chart",
          },
          {
            title: "Follow-ups",
            body: "Who still hasn't replied and the latest messages, blurred here for privacy.",
            image: "/assets/gender-reveal-rsvp/dashboard-lists.webp",
            alt: "Dashboard section with the replies-over-time chart and the follow-up and message lists, blurred for privacy",
          },
        ],
      },
      decisionsHeadline: "Three decisions that kept it simple for everyone.",
      // The deck. Draft structure: colours from the invite's card art, copy
      // from the fields above.
      cover: {
        layout: "overlay",
        background: "#faf6f2",
        text: "#4a3a2e",
        highlight: "#d9776f",
        font: "Poppins, sans-serif",
        kicker: "RSVP site + live dashboard · family event",
        lines: ["Gender reveal", "RSVP"],
        tagline: "“Guests reply in seconds; the sheet fills itself in.”",
        accent: ["seconds"],
        image: {
          src: "/assets/gender-reveal-rsvp/card.webp",
          alt: "The invite's artwork: two teddy bears with blue and pink rattles above “Boy or Girl”, Baby Biyaya's gender reveal",
          frame: true,
        },
      },
      overview: {
        background: "#fdfbf8",
        ink: "#4a3a2e",
        muted: "#9a8b7d",
        accent: "#6f93c7",
        font: "Poppins, sans-serif",
        thumb: "card",
        lead: "Gender Reveal RSVP is a phone-first RSVP site for a family gender reveal,",
        rest: "with every reply synced to a Google Sheets dashboard the hosts already use.",
        meta: [
          ["Client", "Family event"],
          ["Year", "2026"],
          ["Platform", "Web · Google Sheets"],
          ["Role", "Software developer"],
        ],
        tags: ["Guest flow", "Supabase", "Apps Script", "REST APIs", "Dashboard design", "Netlify"],
      },
      why: {
        background: "#4f74a8",
        ink: "#ffffff",
        muted: "#dbe6f4",
        accent: "#f8c3bb",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/gender-reveal-rsvp/dashboard.webp",
          alt: "Google Sheets RSVP dashboard with headline counts, a replies donut chart and a guesses bar chart",
          frame: true,
        },
        lines: ["Why an", "RSVP site?"],
        subhead: "Because replies were getting lost in group chats.",
        text: "The hosts had three questions: who's coming, who hasn't replied, and what guests are guessing. There was no single place to see the answers, and no time to keep a list by hand.",
        points: [
          {
            value: "71",
            unit: "guests",
            title: "Every reply matched to a name",
            text: "Guests tap their own name from the hosts' list, so none are misspelled or unknown.",
          },
          {
            value: "0",
            unit: "manual tallying",
            title: "A sheet that fills itself in",
            text: "An Apps Script pulls replies from Supabase into the hosts' Google Sheet.",
          },
          {
            value: "Live",
            unit: "follow-up list",
            title: "Who hasn't replied",
            text: "The dashboard lists the guests yet to reply, so the hosts know who to nudge.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#faf6f2",
          ink: "#4a3a2e",
          muted: "#8a7b6d",
          accent: "#d9776f",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From group chat to head count.",
        titleAccent: ["head", "count"],
        intro: "Follow one guest's reply from the family chat to the hosts' dashboard.",
        steps: [
          {
            label: "Open",
            title: "Open the invite",
            text: "A link or QR code in the family chat opens the date, venue, dress code and deadline.",
            image: "/assets/gender-reveal-rsvp/landing.webp",
            alt: "RSVP landing page with event details and a 'Find your name' search box",
            fit: "screen",
            tint: "#ffffff",
          },
          {
            label: "Find",
            title: "Find your name",
            text: "Two letters of a first name or nickname narrow the hosts' list; guests tap their own.",
            image: "/assets/gender-reveal-rsvp/search.webp",
            alt: "Name search showing matching guests after typing two letters",
            fit: "screen",
            tile: "wide",
            tint: "#e7eef8",
          },
          {
            label: "Reply",
            title: "Coming, a guess, a message",
            text: "Attendance is the only required step; the boy-or-girl guess and the message are optional.",
            image: "/assets/gender-reveal-rsvp/reply.webp",
            alt: "Reply form with attendance options, a boy-or-girl guess and a message box",
            fit: "screen",
            tile: "wide",
            tint: "#fbe7e3",
          },
          {
            label: "Tally",
            title: "The hosts' dashboard",
            text: "Head count, response rate, guesses and replies over time, updated on its own.",
            image: "/assets/gender-reveal-rsvp/dashboard.webp",
            alt: "Google Sheets RSVP dashboard with headline counts, a replies donut chart and a guesses bar chart",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Invited", value: "71 guests" },
          },
        ],
      },
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#4a3a2e",
        ink: "#faf6f2",
        muted: "#cbbcae",
        accent: "#f8c3bb",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#f6eee8",
        ink: "#4a3a2e",
        muted: "#8a7b6d",
        accent: "#d9776f",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "Live, and the hosts check one sheet.",
        titleAccent: ["one", "sheet"],
        text: "Replies came in from invited guests, and the dashboard tallied head count, guesses and messages on its own. It's built for one private event; a public one would need per-guest links.",
        noteLabel: "how the time saving was estimated",
        impactsLabel: "Over the RSVP period (estimated)",
        impacts: [
          {
            value: "~2 h → 0",
            label: "of tallying replies by hand",
            tone: "accent",
            chart: {
              summary: "Tallying replies over the RSVP period: about 2 hours by hand, none with the dashboard.",
              groups: [
                { label: "By hand", values: [120], text: ["~2 h"] },
                { label: "Dashboard", values: [0], text: ["0"], on: true },
              ],
            },
          },
          {
            value: "71",
            label: "invited guests, every reply matched to a name",
            tone: "ink",
          },
        ],
      },
      closing: {
        background: "#faf6f2",
        ink: "#4a3a2e",
        muted: "#8a7b6d",
        accent: "#d9776f",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn scattered replies into a dashboard that updates itself.",
      },
      skills: [
        "Workflow automation",
        "Google Apps Script",
        "REST APIs",
        "Supabase",
        "Dashboard design",
        "Mobile-first UX",
      ],
      ctaText: "Turn scattered replies into a dashboard that updates itself.",
    },
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
      problem: "67 lender leads, each a follow-up that could slip.",
      built: "The lead tracker, turned into one weekly email of what's due.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "The tracker stays the source of truth",
        body: "The team keeps working in the Google Sheet they already use. The automation only reads it.",
        payoff: "No second system to keep in sync.",
      },
      {
        title: "Send once per week, no matter what",
        body: "Before sending, the scenario checks a data store for this week's reminder, so a re-run or retry can't send a duplicate.",
        payoff: "Retries never double-send.",
      },
      {
        title: "Written for action, not for reading",
        body: "Every row says who owns the lead, when to follow up and what to do next, with high-priority leads first.",
        payoff: "Owners know exactly what to do next.",
      },
      {
        title: "Built to scale with the pipeline",
        body: "Reviewing by hand costs about a minute per lead; the scenario compiles the list the same way at 40 leads or 400.",
        payoff: "More leads, no more review time.",
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
    story: {
      kpis: [
        { value: "−93%", label: "Weekly follow-up review time (est.)" },
        { value: "<10s", label: "Per run, tracker to inbox, in testing" },
        { value: "~$2.1K", label: "Staff time a year at today's 67 leads (est.)" },
      ],
      context: {
        text: "A finance team tracks dozens of lenders in a shared sheet, each at a different stage. The information was there, but every week someone had to read through it to see what was due, who owned it and what came next.",
        audience: "The finance manager coordinating follow-ups, and the lead owners acting on them. Client details are confidential.",
      },
      ownership: {
        summary: "Solo, from the tracker to the inbox.",
        phases: [
          { label: "Read", mine: true, text: "The Google Sheets tracker" },
          { label: "Filter", mine: true, text: "Active, follow-up due" },
          { label: "Compose", mine: true, text: "One prioritised email" },
          { label: "Guard", mine: true, text: "Sent once per week" },
          { label: "Log", mine: true, text: "Every send recorded" },
        ],
      },
      flow: {
        kind: "gallery",
        items: [
          {
            src: "/assets/lead-follow-up-reminder/scenario.webp",
            alt: "Make.com scenario: JSON, Iterator, Google Sheets search, a follow-up filter, text aggregator, data store check, a weekly-reminder filter, Gmail and a data store record",
            caption: "The scenario in Make.com: read the tracker, filter active follow-ups, build the email, check it hasn't gone out this week, send it, and log it.",
          },
        ],
      },
      decisionsHeadline: "Three decisions that make it trustworthy.",
      // The deck. Draft structure: colours from Make.com's purple, copy from
      // the fields above.
      cover: {
        layout: "overlay",
        background: "#f5f4fb",
        text: "#1f1640",
        highlight: "#6d4fe0",
        font: "Poppins, sans-serif",
        kicker: "Make.com automation · finance team",
        lines: ["Lead follow-up", "reminder"],
        tagline: "“Every follow-up due, in one weekly email.”",
        accent: ["one", "weekly", "email"],
        image: {
          src: "/assets/lead-follow-up-reminder/card.webp",
          alt: "The Make.com scenario's modules: JSON, iterator, Google Sheets, text aggregator, data store, Gmail and data store",
          frame: true,
        },
      },
      overview: {
        background: "#fbfaff",
        ink: "#1f1640",
        muted: "#8b86a3",
        accent: "#6d4fe0",
        font: "Poppins, sans-serif",
        // the tool it's built on, as the card
        thumb: "logo",
        logo: { src: "/assets/lead-follow-up-reminder/make-logo.svg", alt: "Make logo", background: "#6d4fe0" },
        lead: "Lead Follow-up Reminder reads a finance team's lead tracker",
        rest: "and emails one weekly list of follow-ups, owners and next actions.",
        meta: [
          ["Client", "Finance team (confidential)"],
          ["Year", "2026"],
          ["Platform", "Make.com · Sheets · Gmail"],
          ["Role", "Software developer"],
        ],
        tags: ["Workflow design", "Make.com", "Google Sheets", "Email design", "Duplicate-safe sends", "Cost estimate"],
      },
      why: {
        background: "#1f1640",
        ink: "#ffffff",
        muted: "#c4bde6",
        accent: "#a98bea",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/lead-follow-up-reminder/scenario.webp",
          alt: "Make.com scenario: JSON, Iterator, Google Sheets search, a follow-up filter, text aggregator, data store check, a weekly-reminder filter, Gmail and a data store record",
          frame: true,
        },
        lines: ["Why a", "weekly email?"],
        subhead: "Because a follow-up is easy to miss in 67 rows.",
        text: "The tracker held the right information, but every week someone had to read through it to see what was due, who owned it and what came next.",
        points: [
          {
            value: "−93%",
            unit: "review time",
            title: "Minutes, not an hour",
            text: "About 67 minutes of reading the tracker becomes a 5-minute email (estimated).",
          },
          {
            value: "<10",
            unit: "s / run",
            title: "Tracker to inbox",
            text: "Tested end to end in Make.com, in under 10 seconds per run.",
          },
          {
            value: "1×",
            unit: "a week",
            title: "Never sent twice",
            text: "A data store check stops a re-run or retry from sending a duplicate.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#f5f4fb",
          ink: "#1f1640",
          muted: "#6f6a87",
          accent: "#6d4fe0",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From tracker to inbox.",
        titleAccent: ["inbox"],
        intro: "Follow one week's follow-ups through the Make.com scenario I built, from the shared sheet to the manager's inbox.",
        steps: [
          {
            label: "Read",
            title: "The tracker stays put",
            text: "The scenario reads the team's Google Sheet; nobody works anywhere new.",
            tint: "#ffffff",
          },
          {
            label: "Filter",
            title: "Only what's due",
            text: "Active leads with a follow-up due are kept, high priority first.",
            image: "/assets/lead-follow-up-reminder/scenario.webp",
            alt: "The Make.com scenario, from the JSON trigger through the follow-up filter to Gmail",
            fit: "screen",
            tile: "wide",
            tint: "#ece8fb",
          },
          {
            label: "Compose",
            title: "One email, written for action",
            text: "Each lead with its status, owner, follow-up date and next action, and a link back to the tracker.",
            tile: "wide",
            tint: "#e6f4ea",
          },
          {
            label: "Send",
            title: "Once a week, logged",
            text: "A data store check prevents duplicates, and every send is recorded.",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#2a1f57",
        ink: "#ffffff",
        muted: "#c4bde6",
        accent: "#a98bea",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#f1eefc",
        ink: "#1f1640",
        muted: "#6f6a87",
        accent: "#6d4fe0",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "Built, and tested end to end.",
        titleAccent: ["tested"],
        text: "It runs in under 10 seconds and covers every active lead in one email. The weekly schedule isn't switched on yet, so the time saving stays an estimate until the review is timed before and after.",
        noteLabel: "how the savings were estimated",
        impactsLabel: "A week's follow-up review at today's 67 leads (estimated)",
        impacts: [
          {
            value: "−93%",
            label: "weekly review time",
            tone: "accent",
            chart: {
              summary: "Weekly follow-up review: about 67 minutes reading the tracker by hand, about 5 minutes reading the email.",
              groups: [
                { label: "By hand", values: [67], text: ["67 min"] },
                { label: "Email", values: [5], text: ["5 min"], on: true },
              ],
            },
          },
          {
            value: "~US$2.1K",
            label: "of staff time a year, about US$34 more for each added lead",
            tone: "ink",
          },
        ],
      },
      closing: {
        background: "#f5f4fb",
        ink: "#1f1640",
        muted: "#5d5780",
        accent: "#6d4fe0",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn a weekly spreadsheet chore into one email.",
      },
      skills: [
        "Make.com scenarios",
        "Workflow design",
        "Duplicate-safe automation",
        "Google Sheets",
        "Email design",
        "Cost estimation",
      ],
      ctaText: "Turn a weekly spreadsheet chore into one email.",
    },
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
      problem: "324 leads with no source, and no way to tag them in bulk.",
      built: "Clean data, a self-filling address workflow, a daily dashboard.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Work around the CRM's limit, not inside it",
        body: "Instead of reviewing leads one by one in HubSpot, the data is exported, matched and tagged outside it, then imported back.",
        payoff: "Rerun whenever new leads come in.",
      },
      {
        title: "Confidence, not just a tag",
        body: "Each suggested source comes with a High or Medium confidence. High goes straight in; Medium is flagged for a quick check.",
        payoff: "People check only the unsure rows.",
      },
      {
        title: "Only fill what's missing",
        body: "The address workflow copies a company's city, state, postal code and country onto contacts one field at a time, skipping any the company doesn't have.",
        payoff: "Good data is never overwritten.",
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
    story: {
      kpis: [
        { value: "324 → 22", label: "Leads left for manual source review" },
        { value: "395", label: "Duplicates caught before import" },
        { value: "93%", label: "Of untagged leads given a suggested source" },
      ],
      context: {
        text: "HubSpot can't tag a lead's source in bulk: someone has to open each lead and read through its contacts' activity. On top of that, duplicates crept in and contacts were missing addresses their company already had.",
        audience: "The client's sales team and the managers who report on its pipeline. Client details are confidential.",
      },
      ownership: {
        summary: "Solo, from export to dashboard.",
        phases: [
          { label: "Clean", mine: true, text: "Spreadsheets and Python" },
          { label: "Tag", mine: true, text: "Sources, with confidence" },
          { label: "De-duplicate", mine: true, text: "Checked before import" },
          { label: "Automate", mine: true, text: "Address workflow, live" },
          { label: "Report", mine: true, text: "A daily dashboard" },
        ],
      },
      flow: {
        kind: "gallery",
        layout: "stack",
        items: [
          {
            src: "/assets/hubspot-crm-cleanup/lead-tagging.webp",
            alt: "Slide describing the exported contacts and leads data, next to a table of leads with record source, suggested source tag and confidence",
            caption: "Source tagging: each lead's record source mapped to a suggested tag and a confidence level. Names removed.",
          },
          {
            src: "/assets/hubspot-crm-cleanup/workflow.webp",
            alt: "HubSpot workflow that copies a company's city, state, postal code and country onto a contact, with branches that skip missing values",
            caption: "The address workflow, in test mode before it went live. IDs replaced with sample values.",
          },
          {
            src: "/assets/hubspot-crm-cleanup/dashboard.webp",
            alt: "HubSpot dashboard with a deals distribution pie chart, activity KPIs and an activity bar chart",
            caption: "The daily dashboard: deals by type, today's activities and KPIs, with dummy labels.",
          },
        ],
      },
      decisionsHeadline: "Three decisions that made the data trustworthy.",
      // The deck. Draft structure: colours from HubSpot's orange and navy,
      // copy from the fields above.
      cover: {
        layout: "overlay",
        background: "#f6f9fc",
        text: "#213343",
        highlight: "#ff7a59",
        font: "Poppins, sans-serif",
        kicker: "CRM data & reporting · US diagnostics company",
        lines: ["HubSpot", "CRM cleanup"],
        tagline: "“A CRM the sales team can trust again.”",
        accent: ["trust"],
        image: {
          src: "/assets/hubspot-crm-cleanup/card.webp",
          alt: "The HubSpot dashboard: a deals distribution pie chart, activity KPIs and an activity bar chart, with dummy labels",
          frame: true,
        },
      },
      overview: {
        background: "#fbfcfe",
        ink: "#213343",
        muted: "#7c8b99",
        accent: "#ff7a59",
        font: "Poppins, sans-serif",
        // the tool it's built on, as the card
        thumb: "logo",
        logo: { src: "/assets/hubspot-crm-cleanup/hubspot-logo.svg", alt: "HubSpot logo", background: "#213343" },
        lead: "HubSpot CRM Cleanup tags lead sources, catches duplicates and fills missing addresses",
        rest: "in a US diagnostic company's CRM, then reports the team's activity daily.",
        meta: [
          ["Client", "US diagnostics company (confidential)"],
          ["Year", "2026"],
          ["Platform", "HubSpot · Python"],
          ["Role", "Software developer"],
        ],
        tags: ["Data cleaning", "Python", "Deduplication", "HubSpot workflows", "Dashboards", "Process design"],
      },
      why: {
        background: "#213343",
        ink: "#ffffff",
        muted: "#b8c6d4",
        accent: "#ff7a59",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/hubspot-crm-cleanup/lead-tagging.webp",
          alt: "A table of leads with record source, suggested source tag and confidence, names removed",
          frame: true,
        },
        lines: ["Why clean", "the CRM?"],
        subhead: "Because HubSpot can't tag a lead's source in bulk.",
        text: "Someone had to open each lead and read its contacts' activity, while duplicates crept in and contacts were missing addresses their company already had.",
        points: [
          {
            value: "93%",
            unit: "tagged",
            title: "Sources suggested, not guessed",
            text: "302 of 324 untagged leads got a High or Medium suggestion; only 22 went to a person.",
          },
          {
            value: "395",
            unit: "duplicates",
            title: "Caught before import",
            text: "Of 493 campaign entries, only 98 were genuinely new contacts.",
          },
          {
            value: "Live",
            unit: "workflow",
            title: "Addresses filled, not replaced",
            text: "Copies a company's address onto its contacts, field by field, only where it's missing.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#f6f9fc",
          ink: "#213343",
          muted: "#6b7c8c",
          accent: "#ff7a59",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From export to dashboard.",
        titleAccent: ["dashboard"],
        intro: "Follow the client's CRM data through the cleanup, from the first export to the daily report.",
        steps: [
          {
            label: "Tag",
            title: "A source for every lead",
            text: "Each lead's record source maps to a suggested tag, with a confidence level for a human check.",
            image: "/assets/hubspot-crm-cleanup/lead-tagging.webp",
            alt: "A table of leads with record source, suggested source tag and confidence, names removed",
            fit: "screen",
            tint: "#ffffff",
          },
          {
            label: "De-duplicate",
            title: "Checked before import",
            text: "A campaign list from three sources is matched against the CRM, so only new contacts go in.",
            tile: "wide",
            tint: "#ffeee8",
          },
          {
            label: "Fill",
            title: "Missing addresses, filled",
            text: "A live workflow copies city, state, postal code and country from the company record.",
            image: "/assets/hubspot-crm-cleanup/workflow.webp",
            alt: "HubSpot workflow that copies a company's city, state, postal code and country onto a contact, with branches that skip missing values",
            fit: "screen",
            tile: "wide",
            tint: "#e8eff6",
          },
          {
            label: "Report",
            title: "The day at a glance",
            text: "A daily dashboard of deals by type, activities and KPIs.",
            image: "/assets/hubspot-crm-cleanup/dashboard.webp",
            alt: "HubSpot dashboard with a deals distribution pie chart, activity KPIs and an activity bar chart",
            fit: "screen",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#1b2a38",
        ink: "#ffffff",
        muted: "#b8c6d4",
        accent: "#ff7a59",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#fff3ef",
        ink: "#213343",
        muted: "#6b7c8c",
        accent: "#e8603f",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "A cleaner pipeline, live in the client's CRM.",
        titleAccent: ["cleaner", "pipeline"],
        text: "The address workflow and the daily dashboard run in the client's HubSpot, and the tagging and duplicate checks can be rerun as new leads arrive. The figures are measured on the client's data.",
        impactsLabel: "Measured on the client's data",
        impacts: [
          {
            value: "324 → 22",
            label: "leads left for manual source review",
            tone: "accent",
            chart: {
              summary: "Leads needing a manual source review: 324 before, 22 after.",
              groups: [
                { label: "Before", values: [324], text: ["324"] },
                { label: "After", values: [22], text: ["22"], on: true },
              ],
            },
          },
          {
            value: "395",
            label: "of 493 campaign entries caught as duplicates before import",
            tone: "ink",
            chart: {
              summary: "A campaign list of 493 entries held 98 genuinely new contacts.",
              groups: [
                { label: "Entries", values: [493], text: ["493"] },
                { label: "New", values: [98], text: ["98"], on: true },
              ],
            },
          },
        ],
      },
      closing: {
        background: "#f6f9fc",
        ink: "#213343",
        muted: "#5d6e7e",
        accent: "#ff7a59",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn a messy CRM into data your team can trust.",
      },
      skills: [
        "HubSpot workflows",
        "Data cleaning (Python)",
        "Deduplication",
        "CRM reporting",
        "Process design",
      ],
      ctaText: "Turn a messy CRM into data your team can trust.",
    },
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
      problem: "Recruiters have one question, buried across pages.",
      built: "A terminal on the home page that simply answers.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Common questions stay in the browser",
        body: "Questions like \"does she know Python?\" are matched by pattern and answered on the page from the same data the site shows. Only questions that match nothing go to the agent.",
        payoff: "Current answers, nothing to run.",
      },
      {
        title: "The browser never talks to n8n",
        body: "Questions go to a serverless function, which calls the n8n webhook. Its address and auth header live in environment variables.",
        payoff: "Credentials never reach visitors.",
      },
      {
        title: "A graceful \"no signal\"",
        body: "If the agent is unreachable or rate-limited, the screen shows a CRT-style \"NO SIGNAL\" message, and the built-in answers keep working.",
        payoff: "The terminal never just breaks.",
      },
      {
        title: "Only slash commands move the page",
        body: "Typing \"about\" answers the question; typing /about jumps to the section.",
        payoff: "Questions never scroll you away.",
      },
      {
        title: "Checked at the door",
        body: "The function only accepts simple requests, and questions over 300 characters are turned away before they reach the agent.",
        payoff: "Junk never reaches the agent.",
      },
      {
        title: "Tolerant of the workflow changing",
        body: "The function reads the agent's answer whether n8n returns plain text or JSON with a reply, answer, output or text field.",
        payoff: "The agent can change without a redeploy.",
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
    story: {
      kpis: [
        { value: "20", label: "Question topics answered instantly in the browser" },
        { value: "14", label: "Slash commands for moving around the site" },
        { value: "0", label: "Agent credentials sent to the browser" },
      ],
      context: {
        text: "A recruiter or client usually wants to know one thing: has she done what I need? Answering it meant reading several case studies and the résumé. A terminal they can ask turns that search into a sentence.",
        audience: "Recruiters and potential clients visiting the portfolio.",
      },
      ownership: {
        summary: "Solo, from the terminal to the agent.",
        phases: [
          { label: "Terminal", mine: true, text: "React, slash commands" },
          { label: "Answers", mine: true, text: "20 topics, on the page" },
          { label: "Gateway", mine: true, text: "Vercel serverless function" },
          { label: "Agent", mine: true, text: "n8n RAG, still improving" },
        ],
      },
      flow: {
        kind: "features",
        items: [
          { title: "Ask or command", body: "Plain questions get answers; /commands jump around the site." },
          { title: "Answer instantly", body: "Twenty common topics are matched and answered on the page from the site's own data." },
          { title: "Ask the agent", body: "Anything else goes through a serverless function to an n8n RAG agent." },
          { title: "Keep the thread", body: "Each browser session gets an ID, so the agent remembers the conversation." },
          { title: "Fail gracefully", body: "If the agent is down, a CRT-style \"NO SIGNAL\" appears and the built-in answers keep working." },
        ],
      },
      decisionsHeadline: "Three decisions that keep it fast and safe.",
      // The deck. Draft structure: it lives on this site, so it wears the
      // portfolio's own ink, bone and coral; copy from the fields above.
      cover: {
        layout: "overlay",
        background: "#101014",
        text: "#f2efe9",
        highlight: "#ff4d36",
        kicker: "n8n RAG agent · on this site",
        lines: ["Portfolio", "terminal agent"],
        tagline: "“Ask about my work. It answers.”",
        accent: ["answers"],
        image: {
          src: "/assets/portfolio-terminal-agent/card.webp",
          alt: "The retro computer on the home page, its terminal answering “how many projects?”",
          frame: true,
        },
      },
      overview: {
        background: "#f2efe9",
        ink: "#101014",
        muted: "#888780",
        accent: "#c8361f",
        thumb: "card",
        lead: "Portfolio Terminal Agent is the retro terminal on this site's home page,",
        rest: "answering visitors' questions about my work, with an n8n RAG agent behind it.",
        meta: [
          ["Client", "This portfolio"],
          ["Year", "2026"],
          ["Platform", "React · Vercel · n8n"],
          ["Role", "Software developer"],
        ],
        tags: ["React", "Serverless functions", "n8n", "RAG", "API security", "Conversational UX"],
      },
      why: {
        background: "#101014",
        ink: "#f2efe9",
        muted: "#b9b6ad",
        accent: "#ff4d36",
        image: {
          placeholder: "The terminal mid-answer, or the n8n agent workflow",
        },
        lines: ["Why a", "terminal?"],
        subhead: "Because recruiters have one question, buried across pages.",
        text: "Has she done the thing I need? Answering it meant reading several case studies and the résumé. A terminal they can just ask turns that search into a sentence.",
        points: [
          {
            value: "20",
            unit: "topics",
            title: "Answered on the page",
            text: "Common questions are matched and answered instantly from the site's own data.",
          },
          {
            value: "14",
            unit: "commands",
            title: "Move around by typing",
            text: "Slash commands like /work jump straight to any section.",
          },
          {
            value: "0",
            unit: "keys exposed",
            title: "The browser never talks to n8n",
            text: "A serverless function holds the webhook's address and auth.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#f2efe9",
          ink: "#101014",
          muted: "#6f6a80",
          accent: "#c8361f",
        },
        title: "From a question to an answer.",
        titleAccent: ["answer"],
        intro: "Follow one visitor's question through the terminal, the function and the agent I built.",
        steps: [
          {
            label: "Ask",
            title: "A question or a command",
            text: "Plain questions get answers; /commands jump around the site.",
            tint: "#ffffff",
          },
          {
            label: "Answer",
            title: "Common questions, instantly",
            text: "Twenty topics are matched by pattern and answered on the page, no agent needed.",
            image: "/assets/portfolio-terminal-agent/card.webp",
            alt: "The terminal answering “how many projects?” with the project count by category",
            fit: "screen",
            tile: "wide",
            tint: "#ffe3dd",
          },
          {
            label: "Agent",
            title: "Anything else, to the agent",
            text: "A serverless function checks the question and passes it to the n8n RAG agent, with a session ID for memory.",
            tile: "wide",
            tint: "#e9e6f2",
          },
          {
            label: "Fallback",
            title: "No signal, no crash",
            text: "If the agent is down, a CRT-style “NO SIGNAL” appears and built-in answers keep working.",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#17171c",
        ink: "#f2efe9",
        muted: "#b9b6ad",
        accent: "#ff4d36",
      },
      outcomeTheme: {
        background: "#f2efe9",
        ink: "#101014",
        muted: "#6f6a80",
        accent: "#c8361f",
      },
      outcome: {
        headline: "Live on this site, and still learning.",
        titleAccent: ["Live"],
        text: "Try it on the home page: common questions answer instantly, and anything else goes to the agent. Its workflow is still being improved, and reply time and accuracy haven't been measured yet.",
      },
      closing: {
        background: "#ff4d36",
        ink: "#101014",
        muted: "#101014",
        accent: "#101014",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn what you know into an assistant people can ask.",
      },
      skills: [
        "n8n agents",
        "Retrieval-augmented generation",
        "Serverless functions",
        "React",
        "API security",
        "Conversational UX",
      ],
      ctaText: "Turn what you know into an assistant people can ask.",
    },
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
      problem: "Two portals, dozens of screens, checked by hand every release.",
      built: "Cypress suites that check every main flow before release.",
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
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Page objects, one file per screen",
        body: "Each screen's elements live in one place, grouped by form or page, and every test reuses them.",
        payoff: "One UI change, one file change.",
      },
      {
        title: "Selectors that work without test IDs",
        body: "With no unique IDs in the app, tests target an element by its type and text in a single query instead of filtering every match.",
        payoff: "Fast even on crowded screens.",
      },
      {
        title: "Built to be handed over",
        body: "Suites are numbered to match the app's sidebar, and the SOP covers structure, naming, setup and reports.",
        payoff: "The next tester starts on day one.",
      },
      {
        title: "Automate the paths that must always work",
        body: "Automated tests cover each module's main success paths; edge cases and negative inputs stayed with manual testing.",
        payoff: "Quick to write, reliable to run.",
      },
      {
        title: "Check the backend when the screen can't tell",
        body: "For actions with no visible result, like generating a PDF, the test passes only if the backend request succeeds.",
        payoff: "Silent failures still get caught.",
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
    story: {
      kpis: [
        { value: "18", label: "End-to-end test suites, from login to accounting" },
        { value: "2", label: "Portals covered: customers and employees" },
        { value: "1", label: "SOP, so the next tester can run and extend them" },
      ],
      context: {
        text: "Raykan was rebuilding a US logistics company's operations platform: user management, customer care, sales, warehousing and accounting, across two portals. Checking every release by hand was slow and inconsistent, and the app had no test IDs to target.",
        audience: "Raykan's QA and development teams, and the client who received the test reports. Client screens are confidential.",
      },
      ownership: {
        summary: "Tests, reports and the handover, in Raykan's QA team.",
        phases: [
          { label: "Page objects", mine: true, text: "One file per screen" },
          { label: "Test suites", mine: true, text: "18, organised by module" },
          { label: "Backend checks", mine: true, text: "Request-level asserts" },
          { label: "Reports", mine: true, text: "HTML, with screenshots" },
          { label: "SOP", mine: true, text: "Co-written with QA" },
        ],
      },
      flow: {
        kind: "features",
        items: [
          { title: "Customer portal", body: "Eight suites covering the customer side's main flows." },
          { title: "Employee portal", body: "Ten suites, from login through sales, warehousing and accounting." },
          { title: "Page objects", body: "Every screen described once and reused by each test." },
          { title: "Backend checks", body: "Actions with no visible result pass only on a successful request." },
          { title: "HTML reports", body: "One report per portal, with a screenshot of every failed step." },
        ],
      },
      decisionsHeadline: "Three decisions that made the suite last.",
      // The deck. Draft structure: colours from the suite's card art (lime on
      // a dark editor), copy from the fields above.
      cover: {
        layout: "overlay",
        background: "#141418",
        text: "#f2efe9",
        highlight: "#d4f53c",
        font: "Poppins, sans-serif",
        kicker: "Cypress · QA internship, Raykan Technologies",
        lines: ["End-to-end", "test automation"],
        tagline: "“Every release, checked the same way.”",
        accent: ["same", "way"],
        image: {
          src: "/assets/qa-test-automation/card.webp",
          alt: "The test suite's folders in a terminal: customer-side and employee-side suites, navigation, page objects, shared commands and reports",
          frame: true,
        },
      },
      overview: {
        background: "#f6f8ee",
        ink: "#141418",
        muted: "#7c8070",
        accent: "#5f7000",
        font: "Poppins, sans-serif",
        // the tool it's built on, as the card
        thumb: "logo",
        logo: { src: "/assets/qa-test-automation/cypress-logo.svg", alt: "Cypress logo", background: "#141418" },
        lead: "End-to-End Test Automation checks a US logistics platform's two portals",
        rest: "before every release, with Cypress suites the next tester can run and extend.",
        meta: [
          ["Client", "US logistics company, via Raykan"],
          ["Year", "2024"],
          ["Platform", "Cypress · JavaScript"],
          ["Role", "QA engineer"],
        ],
        tags: ["Cypress", "Page objects", "Regression testing", "API assertions", "HTML reports", "SOP writing"],
      },
      why: {
        background: "#141418",
        ink: "#f2efe9",
        muted: "#a9ab9e",
        accent: "#d4f53c",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          placeholder: "A Cypress run, or an HTML report with a failed-step screenshot",
        },
        lines: ["Why", "automate it?"],
        subhead: "Because two portals were checked by hand every release.",
        text: "Dozens of screens, checked by hand each time, was slow and easy to get inconsistent, and the app had no test IDs for tests to target.",
        points: [
          {
            value: "18",
            unit: "suites",
            title: "Every main flow",
            text: "8 for the customer portal and 10 for the employee portal, from login to accounting.",
          },
          {
            value: "2",
            unit: "portals",
            title: "A report for each",
            text: "HTML reports per portal, with a screenshot of every failed step.",
          },
          {
            value: "1",
            unit: "SOP",
            title: "Ready to hand over",
            text: "Co-written with Raykan's QA team: setup, structure, naming and reports.",
          },
        ],
      },
      journey: {
        theme: {
          background: "#f6f8ee",
          ink: "#141418",
          muted: "#6b6f60",
          accent: "#5f7000",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From a screen to a report.",
        titleAccent: ["report"],
        intro: "Follow one release check through the suite I built, from describing a screen to the report the client reads.",
        steps: [
          {
            label: "Describe",
            title: "One file per screen",
            text: "Page objects hold each screen's elements once, grouped by form or page.",
            tint: "#ffffff",
          },
          {
            label: "Test",
            title: "Suites by module",
            text: "Numbered to match the app's sidebar, from login through sales, warehousing and accounting.",
            tile: "wide",
            tint: "#eef7c8",
          },
          {
            label: "Check",
            title: "The backend, when the screen can't tell",
            text: "Actions with no visible result, like generating a PDF, pass only on a successful request.",
            tile: "wide",
            tint: "#e7e8f2",
          },
          {
            label: "Report",
            title: "A report per portal",
            text: "HTML, with a screenshot of every failed step, for the team and the client.",
            tint: "#ffffff",
          },
        ],
      },
      builtTitleAccent: ["handover"],
      builtTheme: {
        background: "#1d1e23",
        ink: "#f2efe9",
        muted: "#a9ab9e",
        accent: "#d4f53c",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#f3f7e2",
        ink: "#141418",
        muted: "#6b6f60",
        accent: "#5f7000",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "Delivered, and handed over with an SOP.",
        titleAccent: ["handed", "over"],
        text: "The suites cover each module's main success paths, with negative cases left to manual testing. The SOP recommends running them in Docker in the deployment pipeline, so every release gets checked automatically.",
      },
      closing: {
        background: "#d4f53c",
        ink: "#141418",
        muted: "#141418",
        accent: "#141418",
        font: "Poppins, sans-serif",
        title: "Need something like this?",
        cta: "tell me about it",
        text: "Turn manual release checks into tests that run themselves.",
      },
      skills: [
        "Cypress",
        "Test architecture (page objects)",
        "Regression testing",
        "API assertions",
        "Technical documentation",
      ],
      ctaText: "Turn manual release checks into tests that run themselves.",
    },
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
