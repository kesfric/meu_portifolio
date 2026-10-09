"use client";

// Wraps the whole site.
// 1) Language: keeps "en" or "pt" in React state, remembers it in localStorage,
//    and defaults to Portuguese for visitors whose browser is in Portuguese.
// 2) Motion: reducedMotion="user" turns off movement for people who asked
//    their operating system to reduce motion.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import type { L, Locale } from "@/content/site";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Pick the current language out of an { en, pt } object. */
  t: (text: L) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read the saved choice once, after the page loads in the browser.
  useEffect(() => {
    let initial: Locale = "en";
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "pt") initial = saved;
      else if (navigator.language.toLowerCase().startsWith("pt")) initial = "pt";
    } catch {
      /* storage blocked: keep English */
    }
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: (text) => text[locale] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <Providers>");
  return ctx;
}
