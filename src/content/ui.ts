import type { L } from "./site";

// Every label on the site, in both languages.
export const ui = {
  nav: {
    projects: { en: "Projects", pt: "Projetos" },
    about: { en: "About", pt: "Sobre" },
    skills: { en: "Skills", pt: "Habilidades" },
    menu: { en: "Menu", pt: "Menu" },
    close: { en: "Close", pt: "Fechar" },
    skip: { en: "Skip to content", pt: "Pular para o conteúdo" },
  },
  toggles: {
    language: { en: "Mudar para português", pt: "Switch to English" },
    themeDark: { en: "Switch to dark mode", pt: "Mudar para o modo escuro" },
    themeLight: { en: "Switch to light mode", pt: "Mudar para o modo claro" },
  },
  hero: {
    // Your sentence from the sketch, kept as you wrote it.
    intro: {
      en: "my name is Ester Borges Frickes Ricardo, and I am a Computer Science and Learning Sciences student at Northwestern.",
      pt: "meu nome é Ester Borges Frickes Ricardo, e eu estudo Ciência da Computação e Learning Sciences na Northwestern.",
    },
    leadIn: {
      en: "I work where AI meets how people think and learn, as a",
      pt: "Trabalho onde a IA encontra o jeito como as pessoas pensam e aprendem, como",
    },
    roles: [
      { en: "product AI builder", pt: "construtora de produtos com IA" },
      { en: "software engineer", pt: "engenheira de software" },
      { en: "researcher", pt: "pesquisadora" },
      { en: "community builder", pt: "construtora de comunidades" },
    ] as L[],
    status: {
      en: "Open to internships for summer 2027",
      pt: "Aberta a estágios para o verão de 2027",
    },
    seeProjects: { en: "See projects", pt: "Ver projetos" },
    openResume: { en: "Download resume", pt: "Baixar currículo" },
    contactMe: { en: "Contact me", pt: "Falar comigo" },
    photoAlt: { en: "Portrait of Ester", pt: "Retrato da Ester" },
    placeholderAlt: {
      en: "Smiley face from the original sketch, standing in for a photo",
      pt: "Carinha sorridente do esboço original, no lugar da foto",
    },
  },
  projects: {
    title: { en: "projects", pt: "projetos" },
    filterLabel: { en: "Filter projects", pt: "Filtrar projetos" },
    all: { en: "All", pt: "Todos" },
    open: { en: "Open case study", pt: "Abrir estudo de caso" },
    openPage: { en: "Open as a page", pt: "Abrir como página" },
    empty: {
      en: "No projects in this category yet. Pick another filter.",
      pt: "Ainda não há projetos nessa categoria. Escolha outro filtro.",
    },
    count: { en: "projects shown", pt: "projetos visíveis" },
  },
  caseStudy: {
    problem: { en: "the problem", pt: "o problema" },
    solution: { en: "the solution", pt: "a solução" },
    role: { en: "My role", pt: "Meu papel" },
    tech: { en: "Built with", pt: "Feito com" },
    process: { en: "how it came together", pt: "como foi feito" },
    outcomes: { en: "outcomes", pt: "resultados" },
    lessons: { en: "what I learned", pt: "o que aprendi" },
    demo: { en: "Visit live site", pt: "Ver site no ar" },
    code: { en: "View code on GitHub", pt: "Ver código no GitHub" },
    back: { en: "Back to all projects", pt: "Voltar para os projetos" },
    next: { en: "Next project", pt: "Próximo projeto" },
    demoTitle: { en: "see it in motion", pt: "veja em movimento" },
  },
  categories: {
    ai: { en: "AI", pt: "IA" },
    swe: { en: "Software engineering", pt: "Engenharia de software" },
    product: { en: "Product", pt: "Produto" },
    research: { en: "Research", pt: "Pesquisa" },
  },
  about: {
    title: { en: "about", pt: "sobre" },
    before: { en: "Before college, I spent high school ", pt: "Antes da faculdade, passei o ensino médio " },
    olympiads: { en: "competing in math and science olympiads", pt: "competindo em olimpíadas de matemática e ciências" },
    between: { en: " and ", pt: " e " },
    research: { en: "doing research", pt: "fazendo pesquisa" },
    hint: { en: "Hover over (or tap) the highlighted phrases to see more.", pt: "Passe o mouse (ou toque) nas frases destacadas para ver mais." },
    olympiadsTitle: { en: "Olympiad medals", pt: "Medalhas em olimpíadas" },
    researchTitle: { en: "High school research", pt: "Pesquisa no ensino médio" },
    placeholder: { en: "hover a highlighted phrase", pt: "passe o mouse numa frase destacada" },
    close: { en: "Close", pt: "Fechar" },
  },
  coursework: {
    title: { en: "relevant coursework", pt: "disciplinas relevantes" },
    cs: { en: "Computer Science", pt: "Ciência da Computação" },
    math: { en: "Math & Statistics", pt: "Matemática e Estatística" },
    ls: { en: "Learning Sciences", pt: "Learning Sciences" },
    graduate: { en: "Graduate level", pt: "Pós-graduação" },
    hint: { en: "★ graduate-level class. Hover or tap a course for details.", pt: "★ disciplina de pós-graduação. Passe o mouse ou toque numa disciplina para ver detalhes." },
  },
  publications: { title: { en: "publications", pt: "publicações" } },
  skills: {
    title: { en: "skills", pt: "habilidades" },
    pick: {
      en: "Pick an area to see the skills and where I learned and used them.",
      pt: "Escolha uma área para ver as habilidades e onde eu aprendi e usei cada uma.",
    },
    learnedAt: { en: "Where I learned it", pt: "Onde eu aprendi" },
    usedIn: { en: "Where I used it", pt: "Onde eu usei" },
  },
} satisfies Record<string, Record<string, L | L[]>>;
