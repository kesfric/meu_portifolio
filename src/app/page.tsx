import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Research, Fellowships, Coursework, Publications } from "@/components/academics";
import { Contact, Resume } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { StickyBar } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { site } from "@/content/site";

// Structured data so search engines know this page is about a person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: [site.links.github, site.links.linkedin],
  affiliation: { "@type": "CollegeOrUniversity", name: "Northwestern University" },
  knowsAbout: ["Product engineering", "Applied AI", "Human–AI interaction", "Learning sciences", "Software engineering"],
};

export default function Home() {
  return (
    <>
      <SkipLink />
      <StickyBar watchId="header-row" />
      <main>
        <Hero />
        <About />
        <Experience />
        <Research />
        <Fellowships />
        <Coursework />
        <Publications />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  );
}
