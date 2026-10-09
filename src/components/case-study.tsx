"use client";

// The "mini launch page" for one project. Used in two places:
// the overlay that opens from a card, and the standalone /projects/<slug> page.

import { useLocale } from "./providers";
import type { Project } from "@/content/projects";
import { ui } from "@/content/ui";

type Props = {
  project: Project;
  /** h1 on its own page, h2 inside the overlay. */
  as?: "h1" | "h2";
  titleId?: string;
};

export function CaseStudy({ project, as = "h2", titleId }: Props) {
  const { t } = useLocale();
  const Title = as;
  const Sub = as === "h1" ? "h2" : "h3";
  const cs = project.caseStudy;

  return (
    <article>
      {/* Launch header */}
      <header className="px-6 pb-10 pt-4 md:px-14 md:pb-14 md:pt-6">
        <p className="text-sm text-graphite">
          {typeof project.year === "string" ? project.year : t(project.year)}, {project.categories.map((c) => t(ui.categories[c])).join(", ")}
        </p>
        <Title id={titleId} className="mt-3 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {t(project.title)}
        </Title>
        <p className="mt-5 max-w-[56ch] text-xl leading-snug md:text-2xl">{t(project.summary)}</p>
        <p className="mt-5 max-w-[60ch] text-[1.05rem]">
          <span className="marker">{t(project.impact)}</span>
        </p>
        {(project.links.demo || project.links.github) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener" className="btn btn-primary">
                {t(ui.caseStudy.demo)}
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener" className="btn btn-ghost">
                {t(ui.caseStudy.code)}
              </a>
            )}
          </div>
        )}
      </header>

      <div className="grid gap-10 border-t-2 border-ink px-6 py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-14 md:px-14 md:py-14">
        {/* Side facts */}
        <aside className="space-y-8 md:sticky md:top-6 md:self-start">
          <div>
            <Sub className="font-semibold">{t(ui.caseStudy.role)}</Sub>
            <p className="mt-2 text-[0.98rem] text-graphite">{t(cs.role)}</p>
          </div>
          <div>
            <Sub className="font-semibold">{t(ui.caseStudy.tech)}</Sub>
            <ul className="mt-2 space-y-1 text-[0.98rem] text-graphite">
              {project.tech.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Story */}
        <div className="max-w-[64ch] space-y-12">
          <section>
            <Sub className="hand text-[2rem] leading-none md:text-[2.4rem]">{t(ui.caseStudy.problem)}</Sub>
            <p className="mt-4 text-lg leading-relaxed">{t(cs.problem)}</p>
          </section>

          <section>
            <Sub className="hand text-[2rem] leading-none md:text-[2.4rem]">{t(ui.caseStudy.solution)}</Sub>
            <p className="mt-4 text-lg leading-relaxed">{t(cs.solution)}</p>
          </section>

          <section>
            <Sub className="hand text-[2rem] leading-none md:text-[2.4rem]">{t(ui.caseStudy.process)}</Sub>
            {/* A real sequence, so it's numbered. */}
            <ol className="mt-5 space-y-4">
              {cs.process.map((step, i) => (
                <li key={i} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-2">
                  <span aria-hidden="true" className="hand text-2xl text-leaf">
                    {i + 1}
                  </span>
                  <span className="text-[1.05rem] leading-relaxed">{t(step)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <Sub className="hand text-[2rem] leading-none md:text-[2.4rem]">{t(ui.caseStudy.outcomes)}</Sub>
            <ul className="mt-5 space-y-3">
              {cs.outcomes.map((o, i) => (
                <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2 text-[1.05rem] leading-relaxed">
                  {/* hand-drawn tick */}
                  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 text-leaf" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 13.5c2 1.6 3.6 3.3 5 5.2 3-6 6.6-10.4 11-13.6" />
                  </svg>
                  <span>{t(o)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Sub className="hand text-[2rem] leading-none md:text-[2.4rem]">{t(ui.caseStudy.lessons)}</Sub>
            <div className="mt-4 space-y-4">
              {cs.lessons.map((l, i) => (
                <p key={i} className="border-l-2 border-ink pl-4 text-lg leading-relaxed">
                  {t(l)}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
