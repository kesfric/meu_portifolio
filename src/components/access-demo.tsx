"use client";

// A short looping walkthrough of how Access+ works, drawn in the site's own
// sketch style: browse the catalog, filter by social criteria, answer
// AccessIA's five questions, get matches. It is an illustration, not a screen
// recording. To use a real recording instead, set `video` on the project in
// src/content/projects.ts (see case-study.tsx).
//
// Motion rules: the loop has a pause button and starts paused for visitors who
// asked their system to reduce motion; the scene dots always work.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "./providers";
import type { L } from "@/content/site";

const SCENE_MS = 3600;

const scenes: { label: L; caption: L }[] = [
  { label: { en: "Browse", pt: "Explorar" }, caption: { en: "A free catalog of 290+ scholarships, olympiads and mentorships.", pt: "Um catálogo gratuito com mais de 290 bolsas, olimpíadas e mentorias." } },
  { label: { en: "Filter", pt: "Filtrar" }, caption: { en: "Filter by social criteria to see what fits your situation.", pt: "Filtre por critérios sociais para ver o que combina com a sua situação." } },
  { label: { en: "Ask AccessIA", pt: "Falar com a AccessIA" }, caption: { en: "Five quick questions about you.", pt: "Cinco perguntas rápidas sobre você." } },
  { label: { en: "Get matches", pt: "Ver indicações" }, caption: { en: "Opportunities from the catalog, picked for your profile.", pt: "Oportunidades do catálogo, escolhidas para o seu perfil." } },
];

const questions: L[] = [
  { en: "School level", pt: "Nível de ensino" },
  { en: "Interests", pt: "Interesses" },
  { en: "Goal", pt: "Objetivo" },
  { en: "What you've done", pt: "O que você já fez" },
  { en: "Where you're looking", pt: "Onde você procura" },
];

function Line({ w }: { w: string }) {
  return <span className="block h-2 rounded-full bg-ink/15" style={{ width: w }} />;
}

function Card({ i, picked = false }: { i: number; picked?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 * i, duration: 0.35 }}
      className={`space-y-2 border-2 px-3 py-3 ${picked ? "border-leaf" : "border-ink/40"}`}
      style={{ borderRadius: "8px 22px 8px 18px / 18px 8px 22px 8px" }}
    >
      <Line w="60%" />
      <Line w="90%" />
      <Line w="45%" />
    </motion.div>
  );
}

function Scene({ index }: { index: number }) {
  const { t } = useLocale();

  if (index === 0) {
    return (
      <div>
        <p className="hand text-4xl leading-none">290+</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Card key={i} i={i} />
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ backgroundColor: "rgba(0,0,0,0)" }}
              animate={i === 0 ? { backgroundColor: "rgba(0,255,136,0.45)" } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="inline-block rounded-full border-2 border-ink px-5 py-1.5"
            >
              <span className="block h-2 w-14 rounded-full bg-ink/40" />
            </motion.span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} i={i} picked={i === 0} />
          ))}
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <ul className="space-y-2.5">
        {questions.map((q, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 * i, duration: 0.3 }}
            className="flex items-center gap-3 text-[0.98rem]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-ink text-xs font-semibold">{i + 1}</span>
            <span>{t(q)}</span>
          </motion.li>
        ))}
      </ul>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2].map((i) => (
        <Card key={i} i={i} picked />
      ))}
    </div>
  );
}

export function AccessDemo() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setScene((s) => (s + 1) % scenes.length), SCENE_MS);
    return () => window.clearTimeout(id);
  }, [playing, scene]);

  return (
    <figure aria-label={t({ en: "Illustrated walkthrough of Access+", pt: "Passo a passo ilustrado do Access+" })} className="max-w-[64ch]">
      <div className="border-2 border-ink" style={{ borderRadius: "14px 40px 14px 36px / 36px 14px 40px 14px" }}>
        <div className="flex items-center gap-1.5 border-b-2 border-ink px-4 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-ink" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink" />
          <span className="hand ml-3 text-lg leading-none">Access+</span>
        </div>
        <div className="min-h-[15rem] px-5 py-6" aria-live="off">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={scene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Scene index={scene} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <figcaption className="mt-4">
        <p className="min-h-[3rem] text-[1.02rem] leading-relaxed">{t(scenes[scene].caption)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setPlaying((p) => !p)} className="btn btn-ghost min-h-11 px-4 py-1 text-sm">
            {t(playing ? { en: "Pause", pt: "Pausar" } : { en: "Play", pt: "Tocar" })}
          </button>
          {scenes.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setScene(i)}
              aria-current={i === scene}
              className={`min-h-11 rounded-md px-3 text-sm ${i === scene ? "marker font-semibold" : "text-graphite"}`}
            >
              {t(s.label)}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-graphite">{t({ en: "Illustration of the flow, not a screen recording.", pt: "Ilustração do fluxo, não uma gravação de tela." })}</p>
      </figcaption>
    </figure>
  );
}
