"use client";

// Timeline of roles. The ink line fills in as you scroll through it
// (scroll-linked, so it moves only when the visitor moves).

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { experience, type Experience as Entry } from "@/content/experience";
import { ui } from "@/content/ui";

function Badge({ entry }: { entry: Entry }) {
  return (
    <span
      className="relative z-10 grid h-10 w-10 place-items-center overflow-hidden border-2 border-ink bg-paper text-[0.62rem] font-bold leading-none tracking-tight"
      style={{ borderRadius: "46% 54% 42% 58% / 52% 44% 56% 48%" }}
      aria-hidden="true"
    >
      {entry.logo ? <Image src={entry.logo} alt="" width={40} height={40} className="h-full w-full object-contain p-1" /> : entry.initials}
    </span>
  );
}

export function Experience() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });

  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="experience-title" text={ui.experience.title} />

      <div ref={listRef} className="relative mt-12">
        {/* faint track + ink line that fills with scroll */}
        <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-[2px] bg-dots md:left-[calc(8.5rem+1.5rem+19px)]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
          className="absolute bottom-2 left-[19px] top-2 w-[2px] origin-top bg-ink md:left-[calc(8.5rem+1.5rem+19px)]"
        />

        <ol className="space-y-12">
          {experience.map((e) => (
            <li key={e.id} className="relative grid grid-cols-[40px_1fr] gap-x-5 md:grid-cols-[8.5rem_40px_1fr] md:gap-x-6">
              {t(e.dates) ? (
                <p className="col-start-2 row-start-1 text-sm text-graphite md:col-start-1 md:pt-2.5 md:text-right">{t(e.dates)}</p>
              ) : null}
              <div className="col-start-1 row-span-2 row-start-1 md:col-start-2 md:row-span-1">
                <Badge entry={e} />
              </div>
              <div className="col-start-2 md:col-start-3 md:row-start-1">
                <h3 className="text-xl font-semibold leading-tight tracking-tight md:pt-1.5">{e.org}</h3>
                <p className="mt-1 text-graphite">{t(e.role)}</p>

                {e.bullets.length > 0 && (
                  <ul className="mt-3 max-w-[64ch] space-y-2 text-[1.02rem] leading-relaxed">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="grid grid-cols-[1rem_1fr] gap-1.5">
                        <span aria-hidden="true" className="text-graphite">
                          –
                        </span>
                        <span>{t(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {e.metrics && e.metrics.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {e.metrics.map((m) => (
                      <li key={m.value} className="text-[0.98rem]">
                        <span className="marker font-semibold">{m.value}</span> <span className="text-graphite">{t(m.label)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
