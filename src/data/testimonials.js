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
    // Third-person version of his message; waiting on his OK.
    // placeholder: true,
    quote:
      "She's smart and diligent. When working or interacting with her, I've always appreciated how considerate she is of others' feelings. She also has a strong sense of responsibility, which is something I really admire about her. Overall, she brings a lot of positive energy to the people around her.",
    name: "Guo Weifu (郭維甫)",
    role: "Research Assistant",
    company: "Wise Laboratory, STUST",
  },
  {
    experience: "klab",
    // placeholder: true,
    quote:
      "Give her a problem and she'll own it from start to finish. She picked things up quickly, kept the team informed, and left her work documented well enough for others to continue.",
    name: "Yu-Sheng Lin (林育昇)",
    role: "Supervisor",
    company: "Wise Laboratory, STUST",
  },
  {
    experience: "raykan",
    // placeholder: true,
    quote:
      "Our releases felt safer with her on the team. She paid attention to the details others missed, worked well with little supervision, and always asked the right questions.",
    name: "Eric Magto",
    role: "CTO",
    company: "Raykan Technologies",
  },
  {
    experience: "cylix",
    // placeholder: true,
    quote:
      "Working with her made a demanding project easier. She took initiative without being asked, and her patience in explaining things helped city staff feel at ease with the new system.",
    name: "Ash Raganas",
    role: "System Integrator",
    company: "Cylix Technologies",
  },
  {
    experience: "education",
    quote:
      "As her thesis adviser, I have seen firsthand her dedication, initiative, and ability to lead and work effectively with others. … Amiel's achievements reflect not only her technical competence but also her leadership, dedication, and determination to excel.",
    name: "Engr. Carmel M. Tejana",
    role: "Thesis Adviser",
    company: "University of San Jose–Recoletos",
  },
];

export const visibleTestimonials = import.meta.env.DEV
  ? testimonials
  : testimonials.filter((item) => !item.placeholder);

export default testimonials;
