/**
 * Single source of truth. Everything here comes from Sreenandha_S_resume.pdf.
 * Components only read from this file.
 */

export const PROFILE = {
  name: "Sreenandha S",
  firstName: "Sreenandha",
  initials: "SS",
  role: "Full Stack Developer",
  email: "sreenandhanakshathra@gmail.com",
  phone: "8304860628",
  phoneHref: "tel:8304860628",
  location: "Kannur, Kerala – 670611",
  city: "Kannur, Kerala",
  resumeSummary:
    "B.Tech Computer Science and Engineering graduate focused on MERN stack and full-stack web development, with hands-on experience in JavaScript, React.js, Node.js, Express.js, MongoDB, and RESTful APIs. Skilled in building responsive web applications, reusable UI components, CRUD operations, frontend–backend integration, and database-driven applications. Currently developing a real-world MERN project involving authentication, API development, database management, and image uploads, with strong problem-solving skills and a willingness to learn.",
  extraLine: "Languages known: Malayalam, English, Hindi.",
  languages: ["Malayalam", "English", "Hindi"],
  github: "https://github.com/Sreenandha10",
  githubLabel: "github.com/Sreenandha10",
  linkedin: "https://www.linkedin.com/in/sreenandha-s-971951369/",
  linkedinLabel: "linkedin.com/in/sreenandha-s",
  resume: "/Sreenandha_S_resume.pdf",
  graduationYear: "2026",
  degree: "B.Tech",
  dept: "Computer Science Engineering",
  college: "Vimal Jyothi Engineering College, Kannur",
  cgpa: "7.01",
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type Family = {
  id: string;
  label: string;
  short: string;
};

export const FAMILIES: Family[] = [
  { id: "frontend", label: "Frontend Development", short: "FE" },
  { id: "backend", label: "Backend Development", short: "BE" },
  { id: "databases", label: "Databases", short: "DB" },
  { id: "web", label: "Web & API Technologies", short: "API" },
  { id: "core", label: "Programming & Core", short: "CORE" },
  { id: "tools", label: "Tools", short: "TOOL" },
  { id: "ml", label: "AI / Machine Learning", short: "ML" },
];

export const FILTER_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  web: "Web & API",
  core: "Core",
  tools: "Tools",
  ml: "AI / ML",
};

type SkillSeed = { name: string; symbol: string; family: string; alias?: string[] };

/** Résumé "Technical Skills" groups, plus the technologies named in the Projects section (AI / ML). */
export const SKILL_GROUPS: { family: string; items: SkillSeed[] }[] = [
  {
    family: "frontend",
    items: [
      { name: "HTML5", symbol: "Ht", family: "frontend", alias: ["HTML"] },
      { name: "CSS3", symbol: "Cs", family: "frontend", alias: ["CSS"] },
      { name: "JavaScript", symbol: "Js", family: "frontend" },
      { name: "React.js", symbol: "Re", family: "frontend" },
      { name: "Redux", symbol: "Rx", family: "frontend" },
      { name: "Bootstrap", symbol: "Bs", family: "frontend" },
      { name: "Tailwind CSS", symbol: "Tw", family: "frontend" },
      { name: "Responsive Web Design", symbol: "Rw", family: "frontend" },
      { name: "DOM Manipulation", symbol: "Dm", family: "frontend" },
      { name: "UI/UX", symbol: "Ux", family: "frontend" },
    ],
  },
  {
    family: "backend",
    items: [
      { name: "Node.js", symbol: "No", family: "backend" },
      { name: "Express.js", symbol: "Ex", family: "backend" },
      { name: "Python", symbol: "Py", family: "backend" },
      { name: "Flask", symbol: "Fl", family: "backend" },
      { name: "RESTful APIs", symbol: "Rs", family: "backend" },
      { name: "API Integration", symbol: "Ai", family: "backend" },
      { name: "Frontend–Backend Integration", symbol: "Fb", family: "backend" },
    ],
  },
  {
    family: "databases",
    items: [
      { name: "MySQL", symbol: "My", family: "databases" },
      { name: "SQL", symbol: "Sq", family: "databases" },
      { name: "MongoDB", symbol: "Mo", family: "databases" },
    ],
  },
  {
    family: "web",
    items: [
      { name: "Fetch API", symbol: "Fe", family: "web" },
      { name: "Axios", symbol: "Ax", family: "web" },
      { name: "JSON", symbol: "Jn", family: "web" },
      { name: "Promises", symbol: "Pr", family: "web" },
      { name: "Async/Await", symbol: "Aw", family: "web" },
    ],
  },
  {
    family: "core",
    items: [
      { name: "C", symbol: "Cc", family: "core" },
      { name: "Java", symbol: "Jv", family: "core" },
      { name: "Object-Oriented Programming", symbol: "Oo", family: "core", alias: ["OOP"] },
      { name: "Data Structures & Algorithms", symbol: "Ds", family: "core", alias: ["DSA"] },
      { name: "DBMS", symbol: "Db", family: "core" },
      { name: "SDLC", symbol: "Sd", family: "core" },
    ],
  },
  {
    family: "tools",
    items: [
      { name: "Git", symbol: "Gi", family: "tools" },
      { name: "GitHub", symbol: "Gh", family: "tools" },
      { name: "Debugging", symbol: "Dg", family: "tools" },
    ],
  },
  {
    family: "ml",
    items: [
      { name: "Machine Learning", symbol: "Ml", family: "ml" },
      { name: "PyTorch", symbol: "Pt", family: "ml" },
      { name: "XTTS-v2", symbol: "Xt", family: "ml" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  ui: "jobs" | "voice" | "refound";
};

export const PROJECTS: Project[] = [
  {
    id: "refugee",
    index: "01",
    title: "Refugee Resettlement and Integration System",
    kicker: "Full-stack platform · Machine Learning",
    description:
      "Developed a full-stack platform with skill-based job recommendations; integrated MySQL and optimized modules through testing and debugging.",
    features: [
      "Full-stack platform",
      "Skill-based job recommendations",
      "MySQL integration",
      "Modules optimized through testing",
      "Debugging",
      "Machine Learning",
    ],
    tech: ["HTML5", "CSS3", "Flask", "Node.js", "MySQL", "Machine Learning"],
    ui: "jobs",
  },
  {
    id: "voice",
    index: "02",
    title: "Voice Cloning System",
    kicker: "Deep Learning Project",
    description:
      "Developed an AI-powered voice cloning application integrating XTTS-v2 with Flask for speech generation from cloned voices. Implemented audio preprocessing and performance optimization to improve speech-generation reliability.",
    features: [
      "AI-powered voice cloning",
      "XTTS-v2 integrated with Flask",
      "Speech from cloned voices",
      "Audio preprocessing",
      "Performance optimization",
      "Reliable speech generation",
    ],
    tech: ["Python", "Flask", "PyTorch", "XTTS-v2", "MySQL"],
    ui: "voice",
  },
   {
    id: "refound",
    index: "03",
    title: "Refound",
    kicker: "MERN Stack · Lost & Found Platform",
    description:
      "Developing a full-stack lost and found management platform that helps users report lost or found belongings, discover potential matches, and reconnect people with their missing items. Includes image uploads, intelligent matching, notifications, and admin verification.",
    features: [
      "User authentication and authorization",
      "Lost and found item reporting",
      "Image uploads and item management",
      "Search and category-based filtering",
      "Smart matching of lost and found reports",
      "Admin verification and claim management",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Redux",
      "Axios",
    ],
    ui: "refound",
  },
];

/* Derived: which projects use each skill (matched against project tech) */
export type Skill = SkillSeed & { number: number; projects: string[] };

export const SKILLS: Skill[] = (() => {
  let n = 0;
  const out: Skill[] = [];
  for (const g of SKILL_GROUPS) {
    for (const s of g.items) {
      n += 1;
      const keys = [s.name, ...(s.alias ?? [])];
      const projects = PROJECTS.filter((p) => p.tech.some((t) => keys.includes(t))).map((p) => p.title);
      out.push({ ...s, number: n, projects });
    }
  }
  return out;
})();

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export const CERTIFICATIONS = [
  { title: "MERN Stack Development", issuer: "Luminar Technolab", note: "Ongoing" },
  { title: "Introduction to Data Analytics", issuer: "IBM (Coursera)", note: "" },
  { title: "Explore Machine Learning Using Python", issuer: "Infosys Springboard", note: "" },
  { title: "Cyber Forensics Add-on Course", issuer: "MIBIZ Cyber Forensics Laboratory", note: "" },
];

/* ------------------------------------------------------------------ */
/* Experience + education (chronological)                              */
/* ------------------------------------------------------------------ */

export const TIMELINE = [
  {
    when: "Jul 2019",
    kind: "Education",
    title: "High School",
    place: "Koodali Higher Secondary School, Kannur, Kerala",
    detail: "Score: 100%",
  },
  {
    when: "Jul 2021",
    kind: "Education",
    title: "Higher Secondary School",
    place: "AKG Memorial Government Higher Secondary School, Kannur, Kerala",
    detail: "Score: 94.9%",
  },
  {
    when: "Dec 2024",
    kind: "Internship",
    title: "Python Developer Intern",
    place: "Quest Innovative Solutions Pvt. Ltd",
    detail:
      "Showcased strong dedication and adaptability while delivering Python-based solutions and continuously upskilling.",
  },
  {
    when: "Dec 2025",
    kind: "Internship",
    title: "Python Flask Developer Intern",
    place: "Crudops Pvt.Ltd",
    detail:
      "Developed backend components using Python and Flask, including routing and template rendering. Assisted with basic database integration, debugging, and followed standard software development practices.",
  },
  {
    when: "May 2026",
    kind: "Education",
    title: "B.Tech in Computer Science Engineering",
    place: "Vimal Jyothi Engineering College, Kannur",
    detail: "CGPA: 7.01",
  },
];

/* ------------------------------------------------------------------ */
/* Achievements (only items / numbers stated in the résumé)            */
/* ------------------------------------------------------------------ */

export type Achievement = {
  id: string;
  icon: "trophy" | "users" | "cap";
  label: string;
  caption: string;
  detail: string;
  value: number;
  from: number;
  decimals: number;
  suffix: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "shaastra",
    icon: "trophy",
    label: "IIT Madras · Shaastra Techathon",
    caption: "Participated in the First AI/ML Challenge of IIT Madras Shaastra Techathon 2024.",
    detail: "Personal achievement",
    value: 2024,
    from: 2000,
    decimals: 0,
    suffix: "",
  },
  {
    id: "techfest",
    icon: "users",
    label: "National Level Tech Fest",
    caption: "Served as a Subcoordinator in an event during National Level Tech Fest 2024.",
    detail: "Vimal Jyothi Engineering College",
    value: 2024,
    from: 2000,
    decimals: 0,
    suffix: "",
  },
  {
    id: "highschool",
    icon: "cap",
    label: "High School",
    caption: "Koodali Higher Secondary School, Kannur, Kerala.",
    detail: "Jul 2019",
    value: 100,
    from: 0,
    decimals: 0,
    suffix: "%",
  },
  {
    id: "hss",
    icon: "cap",
    label: "Higher Secondary",
    caption: "AKG Memorial Government Higher Secondary School, Kannur, Kerala.",
    detail: "Jul 2021",
    value: 94.9,
    from: 0,
    decimals: 1,
    suffix: "%",
  },
  {
    id: "cgpa",
    icon: "cap",
    label: "B.Tech CGPA",
    caption: "Computer Science Engineering, Vimal Jyothi Engineering College.",
    detail: "May 2026",
    value: 7.01,
    from: 0,
    decimals: 2,
    suffix: "",
  },
];
