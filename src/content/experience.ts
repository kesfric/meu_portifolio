import type { L } from "./site";

// Timeline entries, newest first. Reorder freely.
// `logo`: drop a square image in public/logos/ and set e.g. logo: "/logos/cgi.svg".
// Without it, the timeline shows the organization's initials.
// Leave `dates` as "" if you'd rather not show them.

export type Metric = { value: string; label: L };

export type Experience = {
  id: string;
  org: string;
  initials: string;
  logo?: string;
  role: L;
  dates: L;
  bullets: L[];
  metrics?: Metric[];
};

export const experience: Experience[] = [
  {
    id: "cgi",
    org: "CGI",
    initials: "CGI",
    role: { en: "AI Deployment Intern", pt: "AI Deployment Intern" },
    dates: { en: "Jun – Sep 2026", pt: "jun – set 2026" },
    bullets: [
      {
        en: "Compared a 293-response employee survey with 30 days of ChatGPT Enterprise usage logs to see where self-report and behavior disagree.",
        pt: "Comparei uma pesquisa com 293 funcionários com 30 dias de registros de uso do ChatGPT Enterprise para ver onde autoavaliação e comportamento divergem.",
      },
      {
        en: "Proposed an AI-use survey for ~90k employees, with a stakeholder framework for how different roles need different AI guidance.",
        pt: "Propus uma pesquisa sobre uso de IA para ~90 mil funcionários, com um mapa de como funções diferentes precisam de orientações diferentes.",
      },
      {
        en: "Co-designed FORGE, a prototype that turns AI into a tool for thinking.",
        pt: "Co-desenhei o FORGE, um protótipo que transforma a IA numa ferramenta para pensar.",
      },
    ],
    metrics: [
      { value: "3,436", label: { en: "AI seats analyzed", pt: "licenças de IA analisadas" } },
      { value: "~3,000", label: { en: "employees in scope", pt: "funcionários no escopo" } },
    ],
  },
  {
    id: "accessplus",
    org: "Access+",
    initials: "A+",
    role: { en: "Co-founder & COO", pt: "Cofundadora e COO" },
    dates: { en: "2024 – present", pt: "2024 – hoje" },
    bullets: [
      {
        en: "Free platform with 290+ curated opportunities (scholarships, olympiads, mentorships) for Brazilian students, now a registered nonprofit.",
        pt: "Plataforma gratuita com mais de 290 oportunidades curadas (bolsas, olimpíadas, mentorias) para estudantes brasileiros, hoje uma ONG registrada.",
      },
      {
        en: "Built the platform's login service on Supabase.",
        pt: "Construí o serviço de login da plataforma no Supabase.",
      },
      {
        en: "Top 15 of 600 projects from 30 countries at BeChangemaker 2024.",
        pt: "Top 15 entre 600 projetos de 30 países no BeChangemaker 2024.",
      },
    ],
    metrics: [
      { value: "400K+", label: { en: "people reached", pt: "pessoas alcançadas" } },
      { value: "5,000", label: { en: "registered users", pt: "usuários cadastrados" } },
      { value: "100K+", label: { en: "site visits", pt: "acessos ao site" } },
    ],
  },
  {
    id: "feinberg",
    org: "Northwestern Feinberg School of Medicine",
    initials: "NU",
    role: { en: "Research Assistant", pt: "Assistente de pesquisa" },
    dates: { en: "Jan – Jun 2026", pt: "jan – jun 2026" },
    // CONFIRM: one or two lines on what you did here.
    bullets: [],
  },
  {
    id: "wic",
    org: "Women in Computing, Northwestern",
    initials: "WiC",
    role: { en: "Internal Outreach Chair", pt: "Internal Outreach Chair" },
    // CONFIRM: dates.
    dates: { en: "2025 – present", pt: "2025 – hoje" },
    bullets: [
      {
        en: "Created the organization's yearly flagship event, the Spring Banquet: venue, catering, a $2,000 budget, and five faculty members plus the dean as guests.",
        pt: "Criei o evento anual principal da organização, o Spring Banquet: local, buffet, orçamento de US$ 2.000, e cinco professores mais o dean como convidados.",
      },
      {
        // CONFIRM: name the partner chapter once you've checked it.
        en: "Closed a partnership with another university's Women in Computing chapter.",
        pt: "Fechei uma parceria com o Women in Computing de outra universidade.",
      },
    ],
    metrics: [{ value: "+84%", label: { en: "member engagement", pt: "engajamento dos membros" } }],
  },
  {
    id: "brasa",
    org: "BRASA Northwestern",
    initials: "BR",
    role: { en: "Recruiting Chair", pt: "Recruiting Chair" },
    // CONFIRM: dates.
    dates: { en: "2026 – present", pt: "2026 – hoje" },
    bullets: [
      {
        en: "Designed and built the association's bilingual website.",
        pt: "Desenhei e construí o site bilíngue da associação.",
      },
    ],
  },
  {
    id: "intro-cs-research",
    org: "Northwestern University",
    initials: "NU",
    role: { en: "Research Volunteer", pt: "Voluntária de pesquisa" },
    // CONFIRM: dates.
    dates: { en: "2026 – present", pt: "2026 – hoje" },
    bullets: [
      {
        en: "Helping PhD candidate Yinmiao Li study the metacognitive and emotional experiences of students in intro CS courses.",
        pt: "Ajudo a doutoranda Yinmiao Li a estudar as experiências metacognitivas e emocionais de estudantes de disciplinas introdutórias de computação.",
      },
    ],
  },
  {
    id: "tlt",
    org: "TLT Lab, Columbia University",
    initials: "TLT",
    role: { en: "Research Assistant", pt: "Assistente de pesquisa" },
    dates: { en: "Dec 2024 – Apr 2025", pt: "dez 2024 – abr 2025" },
    // CONFIRM: one line on what you did here.
    bullets: [],
  },
];

// ---- About section ----

// The About section: Ester's own words; only English errors were corrected.
export const bio: L = {
  en: "I am a Brazilian student who was very interested in STEM + Humanities and in how students learn. I came to Northwestern because it was my favorite (and imo the goated) university, thanks to two programs (the Brazilian Fundação Estudar and the American Better Angels), and also because this is where the Learning Sciences were born. I am also interested in Computer Science, and I am engaging in HCI and Human-Centered AI opportunities while I develop as a cs sis. I love creating ideas and solving puzzles.",
  // CONFIRM: draft translation, edit it in your own voice.
  pt: "Sou uma estudante brasileira que sempre se interessou por STEM + Humanidades e por como os estudantes aprendem. Vim para a Northwestern porque era a minha universidade favorita (e, na minha opinião, a melhor de todas), graças a dois programas (a Fundação Estudar, do Brasil, e o Better Angels, dos Estados Unidos) e também porque foi aqui que nasceram as Learning Sciences. Também me interesso por Ciência da Computação e estou me envolvendo em oportunidades de HCI e de IA centrada no ser humano enquanto me desenvolvo como uma cs sis. Eu amo criar ideias e resolver quebra-cabeças.",
};
