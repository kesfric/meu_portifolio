"use client";

// Ester's own words about where she's from and what she's interested in,
// plus two highlighted phrases that open a small animated popup:
// olympiad medals and high-school research.
//
// Popup behavior (so it is readable, not twitchy):
// - Mouse: opens after a short pause, stays open while the pointer is on the
//   phrase or the popup, and closes only after a short grace period.
// - Click/tap: pins it open; click again, click outside or press Escape to close.
// - Keyboard: focusing the phrase opens it. Nothing closes on a timer.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { bio } from "@/content/experience";
import { olympiadGroups, research } from "@/content/academics";
import { ui } from "@/content/ui";

type Key = "olympiads" | "research";

const OPEN_DELAY_MS = 150;
const CLOSE_DELAY_MS = 500;

function Highlights() {
  const { t } = useLocale();
  const [open, setOpen] = useState<Key | null>(null);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const clearTimer = useCallback(() => window.clearTimeout(timer.current), []);
  const closeNow = useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(null);
    setPinned(false);
  }, []);

  function hoverOpen(key: Key) {
    clearTimer();
    if (open === key) return;
    timer.current = window.setTimeout(() => {
      setOpen(key);
      setPinned(false);
    }, open ? 0 : OPEN_DELAY_MS);
  }

  function hoverLeave() {
    clearTimer();
    if (pinned) return;
    timer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY_MS);
  }

  function onClick(key: Key) {
    clearTimer();
    if (open === key && pinned) closeNow();
    else {
      setOpen(key);
      setPinned(true);
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
        className="marker cursor-pointer text-left font-semibold"
      >
        {label}
      </button>
    );
  }

  return (
    <div ref={wrapRef} className="relative mt-6 max-w-[62ch]">
      <p className="text-lg leading-relaxed">
        {t(ui.about.before)}
        {trigger("olympiads", t(ui.about.olympiads))}
        {t(ui.about.between)}
        {trigger("research", t(ui.about.research))}.
      </p>
      <p className="mt-2 text-sm text-graphite">{t(ui.about.hint)}</p>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key={open}
            id={`about-pop-${open}`}
            role="region"
            aria-label={t(open === "olympiads" ? ui.about.olympiadsTitle : ui.about.researchTitle)}
            initial={{ opacity: 0, y: -10, scale: 0.97, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onPointerEnter={(e) => e.pointerType === "mouse" && clearTimer()}
            onPointerLeave={(e) => e.pointerType === "mouse" && hoverLeave()}
            style={{ borderRadius: "14px 40px 14px 36px / 36px 14px 40px 14px" }}
            className="absolute left-0 top-full z-30 mt-3 w-[min(100%,52rem)] border-2 border-ink bg-paper px-6 py-5 md:w-[min(calc(100vw-7rem),52rem)]"
          >
            <h3 className="hand text-[1.7rem] leading-none">{t(open === "olympiads" ? ui.about.olympiadsTitle : ui.about.researchTitle)}</h3>

            {open === "olympiads" ? (
              <div className="mt-4 md:columns-2 md:gap-10">
                {olympiadGroups.map((g) => (
                  <div key={g.id} className="mb-4 break-inside-avoid">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-graphite">{t(g.subject)}</h4>
                    <ul className="mt-1.5 space-y-1.5 text-[0.95rem] leading-snug">
                      {g.items.map((item, i) => (
                        <li key={i} className="grid grid-cols-[1rem_1fr]">
                          <span aria-hidden="true" className="text-graphite">
                            •
                          </span>
                          <span>{t(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-4 space-y-5">
                {research.map((r) => (
                  <li key={r.id}>
                    <p className="font-semibold leading-snug">{t(r.title)}</p>
                    <p className="text-sm text-graphite">
                      {r.org} · {r.program}
                      {r.years ? ` · ${r.years}` : ""}
                    </p>
                    <p className="mt-1.5 text-[0.95rem] leading-snug">{t(r.summary)}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function About() {
  const { t } = useLocale();
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="about-title" text={ui.about.title} />
      <p className="mt-10 max-w-[62ch] text-lg leading-relaxed">{t(bio)}</p>
      <Highlights />
    </section>
  );
}
