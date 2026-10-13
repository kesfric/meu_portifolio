"use client";

// Ester's own words about where she's from and what she's interested in,
// plus two highlighted phrases that open a small animated panel:
// olympiad medals and high-school research.
//
// Layout: on wide screens the panel opens in a column to the RIGHT of the
// text; on phones it opens below the text.
//
// Panel behavior (so it is readable, not twitchy):
// - Mouse: opens after a short pause, stays open while the pointer is on the
//   phrase or the panel, and closes only after a short grace period.
// - Click/tap: pins it open; click again, click outside or press Escape to close.
// - Keyboard: focusing the phrase opens it. Nothing closes on a timer.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { bio } from "@/content/experience";
import { olympiadGroups, research, type MedalTier } from "@/content/academics";
import { ui } from "@/content/ui";
import { cx } from "@/lib/blobs";

type Key = "olympiads" | "research";

const OPEN_DELAY_MS = 150;
// A bit longer than before: the pointer now travels sideways to reach the panel.
const CLOSE_DELAY_MS = 700;

const medalStyle: Record<MedalTier, string> = {
  silver: "bg-[#c9ced6] border-ink",
  bronze: "bg-[#d39a62] border-ink",
  honor: "bg-paper border-ink border-dashed",
};

function MedalDot({ tier }: { tier: MedalTier }) {
  return <span aria-hidden="true" className={cx("mt-[0.3rem] inline-block h-3.5 w-3.5 shrink-0 rounded-full border-2", medalStyle[tier])} />;
}

function OlympiadsPanel() {
  const { t } = useLocale();
  return (
    <div className="mt-4 space-y-5">
      {olympiadGroups.map((g) => (
        <div key={g.id}>
          <h4 className="flex items-baseline gap-2 border-b border-ink/20 pb-1 text-sm font-semibold uppercase tracking-wide text-graphite">
            {t(g.subject)}
            <span className="text-xs font-normal normal-case tracking-normal">({g.items.length})</span>
          </h4>
          <ul className="mt-2 space-y-2.5">
            {g.items.map((m, i) => (
              <li key={i} className="flex gap-3">
                <MedalDot tier={m.tier} />
                <div className="min-w-0 text-[0.95rem] leading-snug">
                  <p>
                    <span className="font-semibold">{t(m.award)}</span>
                    <span className="text-graphite"> · {m.year}</span>
                  </p>
                  <p>{t(m.name)}</p>
                  {m.detail && <p className="text-sm text-graphite">{t(m.detail)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ResearchPanel() {
  const { t } = useLocale();
  return (
    <ul className="mt-4 space-y-4">
      {research.map((r) => (
        <li key={r.id} className="border-l-4 border-marker-solid pl-4">
          <p className="font-semibold leading-snug">{t(r.title)}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
            {[r.org, r.program, r.years].filter(Boolean).map((chip) => (
              <li key={chip} className="rounded-full border border-ink/40 px-2 py-0.5 text-graphite">
                {chip}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[0.95rem] leading-snug">{t(r.summary)}</p>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  const { t } = useLocale();
  const [open, setOpen] = useState<Key | null>(null);
  // Which panel was opened by a click/tap (stays open until closed on purpose).
  const [pinned, setPinned] = useState<Key | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const clearTimer = useCallback(() => window.clearTimeout(timer.current), []);
  const closeNow = useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(null);
    setPinned(null);
  }, []);

  function hoverOpen(key: Key) {
    clearTimer();
    if (open === key) return;
    timer.current = window.setTimeout(() => {
      setOpen(key);
      setPinned(null);
    }, open ? 0 : OPEN_DELAY_MS);
  }

  function hoverLeave() {
    clearTimer();
    if (pinned) return;
    timer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY_MS);
  }

  function onClick(key: Key) {
    clearTimer();
    if (pinned === key) closeNow();
    else {
      setOpen(key);
      setPinned(key);
    }
  }

  // Escape closes; a press outside closes. Nothing closes on its own timer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNow();
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeNow();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, closeNow]);

  useEffect(() => clearTimer, [clearTimer]);

  function trigger(key: Key, label: string) {
    return (
      <button
        type="button"
        aria-expanded={open === key}
        aria-controls={`about-pop-${key}`}
        onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen(key)}
        onPointerLeave={(e) => e.pointerType === "mouse" && hoverLeave()}
        onFocus={() => {
          clearTimer();
          setOpen(key);
        }}
        onBlur={(e) => {
          if (!pinned && !wrapRef.current?.contains(e.relatedTarget as Node | null)) closeNow();
        }}
        onClick={() => onClick(key)}
        className={cx("marker cursor-pointer text-left font-semibold", open === key && "underline decoration-2 underline-offset-4")}
      >
        {label}
      </button>
    );
  }

  const title = open ? t(open === "olympiads" ? ui.about.olympiadsTitle : ui.about.researchTitle) : "";

  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="about-title" text={ui.about.title} />

      <div ref={wrapRef} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-lg leading-relaxed">{t(bio)}</p>
          <p className="mt-6 text-lg leading-relaxed">
            {t(ui.about.before)}
            {trigger("olympiads", t(ui.about.olympiads))}
            {t(ui.about.between)}
            {trigger("research", t(ui.about.research))}.
          </p>
          <p className="mt-2 text-sm text-graphite">{t(ui.about.hint)}</p>
        </div>

        {/* Right column on desktop, below the text on phones. */}
        <div className="relative lg:min-h-[12rem]">
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <motion.div
                key={open}
                id={`about-pop-${open}`}
                role="region"
                aria-label={title}
                initial={{ opacity: 0, x: 24, scale: 0.97, rotate: 0.6 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                onPointerEnter={(e) => e.pointerType === "mouse" && clearTimer()}
                onPointerLeave={(e) => e.pointerType === "mouse" && hoverLeave()}
                style={{ borderRadius: "14px 40px 14px 36px / 36px 14px 40px 14px" }}
                className="max-h-[75vh] overflow-y-auto border-2 border-ink bg-paper px-6 py-5 lg:sticky lg:top-24"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="hand text-[1.7rem] leading-none">{title}</h3>
                  {pinned && (
                    <button
                      type="button"
                      onClick={closeNow}
                      aria-label={t(ui.about.close)}
                      className="-mr-2 -mt-1 h-8 w-8 rounded-full text-xl leading-none text-graphite hover:text-ink"
                    >
                      ×
                    </button>
                  )}
                </div>
                {open === "olympiads" ? <OlympiadsPanel /> : <ResearchPanel />}
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hand hidden h-full items-center text-[1.6rem] leading-tight text-graphite/70 lg:flex"
              >
                ← {t(ui.about.placeholder)}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
