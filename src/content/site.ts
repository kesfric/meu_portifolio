// Site-wide settings. Most "fill this in" items live here.

export type Locale = "en" | "pt";
/** A piece of text in both languages. */
export type L = Record<Locale, string>;

export const site = {
  name: "Ester Borges Frickes Ricardo",
  firstName: "Ester",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Email is stored in pieces and only assembled when someone clicks it,
  // so scrapers that read the page HTML don't find a full address.
  // CONFIRM: that esterborgesfrickes@northwestern.edu is the right address.
  emailParts: { user: "esterborgesfrickes", host: "northwestern", tld: "edu" },

  // CONFIRM: your LinkedIn URL.
  links: {
    github: "https://github.com/kesfric",
    linkedin: "https://www.linkedin.com/in/your-handle",
  },

  // Put your photo at public/ester.jpg and change this to "/ester.jpg".
  // While it's null, the hero shows the smiley from your sketch.
  photo: null as string | null,

  // Put your PDF at public/resume.pdf.
  resume: "/resume.pdf",
  resumeUpdated: { en: "October 2026", pt: "outubro de 2026" } satisfies L,

  description: {
    en: "Computer Science and Learning Sciences student at Northwestern building AI products, software and research about how people think with AI.",
    pt: "Estudante de Ciência da Computação e Learning Sciences na Northwestern construindo produtos com IA, software e pesquisa sobre como as pessoas pensam com IA.",
  } satisfies L,
};
