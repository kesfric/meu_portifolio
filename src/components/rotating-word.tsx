"use client";

// Cycles through a list of words with a small vertical swap.
// Screen readers get the full list once instead of hearing it change.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setI((n) => (n + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval, reduce]);

  // Restart from the first word when the language (and so the list) changes.
  useEffect(() => setI(0), [words]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="relative inline-block whitespace-nowrap align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            initial={{ y: "0.6em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-0.6em", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
            className="marker inline-block font-semibold"
          >
            {words[i]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
