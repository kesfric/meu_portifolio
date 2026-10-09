"use client";

// The standalone /projects/<slug> page: same case study, inside a hand-drawn
// panel, with links back home and to the next project.

import Link from "next/link";
import { useLocale } from "./providers";
import { StickyBar } from "./site-header";
import { CaseStudy } from "./case-study";
import { SiteFooter } from "./site-footer";
import { SkipLink } from "./skip-link";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";

export function ProjectPage({ slug }: { slug: string }) {
  const { t } = useLocale();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <SkipLink href="#main" />
      <StickyBar base="/" />
      <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-2 pb-10 pt-24 outline-none md:px-8 md:pt-28">
        <div className="border-2 border-ink bg-paper" style={{ borderRadius: 28 }}>
          <div className="px-6 pt-6 md:px-14 md:pt-8">
            <Link href="/#projects" className="ink-link text-sm">
              {t(ui.caseStudy.back)}
            </Link>
          </div>
          <CaseStudy project={project} as="h1" />
        </div>

        {next.slug !== project.slug && (
          <nav aria-label={t(ui.caseStudy.next)} className="mt-10 flex justify-end px-4">
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="block text-sm text-graphite">{t(ui.caseStudy.next)}</span>
              <span className="mt-1 block text-2xl font-semibold tracking-tight">
                <span className="marker marker-sweep">{t(next.title)}</span>
              </span>
            </Link>
          </nav>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
