"use client";

// Ester's own words about where she's from and what she's interested in.

import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { bio } from "@/content/experience";
import { ui } from "@/content/ui";

export function About() {
  const { t } = useLocale();
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="about-title" text={ui.about.title} />
      <p className="mt-10 max-w-[62ch] text-lg leading-relaxed">{t(bio)}</p>
    </section>
  );
}
