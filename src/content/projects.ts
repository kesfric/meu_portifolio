import type { L } from "./site";

// To add a project: copy one object below, give it a new `slug`, and fill it in.
// The card, the case study overlay, the /projects/<slug> page and the sitemap
// all update automatically.
//
// Copy note: everything here is a first draft written from what you've told me.
// Rewrite the "lessons" in your own words — interviewers will ask about them.

export type Category = "ai" | "swe" | "product" | "research";

export type Project = {
  slug: string;
  title: L;
  /** A plain string ("2026") or both languages ({ en: "2024 – now", pt: "2024 – hoje" }). */
  year: string | L;
  categories: Category[];
  /** One line on the card. */
  summary: L;
  /** The highlighted line on the card and at the top of the case study. */
  impact: L;
  tech: string[];
  links: { demo?: string; github?: string };
  /** Optional real screen recording, e.g. "/videos/accessplus.mp4" (put the file in public/videos/). Shown instead of the illustrated walkthrough. */
  video?: string;
  caseStudy: {
    problem: L;
    solution: L;
    role: L;
    /** Ordered steps. */
    process: L[];
    outcomes: L[];
    lessons: L[];
  };
};

export const projects: Project[] = [
  {
    slug: "accessplus",
    title: { en: "Access+", pt: "Access+" },
    year: { en: "2024 – now", pt: "2024 – hoje" },
    categories: ["product", "ai", "swe"],
    summary: {
      en: "A free platform that helps Brazilian students find scholarships, olympiads and programs, with an AI assistant that matches opportunities to each student.",
      pt: "Uma plataforma gratuita que ajuda estudantes brasileiros a encontrar bolsas, olimpíadas e programas, com uma assistente de IA que indica oportunidades para cada perfil.",
    },
    impact: {
      en: "400K+ people reached, 100K+ site visits and 5,000 registered users since launch.",
      pt: "Mais de 400 mil pessoas alcançadas, 100 mil acessos ao site e 5.000 usuários cadastrados desde o lançamento.",
    },
    tech: ["Nuxt 3", "Supabase (Postgres + Auth)", "Gemini API (RAG)", ".NET / C# API", "Vercel", "Beehiiv"],
    links: { demo: "https://www.accessplus.com.br/" },
    caseStudy: {
      problem: {
        en: "Opportunities that change a student's path — scholarships, olympiads, mentorships — are scattered and mostly reach students who already have someone to tell them. In our own survey of young people aged 13 to 24 across 13 Brazilian states, 96.8% wished they had heard about opportunities earlier, and 100% said their socioeconomic situation affects their access.",
        pt: "As oportunidades que mudam a trajetória de um estudante — bolsas, olimpíadas, mentorias — estão espalhadas e chegam principalmente a quem já tem alguém para contar. Na nossa própria pesquisa com jovens de 13 a 24 anos em 13 estados, 96,8% gostariam de ter conhecido oportunidades mais cedo, e 100% disseram que a condição socioeconômica afeta o acesso.",
      },
      solution: {
        en: "A free, curated database of 290+ opportunities, filterable by social criteria, plus application guides, a weekly newsletter and a WhatsApp community. AccessIA, the AI assistant, asks five quick questions (school level, interests, goal, what you've done, where you're looking) and recommends opportunities from the catalog for that profile.",
        pt: "Uma base gratuita e curada com mais de 290 oportunidades, com filtros por critérios sociais, além de guias de inscrição, newsletter semanal e comunidade no WhatsApp. A AccessIA, a assistente de IA, faz cinco perguntas rápidas (nível de ensino, interesses, objetivo, o que você já fez, onde procura) e recomenda oportunidades do catálogo para aquele perfil.",
      },
      role: {
        en: "Co-founder and COO. I run operations and the team, and on the product side I built the platform's login service on Supabase.",
        pt: "Cofundadora e COO. Cuido da operação e do time, e no produto construí o serviço de login da plataforma no Supabase.",
      },
      process: [
        {
          en: "Validated the problem with a survey of young people in 13 Brazilian states.",
          pt: "Validamos o problema com uma pesquisa com jovens de 13 estados.",
        },
        {
          en: "Started as a BeChangemaker 2024 submission and reached the Top 15 of 600 projects from 30 countries.",
          pt: "Começou como uma submissão ao BeChangemaker 2024 e ficou no Top 15 entre 600 projetos de 30 países.",
        },
        {
          en: "Launched the site in February 2025, then moved it from a spreadsheet backend to Nuxt and Supabase.",
          pt: "Lançamos o site em fevereiro de 2025 e depois migramos de uma planilha como backend para Nuxt e Supabase.",
        },
        {
          en: "Added AccessIA, which recommends opportunities by profile using retrieval over our catalog.",
          pt: "Adicionamos a AccessIA, que recomenda oportunidades por perfil buscando no nosso catálogo.",
        },
        {
          en: "Built login with Supabase; next come user profiles, saved opportunities and application tracking.",
          pt: "Construí o login com Supabase; os próximos passos são perfis, oportunidades salvas e acompanhamento de inscrições.",
        },
      ],
      outcomes: [
        { en: "400K+ people reached on social media", pt: "Mais de 400 mil pessoas alcançadas nas redes" },
        { en: "100K+ site visits and 5,000 registered users", pt: "Mais de 100 mil acessos ao site e 5.000 usuários cadastrados" },
        { en: "290+ curated opportunities", pt: "Mais de 290 oportunidades curadas" },
        { en: "Top 15 of 600 projects at BeChangemaker 2024; now a registered nonprofit", pt: "Top 15 entre 600 projetos no BeChangemaker 2024; hoje uma ONG registrada" },
      ],
      lessons: [
        {
          en: "Curation is the bottleneck, not the code. Getting the AI reviewer to produce consistent output for every opportunity turned out to be the hardest part.",
          pt: "O gargalo é a curadoria, não o código. Fazer a IA revisora gerar saídas consistentes para cada oportunidade acabou sendo a parte mais difícil.",
        },
        {
          en: "Keep the core free and charge only for the layer that costs money to run.",
          pt: "Manter o essencial gratuito e cobrar só pela camada que custa dinheiro para rodar.",
        },
      ],
    },
  },
  {
    slug: "paulie",
    title: { en: "Paulie", pt: "Paulie" },
    year: "2026",
    categories: ["ai", "product", "research", "swe"],
    summary: {
      en: "A browser companion that keeps your own thinking in the loop when you work with AI.",
      pt: "Uma extensão de navegador que mantém o seu próprio raciocínio no processo quando você usa IA.",
    },
    impact: {
      en: "Funded by Northwestern's Opportunity Fund and selected for the Grace Hopper 2026 poster session.",
      pt: "Financiado pelo Opportunity Fund da Northwestern e selecionado para a sessão de pôsteres do Grace Hopper 2026.",
    },
    // CONFIRM: the exact stack of the current build.
    tech: ["JavaScript", "Browser extension", "HTML & CSS", "Vercel"],
    links: { demo: "https://paulie-wheat.vercel.app/" },
    caseStudy: {
      problem: {
        en: "People increasingly hand whole tasks to AI and accept what comes back. Research on human–AI collaboration (Passi & Vorvoreanu; Buçinca et al.; Bansal et al.) links that overreliance to people accepting AI's mistakes, and shows that adding explanations alone doesn't fix it.",
        pt: "As pessoas cada vez mais entregam tarefas inteiras para a IA e aceitam o que volta. A pesquisa sobre colaboração humano–IA (Passi & Vorvoreanu; Buçinca et al.; Bansal et al.) liga essa dependência excessiva a aceitar os erros da IA, e mostra que só adicionar explicações não resolve.",
      },
      solution: {
        en: "Paulie is a small companion that sits next to the AI chat. Before you send a prompt, it notices what's missing — your own voice, context, specificity or a draft of your own — and asks for it. A session view shows how much of the final text is yours, turn by turn, and a weekly profile tracks those four axes over time.",
        pt: "O Paulie é um companheiro pequeno que fica ao lado do chat de IA. Antes de você enviar um prompt, ele percebe o que está faltando — sua própria voz, contexto, especificidade ou um rascunho seu — e pede isso. Uma visão da sessão mostra quanto do texto final é seu, turno a turno, e um perfil semanal acompanha esses quatro eixos ao longo do tempo.",
      },
      role: {
        en: "Founder. I designed the product concept, the brand and the working prototype, wrote the pitch, and now build it on my own.",
        pt: "Fundadora. Desenhei o conceito do produto, a marca e o protótipo funcional, escrevi o pitch e hoje construo sozinha.",
      },
      process: [
        {
          en: "Read the overreliance literature and wrote a problem statement grounded in it.",
          pt: "Li a literatura sobre dependência excessiva de IA e escrevi a definição do problema com base nela.",
        },
        {
          en: "Mapped the product on a post-it board: a summary of how AI was used, what to write yourself versus where AI helps, a user profile, good examples and a low-friction companion.",
          pt: "Mapeei o produto num quadro de post-its: um resumo de como a IA foi usada, o que escrever sozinha versus onde a IA ajuda, um perfil de usuário, bons exemplos e um companheiro de baixa fricção.",
        },
        {
          en: "Built a working prototype with four views: live, session, profile and examples.",
          pt: "Construí um protótipo funcional com quatro visões: ao vivo, sessão, perfil e exemplos.",
        },
        {
          en: "Pitched it for funding and research venues.",
          pt: "Apresentei o projeto para financiamento e eventos de pesquisa.",
        },
        {
          en: "Now moving from a local prototype to a cloud-based browser extension.",
          pt: "Agora estou levando o protótipo local para uma extensão de navegador baseada em nuvem.",
        },
      ],
      outcomes: [
        { en: "Northwestern Opportunity Fund award", pt: "Prêmio do Opportunity Fund da Northwestern" },
        {
          en: "Selected for the Grace Hopper Celebration 2026 poster session",
          pt: "Selecionado para a sessão de pôsteres do Grace Hopper Celebration 2026",
        },
        { en: "Public site live at paulie-wheat.vercel.app", pt: "Site público no ar em paulie-wheat.vercel.app" },
      ],
      lessons: [
        {
          en: "Using less AI isn't a reason to install something. Paulie also has to make the result better, so I reframed it around better outputs, not only less reliance.",
          pt: "Usar menos IA não é motivo para alguém instalar nada. O Paulie também precisa deixar o resultado melhor, então reposicionei o produto em torno de resultados melhores, e não só de menos dependência.",
        },
        {
          en: "Build for one person first. Team features can wait until individual habits change.",
          pt: "Construir primeiro para uma pessoa. Funcionalidades para times podem esperar até os hábitos individuais mudarem.",
        },
      ],
    },
  },
  {
    slug: "brasa-website",
    title: { en: "BRASA Northwestern website", pt: "Site da BRASA Northwestern" },
    year: "2026",
    categories: ["swe", "product"],
    summary: {
      en: "The bilingual website for Northwestern's Brazilian Student Association.",
      pt: "O site bilíngue da associação de estudantes brasileiros da Northwestern.",
    },
    impact: {
      en: "One config file swaps the login, calendar and form providers, so future boards can keep it running without touching the pages.",
      pt: "Um único arquivo de configuração troca os provedores de login, calendário e formulário, então as próximas diretorias mantêm o site sem mexer nas páginas.",
    },
    tech: ["HTML", "CSS", "JavaScript", "Google Calendar embed"],
    // CONFIRM: add the live URL and repo if they're public.
    links: {},
    caseStudy: {
      problem: {
        en: "BRASA's board changes every year, so the website has to survive handoffs. It also speaks to two audiences at once: Brazilian students and the wider Northwestern community.",
        pt: "A diretoria da BRASA muda todo ano, então o site precisa sobreviver às trocas de gestão. Ele também fala com dois públicos ao mesmo tempo: estudantes brasileiros e a comunidade da Northwestern como um todo.",
      },
      solution: {
        en: "A static site with a PT/EN toggle: who we are, the board, an events calendar, where our members work, and a contact form. Plain HTML, CSS and JavaScript with no build step, plus a single config.js that holds everything a future board might need to swap: auth provider, calendar key and form endpoints.",
        pt: "Um site estático com botão PT/EN: quem somos, a diretoria, um calendário de eventos, onde nossos membros trabalham e um formulário de contato. HTML, CSS e JavaScript puros, sem etapa de build, e um único config.js com tudo que uma próxima diretoria pode precisar trocar: provedor de login, chave do calendário e endpoints dos formulários.",
      },
      role: {
        en: "I designed and built the site end to end while serving as BRASA Northwestern's Recruiting Chair.",
        pt: "Desenhei e construí o site do começo ao fim, enquanto era Recruiting Chair da BRASA Northwestern.",
      },
      process: [
        {
          en: "Started from the club's Instagram and identity: Brazilian green, blue and yellow alongside Northwestern purple.",
          pt: "Comecei pelo Instagram e pela identidade do grupo: verde, azul e amarelo do Brasil junto com o roxo da Northwestern.",
        },
        {
          en: "Built a first version with board profiles, a photo gallery and guides.",
          pt: "Construí uma primeira versão com perfis da diretoria, galeria de fotos e guias.",
        },
        {
          en: "Rebuilt it in 2026 around what the club uses most: events, the board, partner logos and contact.",
          pt: "Reconstruí em 2026 em torno do que o grupo mais usa: eventos, diretoria, logos de parceiros e contato.",
        },
        {
          en: "Cut the incoming-students and alumni sections to keep the site focused.",
          pt: "Tirei as seções de admitidos e de ex-alunos para manter o site focado.",
        },
      ],
      outcomes: [
        { en: "Full PT/EN site with no build step to maintain", pt: "Site completo em PT/EN sem etapa de build para manter" },
        { en: "Integrations swappable from a single config file", pt: "Integrações trocáveis a partir de um único arquivo" },
      ],
      lessons: [
        {
          en: "A club website is only as good as the next board's ability to update it, so the simplest stack won.",
          pt: "Um site de associação só é bom se a próxima diretoria conseguir atualizá-lo, então a stack mais simples ganhou.",
        },
        {
          en: "Removing sections helped as much as adding them.",
          pt: "Tirar seções ajudou tanto quanto adicionar.",
        },
      ],
    },
  },
  {
    slug: "job-tracker",
    title: { en: "Job tracker", pt: "Job tracker" },
    year: "2026",
    categories: ["swe"],
    summary: {
      en: "Watches Northwestern's student job board and emails subscribers when a new posting appears.",
      pt: "Monitora o mural de vagas para estudantes da Northwestern e manda e-mail aos inscritos quando aparece uma vaga nova.",
    },
    impact: {
      en: "Students hear about new campus jobs without refreshing the board.",
      pt: "Estudantes ficam sabendo de vagas novas no campus sem precisar atualizar o mural.",
    },
    // CONFIRM: add the language/runtime you used (e.g. Python, Node) and where it runs.
    tech: ["TypeScript", "Web scraping", "Scheduled jobs", "Resend API"],
    // CONFIRM: GitHub link.
    links: {},
    caseStudy: {
      problem: {
        en: "Northwestern's student job board only shows what's open at the moment you look. Students who check at the wrong time miss postings.",
        pt: "O mural de vagas para estudantes da Northwestern só mostra o que está aberto no momento em que você olha. Quem confere na hora errada perde vagas.",
      },
      solution: {
        en: "A small service that scrapes the board on a schedule, compares each run with the previous one to find new postings, and emails subscribed students through the Resend API.",
        pt: "Um serviço pequeno que lê o mural em horários programados, compara cada rodada com a anterior para achar vagas novas e manda e-mail para os estudantes inscritos pela API do Resend.",
      },
      role: {
        en: "Built it solo: the scraper, the comparison logic, the schedule and the email delivery.",
        pt: "Construí sozinha: o scraper, a lógica de comparação, o agendamento e o envio de e-mails.",
      },
      process: [
        { en: "Scrape the job board on a schedule.", pt: "Ler o mural de vagas em horários programados." },
        {
          en: "Compare each run with the last one to keep only new postings.",
          pt: "Comparar cada rodada com a anterior para ficar só com as vagas novas.",
        },
        { en: "Email subscribers through Resend.", pt: "Enviar e-mail para os inscritos pelo Resend." },
      ],
      // CONFIRM: add real numbers if you have them (subscribers, emails sent, postings caught).
      outcomes: [
        { en: "Runs on its own, on a schedule", pt: "Roda sozinho, em horários programados" },
        { en: "New postings reach subscribers by email", pt: "Vagas novas chegam aos inscritos por e-mail" },
      ],
      lessons: [
        {
          en: "The comparison is the real product: getting 'what changed' right matters more than the scraping.",
          pt: "A comparação é o produto de verdade: acertar 'o que mudou' importa mais do que o scraping.",
        },
      ],
    },
  },
  {
    slug: "cgi-forge",
    title: { en: "FORGE at CGI", pt: "FORGE na CGI" },
    year: "2026",
    categories: ["ai", "product", "research"],
    summary: {
      en: "Research and a prototype on how a 90,000-person company can use AI without people outsourcing their thinking.",
      pt: "Pesquisa e protótipo sobre como uma empresa de 90 mil pessoas pode usar IA sem que as pessoas terceirizem o próprio raciocínio.",
    },
    impact: {
      en: "Compared 293 self-reports with 30 days of usage logs from 3,436 ChatGPT Enterprise seats.",
      pt: "Comparei 293 respostas de autoavaliação com 30 dias de registros de uso de 3.436 licenças do ChatGPT Enterprise.",
    },
    tech: ["Survey design", "Usage-log analysis", "Literature review", "Prototyping"],
    links: {},
    caseStudy: {
      problem: {
        en: "CGI wanted to understand how its ~90,000 employees use generative AI, and how to build AI tools that make people better at their work, not only faster.",
        pt: "A CGI queria entender como seus ~90 mil funcionários usam IA generativa, e como construir ferramentas de IA que deixem as pessoas melhores no trabalho, e não só mais rápidas.",
      },
      solution: {
        en: "Two pieces: an evidence base comparing what employees say about AI with what they actually do, and FORGE, a prototype that turns AI into a tool for thinking. Its concepts include Think First (you outline your approach before AI generates), Challenge Mode (AI lays out alternatives and trade-offs for you to decide) and Active Review (flagging assumptions and uncertain claims).",
        pt: "Duas partes: uma base de evidências comparando o que os funcionários dizem sobre IA com o que eles realmente fazem, e o FORGE, um protótipo que transforma a IA numa ferramenta para pensar. Os conceitos incluem Think First (você descreve sua abordagem antes de a IA gerar), Challenge Mode (a IA apresenta alternativas e trade-offs para você decidir) e Active Review (apontando suposições e afirmações incertas).",
      },
      role: {
        en: "AI Deployment Intern. I did the literature review, analyzed the survey and usage data, proposed the company-wide survey and its stakeholder framework, and co-designed FORGE in a team of five.",
        pt: "AI Deployment Intern. Fiz a revisão de literatura, analisei os dados da pesquisa e de uso, propus a pesquisa para a empresa toda com seu mapa de stakeholders, e co-desenhei o FORGE num time de cinco pessoas.",
      },
      process: [
        {
          en: "Reviewed the literature on AI at work and cognitive overreliance.",
          pt: "Revisei a literatura sobre IA no trabalho e dependência cognitiva excessiva.",
        },
        {
          en: "Analyzed a 293-response survey alongside a 30-day ChatGPT Enterprise usage export (3,436 seats).",
          pt: "Analisei uma pesquisa com 293 respostas junto com uma exportação de 30 dias de uso do ChatGPT Enterprise (3.436 licenças).",
        },
        {
          en: "Mapped stakeholders: technical and creative roles, and different generations, need different AI guidance.",
          pt: "Mapeei os stakeholders: funções técnicas e criativas, e gerações diferentes, precisam de orientações diferentes sobre IA.",
        },
        {
          en: "Proposed survey questions for ~90k employees, designed to be built once since re-contacting people is costly.",
          pt: "Propus perguntas de pesquisa para ~90 mil funcionários, pensadas para serem feitas uma vez só, já que recontatar as pessoas custa caro.",
        },
        {
          en: "Designed FORGE's features and pitched them in a video and a slide deck.",
          pt: "Desenhei as funcionalidades do FORGE e apresentei em vídeo e numa apresentação de slides.",
        },
      ],
      // CONFIRM: these are internal CGI numbers. Check with your manager that
      // they can be public before you deploy, or remove the first line.
      outcomes: [
        {
          en: "86% said AI helps them understand topics better, but only 49% said they could solve a similar problem without it (n=293).",
          pt: "86% disseram que a IA os ajuda a entender melhor os assuntos, mas só 49% disseram que conseguiriam resolver um problema parecido sem ela (n=293).",
        },
        { en: "Research covered ~3,000 employees", pt: "A pesquisa cobriu ~3.000 funcionários" },
        {
          en: "A survey proposal and stakeholder framework for a ~90k-person company",
          pt: "Uma proposta de pesquisa e um mapa de stakeholders para uma empresa de ~90 mil pessoas",
        },
      ],
      lessons: [
        {
          en: "Self-report and behavior tell different stories, so measure both before designing anything.",
          pt: "Autoavaliação e comportamento contam histórias diferentes, então vale medir os dois antes de desenhar qualquer coisa.",
        },
        {
          en: "With a two-month window of access to people, the instrument has to be right the first time.",
          pt: "Com uma janela de dois meses de acesso às pessoas, o instrumento precisa estar certo de primeira.",
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
