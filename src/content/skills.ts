import type { L } from "./site";

// Five clusters. Each skill should be something you'd happily talk about in an
// interview — remove anything you wouldn't.
// `learnedAt` lists the roles and activities (ids from experience.ts) where
// these skills were learned. `usedIn` links to projects that show them.

export type SkillCluster = {
  id: string;
  name: L;
  skills: string[];
  /** ids from src/content/experience.ts */
  learnedAt: string[];
  usedIn: { label: string; href: string }[];
};

export const skillClusters: SkillCluster[] = [
  {
    id: "ai",
    name: { en: "AI & ML", pt: "IA & ML" },
    skills: ["LLM product design", "Gemini API", "Prompt analysis", "Human–AI interaction research", "Naive Bayes (coursework)"],
    learnedAt: ["cgi", "feinberg"],
    usedIn: [
      { label: "Paulie", href: "/projects/paulie" },
      { label: "Access+", href: "/projects/accessplus" },
      { label: "FORGE at CGI", href: "/projects/cgi-forge" },
    ],
  },
  {
    id: "swe",
    name: { en: "Software engineering", pt: "Engenharia de software" },
    skills: ["Python", "JavaScript", "HTML & CSS", "Vue / Nuxt", "SQL & PostgreSQL", "Supabase Auth", "Google Apps Script", "Data structures"],
    learnedAt: ["accessplus", "brasa"],
    usedIn: [
      { label: "Job tracker", href: "/projects/job-tracker" },
      { label: "BRASA website", href: "/projects/brasa-website" },
      { label: "Access+", href: "/projects/accessplus" },
    ],
  },
  {
    id: "product",
    name: { en: "Product", pt: "Produto" },
    skills: ["User research", "Prototyping", "Problem framing", "Pitch decks", "Brand identity", "Prioritization"],
    learnedAt: ["cgi", "accessplus"],
    usedIn: [
      { label: "Access+", href: "/projects/accessplus" },
      { label: "Paulie", href: "/projects/paulie" },
      { label: "FORGE at CGI", href: "/projects/cgi-forge" },
    ],
  },
  {
    id: "research",
    name: { en: "Research", pt: "Pesquisa" },
    skills: ["Literature reviews", "Survey design", "Self-report vs. behavioral data", "Participatory design", "Academic writing"],
    learnedAt: ["feinberg", "tlt", "intro-cs-research", "cgi"],
    usedIn: [
      { label: "FORGE at CGI", href: "/projects/cgi-forge" },
      { label: "Paulie", href: "/projects/paulie" },
    ],
  },
  {
    id: "leadership",
    name: { en: "Leadership", pt: "Liderança" },
    skills: ["Event production", "Budgeting", "Recruiting", "Partnerships", "Running a team"],
    learnedAt: ["wic", "brasa", "accessplus"],
    usedIn: [
      { label: "Access+", href: "/projects/accessplus" },
    ],
  },
];
