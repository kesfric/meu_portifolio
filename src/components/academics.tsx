"use client";

// Two sections: publications (right after Skills) and relevant coursework (after publications).
// All the text lives in src/content/academics.ts.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { courseworkCS, courseworkLS, courseworkMath, publications, type Course } from "@/content/academics";
import type { L } from "@/content/site";
import { ui } from "@/content/ui";
import { cardShapes, cx, sketchyRadius } from "@/lib/blobs";

const wrap = "mx-auto max-w-7xl px-6 py-16 md:px-14 md:py-20";

/** Green marker label used to highlight graduate-level classes. */
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="marker inline-block px-1.5 text-[0.78rem] font-semibold uppercase tracking-wide">{children}</span>;
}

const groups: { id: string; title: L; courses: Course[] }[] = [
  { id: "cs", title: ui.coursework.cs, courses: courseworkCS },
  { id: "math", title: ui.coursework.math, courses: courseworkMath },
  { id: "ls", title: ui.coursework.ls, courses: courseworkLS },
];

// Compact and interactive: pick a field (tabs), then hover, focus or tap a
// course chip to see its details in the card beside it (below it on phones).
export function Coursework() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const [groupIndex, setGroupIndex] = useState(0);
  const group = groups[groupIndex];
  const [selected, setSelected] = useState(0);
  const course = group.courses[Math.min(selected, group.courses.length - 1)];

  function pickGroup(i: number) {
    setGroupIndex(i);
    setSelected(0);
  }

  return (
    <section id="coursework" aria-labelledby="coursework-title" className={wrap}>
      <SectionTitle id="coursework-title" text={ui.coursework.title} />

      <div role="tablist" aria-label={t(ui.coursework.title)} className="mt-8 flex flex-wrap gap-2">
        {groups.map((g, i) => {
          const active = i === groupIndex;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`cw-tab-${g.id}`}
              aria-selected={active}
              aria-controls="cw-panel"
              onClick={() => pickGroup(i)}
              style={{ borderRadius: sketchyRadius }}
              className={cx("relative border-2 border-ink px-4 py-2 text-[0.95rem] font-semibold", !active && "hover:bg-ink/5")}
            >
              {active && (
                <motion.span
                  layoutId="cw-tab-bg"
                  aria-hidden="true"
                  style={{ borderRadius: sketchyRadius }}
                  className="absolute inset-0 bg-marker-solid"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={cx("relative", active && "text-on-marker")}>
                {t(g.title)} <span className="font-normal opacity-70">({g.courses.length})</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="cw-panel" role="tabpanel" aria-labelledby={`cw-tab-${group.id}`} className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-start">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={group.id}
            className="flex flex-wrap content-start gap-2.5"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.04 } }, hidden: {} }}
          >
            {group.courses.map((c, i) => {
              const active = c === course;
              return (
                <motion.li
                  key={c.title}
                  variants={{ hidden: { opacity: 0, y: reduce ? 0 : 8 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setSelected(i)}
                    onFocus={() => setSelected(i)}
                    onClick={() => setSelected(i)}
                    style={{ borderRadius: sketchyRadius }}
                    className={cx(
                      "border-2 px-3.5 py-1.5 text-left text-[0.95rem] leading-snug transition-colors",
                      active ? "border-ink bg-marker font-semibold" : "border-ink/40 hover:border-ink",
                    )}
                  >
                    {c.level && (
                      <span aria-hidden="true" className="mr-1.5">
                        ★
                      </span>
                    )}
                    {c.title}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>

        <div aria-live="polite" className="md:sticky md:top-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={course.title}
              initial={{ opacity: 0, x: reduce ? 0 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22 }}
              style={{ borderRadius: cardShapes[0].rest }}
              className="border-2 border-ink bg-paper px-5 py-5"
            >
              {course.level && <Tag>{`${t(ui.coursework.graduate)} · ${t(course.level)}`}</Tag>}
              <h3 className={cx("text-[1.15rem] font-semibold leading-tight tracking-tight", course.level && "mt-2.5")}>{course.title}</h3>
              {(course.code || course.term) && (
                <p className="mt-1.5 text-sm text-graphite">{[course.code, course.term ? t(course.term) : null].filter(Boolean).join(" · ")}</p>
              )}
              {course.note && <p className="mt-2.5 text-[0.95rem] leading-snug">{t(course.note)}</p>}
            </motion.div>
          </AnimatePresence>
          <p className="mt-2 text-xs text-graphite">{t(ui.coursework.hint)}</p>
        </div>
      </div>
    </section>
  );
}

export function Publications() {
  // Hidden until there is at least one entry, so no empty heading shows up.
  if (publications.length === 0) return null;
  return (
    <section id="publications" aria-labelledby="publications-title" className={wrap}>
      <SectionTitle id="publications-title" text={ui.publications.title} />
      <ul className="mt-8 space-y-5">
        {publications.map((p) => (
          <li key={p.title} className="max-w-[70ch] leading-relaxed">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener" className="ink-link font-semibold">
                {p.title}
              </a>
            ) : (
              <span className="font-semibold">{p.title}</span>
            )}
            <p className="text-graphite">
              {p.authors ? `${p.authors}. ` : ""}
              {p.venue}, {p.year}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
