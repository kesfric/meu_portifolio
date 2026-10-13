"use client";

// Two headers:
// - HeaderRow sits inside the sketch frame at the top of the home page.
// - StickyBar is a slim bar that slides in once HeaderRow scrolls out of view
//   (and is always visible on project pages).

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "./providers";
import { Handwriting } from "./handwriting";
import { ester } from "@/content/handwriting";
import { ui } from "@/content/ui";
import { cx, sketchyRadius } from "@/lib/blobs";

const sections = ["projects", "about", "skills"] as const;

// Handwritten and lowercase, to match the "ester" logo.
function NavLinks({ base, onNavigate, className }: { base: string; onNavigate?: () => void; className?: string }) {
  const { t } = useLocale();
  return (
    <ul className={className}>
      {sections.map((s) => (
        <li key={s}>
          <a href={`${base}#${s}`} onClick={onNavigate} className="hand group rounded px-1 py-1 text-[1.35rem] lowercase leading-none">
            <span className="marker marker-sweep">{t(ui.nav[s])}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function LangToggle() {
  const { locale, setLocale, t } = useLocale();
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "pt" : "en")}
      aria-label={t(ui.toggles.language)}
      className="flex h-11 items-center gap-1 rounded-md px-2 text-sm font-semibold"
    >
      <span className={cx("rounded px-1", locale === "en" ? "marker" : "text-graphite")}>EN</span>
      <span aria-hidden="true" className="text-graphite">/</span>
      <span className={cx("rounded px-1", locale === "pt" ? "marker" : "text-graphite")}>PT</span>
    </button>
  );
}

export function ThemeToggle() {
  const { t } = useLocale();
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(dark ? ui.toggles.themeLight : ui.toggles.themeDark)}
      className="grid h-11 w-11 place-items-center rounded-full"
    >
      {/* Hand-drawn moon / sun */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M5.2 18.8l1.6-1.6M17.2 6.8l1.6-1.6" />
          </>
        ) : (
          <path d="M19.5 14.6A7.8 7.8 0 0 1 9.3 4.4a8.1 8.1 0 1 0 10.2 10.2Z" />
        )}
      </svg>
    </button>
  );
}

function MobileMenu({ base }: { base: string }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost min-h-10 px-3 py-1 text-sm"
      >
        {t(open ? ui.nav.close : ui.nav.menu)}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -6, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 z-50 w-52 border-2 border-ink bg-paper p-3"
            style={{ borderRadius: sketchyRadius }}
          >
            <NavLinks base={base} onNavigate={() => setOpen(false)} className="flex flex-col gap-1 text-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Logo({ animate }: { animate: boolean }) {
  const { t } = useLocale();
  return (
    <Link href="/" className="inline-block rounded-md p-1" aria-label={`Ester, ${t({ en: "home", pt: "início" })}`}>
      <Handwriting glyph={ester} label="ester" reveal={animate ? "load" : false} delay={0.25} duration={0.7} className="h-9 w-auto md:h-11" />
    </Link>
  );
}

export function HeaderRow() {
  return (
    <header className="flex items-center justify-between gap-4">
      <Logo animate />
      <nav aria-label="Main" className="flex items-center gap-1 md:gap-3">
        <NavLinks base="" className="mr-2 hidden items-center gap-4 md:flex" />
        <LangToggle />
        <ThemeToggle />
        <MobileMenu base="" />
      </nav>
    </header>
  );
}

/** `watchId`: when that element leaves the screen the bar appears. Omit to always show it. */
export function StickyBar({ watchId, base = "" }: { watchId?: string; base?: string }) {
  const [visible, setVisible] = useState(!watchId);
  const raf = useRef(0);

  useEffect(() => {
    if (!watchId) return;
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setVisible(!entry.isIntersecting));
    });
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={watchId ? { y: -72 } : false}
          animate={{ y: 0 }}
          exit={{ y: -72 }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          className="fixed inset-x-0 top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur-md"
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
            <Logo animate={false} />
            <nav aria-label="Sections" className="flex items-center gap-1 md:gap-3">
              <NavLinks base={base} className="mr-2 hidden items-center gap-4 md:flex" />
              <LangToggle />
              <ThemeToggle />
              <MobileMenu base={base} />
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
