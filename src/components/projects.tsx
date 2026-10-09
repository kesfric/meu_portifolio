"use client";

// Projects, inside the sketch frame.
// - Filter buttons narrow the list (the cards slide into place with `layout`).
// - Each card has its own hand-drawn shape from the sketch.
// - Clicking a card grows that same shape into a full case study
//   (shared `layoutId`), like opening a small launch page.

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { CaseStudy } from "./case-study";
import { projects as allProjects, type Category, type Project } from "@/content/projects";
import { projects as projectsGlyph } from "@/content/handwriting";
import { ui } from "@/content/ui";
import { cardShapes, cx } from "@/lib/blobs";

type Filter = "all" | Category;
const filters: Filter[] = ["all", "ai", "swe", "product", "research"];

function ProjectCard({
  project,
  shapeIndex,
  enterDelay,
  onOpen,
}: {
  project: Project;
  shapeIndex: number;
  enterDelay: number;
  onOpen: (slug: string, el: HTMLButtonElement) => void;
}) {
  const { t } = useLocale();
  const shape = cardShapes[shapeIndex % cardShapes.length];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 240, damping: 22, delay: enterDelay }}
      className="w-full md:basis-[calc(50%-14px)] lg:min-w-0 lg:basis-0"
      style={{ flexGrow: shape.grow }}
    >
      <motion.button
        type="button"
        layoutId={`card-${project.slug}`}
        aria-haspopup="dialog"
        onClick={(e) => onOpen(project.slug, e.currentTarget)}
        initial={{ rotate: shape.tilt }}
        whileHover={{ borderRadius: shape.hover, rotate: 0 }}
        whileFocus={{ rotate: 0 }}
        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        style={{ borderRadius: shape.rest, ["--h" as string]: `${shape.height}px` }}
        className="group flex min-h-[220px] w-full flex-col justify-between border-2 border-ink bg-paper px-6 pb-7 pt-8 text-left md:min-h-[var(--h)] lg:px-5"
      >
        <span className="block">
          <span className="block text-sm text-graphite">{typeof project.year === "string" ? project.year : t(project.year)}</span>
          <span className="mt-2 block text-[1.45rem] font-semibold leading-tight tracking-tight lg:text-[1.2rem]">
            <span className="marker marker-sweep">{t(project.title)}</span>
          </span>
          <span className="mt-3 block text-[0.98rem] leading-snug text-graphite lg:text-[0.9rem]">{t(project.summary)}</span>
        </span>
        <span className="mt-6 block">
          <span className="block text-sm text-graphite">{project.categories.map((c) => t(ui.categories[c])).join(", ")}</span>
          <span className="mt-3 inline-block text-sm font-semibold underline decoration-[1.5px] underline-offset-4 group-hover:text-leaf">
            {t(ui.projects.open)}
          </span>
        </span>
      </motion.button>
    </motion.li>
  );
}

function CaseStudyOverlay({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { t } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // While open: lock page scroll, focus the close button, close on Escape,
  // and keep Tab inside the dialog.
  useEffect(() => {
    if (!project) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-scrim backdrop-blur-[3px]"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex min-h-full items-start justify-center px-2 py-3 md:p-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <motion.div
              ref={panelRef}
              layoutId={`card-${project.slug}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              style={{ borderRadius: 28 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="relative w-full max-w-5xl overflow-hidden border-2 border-ink bg-paper"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.25 } }} exit={{ opacity: 0, transition: { duration: 0.08 } }}>
                <div className="flex items-center justify-end gap-2 px-4 pt-4 md:px-8 md:pt-6">
                  <Link href={`/projects/${project.slug}`} className="ink-link mr-2 text-sm">
                    {t(ui.projects.openPage)}
                  </Link>
                  <button ref={closeRef} type="button" onClick={onClose} className="btn btn-ghost min-h-10 px-4 py-1 text-sm">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M3 3.5 13 12.6M12.8 3.2 3.3 12.9" />
                    </svg>
                    {t(ui.nav.close)}
                  </button>
                </div>
                <CaseStudy project={project} as="h2" titleId="case-study-title" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const visible = allProjects.filter((p) => filter === "all" || p.categories.includes(filter));
  const open = allProjects.find((p) => p.slug === openSlug) ?? null;

  const handleOpen = useCallback((slug: string, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setOpenSlug(slug);
  }, []);

  const handleClose = useCallback(() => {
    setOpenSlug(null);
    // Return focus to the card that opened the dialog.
    window.setTimeout(() => lastTrigger.current?.focus({ preventScroll: true }), 0);
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="mt-14 md:mt-20">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <SectionTitle id="projects-title" text={ui.projects.title} glyphs={{ en: projectsGlyph }} glyphClassName="h-10 md:h-12" />
        <div role="group" aria-label={t(ui.projects.filterLabel)} className="-mx-1 flex flex-wrap gap-x-1 gap-y-1">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                data-active={active}
                onClick={() => {
                  setFilter(f);
                  setHasFiltered(true);
                }}
                className={cx("group min-h-11 rounded-md px-2.5 text-[0.95rem]", active ? "font-semibold" : "text-graphite hover:text-ink")}
              >
                <span className="marker marker-sweep">{f === "all" ? t(ui.projects.all) : t(ui.categories[f])}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {t(ui.projects.count)}
      </p>

      <motion.ul layout className="mt-8 flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:gap-7 lg:flex-nowrap lg:gap-5">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              shapeIndex={allProjects.indexOf(p)}
              enterDelay={hasFiltered ? 0 : 0.7 + i * 0.09}
              onOpen={handleOpen}
            />
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && <p className="mt-8 text-graphite">{t(ui.projects.empty)}</p>}

      <CaseStudyOverlay project={open} onClose={handleClose} />
    </section>
  );
}
