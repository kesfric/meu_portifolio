import type { L } from "./site";

// Six clusters. Each skill should be something you'd happily talk about in an
// interview — remove anything you wouldn't. `usedIn` links back to proof:
// "#project:<slug>" opens that case study, "#experience" jumps to the timeline.

export type SkillCluster = {
  id: string;
  name: L;
  skills: string[];
  usedIn: { label: string; href: string }[];
};

export const skillClusters: SkillCluster[] = [
  {
    id: "ai",
    name: { en: "AI & ML", pt: "IA & ML" },
    skills: ["LLM product design", "Gemini API", "Prompt analysis", "Human–AI interaction research", "Naive Bayes (coursework)"],
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
    usedIn: [
      { label: "FORGE at CGI", href: "/projects/cgi-forge" },
      { label: "Paulie", href: "/projects/paulie" },
    ],
  },
  {
    id: "deployment",
    name: { en: "Deployment", pt: "Deploy" },
    skills: ["Vercel", "Supabase", "Scheduled jobs", "Transactional email (Resend)", "Enterprise AI rollout research"],
    usedIn: [
      { label: "Access+", href: "/projects/accessplus" },
      { label: "Job tracker", href: "/projects/job-tracker" },
    ],
  },
  {
    id: "leadership",
    name: { en: "Leadership", pt: "Liderança" },
    skills: ["Event production", "Budgeting", "Recruiting", "Partnerships", "Running a team"],
    usedIn: [
      { label: "Women in Computing", href: "#experience" },
      { label: "BRASA Northwestern", href: "#experience" },
      { label: "Access+", href: "/projects/accessplus" },
    ],
  },
];
