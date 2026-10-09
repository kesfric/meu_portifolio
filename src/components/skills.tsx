"use client";

// Skills as a cluster of blobs instead of progress bars.
// Blob size = how much evidence backs that area (skills + places used).
// Picking a blob shows its skills and links to where you used them.
// It's an accessible tab list: arrow keys move between areas.

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { skillClusters } from "@/content/skills";
import { ui } from "@/content/ui";
import { cx, sketchyRadius } from "@/lib/blobs";

const radii = [
  "44% 56% 38% 62% / 52% 40% 60% 48%",
  "58% 42% 54% 46% / 40% 56% 44% 60%",
  "38% 62% 50% 50% / 56% 46% 54% 44%",
  "52% 48% 62% 38% / 46% 58% 42% 54%",
  "60% 40% 46% 54% / 50% 42% 58% 50%",
  "46% 54% 58% 42% / 58% 50% 46% 42%",
];
const tilts = [-4, 3, -2, 5, -3, 2];

export function Skills() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cluster = skillClusters[active];

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = skillClusters.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="skills-title" text={ui.skills.title} />
      <p className="mt-4 max-w-[52ch] text-graphite">{t(ui.skills.pick)}</p>

      <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
        <div role="tablist" aria-label={t(ui.skills.title)} className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {skillClusters.map((c, i) => {
            const size = 104 + (c.skills.length + c.usedIn.length) * 7;
            const selected = i === active;
            return (
              <motion.button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`skill-tab-${c.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="skill-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                whileHover={{ scale: 1.04, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                animate={{ rotate: selected ? 0 : tilts[i] }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ borderRadius: radii[i % radii.length], ["--s" as string]: `${size}px` }}
                className={cx(
                  "grid h-[calc(var(--s)*0.78)] w-[calc(var(--s)*0.78)] place-items-center border-2 p-3 text-center text-sm font-semibold leading-tight transition-colors md:h-[var(--s)] md:w-[var(--s)] md:text-[0.95rem]",
                  selected ? "border-on-marker bg-marker-solid text-on-marker" : "border-ink bg-paper hover:bg-marker",
                )}
              >
                {t(c.name)}
              </motion.button>
            );
          })}
        </div>

        <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${cluster.id}`} className="min-h-[16rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-semibold tracking-tight">{t(cluster.name)}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cluster.skills.map((s) => (
                  <li key={s} className="border-[1.5px] border-ink px-3 py-1 text-[0.95rem]" style={{ borderRadius: sketchyRadius }}>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm font-semibold">{t(ui.skills.usedIn)}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {cluster.usedIn.map((u) => (
                  <li key={u.label}>
                    {u.href.startsWith("/") ? (
                      <Link href={u.href} className="ink-link">
                        {u.label}
                      </Link>
                    ) : (
                      <a href={u.href} className="ink-link">
                        {u.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
