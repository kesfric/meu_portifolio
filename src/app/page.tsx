import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Coursework, Publications } from "@/components/academics";
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
        <Coursework />
        <Publications />
        <Skills />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  );
}
