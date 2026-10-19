// Only real, attributable recommendations belong here. Each one shows on
// its role in the home "experience" section (`experience` matches a `key`
// in experience.js).
//
// Entries marked `placeholder: true` are DRAFTS written for the person to
// approve or edit — not their words yet. They show as dashed drafts in
// `npm run dev` and are left out of production builds, so an unapproved
// quote can't ship. Once the person approves (or sends their own), put
// their exact wording in `quote` and delete the flag.
const testimonials = [
  {
    experience: "concreat",
    quote:
      "She's a talented individual that can work with little to no supervision. I highly recommend her. Not only she's good with her programming skills, she also goes above and beyond her responsibilities.",
    name: "Mary Claire Christner Bermil",
    role: "Marketing Officer",
    company: "Concreat Holdings Philippines, Inc.",
  },
  {
    experience: "klab",
    placeholder: true,
    quote:
      "Give her a problem and she'll own it from start to finish. She picked things up quickly, kept the team informed, and left her work documented well enough for others to continue.",
    name: "Yu-Sheng Lin",
    role: "Supervisor",
    company: "K Lab, STUST",
  },
  {
    experience: "raykan",
    placeholder: true,
    quote:
      "Our releases felt safer with her on the team. She paid attention to the details others missed, worked well with little supervision, and always asked the right questions.",
    name: "Eric Magto",
    role: "CTO",
    company: "Raykan Technologies",
  },
  {
    experience: "cylix",
    placeholder: true,
    quote:
      "Working with her made a demanding project easier. She took initiative without being asked, and her patience in explaining things helped city staff feel at ease with the new system.",
    name: "Ash Raganas",
    role: "System Integrator",
    company: "Cylix Technologies",
  },
];

export const visibleTestimonials = import.meta.env.DEV
  ? testimonials
  : testimonials.filter((item) => !item.placeholder);

export default testimonials;
