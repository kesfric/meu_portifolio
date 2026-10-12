"use client";

// Your story on the left, highlights as handwritten notes in the margin —
// like annotations on a notebook page.

import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { bio, marginNotes, story } from "@/content/experience";
import { ui } from "@/content/ui";

const tilts = [-2, 1.5, -1, 2, -1.5];

export function About() {
  const { t } = useLocale();
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="about-title" text={ui.about.title} />
      <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,1fr)_17rem] md:gap-16">
        <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed">
          {/* Ester's own statement, in the calligraphy font. */}
          <p className="hand mb-8 border-l-2 border-leaf pl-5 text-[1.55rem] leading-[1.45] md:text-[1.8rem]">{t(bio)}</p>
          {story.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
        </div>
        <aside aria-label={t({ en: "Highlights", pt: "Destaques" })} className="md:border-l-2 md:border-dashed md:border-ink/40 md:pl-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-4 md:flex-col md:gap-5">
            {marginNotes.map((n, i) => (
              <li key={i} className="hand text-[1.7rem] leading-tight" style={{ rotate: `${tilts[i % tilts.length]}deg` }}>
                {t(n)}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
