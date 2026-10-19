// The four steps of the home "working approach" section.
//
//   `key`      short name, shown in the terminal-style step list
//   `output`   what the client has in hand at the end of the step
//   `artAlt`   description of the step's illustration (ProcessArt.jsx)
const processSteps = [
  {
    number: "01",
    key: "map",
    title: "Map the workflow",
    description:
      "Sit with the people doing the work, trace each step, and find where the hours and errors pile up.",
    output: "A workflow map and the pain points worth fixing",
    artAlt: "Workflow map with four connected steps, one highlighted as the pain point",
  },
  {
    number: "02",
    key: "scope",
    title: "Scope it & set a baseline",
    description:
      "Agree on the flows, data and rules before building, and measure how it's done today so there's a number to beat.",
    output: "A scope everyone signs off on, and a baseline to measure against",
    artAlt: "Scope checklist with two items in and one out, above a baseline bar with a target marker",
  },
  {
    number: "03",
    key: "build",
    title: "Build & test in pieces",
    description:
      "Ship in reviewable pieces, with tests around the rules that matter, so feedback lands early and nothing breaks quietly.",
    output: "A working build, with tests on the rules",
    artAlt: "Code window above a 'tests passed' badge",
  },
  {
    number: "04",
    key: "handover",
    title: "Hand over & measure",
    description:
      "Document how it runs, hand it to the team, and check the result against the baseline, so the impact is a number, not a feeling.",
    output: "Docs, a handover, and a before-and-after",
    artAlt: "README page beside a bar chart comparing a tall 'before' bar with a short 'after' bar",
  },
];

export default processSteps;
