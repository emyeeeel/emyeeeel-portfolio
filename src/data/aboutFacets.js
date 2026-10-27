// Photos for the /about board and the home "about me" trail. `story` and
// `link` ({ href, label }) are optional — the photo modal only shows them
// when they're there.
const aboutFacets = [
  {
    mediaSrc: "/assets/about/grad-photo.jpeg",
    mediaLabel: "First triple major in USJ-R's School of Computer Studies",
    story:
      "I graduated with a BS in Computer Science from the University of San Jose–Recoletos as the first student in its School of Computer Studies to complete a triple major: Artificial Intelligence, Web Application Development and Mobile Application Development.",
  },
  {
    mediaSrc: "/assets/about/chiayi-ltc.jpg",
    mediaLabel: "The SpoonFull team at Cathay Long-Term Care",
    story:
      "The people behind SpoonFull at Cathay Comprehensive Long-Term Care Institution (國泰綜合長照機構) in Chiayi, our partner care facility, where SpoonFull is deployed and used by staff every day.",
    link: {
      href: "https://cathaylc9.webnode.tw/%E6%9C%80%E6%96%B0%E6%B6%88%E6%81%AF/",
      label: "visit the care center",
    },
  },
  {
    mediaSrc: "/assets/about/spoonfull-in-use.jpg",
    mediaLabel: "SpoonFull at work in Chiayi",
    story:
      "A staff member at our partner care facility logging a meal tray on the SpoonFull station: place the tray, tap the screen, and the meal is measured and recorded. A frame from our project video.",
  },
  {
    mediaSrc: "/assets/about/stust.jpg",
    mediaLabel: "USJ-R's TEEP interns at Wise Laboratory, STUST",
    story:
      "I was part of USJ-R's 2025 delegation to the Taiwan Experience Education Program (TEEP) at Southern Taiwan University of Science and Technology in Tainan, together with Anthony James Plaza and Marylle Roche. Over 26 weeks at Wise Laboratory, we built SpoonFull, an AI dietary monitoring system now in daily use at a long-term care facility in Chiayi.",
  },
  {
    mediaSrc: "/assets/about/ai-healthcare.jpg",
    mediaLabel: "Showcasing SpoonFull at STUST's AI for Healthcare Conference",
    story:
      "Wise Laboratory, led by Prof. Yu-Sheng Lin, brought two projects to the conference: SpoonFull and HandyCare. The showcase was open to healthcare professionals, students and the public.",
    link: {
      href: "https://cih.eng.stust.edu.tw/",
      label: "STUST Center for Intelligent Healthcare",
    },
  },
  {
    mediaSrc: "/assets/about/chunghwa-con.jpg",
    mediaLabel: "Presenting at the CHUNGHWA Healthcare Conference",
    story:
      "The conference brought together healthcare projects from startups and universities across Taiwan. We presented two projects from Wise Laboratory to healthcare and industry guests: SpoonFull and a gamified bicycle rehabilitation system for the elderly.",
  },
  {
    mediaSrc: "/assets/about/scs-days-certificate.jpg",
    mediaLabel: "Champion, SCS Days 2025 Hackathon",
    story:
      "Team AI-DK was named champion of SCS Days 2025: Jaguars' Lair, held on May 2, 2025 at the Recoletos Coliseum. Our winning project, Paagi, recommends packaging and transport from a photo of the item.",
  },
  {
    mediaSrc: "/assets/about/gothong.jpg",
    mediaLabel: "Presenting Paagi at Gothong Southern",
    story:
      "After Paagi won the SCS Days 2025 Hackathon, Gothong Southern's CTO, Mon Angeles, invited me to present it at their company. I presented Paagi to members of their IT and R&D departments and answered their questions, and they praised the initiative, the project idea and even its branding.",
  },
  {
    mediaSrc: "/assets/about/ipbl.jpg",
    mediaLabel: "Special Jury's Prize, iPBL 2025 in Osaka",
    story:
      "At the 2025 International Project-Based Learning (iPBL) program at Osaka Institute of Technology, our team received the Special Jury's Prize for a smart solar energy optimization project that uses photovoltaic optimization to get more out of solar power.",
  },
  {
    mediaSrc: "/assets/about/ipbl-solo.jpg",
    mediaLabel: "Selected for iPBL 2025 in Osaka",
    story:
      "I was selected as a participant in the 2025 iPBL program in Osaka. As one of the team members who could speak Japanese, I helped bridge English and Japanese within our multinational team, so everyone could share ideas and work together smoothly.",
  },
  {
    mediaSrc: "/assets/about/ibm-cebu.jpg",
    mediaLabel: "Mentored by IBM at Can You HackIT",
    story:
      "At Can You HackIT, the IBPAP hackathon, our team was mentored by IBM mentors, who then hosted us for a tour of IBM Cebu and treated us to a meal with the team.",
  },
  {
    mediaSrc: "/assets/about/app-expo.jpg",
    mediaLabel: "2nd Place, SCS App Expo 2026",
    story:
      "At the App Expo during SCS Days 2026, held by USJ-R's School of Computer Studies and sponsored by SKAN·LOG, SpoonFull placed second overall.",
  },
  {
    mediaSrc: "/assets/about/tutor-certificate.jpg",
    mediaLabel: "Peer tutor, School of Computer Studies",
    story:
      "From S.Y. 2020 to 2022, I tutored fellow students through ICTO's tutoring guilds, the Josenian Programmers' Educator Guild (JPEG) and the Multimedia Peers Education Guild (MPEG). This certificate of appreciation is from the JPEG Tutorial and Review Sessions in 2020–2021.",
  },
  {
    mediaSrc: "/assets/about/dsp-lab.jpg",
    mediaLabel: "2nd Place, 21st DSP Creative Design Contest",
    story:
      "Together with Anthony James Plaza and Marylle Roche, I won second place in the International Category of the 21st DSP Creative Design Contest, held at STUST. Our SpoonFull entry, an RGB-D framework for estimating food intake and recommending nutrition, placed 2nd of 25 international finalists at the live presentation and demo day. The contest drew 193 teams from seven countries.",
  },
  {
    mediaSrc: "/assets/about/remote-setup.jpg",
    mediaLabel: "Remote-ready setup",
    story:
      "My home setup is built for remote work: an 11th-gen Intel Core i5 laptop with 16 GB of RAM, a backup internet connection, and a generator that keeps me online through power outages.",
  },
  {
    mediaSrc: "/assets/about/icbet-2026.jpg",
    mediaLabel: "Paper accepted to ICBET 2026",
    story:
      "Our paper, \"SpoonFull: Automated Dietary Monitoring for Long-Term Care via RGB-D Sensing and Retrieval-Augmented Nutrition Recommendation\", was accepted for publication and presentation at the 16th International Conference on Biomedical Engineering and Technology (ICBET 2026) in Bali, Indonesia. Prof. Qian-Bei Hong presented it at the conference.",
  },
  {
    mediaSrc: "/assets/about/icto-officer.jpg",
    mediaLabel: "ICTO officer, S.Y. 2021–2022",
    story:
      "In S.Y. 2021–2022, I joined the officers of ICTO, the School of Computer Studies' student organization, as Vice President for Education and Auditor, handling its MPEG and JPEG tutoring guilds.",
  },
];

export default aboutFacets;
