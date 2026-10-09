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
    role: { en: "Product Intern, enterprise AI adoption", pt: "Product Intern, adoção de IA corporativa" },
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
  {
    id: "cbpf",
    org: "Brazilian Center for Research in Physics",
    initials: "CBPF",
    role: { en: "Research Assistant", pt: "Assistente de pesquisa" },
    // CONFIRM: dates and one line on what you did here.
    dates: { en: "", pt: "" },
    bullets: [],
  },
];

// ---- About section ----

// Draft in your voice — edit freely. Each item is one paragraph.
export const story: L[] = [
  {
    en: "I'm from Brazil and came to Northwestern as an international student. Before that, I spent high school competing in math and science olympiads, and co-founded Access+, a free platform that helps Brazilian students find scholarships, olympiads and programs they wouldn't hear about otherwise.",
    pt: "Sou do Brasil e vim para a Northwestern como estudante internacional. Antes disso, passei o ensino médio competindo em olimpíadas de matemática e ciências, e cofundei o Access+, uma plataforma gratuita que ajuda estudantes brasileiros a encontrar bolsas, olimpíadas e programas que eles não conheceriam de outro jeito.",
  },
  {
    en: "At Northwestern I study Computer Science and Learning Sciences. The question I keep coming back to is what happens to people's thinking when AI does part of the work. It runs through my research, my internship at CGI on enterprise AI adoption, and Paulie, the product I'm building now.",
    pt: "Na Northwestern eu estudo Ciência da Computação e Learning Sciences. A pergunta à qual eu sempre volto é o que acontece com o raciocínio das pessoas quando a IA faz parte do trabalho. Ela atravessa a minha pesquisa, meu estágio na CGI sobre adoção de IA nas empresas e o Paulie, o produto que estou construindo agora.",
  },
  {
    en: "I like taking a messy problem all the way to something people use: reading the research, talking to the people involved, prototyping fast, and checking afterwards whether it actually helped. Outside of that, I organize — recruiting for BRASA, outreach for Women in Computing, and peer advising for other international students.",
    pt: "Gosto de levar um problema bagunçado até algo que as pessoas usam: ler a pesquisa, conversar com quem está envolvido, prototipar rápido e depois conferir se aquilo realmente ajudou. Fora isso, eu organizo coisas — recrutamento na BRASA, outreach no Women in Computing e mentoria para outros estudantes internacionais.",
  },
];

// Handwritten notes in the margin of the About section.
export const marginNotes: L[] = [
  { en: "10+ science olympiad medals", pt: "10+ medalhas em olimpíadas científicas" },
  { en: "Grace Hopper '26 poster", pt: "pôster no Grace Hopper '26" },
  { en: "Access+ reached 400K+ people", pt: "Access+ alcançou 400 mil+ pessoas" },
  { en: "URAP & Buffett Atlas Fellow", pt: "URAP & Buffett Atlas Fellow" },
  { en: "International Peer Advisor", pt: "International Peer Advisor" },
];
