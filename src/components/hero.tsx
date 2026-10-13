"use client";

// The first screen, laid out like the sketch:
//   ester (logo)                                   nav
//   [photo blob]   hi!, oi!
//                  my name is ..., rotating role, buttons
//   projects
//   [card] [card] [card] [card]
// Everything above sits inside the hand-drawn frame.

import Image from "next/image";
import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useLocale } from "./providers";
import { Handwriting } from "./handwriting";
import { SketchFrame } from "./sketch-frame";
import { HeaderRow } from "./site-header";
import { RotatingWord } from "./rotating-word";
import { Magnetic } from "./magnetic";
import { EmailLink } from "./email-link";
import { Projects } from "./projects";
import { hiOi } from "@/content/handwriting";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { photoShape } from "@/lib/blobs";

function PhotoBlob() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // A few pixels of drift toward the pointer.
  const x = useSpring(0, { stiffness: 120, damping: 20 });
  const y = useSpring(0, { stiffness: 120, damping: 20 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y, borderRadius: photoShape.rest }}
      whileHover={{ borderRadius: photoShape.hover }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      className="relative aspect-[1/0.92] w-40 overflow-hidden border-2 border-ink bg-paper sm:w-48 md:w-full"
    >
      {site.photo ? (
        <Image src={site.photo} alt={t(ui.hero.photoAlt)} fill priority sizes="(min-width: 768px) 280px, 192px" className="object-cover" />
      ) : (
        // The smiley from the sketch: one eye, one smile.
        <svg viewBox="0 0 200 184" role="img" aria-label={t(ui.hero.placeholderAlt)} className="h-full w-full">
          <circle cx="92" cy="72" r="3.2" fill="currentColor" />
          <path d="M88 118c4 14 22 18 34 8 4-3 6-8 6-13" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
    </motion.div>
  );
}

export function Hero() {
  const { t, locale } = useLocale();
  const roles = useMemo(() => ui.hero.roles.map((r) => r[locale]), [locale]);

  return (
    <div className="mx-auto max-w-7xl px-2 pt-2 sm:px-4 md:px-8 md:pt-8">
      <div className="relative px-5 pb-12 pt-5 md:px-12 md:pb-16 md:pt-8">
        <SketchFrame />

        <div id="header-row">
          <HeaderRow />
        </div>

        <section id="intro" tabIndex={-1} aria-labelledby="hero-title" className="mt-8 grid items-center gap-8 outline-none md:mt-12 md:grid-cols-[minmax(200px,270px)_1fr] md:gap-14">
          <PhotoBlob />

          <div>
            <h1 id="hero-title">
              <Handwriting glyph={hiOi} label="hi! oi!" delay={0.5} duration={0.9} className="h-[4.5rem] w-auto sm:h-24 md:h-28" />
              <span className="mt-5 block max-w-[54ch] text-lg font-normal leading-snug md:text-[1.35rem]">{t(ui.hero.intro)}</span>
            </h1>

            <p className="mt-3 max-w-[54ch] text-lg leading-snug md:text-[1.35rem]">
              {t(ui.hero.leadIn)} <RotatingWord words={roles} />
            </p>

            <p className="mt-4">
              <EmailLink className="text-lg md:text-xl" />
            </p>

            <p className="mt-6 flex items-center gap-2.5 text-sm text-graphite">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-marker-solid opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-ink bg-marker-solid" />
              </span>
              {t(ui.hero.status)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#projects" className="btn btn-primary">
                  {t(ui.hero.seeProjects)}
                </a>
              </Magnetic>
              <Magnetic>
                <a href={site.resume} download="Ester-Borges-Frickes-Ricardo-Resume.pdf" className="btn btn-ghost">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 2.5v8M4.6 7.4 8 10.7l3.4-3.3M3 13.4h10" />
                  </svg>
                  {t(ui.hero.openResume)}
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  {t(ui.hero.contactMe)}
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        <Projects />
      </div>
    </div>
  );
}
