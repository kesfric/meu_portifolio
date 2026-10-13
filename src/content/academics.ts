import type { L } from "./site";

// Research (high school), fellowships, coursework and publications.
// Everything here is Ester's own list; edit freely. Each text has en + pt.

// ---- Research ----
// Only high-school research lives here. University research is in experience.ts.

export type ResearchItem = {
  id: string;
  title: L;
  org: string;
  program: string;
  /** Plain years or "" to hide. */
  years: string;
  summary: L;
};

export const research: ResearchItem[] = [
  {
    id: "cbpf",
    title: { en: "Alternative Ways of Teaching Quantum Mechanics", pt: "Formas alternativas de ensinar mecânica quântica" },
    org: "Brazilian Center for Research in Physics (CBPF)",
    program: "Programa de Vocação Científica",
    years: "2022, 2023",
    summary: {
      en: "Used Minecraft to create immersive experiences that teach the basics of quantum mechanics, following a curricular experience for middle school students.",
      pt: "Usei o Minecraft para criar experiências imersivas que ensinam o básico de mecânica quântica, seguindo uma experiência curricular para alunos do ensino fundamental.",
    },
  },
  {
    id: "news-dicas",
    title: { en: "News.Dicas", pt: "News.Dicas" },
    org: "Colégio Pedro II",
    program: "Programa de Iniciação Científica",
    years: "",
    summary: {
      en: "Used Instagram posts during the pandemic to teach English words while spreading trustworthy information.",
      pt: "Usei posts no Instagram durante a pandemia para ensinar palavras em inglês enquanto espalhava informação confiável.",
    },
  },
];

// ---- Fellowships ----

export const fellowships: L[] = [
  { en: "Buffett Institute Atlas Fellow", pt: "Buffett Institute Atlas Fellow" },
  { en: "Undergraduate Research Assistant Program (URAP) Fellow", pt: "Undergraduate Research Assistant Program (URAP) Fellow" },
];

// ---- Coursework ----
// Two groups: Computer Science and Learning Sciences. `level` highlights
// graduate-level classes; leave it out for undergraduate ones.

export type Course = {
  title: string;
  code?: string;
  term?: L;
  level?: L;
  note?: L;
};

export const courseworkCS: Course[] = [
  { title: "Fundamentals of Computer Programming", code: "COMP_SCI 111" },
  { title: "Introduction to Computer Programming", code: "COMP_SCI 150" },
  { title: "Data Structures" },
  { title: "Discrete Mathematics" },
  { title: "Linear Algebra" },
  { title: "Data Structures and Algorithms", code: "COMP_SCI 214", term: { en: "Upcoming", pt: "Em breve" } },
];

export const courseworkLS: Course[] = [
  {
    title: "Design of Technological Tools for Thinking and Learning",
    code: "LS 426",
    term: { en: "Winter 2025", pt: "Inverno 2025" },
    level: { en: "PhD-level", pt: "Nível de doutorado" },
    note: { en: "PhD Computer Science and Learning Sciences class (Education and CS)", pt: "Disciplina do doutorado em Ciência da Computação e Learning Sciences (Educação e CS)" },
  },
  {
    title: "Cognition and Culture in Thinking and Learning",
    term: { en: "Spring 2025", pt: "Primavera 2025" },
    level: { en: "Master's-level", pt: "Nível de mestrado" },
    note: { en: "Master in Education class", pt: "Disciplina do mestrado em Educação" },
  },
  { title: "Inclusive Making", term: { en: "Spring 2025", pt: "Primavera 2025" } },
  { title: "Introduction to Psychology", code: "PSYCH 110" },
  // CONFIRM: the course code (SESP 208?) before adding `code` here.
  { title: "Qualitative Social Methods" },
];

// ---- Publications ----
// Newest first. Add a link with `url` to make the title clickable.
// The section stays hidden if the list is empty.

export type Publication = {
  title: string;
  venue: string;
  year: string;
  authors?: string;
  url?: string;
};

export const publications: Publication[] = [
  {
    title: "Juventudes no Plano: Propostas de Políticas Públicas relacionadas ao Plano Nacional de Educação e Plano Nacional de Juventude",
    venue: "Mapa Educação, Instituto Unibanco, Juventudes do Agora (pp. 41–42)",
    year: "Oct 31, 2024",
  },
  {
    title: "Política Para Todos: Bridging the Gap in Political Representation in Latin America",
    venue: "Policy Insights #5, pp. 18–19 (Geneva Graduate Institute, NORRAG)",
    year: "Sep 22, 2024",
  },
  {
    title: "Favelização: Historical Dynamics of Socioeconomic Segregation and Access to Quality Education in Rio de Janeiro",
    venue: "Harvard International Review",
    year: "Sep 16, 2024",
  },
];
