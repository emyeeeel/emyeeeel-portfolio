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
        // the sign-in page's demo accounts, in the same editor frame
        visual: {
          kind: "demo",
          title: "demo accounts · any password",
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
            text: "Purchases, product mix and points in one view, with nudges like falling behind vehicle-program pace.",
            // the laptop from the laptop-and-phone mockup, the phone cropped away
            image: "/assets/concreat-rewards/mock-laptop-dashboard.webp",
            alt: "The dealer dashboard on a laptop: 279,350 points available, 1,791,000 bags purchased and the next steps",
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
    tags: ["React", "Vite", "Recharts", "Role-based access", "Data modeling", "Supabase-ready"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Agriculture & food trading",
    // Made for a real organization: a prospective client, RCL Egg Trading.
    realWorld: true,
    featured: false,
    stage: "Business application prototype",
    stageKind: "prototype",
    highlights: [
      { value: "6 modules", label: "In one system" },
      { value: "6 roles", label: "Each with its own access" },
    ],
    tagline: "One back office for an egg supplier, from the day's collection to the books.",
    summary:
      "One back office for an egg supplier, from flock and stock to invoices and payroll.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Every part of the business kept its own spreadsheet.",
      built: "One back office for the farm, stock, sales, deliveries, payroll and books.",
      result: "Working prototype in React and Vite, its data layer ready for Supabase.",
    },
    subtitle:
      "A business application prototype for a Philippine egg supplier's daily operations.",
    logo: "/assets/rcl-egg-trading/rcl-egg-trading_logo.png",
    logoBg: "/assets/rcl-egg-trading/rcl-egg-trading_bg.png",
    icon: "/assets/rcl-egg-trading/rcl-egg-trading_logo_icon.png",
    facts: {
      role: "Software Developer",
      stack: "React 19 · Vite · Recharts · localStorage (Supabase-ready)",
      timeline: "2026, Cebu",
      stage: "Business application prototype",
    },
    overview:
      "A small egg supplier keeps its operations across spreadsheets and paper. I scoped and built a prototype that brings those records into one back office, from each flock's daily collection to the receipt, the delivery and the books, with each role seeing only the parts of the business it works with. It comes with a public site for the business's customers.",
    problem:
      "Collections, stock, sales, deliveries, staff and accounts were tracked in separate spreadsheets and on paper. There was no single source of truth, no way to see which trays would expire first, and no way to give staff access to only the records relevant to their work.",
    users:
      "The owner and managers, the farm manager, sales and warehouse staff, drivers and the accountant.",
    contribution: {
      text: "I worked solo, from requirements and data model to the application and its public site.",
      items: [
        "Mapped the business's day-to-day records into one linked data model of 20 record types",
        "Built the back office in React 19 and Vite: farm, inventory, sales, logistics, HR and payroll, and accounting, with a dashboard across them",
        "Turned each grade of a day's collection into a stock batch with its own best-before, sold first-expiring first",
        "Linked deliveries to packaging: trips deduct trays and crates, and returned trays become credit on the client's next order",
        "Built semi-monthly payroll with SSS, PhilHealth, Pag-IBIG and withholding tax, with printable payslips",
        "Added official receipts, BIR reference reports and QuickBooks CSV and IIF import and export",
        "Implemented role-based access for six roles",
        "Kept the data in the browser for the demo, with every data function mapped to its Supabase call",
      ],
    },
    scope: {
      intro: "The prototype covers six connected areas of the business, with a dashboard across them:",
      items: [
        "Farm: flocks, daily collection by grade, feed and health",
        "Inventory: egg batches by freshness, packaging and waste",
        "Sales: orders, clients, credit terms and official receipts",
        "Logistics: trips, vehicles, drivers and tray returns",
        "HR and payroll: attendance, semi-monthly payroll and payslips",
        "Accounting: profit and loss, expenses, tax reports and QuickBooks",
      ],
    },
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "A best-before on every tray",
        body: "Each grade of a day's collection becomes its own stock batch, with a shelf life and tray price set by grade. Orders offer batches first-expiring first, and stock is flagged three days before it expires.",
        payoff: "The oldest eggs go out first.",
        // the grade rules in the prototype's data layer (GRADE_CONFIG)
        visual: {
          kind: "rows",
          title: "batch rules · by grade",
          rows: [
            ["Grade AA", "21 days · ₱480/tray"],
            ["Grade A", "18 days · ₱420/tray"],
            ["Grade B", "14 days · ₱360/tray"],
            ["near expiry", "3 days left"],
          ],
          summary: "orders list batches first-expiring first",
        },
      },
      {
        title: "Returned trays become credit",
        body: "Finishing a delivery trip records the trays and crates each client hands back. They go back into packaging stock, and the client gets a credit memo that comes off their next order on its own.",
        payoff: "Returns pay the client back.",
        // the return credits and memo rules in the demo data
        visual: {
          kind: "rows",
          title: "trip complete · tray returns",
          rows: [
            ["30-egg plastic tray", "₱5 credit"],
            ["bulk plastic crate", "₱20 credit"],
            ["credit memo", "valid 90 days"],
            ["next order", "applied on save"],
          ],
          summary: "returned trays go back into stock",
        },
      },
      {
        title: "Built for Supabase, running without it",
        body: "For the demo, every record lives in the browser. Each data function carries the Supabase call that replaces it, so the move to a hosted PostgreSQL database changes the data layer, not the screens.",
        payoff: "Swap the storage, keep the app.",
        // one of the prototype's data functions, as written
        visual: {
          kind: "code",
          file: "src/db.js",
          lines: [
            "// supabase.from('flocks').select('*')",
            "export function getAllFlocks() {",
            "  return load(KEY.flocks);",
            "}",
          ],
        },
      },
      {
        title: "Access by role",
        body: "Six roles each reach only the modules their job needs, from the driver's trips to the accountant's payroll and books.",
        payoff: "Each person sees only their part.",
      },
    ],
    evidence: [
      {
        kind: "implemented",
        text: "Working prototype in React 19 and Vite: six modules and a dashboard, six demo roles and a public site, on demo data stored in the browser.",
      },
    ],
    limitations:
      "This is a prototype, not a production deployment. Its data lives in the browser for the demo, and the Supabase backend is planned but not yet connected. It isn't presented as tax- or payroll-compliant software: those rules would need checking by the business and its accountant before any real use.",
    story: {
      kpis: [
        { value: "6", label: "Connected modules, from the farm to the books" },
        { value: "6", label: "Roles, each seeing only its own modules" },
        { value: "3", label: "Egg grades, each with its own shelf life and tray price" },
      ],
      context: {
        text: "Collections, stock, sales, deliveries, staff and accounts were tracked in separate spreadsheets and on paper. Nothing was the single source of truth, nobody could see which trays would expire first, and there was no way to show staff only the records their job needed.",
        audience: "The owner and managers, the farm manager, sales and warehouse staff, drivers and the accountant.",
      },
      ownership: {
        summary: "Solo, from requirements to a working app.",
        phases: [
          { label: "Requirements", mine: true, text: "Daily records mapped" },
          { label: "Data model", mine: true, text: "20 linked record types" },
          { label: "Build", mine: true, text: "React 19 and Vite" },
          { label: "Access", mine: true, text: "Six roles" },
          { label: "Public site", mine: true, text: "Catalog and contact" },
        ],
      },
      flow: {
        kind: "features",
        items: [
          { title: "Farm", body: "Flocks, each day's collection by grade, and feed and health logs that file their own expenses." },
          { title: "Inventory", body: "Egg batches by freshness and rack, packaging stock, and waste and rejects." },
          { title: "Sales", body: "Orders from batches first-expiring first, with VAT, credit terms and official receipts." },
          { title: "Logistics", body: "Trips by truck and driver, with packaging deducted and tray returns credited." },
          { title: "HR and payroll", body: "Attendance and semi-monthly payroll with SSS, PhilHealth and Pag-IBIG, and payslips." },
          { title: "Accounting", body: "Profit and loss, expenses, BIR reference reports and QuickBooks import and export." },
        ],
      },
      decisionsHeadline: "Three decisions behind one back office.",
      // The deck. A worker lifting a full tray of brown eggs in morning
      // sun, the kicker, logo and tagline on the plain cream wall to its
      // left, in dark blue; on phones they sit above the photo, on the
      // colour of its top edge.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#c6ae8e",
        text: "#123f6b",
        highlight: "#005EB8",
        font: "Poppins, sans-serif",
        kicker: "Egg supplier back office · prototype",
        logo: { src: "/assets/rcl-egg-trading/rcl-egg-trading_logo.png", alt: "RCL Egg Trading", wide: true },
        tagline: "Every tray, accounted for.",
        accent: ["accounted", "for"],
        image: {
          src: "/assets/rcl-egg-trading/cover-trays.webp",
          alt: "A worker in a blue shirt lifting a full blue tray of brown eggs off a stack of trays in morning sunlight",
        },
        // the trays right of centre on wide screens, clear of the logo; no
        // tint, as the photo is light and the type is dark; the caption
        // centred, clear of the table
        focus: "80% center",
        wash: "transparent",
        washMobile: "transparent",
        middle: true,
        stack: true,
      },
      overview: {
        background: "#FFF8E8",
        ink: "#123f6b",
        muted: "#8a8f9a",
        accent: "#005EB8",
        font: "Poppins, sans-serif",
        thumb: "tile",
        lead: "RCL Egg Trading's back office brings an egg supplier's records into one app,",
        rest: "from each flock's collection to receipts, deliveries, payroll and the books, split by role.",
        meta: [
          ["Client", "RCL Egg Trading"],
          ["Year", "2026"],
          ["Platform", "Web app"],
          ["Role", "Solo developer"],
        ],
        tags: ["Requirements", "Data modeling", "Front-end", "Role-based access", "Payroll rules", "Prototyping"],
      },
      why: {
        background: "#005EB8",
        ink: "#ffffff",
        muted: "#D6E8FF",
        accent: "#FED141",
        font: "Poppins, sans-serif",
        titleStyle: "plain",
        image: {
          src: "/assets/rcl-egg-trading/rcl-egg-trading_logo_icon.png",
          alt: "RCL Egg Trading's mascot, an egg-shaped chick",
        },
        lines: ["Why one", "back office?"],
        subhead: "Because every part of the business kept its own spreadsheet.",
        text: "Collections, stock, sales, deliveries, staff and accounts lived in separate sheets and on paper, with no single source of truth, no view of which trays would expire first, and no way to show staff only what their job needed.",
        points: [
          {
            value: "6",
            unit: "modules",
            title: "The whole business, one app",
            text: "Farm, inventory, sales, logistics, payroll and accounting.",
          },
          {
            value: "20",
            unit: "record types",
            title: "Define it once",
            text: "Flocks, batches, clients, orders, trips and staff, linked by ID instead of re-typed per sheet.",
          },
          {
            value: "6",
            unit: "roles",
            title: "Each role sees its part",
            text: "From the farm manager's flocks to the driver's trips and the accountant's books.",
          },
        ],
      },
      // 04: a day's eggs through the prototype, on its demo data.
      journey: {
        theme: {
          background: "#FFF8E8",
          ink: "#123f6b",
          muted: "#6b7280",
          accent: "#005EB8",
          font: "Poppins, sans-serif",
          plain: true,
        },
        title: "From the coop to the receipt.",
        titleAccent: ["receipt"],
        intro: "Follow a day's eggs through the prototype I built, on its demo data.",
        steps: [
          {
            label: "Collect",
            title: "The day's eggs, by grade",
            text: "Each flock's collection is logged by grade; rejects are counted but never reach stock.",
            image: "/assets/rcl-egg-trading/journey-collect.webp",
            alt: "The Log egg collection form for Flock Beta: 9 trays of Grade AA, 7 of Grade A, 3 of Grade B and 1 of rejects, collected by Maria Santos",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "To stock", value: "19 trays" },
          },
          {
            label: "Stock",
            title: "Every batch, by freshness",
            text: "Each grade becomes a batch with its rack, trays left and best-before, from Fresh to Pull now.",
            image: "/assets/rcl-egg-trading/journey-stock.webp",
            alt: "The Egg Stock table: batches by flock and grade with rack locations, trays left, best-before dates and freshness tags from Expired to Fresh",
            fit: "screen",
            tile: "wide",
            tint: "#FEF4C0",
            chip: { label: "Shelf life, Grade AA", value: "21 days" },
          },
          {
            label: "Sell",
            title: "An order, first-expiring first",
            text: "Batches are offered oldest first, with VAT and the client's tray-return credit worked out on the order.",
            image: "/assets/rcl-egg-trading/journey-sell.webp",
            alt: "The New sales order form for Sunrise Hotel Group: a Grade AA batch flagged to deliver promptly, 12% VAT and ₱50 of tray-return credit applied",
            fit: "screen",
            tile: "wide",
            tint: "#D6E8FF",
            chip: { label: "Tray credit applied", value: "−₱50" },
          },
          {
            label: "Bill",
            title: "The official receipt",
            text: "Each order prints an official receipt with the business's TIN, VAT and the balance due.",
            image: "/assets/rcl-egg-trading/journey-receipt.webp",
            alt: "An official receipt for Sunrise Hotel Group: 10 trays of Grade AA and 5 of Grade A, ₱828 VAT and ₱7,728 due",
            fit: "screen",
            tint: "#FEF4C0",
            chip: { label: "Total amount due", value: "₱7,728" },
          },
        ],
      },
      builtTitleAccent: ["Solo"],
      builtTheme: {
        background: "#123f6b",
        ink: "#ffffff",
        muted: "#b9cbe0",
        accent: "#FED141",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcomeTheme: {
        background: "#FEF4C0",
        ink: "#123f6b",
        muted: "#6b7280",
        accent: "#005EB8",
        font: "Poppins, sans-serif",
        plain: true,
      },
      outcome: {
        headline: "A working prototype, ready for a real backend.",
        titleAccent: ["working", "prototype"],
        text: "All six modules run end to end on demo data in the browser, and every data function is already mapped to its Supabase call. Before any real use, the business and its accountant would need to check its tax and payroll rules.",
      },
      closing: {
        background: "#FED141",
        ink: "#123f6b",
        muted: "#123f6b",
        accent: "#005EB8",
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
        "React · Vite",
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
        // one tray before eating, as the station read it (the team's demo),
        // and the load cell's error from the ICBET 2026 paper
        visual: {
          kind: "rows",
          title: "station · one tray, before eating",
          rows: [
            ["rice", "244.25 ml"],
            ["chicken", "136.98 ml"],
            ["broccoli", "30.46 ml"],
            ["tray weight", "215.31 g"],
          ],
          summary: "load cell error < 0.3 g (lab tests)",
        },
      },
      {
        title: "Fit the caregiver's routine",
        body: "Scanning a resident's code fills in the meal assignment from the date and time, so caregivers confirm a record instead of typing it.",
        payoff: "Caregivers confirm instead of type.",
        // what one QR scan fills in (the ICBET 2026 paper, section III-A)
        visual: {
          kind: "rows",
          title: "station · after one QR scan",
          rows: [
            ["resident", "Room 1001-01"],
            ["meal", "from the menu cycle"],
            ["before / after", "from the clock"],
            ["capture", "when the scale settles"],
          ],
          summary: "fields typed by hand: 0",
        },
      },
      {
        title: "Recommendations anchored to HPA guidelines",
        body: "The recommendation layer gives the language model only computed intake values and the matching HPA reference thresholds, so its feedback stays tied to the national guidelines.",
        payoff: "Feedback stays within the guidelines.",
        // the clinical notes the web app generated for one resident, with
        // the HPA reference tables it cites
        visual: {
          kind: "rows",
          title: "clinical notes · one resident",
          rows: [
            ["hypertension", "sodium < 2,000 mg/day"],
            ["diabetes", "watch refined carbs"],
            ["kidney disease", "limit K and P"],
            ["dysphagia", "no meals of concern"],
          ],
          summary: "sources: 3 HPA reference tables",
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
        summary: "Apps to AI advice, in a team of three.",
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
      // Screens and figures are from the team's recorded demo, on device
      // mockups of the station and the web app.
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
          // the web app on a phone in a hand, centred, the hand off the bottom
          {
            label: "Scan",
            title: "Scan the resident's code",
            text: "Each resident has a QR code in the web app; the caregiver scans it at the station, and the meal fills in from the date and time.",
            image: "/assets/spoonfull/journey-phone-hand.webp",
            alt: "A hand holding a phone showing a resident's profile in the SpoonFull web app: weight, BMI, their QR code and daily recommended intake",
            fit: "mock",
            device: "phone-hand",
            tint: "#e0f1ec",
            chip: { label: "Daily target", value: "1,657 kcal" },
          },
          // the station app on a tablet held in two hands, on the bottom edge
          {
            label: "Weigh",
            title: "The tray, before and after",
            text: "The station photographs and weighs the tray at both ends of the meal, and outlines every food it finds.",
            image: "/assets/spoonfull/journey-tablet-hands.webp",
            alt: "Two hands holding a tablet with the station app's before and after views of a tray: broccoli, chicken and rice at 667.12 g before, broccoli and rice at 215.78 g after",
            fit: "mock",
            device: "tablet-hands",
            tile: "wide",
            tint: "#ffffff",
            chip: { label: "Tray weight", value: "667 → 216 g" },
          },
          // the same meal's intake breakdown, on a laptop
          {
            label: "Measure",
            title: "What was eaten, dish by dish",
            text: "Volumes before and after give the share of each dish eaten: here, all of the chicken and about three-quarters of the rice.",
            image: "/assets/spoonfull/journey-laptop.webp",
            alt: "A laptop showing the intake breakdown: 83.66% of the meal eaten, with broccoli at 86.78%, chicken at 100% and rice at 73.82%",
            fit: "mock",
            device: "laptop",
            tile: "wide",
            tint: "#ffffff",
            chip: { label: "Meal eaten", value: "83.7%" },
          },
          {
            label: "Advise",
            title: "Intake over time, with advice",
            text: "Staff follow each resident week by week against a target line, with advice drawn from Taiwan's dietary reference intakes.",
            image: "/assets/spoonfull/journey-tablet.webp",
            alt: "A tablet showing a resident's weekly intake charts against a target line, above a dietary analysis based on Taiwan's dietary reference intakes",
            fit: "mock",
            device: "tablet-frame",
            tint: "#e0f1ec",
            chip: { label: "Protein, men 71+", value: "66 g a day" },
          },
        ],
      },
      // 05: how I built it, on SpoonFull's dark teal
      builtTitleAccent: ["AI", "advice"],
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
            // a month: ~NT$61,000 (≈ US$1,930) of staff time freed vs ~NT$800
            // (≈ US$25) for the station, hardware over three years plus
            // electricity; in US$ at the evidence's rate, like the headline
            chart: {
              summary: "A month at a typical facility: about US$25 for the station, about US$1,900 of staff time freed.",
              groups: [
                { label: "Station / mo", values: [25], text: ["US$25"] },
                { label: "Time freed / mo", values: [1930], text: ["US$1.9K"], on: true },
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
      // A parcel handed over at a navy front door, the kicker, logo and
      // tagline (from the team's pitch deck) on the door's plain left.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#0a1a2b",
        text: "#f2f2f2",
        highlight: "#f7841f",
        font: "Urbanist, sans-serif",
        // a no-break space keeps the dot on the first line on phones
        kicker: "Hackathon champion · SCS Days 2025",
        logo: { src: "/assets/paagi/paagi_logo.png", alt: "Paagi", wide: true },
        tagline: "Perfect fit. Zero waste.",
        accent: ["Perfect", "fit"],
        image: {
          src: "/assets/paagi/cover-handoff.webp",
          alt: "A courier's hands passing a neat kraft box sealed with orange tape into a customer's hands at a navy front door",
        },
        // the handoff right of centre on wide screens, the box on phones; a
        // light tint, as the door is already dark; the caption centred, above
        // the receiver's sleeve
        focus: "68% center",
        focusMobile: "74% center",
        wash: "rgba(10, 26, 43, 0.22)",
        middle: true,
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
      // A parent and child sharing a tablet in the dark, the kicker, logo
      // and tagline at its bottom left.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#0a1838",
        text: "#ffffff",
        highlight: "#1aa7e6",
        font: "Poppins, sans-serif",
        kicker: "Family habit app · attention screening",
        logo: { src: "/assets/gabai/gabai_logo.png", alt: "GabAI" },
        tagline: "Rediscover real\nconnection unplugged.",
        accent: ["unplugged"],
        image: {
          src: "/assets/gabai/cover-family.webp",
          alt: "A young girl and her mother lying side by side in the dark, smiling at a tablet, a hand pointing at its screen",
        },
        // the family on the right of wide screens; the child's face on phones
        focusMobile: "40% center",
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
    stage: "Used for the event · Oct 2026",
    stageKind: "live",
    // One-off event, so no monthly figure for the hero total.
    hoursSavedPerMonth: null,
    // Figures from the hosts' dashboard as it stood after the event (last
    // synced Oct 29, 2026): 71 invited, 45 replied, 42 coming, 3 not, 26
    // waiting, head count 44 with the hosts, 39 guesses (25 boy, 14 girl)
    // and 25 messages.
    highlights: [
      { value: "45 of 71", label: "Guests replied (63%)" },
      { value: "Follow-ups", label: "Who hasn't replied, listed live" },
    ],
    // 16:7 artwork for the /work card (replaces the typed placeholder).
    cardArt: "/assets/gender-reveal-rsvp/card.webp",
    tagline: "A phone-first RSVP for 71 guests, tallied live in the hosts' Google Sheet.",
    summary:
      "Guests RSVP and guess from their phones; replies sync to the hosts' live dashboard.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "71 guests, three questions, replies scattered across group chats.",
      built: "A three-step RSVP site and a Google Sheets dashboard that updates itself.",
      result: "45 replies in 16 days: 42 coming, 39 guesses and 25 messages for the baby.",
    },
    subtitle:
      "An RSVP site and self-updating dashboard for a family gender reveal.",
    facts: {
      role: "Software Developer",
      stack: "HTML · JavaScript · Supabase · Netlify · Google Apps Script",
      timeline: "2026, Cebu",
    },
    overview:
      "My brother and sister-in-law were planning a gender reveal for Baby Biyaya and needed to know who was coming without chasing replies across group chats. I built a phone-first RSVP site for their 71 guests and connected it to a Google Sheets dashboard, so they could follow replies, guesses and messages without ever opening a database.",
    problem:
      "Party RSVPs usually end up scattered across chats and memory. The hosts had three simple questions: who's coming, who still hasn't replied, and what guests are guessing. They had no single place to see the answers, and no time to keep a list up to date by hand.",
    users:
      "71 invited guests of every age replying from their phones, and the two hosts following replies as they came in.",
    contribution: {
      text: "I built it on my own, from the invite's QR code to the hosts' dashboard.",
      items: [
        "Built the RSVP site as a lightweight HTML and JavaScript page in three steps: find your name, confirm it's you, reply",
        "Made the name search forgiving: two letters are enough, accents and punctuation are ignored, and the best matches come first",
        "Gave every guest a personal code and link as a backup, and had the phone remember each guest, so coming back opens their reply to change",
        "Stored replies in Supabase (PostgreSQL), reached only through three database functions: search, look up and submit",
        "Made the guess part of the party: Little Lyle or Little Ivy, after the parents, with balloons in the guessed colour on a yes",
        "Wrote a Google Apps Script that pulls replies from Supabase through its API into Google Sheets",
        "Built the hosts' dashboard: headline counts, response rate, head count, replies over time, guesses, latest messages and a list of who hasn't replied yet",
        "Deployed the site on Netlify, with a shareable link and the QR code on the printed invite",
      ],
    },
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Pick your name, don't type it",
        body: "Guests type two letters and tap their name from the hosts' list, then confirm it's them. The search ignores accents and punctuation and puts the best matches first.",
        payoff: "Every reply lands on an invited guest.",
        // the search rules in the site's code
        visual: {
          kind: "rows",
          title: "find your name · the rules",
          rows: [
            ["start after", "2 letters"],
            ["accents, punctuation", "ignored"],
            ["matches", "best first"],
            ["then", "is this you?"],
          ],
          summary: "unknown or misspelled names: 0",
        },
      },
      {
        title: "A dashboard where the hosts already are",
        body: "Instead of an admin panel, the dashboard lives in Google Sheets, which the hosts already open and share from their phones. An Apps Script fills it from Supabase and stamps when it last synced.",
        payoff: "Nothing new for the hosts to learn.",
        // the dashboard's headline counts after the event
        visual: {
          kind: "rows",
          title: "rsvp dashboard · after the event",
          rows: [
            ["invited", "71"],
            ["coming", "42"],
            ["not coming", "3"],
            ["waiting", "26"],
          ],
          summary: "head count 44, with the hosts",
        },
      },
      {
        title: "Make the guess part of the party",
        body: "The guess reads Little Lyle or Little Ivy, after the parents, and a yes sends up balloons in the guessed colour. It stays optional, like the message for the baby.",
        payoff: "39 guests played along.",
        // the reveal on the day, with the hosts behind
        visual: {
          kind: "image",
          src: "/assets/gender-reveal-rsvp/reveal.webp",
          alt: "A pickleball paddle dusted with pink powder after the reveal, the hosts hugging by the white balloon arch behind it",
        },
      },
      {
        title: "The database holds the rules, not the page",
        body: "The page only calls three database functions, never the guest table itself. Closing the RSVP is set on the database side, and guests can change their reply until then; the latest one counts.",
        payoff: "Guests can't break it, even by accident.",
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
          body: "Guests scan the QR code on the printed invite or open the link from the family group chat. The page shows the date, venue, dress code and RSVP deadline.",
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
          body: "Guests say whether they're coming and can add a guess, Little Lyle or Little Ivy, and a message for the baby, then send.",
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
        text: "Used for Baby Biyaya's gender reveal on October 24, 2026: 45 of 71 invited guests replied over 16 days, 13 of them on the first day.",
      },
      {
        kind: "implemented",
        text: "The hosts followed replies, guesses and messages from the Google Sheets dashboard instead of the database: 42 coming, 3 not, 26 waiting, and a head count of 44 with the hosts.",
      },
      {
        kind: "implemented",
        text: "Every reply is matched to an invited guest: guests pick their own name from the hosts' list and confirm it, so there are no misspelled or unknown names to sort out.",
      },
      {
        kind: "milestone",
        text: "39 guests guessed: 25 said boy and 14 said girl. Baby Biyaya is a girl.",
      },
    ],
    limitations:
      "It's built for one private family event. With name search on, anyone with the shared link can reply for any name on the list, which is fine among family and friends. The personal links already work on their own, so a public event would switch name search off.",
    story: {
      kpis: [
        { value: "45/71", label: "Guests replied, every reply matched to a name" },
        { value: "13", label: "Replies on the first day" },
        { value: "25", label: "Messages left for Baby Biyaya" },
      ],
      context: {
        text: "My brother and sister-in-law needed three answers for their gender reveal: who's coming, who hasn't replied, and what guests are guessing. Replies were scattered across group chats, and there was no time to keep a list by hand.",
        audience: "71 invited guests of every age replying from their phones, and the two hosts following along.",
      },
      ownership: {
        summary: "Solo, from the invite's QR code to the dashboard.",
        phases: [
          { label: "Guest flow", mine: true, text: "Find, confirm, reply" },
          { label: "Storage", mine: true, text: "Replies in Supabase" },
          { label: "Sync", mine: true, text: "Apps Script via the API" },
          { label: "Dashboard", mine: true, text: "Google Sheets, live" },
          { label: "Launch", mine: true, text: "Netlify, link and QR code" },
        ],
      },
      flow: {
        kind: "tour",
        steps: [
          {
            title: "Open the invite",
            body: "Guests scan the QR code on the invite or open the link from the family chat: date, venue, dress code and deadline.",
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
            body: "Coming or not, plus an optional guess, Little Lyle or Little Ivy, and a message for the baby.",
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
      // The deck. The cover: a guest in white replying on a phone by the
      // balloons, the invite's own lettering and the tagline on the soft
      // light to its left, in the invite's warm brown; on phones they sit
      // above the photo, on the colour of its top edge.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#ecdcc6",
        text: "#4a3a2e",
        highlight: "#d9776f",
        font: "Poppins, sans-serif",
        kicker: "RSVP site + live dashboard · family event",
        logo: { src: "/assets/gender-reveal-rsvp/lettering.webp", alt: "Biyaya's Gender Reveal", wide: true },
        tagline: "RSVPs, minus the chasing.",
        accent: ["minus", "the", "chasing"],
        image: {
          src: "/assets/gender-reveal-rsvp/cover-reply.webp",
          alt: "A guest in a white linen shirt holding a phone by a white balloon garland with one pastel blue and one pastel pink balloon, in golden-hour light",
        },
        // the phone right of centre on wide screens; no tint, as the photo
        // is light and the type is dark
        focus: "70% center",
        wash: "transparent",
        washMobile: "transparent",
        stack: true,
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
        // the printed invite, its QR code leading to the site
        image: {
          src: "/assets/gender-reveal-rsvp/invite.webp",
          alt: "The printed invite: Boy or Girl, please RSVP for Biyaya's Gender Reveal, with the date, venue, all-white dress code, the October 18 deadline and a QR code to scan",
          frame: true,
          ratio: "1118 / 1498",
        },
        lines: ["Why an", "RSVP site?"],
        subhead: "Because replies were getting lost in group chats.",
        text: "The hosts had three questions: who's coming, who hasn't replied, and what guests are guessing. There was no single place to see the answers, and no time to keep a list by hand. The invite asks for one thing: scan, find your name, then tap yes or no.",
        points: [
          {
            value: "71",
            unit: "guests",
            title: "Every reply matched to a name",
            text: "Guests tap their own name from the hosts' list, so none are misspelled or unknown.",
          },
          {
            value: "3",
            unit: "steps",
            title: "Find, confirm, reply",
            text: "Only attendance is required; the guess and the message are optional.",
          },
          {
            value: "0",
            unit: "manual tallying",
            title: "A sheet that fills itself in",
            text: "An Apps Script pulls replies into the hosts' Google Sheet, with a live list of who hasn't replied.",
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
        title: "From the group chat to the head count.",
        titleAccent: ["head", "count"],
        intro: "Follow one guest's reply from the invite's QR code to the hosts' dashboard.",
        steps: [
          {
            label: "Open",
            title: "Open the invite",
            text: "The QR code on the invite or the link in the family chat opens the date, venue, dress code and deadline.",
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
            text: "Only attendance is required; the guess, Little Lyle or Little Ivy, and a message for the baby are optional.",
            image: "/assets/gender-reveal-rsvp/reply.webp",
            alt: "Reply form with attendance options, a Little Lyle or Little Ivy guess and a message box",
            fit: "screen",
            tile: "wide",
            tint: "#fbe7e3",
            // one of the 25 guest messages
            chip: { label: "A guest's message", value: "“Welcome to the world!”" },
          },
          {
            label: "Tally",
            title: "The hosts' dashboard",
            text: "Head count, response rate, guesses and replies over time, updated on its own.",
            image: "/assets/gender-reveal-rsvp/dashboard.webp",
            alt: "Google Sheets RSVP dashboard with headline counts, a replies donut chart and a guesses bar chart",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Head count", value: "44" },
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
        headline: "45 replies in, and a list of who to nudge.",
        titleAccent: ["who", "to", "nudge"],
        text: "Over 16 days, 45 of 71 guests replied: 42 coming and 3 not, a head count of 44 with the hosts, and the 26 still waiting on a follow-up list. 25 guests left a message for the baby, from “Welcome to the world!” to “Girl na pleaseeeee!” On October 24, the pink came out: Baby Biyaya is a girl.",
        impactsLabel: "From the hosts' dashboard",
        impacts: [
          {
            value: "45 of 71",
            label: "guests replied, 13 of them on the first day",
            tone: "accent",
            // the replies as they stood after the event
            chart: {
              summary: "Of 71 invited guests: 42 coming, 3 not coming, 26 still waiting.",
              groups: [
                { label: "Coming", values: [42], text: ["42"], on: true },
                { label: "Not coming", values: [3], text: ["3"] },
                { label: "Waiting", values: [26], text: ["26"] },
              ],
            },
          },
          {
            value: "14 of 39",
            label: "guessed right: Baby Biyaya is a girl",
            tone: "ink",
            // the guesses: Little Lyle (boy) vs Little Ivy (girl)
            chart: {
              summary: "Of 39 guesses, 25 said boy (Little Lyle) and 14 said girl (Little Ivy). It was a girl.",
              groups: [
                { label: "Little Lyle", values: [25], text: ["25"] },
                { label: "Little Ivy", values: [14], text: ["14"], on: true },
              ],
            },
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
    // The tracker, email and log shown are samples rebuilt on invented data.
    realWorld: true,
    featured: true,
    stage: "Live · runs weekly",
    stageKind: "live",
    // Hours saved per month — feeds the hero total. ESTIMATE, from an
    // observed ~1 min per lead reading its columns × 67 leads = ~67
    // min/week reviewing the tracker (excludes compiling the list), vs ~5
    // min reading the email (assumed): 62 min/week × 52 ÷ 12 ≈ 4.5
    // hrs/month. Set hoursEstimate to false once both sides are timed.
    hoursSavedPerMonth: 4.48,
    hoursEstimate: true,
    // Net savings per year in US$ — feeds the hero total. ESTIMATE: the
    // hours above at US$39.31/hr, at today's 67 leads.
    savingsPerYear: 2100,
    savingsEstimate: true,
    // The build's own figures first: each lead's 27 tracker columns come
    // down to the 7 a follow-up needs, and a data-store check keeps it to
    // one email a week. The time and money estimates sit in the outcome.
    highlights: [
      { value: "27 → 7", label: "Columns per lead, tracker to email" },
      { value: "1× a week", label: "Never sent twice" },
    ],
    // 16:7 artwork for the /work card (replaces the typed placeholder).
    cardArt: "/assets/lead-follow-up-reminder/card.webp",
    tagline: "One weekly email of every lender follow-up due, with its owner and next step.",
    summary:
      "Reads the lead tracker and emails one weekly list of follow-ups, owners and actions.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "67 lender leads in one sheet, each a follow-up that could slip.",
      built: "A Make.com scenario that turns the tracker into one weekly email of what's due.",
      result: "Live and weekly: every lead due, its owner and next step, in under 10 seconds.",
    },
    subtitle:
      "A weekly follow-up overview, built from a finance team's lead tracker and sent automatically.",
    facts: {
      role: "Software Developer",
      stack: "Make.com · Google Sheets · Gmail",
      timeline: "2026",
    },
    overview:
      "A finance team tracks its lender and financing leads in a shared Google Sheet, 27 columns a lead across two tabs. I built a Make.com scenario that reads that tracker every week and sends the finance manager one email of every lead due for follow-up, with its owner, the latest reference points and the next action. Client and lead details are confidential, so the tracker, email and log shown here are samples rebuilt on invented data.",
    problem:
      "With dozens of lenders at different stages (documents requested, meetings pending, no reply yet) it's easy for a follow-up to slip. The tracker held the right information, but someone had to read through 27 columns a lead every week to see what was due, who owned it and what should happen next.",
    users:
      "The finance manager who coordinates follow-ups, and the lead owners who act on them.",
    contribution: {
      text: "I designed and built the automation, from reading the tracker to the email the manager receives.",
      items: [
        "Built the Make.com scenario, on a weekly schedule, that reads both tabs of the lead tracker from Google Sheets",
        "Filtered it down to active leads with a follow-up due that week, and aggregated them into one email",
        "Designed the email: each lead with its project, category, owner, follow-up date, reference points with a link to the source email, and next action, plus a button back to the tracker",
        "Added a data store check so each report week's email is only sent once, even if the scenario runs again",
        "Logged every send in the data store, with its recipient, report week, send time and Gmail message ID",
      ],
    },
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "The sheet stays in charge",
        body: "The team keeps working in the Google Sheet they already use. The scenario only reads it, and the email links back to it.",
        payoff: "No second system to keep in sync.",
        // the tracker against the email, by the numbers
        visual: {
          kind: "rows",
          title: "tracker → weekly email",
          rows: [
            ["tabs read", "2"],
            ["columns per lead", "27 → 7"],
            ["leads tracked", "67"],
            ["writes to the sheet", "0"],
          ],
          summary: "the team works where it already works",
        },
      },
      {
        title: "Once a week, guaranteed",
        body: "Before sending, the scenario looks for this report week in a data store. A re-run or retry finds it and stops; a new week sends the email and logs it.",
        payoff: "Retries never double-send.",
        // the check before the send, as the scenario runs it
        visual: {
          kind: "rows",
          title: "data store · before sending",
          rows: [
            ["look up", "this report week"],
            ["found", "stop, send nothing"],
            ["not found", "send the email"],
            ["then", "log week, time, Gmail ID"],
          ],
          summary: "one email per report week",
        },
      },
      {
        title: "Written for action, not for reading",
        body: "Every row says who owns the lead, when it's due, what was last documented and what to do next, with a link to the source email for context.",
        payoff: "Owners know exactly what to do next.",
        // what each lead in the email carries
        visual: {
          kind: "rows",
          title: "weekly email · one lead",
          rows: [
            ["lead", "ID, status, priority"],
            ["owner", "who acts on it"],
            ["reference points", "last exchange + source"],
            ["next action", "one line"],
          ],
          summary: "plus one button back to the tracker",
        },
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
        kind: "milestone",
        text: "Live on a weekly schedule: each week the finance manager gets one email of every lead due for follow-up.",
      },
      {
        kind: "implemented",
        text: "Runs end to end in Make.com in under 10 seconds per run, and logs every send with its report week, time and Gmail message ID.",
      },
      {
        kind: "implemented",
        text: "One email covers every lead due that week with its owner, follow-up date, reference points and next action: 7 of the tracker's 27 columns.",
      },
      {
        kind: "estimate",
        text: "Weekly follow-up review: reading a lead's columns takes about 1 minute (observed), so 67 leads is roughly 67 minutes reviewing the tracker by hand, before compiling the list, vs. about 5 minutes reading the email (assumed). That's ~93% less review time, or about 4.5 hours a month.",
      },
      {
        kind: "estimate",
        text: "At US$39.31 an hour (average US pay for real-estate finance roles, as of Oct 2026), that time is worth about US$2,100 a year at today's 67 leads. Because manual review grows with every lead while the scenario doesn't, each added lead is worth about US$34 a year more. Running cost is negligible: about 30 Make credits a month, within the free allowance. This is time freed up, not cash saved.",
      },
    ],
    limitations:
      "The time saved is an estimate until the manual review and the email are timed side by side. Client and lead details are confidential, so the tracker, email and log shown are samples rebuilt on invented data, not the real ones.",
    nextSteps:
      "Time the weekly review before and after, and track how many follow-ups are updated in the tracker after each email.",
    story: {
      kpis: [
        { value: "27 → 7", label: "Tracker columns per lead, down to what a follow-up needs" },
        { value: "<10s", label: "Per run, tracker to inbox" },
        { value: "1×", label: "A week, checked before every send" },
      ],
      context: {
        text: "A finance team tracks dozens of lenders in a shared sheet, each at a different stage. The information was there, but every week someone had to read through it to see what was due, who owned it and what came next.",
        audience: "The finance manager coordinating follow-ups, and the lead owners acting on them. Client details are confidential.",
      },
      ownership: {
        summary: "Solo, from the tracker to the inbox.",
        phases: [
          { label: "Read", mine: true, text: "Both tabs of the tracker" },
          { label: "Filter", mine: true, text: "Active, due this week" },
          { label: "Compose", mine: true, text: "One email, 7 columns" },
          { label: "Guard", mine: true, text: "Once per report week" },
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
      // The deck. The cover: the weekly email (a sample on invented data)
      // on a phone at a desk by a city window, the kicker, name and tagline
      // on the bright window to its left; on phones they sit above the
      // photo, on the colour of its top edge.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#eef4f7",
        text: "#1f1640",
        highlight: "#6d4fe0",
        font: "Poppins, sans-serif",
        kicker: "Make.com automation · finance team",
        lines: ["Lead follow-up", "reminder"],
        tagline: "The week's follow-ups, in one email.",
        accent: ["in", "one", "email"],
        image: {
          src: "/assets/lead-follow-up-reminder/cover-email.webp",
          alt: "Hands holding a phone showing a sample weekly follow-up email, by a desk with a violet mug and a city skyline through the window",
        },
        // the phone right of centre on wide screens; no tint, as the photo
        // is light and the type is dark
        focus: "40% center",
        wash: "transparent",
        washMobile: "transparent",
        stack: true,
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
        // a sample of the weekly email, on invented data
        image: {
          src: "/assets/lead-follow-up-reminder/sample-email.webp",
          alt: "A sample weekly follow-up email on invented data: a header with the project's name, a short note to the manager and a table of four leads with owner, due date, reference points and next action",
          frame: true,
          ratio: "1040 / 903",
        },
        lines: ["Why a", "weekly email?"],
        subhead: "Because a follow-up is easy to miss in 67 rows.",
        text: "The tracker held the right information, but every week someone had to read 27 columns a lead to see what was due, who owned it and what came next.",
        points: [
          {
            value: "27 → 7",
            unit: "columns",
            title: "Only what a follow-up needs",
            text: "Owner, due date, reference points and next action, with the source one click away.",
          },
          {
            value: "<10",
            unit: "s / run",
            title: "Tracker to inbox",
            text: "The whole scenario runs in under 10 seconds, every week.",
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
        intro: "Follow one week's follow-ups through the scenario I built. The tracker, email and log are samples on invented data; the real ones are confidential.",
        steps: [
          {
            label: "Read",
            title: "The tracker stays put",
            text: "The scenario reads both tabs of the team's Google Sheet; nobody works anywhere new.",
            image: "/assets/lead-follow-up-reminder/sample-tracker.webp",
            alt: "A sample lender tracker on invented data: ID, lender, status, priority, next action, follow-up due, owner and more columns",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Leads tracked", value: "67" },
          },
          {
            label: "Filter",
            title: "Only what's due",
            text: "Active leads with a follow-up due this week make the cut; the rest wait for their week.",
            image: "/assets/lead-follow-up-reminder/scenario.webp",
            alt: "The Make.com scenario, from the JSON trigger through the follow-up filter to Gmail",
            fit: "screen",
            tile: "wide",
            tint: "#ece8fb",
            chip: { label: "Per run", value: "<10 s" },
          },
          {
            label: "Compose",
            title: "One email, written for action",
            text: "Each lead with its owner, due date, reference points and next action, and a button back to the tracker.",
            image: "/assets/lead-follow-up-reminder/sample-email.webp",
            alt: "A sample weekly follow-up email on invented data, with four leads and their owners, due dates, reference points and next actions",
            fit: "screen",
            tile: "wide",
            tint: "#e8f0fa",
            chip: { label: "Columns per lead", value: "27 → 7" },
          },
          {
            label: "Send",
            title: "Once a week, logged",
            text: "A data store check stops duplicates, and every send is logged with its week and Gmail ID.",
            image: "/assets/lead-follow-up-reminder/sample-log.webp",
            alt: "A sample reminder log on invented data: one row per report week with recipient, send time and Gmail message ID",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Sent", value: "1× a week" },
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
        headline: "Live, and in the inbox every week.",
        titleAccent: ["every", "week"],
        text: "The scenario runs on its weekly schedule in under 10 seconds, and the manager gets one email of every lead due, never two. The time saved stays an estimate until the review is timed before and after.",
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
    next: "hubspot-crm",
  },
  {
    slug: "hubspot-crm",
    index: "08",
    title: "HubSpot CRM",
    category: "data-reporting",
    // Also listed under these filters (the card shows only the primary).
    alsoIn: ["automation"],
    tags: ["HubSpot CRM", "HubSpot workflows", "Python scripting", "Data cleaning", "Dashboards"],
    // Feeds the hero figures strip (highlights.js).
    sector: "Medical diagnostics",
    // Made for a real organization: a US diagnostic company (kept confidential).
    // The tagging table, duplicate check and dashboard shown in the deck are
    // samples rebuilt on invented data; the workflow is the real one, with
    // its IDs replaced.
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
    cardArt: "/assets/hubspot-crm/card.webp",
    tagline: "Clean data, a self-filling workflow and a daily dashboard for a diagnostics company's HubSpot.",
    summary:
      "Tags lead sources, catches duplicates, fills missing addresses and reports the team's day in HubSpot.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "324 leads with no source, duplicates creeping in, addresses missing.",
      built: "Cleanup in Python, a self-filling address workflow and a daily dashboard.",
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
      "A US diagnostic company runs its sales on HubSpot, and its CRM needed three kinds of work. Clean: leads had no source tag and duplicate contacts kept arriving with every new list. Automate: contacts were missing addresses their company record already had. Report: the team had no single view of its day. I tagged and de-duplicated the data outside HubSpot with Python, set up a workflow that keeps addresses filled in, and built a daily dashboard. Client details are confidential, so the tables and dashboard shown here are samples rebuilt on invented data.",
    problem:
      "HubSpot can't tag a lead's source in bulk: someone has to open each lead and read through its associated contacts' activity to decide where it came from. Across a whole pipeline that's hours of manual review, and duplicate contacts and missing addresses made the data harder to trust and report on.",
    users: "The client's sales team and the managers who report on its pipeline.",
    contribution: {
      text: "I handled the CRM work end to end: cleaning the existing data, then the automation and reporting that keep it useful.",
      items: [
        "Exported contacts and leads, then joined and cleaned them with spreadsheets and Python",
        "Suggested a source tag for each lead from its record source, with a confidence level so uncertain rows get a human check",
        "Merged a new campaign list from three sources and checked it against the CRM, so only new contacts were added and existing ones got their missing names and phone numbers",
        "Re-imported the cleaned data into HubSpot",
        "Built a workflow that copies a company's address onto its contacts when theirs is missing",
        "Built a daily dashboard of deals by type, the day's activities and activity KPIs",
      ],
    },
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Work around the CRM's limit, not inside it",
        body: "Instead of reviewing leads one by one in HubSpot, the data is exported, matched and tagged outside it with Python, then imported back.",
        payoff: "Rerun whenever new leads come in.",
        // the loop, as it runs
        visual: {
          kind: "rows",
          title: "lead sources · outside HubSpot",
          rows: [
            ["export", "contacts + leads"],
            ["match", "each lead to its record source"],
            ["suggest", "a source tag + confidence"],
            ["import", "back into HubSpot"],
          ],
          summary: "324 untagged leads, one pass",
        },
      },
      {
        title: "Confidence, not just a tag",
        body: "Each suggested source comes with a High or Medium confidence: High goes straight in and Medium gets a quick check. Leads with nothing to go on are left for a person.",
        payoff: "People check only the unsure rows.",
        // the 324 untagged leads, by outcome (measured)
        visual: {
          kind: "rows",
          title: "324 untagged leads · by outcome",
          rows: [
            ["High", "tagged straight in"],
            ["Medium", "tagged, quick check"],
            ["suggested", "302 of 324 (93%)"],
            ["manual review", "22"],
          ],
          summary: "a person reads 22 leads, not 324",
        },
      },
      {
        title: "Only fill what's missing",
        body: "The address workflow copies a company's city, state, postal code and country onto contacts one field at a time, skipping any the company doesn't have.",
        payoff: "Good data is never overwritten.",
        // the workflow's trigger and branches (the real workflow)
        visual: {
          kind: "rows",
          title: "workflow · copy company address",
          rows: [
            ["enrols", "no street address + a company"],
            ["city, state", "copied if the company has it"],
            ["postal code", "copied if the company has it"],
            ["country", "copied if the company has it"],
          ],
          summary: "each field skips when the company's is empty",
        },
      },
      {
        title: "Check the list before it's imported",
        body: "A new campaign list from three sources is matched against itself and against HubSpot, so duplicates are merged and existing contacts only gain what they're missing.",
        payoff: "Only new contacts go in.",
      },
    ],
    demo: {
      kind: "media",
      layout: "stack",
      items: [
        {
          src: "/assets/hubspot-crm/lead-tagging.webp",
          alt: "Slide describing the exported contacts and leads data, next to a table of leads with record source, suggested source tag and confidence",
          caption: "Lead source tagging: each lead's record source mapped to a suggested tag and a confidence level. Lead names removed; file names replaced with placeholders.",
        },
        {
          src: "/assets/hubspot-crm/workflow.webp",
          alt: "HubSpot workflow that copies a company's city, state, postal code and country onto a contact, with branches that skip missing values",
          caption: "The address workflow, shown in test mode before it went live. Contact and record ID replaced with sample values.",
        },
        {
          src: "/assets/hubspot-crm/dashboard.webp",
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
      "Client data is confidential, so no real records are shown: the tagging table, duplicate check and dashboard are samples rebuilt on invented data, and the workflow screenshot has its IDs replaced with sample values.",
    story: {
      kpis: [
        { value: "324 → 22", label: "Leads left for manual source review" },
        { value: "395", label: "Duplicates caught before import" },
        { value: "93%", label: "Of untagged leads given a suggested source" },
      ],
      context: {
        text: "HubSpot can't tag a lead's source in bulk: someone has to open each lead and read through its contacts' activity. On top of that, duplicates crept in with every new list, and contacts were missing addresses their company already had.",
        audience: "The client's sales team and the managers who report on its pipeline. Client details are confidential.",
      },
      ownership: {
        summary: "Solo: clean, automate, report.",
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
            src: "/assets/hubspot-crm/sample-tagging.webp",
            alt: "A sample lead source tagging table on invented data: lead, record source, source detail, suggested tag and confidence",
            caption: "Source tagging: each lead's record source mapped to a suggested tag and a confidence level. Sample data.",
          },
          {
            src: "/assets/hubspot-crm/workflow.webp",
            alt: "HubSpot workflow that copies a company's city, state, postal code and country onto a contact, with branches that skip missing values",
            caption: "The address workflow, in test mode before it went live. IDs replaced with sample values.",
          },
          {
            src: "/assets/hubspot-crm/sample-dashboard.webp",
            alt: "A sample daily dashboard on invented data: deals by type, activity KPIs and activity by deal",
            caption: "The daily dashboard: deals by type, today's activities and KPIs. Sample data.",
          },
        ],
      },
      decisionsHeadline: "Three decisions that made the data trustworthy.",
      // The deck. The cover: the daily dashboard (a sample on invented
      // data) on a laptop at a desk by a diagnostics lab, the kicker, name
      // and tagline on the light wall to its left; on phones they sit above
      // the photo, on the colour of its top edge.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#edf2f6",
        text: "#213343",
        highlight: "#ff7a59",
        font: "Poppins, sans-serif",
        kicker: "CRM data, automation & reporting · US diagnostics",
        lines: ["HubSpot", "CRM"],
        tagline: "Clean data in, clear reports out.",
        accent: ["clear", "reports", "out"],
        image: {
          src: "/assets/hubspot-crm/cover-laptop.webp",
          alt: "A hand on a laptop showing a sample daily pipeline dashboard, beside a coral mug and sample boxes, with a diagnostics lab blurred behind the glass",
        },
        // the laptop right of centre on wide screens, the screen on phones;
        // no tint, as the photo is light and the type is dark
        focus: "40% center",
        focusMobile: "62% center",
        wash: "transparent",
        washMobile: "transparent",
        stack: true,
      },
      overview: {
        background: "#fbfcfe",
        ink: "#213343",
        muted: "#7c8b99",
        accent: "#ff7a59",
        font: "Poppins, sans-serif",
        // the tool it's built on, as the card
        thumb: "logo",
        logo: { src: "/assets/hubspot-crm/hubspot-logo.svg", alt: "HubSpot logo", background: "#213343" },
        lead: "HubSpot CRM cleans, automates and reports on a US diagnostic company's CRM:",
        rest: "lead sources tagged, duplicates caught, addresses filled and the team's day on one dashboard.",
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
        // a sample of the source tagging, on invented data
        image: {
          src: "/assets/hubspot-crm/sample-tagging.webp",
          alt: "A sample lead source tagging table on invented data: lead, record source, source detail, suggested tag and confidence",
          frame: true,
          // cropped into the source, suggested tag and confidence columns
          ratio: "16 / 10",
          position: "45% top",
        },
        lines: ["Why rework", "the CRM?"],
        subhead: "Because HubSpot can't tag a lead's source in bulk.",
        text: "Someone had to open each lead and read its contacts' activity, while duplicates crept in with every new list and contacts were missing addresses their company already had.",
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
        intro: "Follow the client's CRM data from the first export to the daily report. The tables and dashboard are samples on invented data; the real records are confidential.",
        steps: [
          {
            label: "Tag",
            title: "A source for every lead",
            text: "Each lead's record source maps to a suggested tag, with a confidence level for a human check.",
            image: "/assets/hubspot-crm/sample-tagging.webp",
            alt: "A sample lead source tagging table on invented data: lead, record source, source detail, suggested tag and confidence",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Left for a person", value: "22 of 324" },
          },
          {
            label: "De-duplicate",
            title: "Checked before import",
            text: "A campaign list from three sources is matched against itself and the CRM, so only new contacts go in.",
            image: "/assets/hubspot-crm/sample-duplicates.webp",
            alt: "A sample merged campaign list on invented data: 493 entries, 64 duplicates, 331 already in HubSpot and 98 new, with each row's match and action",
            fit: "screen",
            tile: "wide",
            tint: "#ffeee8",
            chip: { label: "Caught before import", value: "395" },
          },
          {
            label: "Fill",
            title: "Missing addresses, filled",
            text: "A live workflow copies city, state, postal code and country from the company record.",
            image: "/assets/hubspot-crm/workflow.webp",
            alt: "HubSpot workflow that copies a company's city, state, postal code and country onto a contact, with branches that skip missing values",
            fit: "screen",
            tile: "wide",
            tint: "#e8eff6",
          },
          {
            label: "Report",
            title: "The day at a glance",
            text: "A daily dashboard of deals by type, the day's activities and activity KPIs.",
            image: "/assets/hubspot-crm/sample-dashboard.webp",
            alt: "A sample daily dashboard on invented data: deals by type, activity KPIs and activity by deal",
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
        headline: "Cleaner data, live in the client's HubSpot.",
        titleAccent: ["cleaner", "data"],
        text: "The address workflow and the daily dashboard run in the client's HubSpot, and the tagging and duplicate checks can be rerun as new leads and lists arrive. The figures are measured on the client's data.",
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
    tagline: "A retro terminal on this site that answers visitors' questions, on the page or through an n8n agent.",
    summary:
      "A retro terminal that answers visitors' questions about my work through an n8n RAG agent.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "A visitor's one question, buried across ten case studies and a résumé.",
      built: "A terminal on the home page: built-in answers first, an n8n agent for the rest.",
      result: "Live on this site: 20 topics and 14 commands answer offline; the rest goes to the agent.",
    },
    subtitle:
      "An AI agent built into this portfolio's retro terminal, so visitors can simply ask about my work.",
    facts: {
      role: "Software Developer",
      stack: "React · Vercel Functions · n8n",
      timeline: "2026",
    },
    overview:
      "The computer on this portfolio's home page is a working terminal. Visitors can ask a question in plain words or type a slash command like /work to jump around the site. Common questions, any project and any skill are answered on the page straight away, from the same data the site shows. Anything else goes through a serverless function to an AI agent I built in n8n. I'm still improving the agent's workflow; the parts below describe how the pieces fit together today.",
    problem:
      "A recruiter or client usually has one question: has she done the thing I need? Answering it means reading several case studies and the résumé. A terminal they can just ask turns that search into a sentence, and fits the site's terminal style.",
    users: "Recruiters and potential clients visiting the portfolio.",
    contribution: {
      text: "I built the whole chain, from the terminal on the page to the agent that answers.",
      items: [
        "Built the terminal in React, with slash commands for moving around the site",
        "Wrote built-in answers to 20 common question topics, matched by pattern and built from the site's own data, plus lookups for any project or skill by name",
        "Wrote a Vercel serverless function that checks each question and passes it on",
        "Connected it to an n8n webhook that runs the RAG agent, with the webhook's address and auth kept server-side",
        "Gave each browser session an ID, so the agent can remember the conversation",
        "Added a CRT-style \"NO SIGNAL\" fallback and ↑/↓ recall of past questions",
        "Built the n8n agent workflow, which I'm still improving",
      ],
    },
    // The template shows the first three, each with its one-line payoff.
    decisions: [
      {
        title: "Common questions stay in the browser",
        body: "Questions like \"does she know Python?\" are matched by pattern and answered on the page from the same data the site shows. Only questions that match nothing go to the agent.",
        payoff: "Current answers, nothing to run.",
        // the order the terminal tries, from terminalCommands.js
        visual: {
          kind: "rows",
          title: "terminal · in this order",
          rows: [
            ["/commands", "14, move the page"],
            ["single words", "projects, skills, help"],
            ["projects, skills", "looked up by name"],
            ["plain questions", "20 topics, by pattern"],
          ],
          summary: "no match? only then, the agent",
        },
      },
      {
        title: "The browser never talks to n8n",
        body: "Questions go to a serverless function, which calls the n8n webhook. Its address and auth header live in environment variables.",
        payoff: "Credentials never reach visitors.",
        // the function's call to n8n, as written (server/chatService.js)
        visual: {
          kind: "code",
          file: "server/chatService.js",
          lines: [
            "const webhookUrl = process.env.N8N_WEBHOOK_URL;",
            "const url = new URL(webhookUrl);",
            'url.searchParams.set("message", userInput);',
            "",
            "const headerName = process.env.N8N_WEBHOOK_HEADER_NAME;",
            "const headerValue = process.env.N8N_WEBHOOK_HEADER_VALUE;",
          ],
        },
      },
      {
        title: "A graceful \"no signal\"",
        body: "If the agent is unreachable or rate-limited, the screen shows a CRT-style \"NO SIGNAL\" message, and the built-in answers keep working.",
        payoff: "The terminal never just breaks.",
        // the message the terminal shows, as written (HeroDevice.jsx)
        visual: {
          kind: "code",
          file: "src/components/HeroDevice.jsx",
          lines: [
            "const DOWN_MESSAGE = [",
            '  { text: "NO SIGNAL — brain\'s offline", down: true },',
            '  { text: "— the built-in answers still work: try help", ok: true },',
            "];",
            "if (!response.ok) return DOWN_MESSAGE;",
          ],
        },
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
        text: "Built-in answers for 20 question topics and 14 slash commands, plus lookups for any project or skill by name, handled in the browser without calling the agent.",
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
        text: "A recruiter or client usually wants to know one thing: has she done what I need? Answering it meant reading through ten case studies and the résumé. A terminal they can ask turns that search into a sentence.",
        audience: "Recruiters and potential clients visiting the portfolio.",
      },
      ownership: {
        summary: "Solo, from the prompt to the agent.",
        phases: [
          { label: "Terminal", mine: true, text: "React, slash commands" },
          { label: "Answers", mine: true, text: "20 topics, on the page" },
          { label: "Fallback", mine: true, text: "NO SIGNAL, never a crash" },
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
      // The deck. It lives on this site, so it wears the portfolio's own
      // ink, bone and coral. The cover: this site's home page, its terminal
      // answering "how many projects?", on a laptop in lamplight; the
      // kicker, name and tagline on the dark wall to its left.
      cover: {
        layout: "overlay",
        caption: true,
        background: "#0d0b0b",
        text: "#f2efe9",
        highlight: "#ff4d36",
        kicker: "n8n RAG agent · on this site",
        lines: ["Portfolio", "terminal agent"],
        tagline: "Skip the scroll. Just ask.",
        accent: ["Just", "ask"],
        image: {
          src: "/assets/portfolio-terminal-agent/cover-laptop.webp",
          alt: "A laptop in warm lamplight showing this portfolio's home page, its retro terminal answering “how many projects?”, beside a coral mug",
        },
        // the laptop right of centre on wide screens, the screen on phones;
        // no tint, as the wall is already dark
        focus: "40% center",
        focusMobile: "62% center",
        wash: "transparent",
        washMobile: "transparent",
        stack: true,
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
        // the real terminal, answering on the page
        image: {
          src: "/assets/portfolio-terminal-agent/screen-projects.webp",
          alt: "The terminal answering “how many projects?” with the count by category and the project list",
          frame: true,
          ratio: "226 / 172",
        },
        lines: ["Why a", "terminal?"],
        subhead: "Because recruiters have one question, buried across pages.",
        text: "Has she done the thing I need? Answering it meant reading through ten case studies and the résumé. A terminal they can just ask turns that search into a sentence.",
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
      // 04: one visitor's questions through the terminal. Screens are real
      // captures of the home page terminal (the fallback shown is the real
      // one, with no agent connected).
      journey: {
        theme: {
          background: "#f2efe9",
          ink: "#101014",
          muted: "#6f6a80",
          accent: "#c8361f",
        },
        title: "From a question to an answer.",
        titleAccent: ["answer"],
        intro: "Follow one visitor's questions through the terminal I built. The screens are real captures from the home page.",
        steps: [
          {
            label: "Ask",
            title: "A question or a command",
            text: "Plain questions get answers; /commands jump around the site. Type help to see both.",
            image: "/assets/portfolio-terminal-agent/screen-help.webp",
            alt: "The terminal after typing help: example questions, the commands and the /go-to shortcuts",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Slash commands", value: "14" },
          },
          {
            label: "Answer",
            title: "Common questions, instantly",
            text: "Twenty topics are matched by pattern and answered on the page from the site's own data, no agent needed.",
            image: "/assets/portfolio-terminal-agent/screen-projects.webp",
            alt: "The terminal answering “how many projects?” with the count by category and the project list",
            fit: "screen",
            tile: "wide",
            tint: "#ffe3dd",
            chip: { label: "Topics answered offline", value: "20" },
          },
          {
            label: "Look up",
            title: "Any skill, any project",
            text: "Ask whether she knows a tool or name a project, and the answer points to where it was used.",
            image: "/assets/portfolio-terminal-agent/screen-skill.webp",
            alt: "The terminal answering “does she know python?”: yes, Python scripting, used in HubSpot CRM",
            fit: "screen",
            tile: "wide",
            tint: "#e9e6f2",
          },
          {
            label: "Fallback",
            title: "No signal, no crash",
            text: "Anything else goes to the agent; if it's unreachable, a CRT-style “NO SIGNAL” appears and the built-in answers keep working.",
            image: "/assets/portfolio-terminal-agent/screen-nosignal.webp",
            alt: "The terminal showing NO SIGNAL, brain's offline, the built-in answers still work: try help",
            fit: "screen",
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
        headline: "Live on this site. Go ahead, ask it.",
        titleAccent: ["ask", "it"],
        text: "It's the computer at the top of the home page: common questions, projects and skills answer instantly, and anything else goes to the agent. Its workflow is still being improved, and reply time and accuracy haven't been measured yet.",
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
    // logistics company (kept confidential). The code, test run and report
    // shown in the deck are samples rebuilt on an invented app
    // ("Harborline") and invented data.
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
    tagline: "18 Cypress suites that check a logistics platform's two portals before every release.",
    summary:
      "End-to-end Cypress tests for a logistics platform's customer and employee portals.",
    // Three short lines for the case study's "at a glance" row.
    glance: {
      problem: "Two portals, dozens of screens, checked by hand every release, and no test IDs.",
      built: "18 Cypress suites, page objects and per-portal HTML reports, plus an SOP.",
      result: "Handed over as a suite the next tester could run, read and extend.",
    },
    subtitle:
      "Cypress end-to-end testing for a US logistics company's operations platform, built during my QA internship at Raykan Technologies.",
    facts: {
      role: "QA Engineer",
      stack: "Cypress · JavaScript · Mocha · Mochawesome",
      timeline: "Feb – Jun 2024",
    },
    overview:
      "Raykan Technologies was rebuilding the operations platform of a US logistics company, covering user management, customer care, sales, warehousing and accounting, for both its customers and its employees. In Raykan's QA team I built the Cypress end-to-end tests that check those portals before each release, and co-wrote the SOP that lets the next tester run and extend them. Client details, screens and data are confidential, so the code, test run and report shown here are samples rebuilt on an invented app.",
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
        // a sample page object on the invented app
        visual: {
          kind: "code",
          file: "pages/salesOrderPage.js · sample",
          lines: [
            "export const salesOrderPage = {",
            "  form: {",
            '    customer: () => cy.contains("label", "Customer").next(),',
            '    save: () => cy.contains("button", "Save order"),',
            "  },",
            "};",
          ],
        },
      },
      {
        title: "Selectors that work without test IDs",
        body: "With no unique IDs in the app, tests target an element by its type and text in a single query instead of filtering every match.",
        payoff: "Fast even on crowded screens.",
        // the two ways to find a button with no test ID (sample)
        visual: {
          kind: "code",
          file: "selectors · sample",
          lines: [
            "// filters every button on the page",
            'cy.get("button").filter(":contains(Save)")',
            "",
            "// one query, by type and text",
            'cy.contains("button", "Save order")',
          ],
        },
      },
      {
        title: "Built to be handed over",
        body: "Suites are numbered to match the app's sidebar, and the SOP covers structure, naming, setup and reports.",
        payoff: "The next tester starts on day one.",
        // what the handover covers
        visual: {
          kind: "rows",
          title: "handover · the SOP",
          rows: [
            ["suites", "numbered like the sidebar"],
            ["structure", "e2e, pages, navigation"],
            ["conventions", "naming, selectors"],
            ["reports", "one HTML per portal"],
          ],
          summary: "18 suites, run and extended from day one",
        },
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
      "The automated tests cover the main success paths; negative cases were tested manually by the QA team. Client details, screens and data are confidential, so the screens shown are samples rebuilt on an invented app (\"Harborline\") with invented data.",
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
      // The deck, in the suite's colours (lime on a dark editor). The cover
      // keeps the suite card until its photo is in.
      cover: {
        layout: "overlay",
        background: "#141418",
        text: "#f2efe9",
        highlight: "#d4f53c",
        font: "Poppins, sans-serif",
        kicker: "Cypress · QA internship, Raykan Technologies",
        lines: ["End-to-end", "test automation"],
        tagline: "Every release, checked the same way.",
        accent: ["the", "same", "way"],
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
        // a sample HTML report, on invented data
        image: {
          src: "/assets/qa-test-automation/sample-report.webp",
          alt: "A sample HTML test report on invented data: suites, tests passed and failed, and a failed step with its error and screenshot",
          frame: true,
          // cropped into the summary and the failed step
          ratio: "4 / 3",
          position: "left center",
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
      // 04: one release check through the suite. The screens are samples on
      // an invented app ("Harborline"); the client's are confidential.
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
        intro: "Follow one release check through the suite I built. The screens are samples on an invented app; the client's are confidential.",
        steps: [
          {
            label: "Describe",
            title: "One file per screen",
            text: "Page objects hold each screen's elements once, grouped by form or table, found by type and text.",
            image: "/assets/qa-test-automation/sample-pageobject.webp",
            alt: "A sample page object in an editor: the suite's folders and a sales order screen's form and table, described once",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Test IDs needed", value: "0" },
          },
          {
            label: "Test",
            title: "Suites by module",
            text: "Numbered to match the app's sidebar, from login through sales, warehousing and accounting.",
            image: "/assets/qa-test-automation/sample-run.webp",
            alt: "A sample Cypress run: a sales orders suite passing beside the invented app's orders screen",
            fit: "screen",
            tile: "wide",
            tint: "#eef7c8",
            chip: { label: "End-to-end suites", value: "18" },
          },
          {
            label: "Check",
            title: "The backend, when the screen can't tell",
            text: "Generating a PDF shows nothing to assert on, so the test waits on the request and passes only on a 200.",
            image: "/assets/qa-test-automation/sample-run.webp",
            alt: "A sample Cypress command log: intercept the invoice request, click Generate invoice, wait for a 200",
            fit: "screen",
            tile: "wide",
            tint: "#e7e8f2",
            // zoomed into the command log: the request, then the wait on it
            place: { left: "0", top: "-24px", width: "280%" },
          },
          {
            label: "Report",
            title: "A report per portal",
            text: "HTML, with the error and a screenshot of every failed step, for the team and the client.",
            image: "/assets/qa-test-automation/sample-report.webp",
            alt: "A sample HTML test report: suites and tests passed, and one failed step with its error and screenshot",
            fit: "screen",
            tint: "#ffffff",
            chip: { label: "Portals reported", value: "2" },
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
        status: "Feb – Jun 2024 · Raykan Technologies",
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
// Older case study URLs that may still be linked from elsewhere.
export const PROJECT_ALIASES = {
  "hubspot-crm-cleanup": "hubspot-crm",
};

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
