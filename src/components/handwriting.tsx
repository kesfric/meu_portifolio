"use client";

// Draws one of your traced handwritten words as an SVG.
// The reveal is a clip that opens left to right, so it reads as being written.

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { HandwritingGlyph } from "@/content/handwriting";

type Props = {
  glyph: HandwritingGlyph;
  /** What a screen reader says instead of the drawing. */
  label: string;
  className?: string;
  delay?: number;
  duration?: number;
  /** "load": write on page load. "view": write when scrolled into view. false: no animation. */
  reveal?: "load" | "view" | false;
};

const hidden = { clipPath: "inset(-10% 100% -10% 0%)" };
const shown = { clipPath: "inset(-10% 0% -10% 0%)" };

export function Handwriting({ glyph, label, className, delay = 0, duration = 0.9, reveal = "load" }: Props) {
  // Watch a wrapper, not the SVG itself: Chrome counts the SVG's own clip-path,
  // so a fully clipped SVG would never look "in view".
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const animated = reveal !== false && !reduce;
  const visible = reveal === "view" ? inView : true;

  return (
    <span ref={ref} className="block w-fit">
    <motion.svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${glyph.width} ${glyph.height}`}
      className={className}
      initial={animated ? hidden : false}
      animate={!animated || visible ? shown : hidden}
      transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      <path d={glyph.d} fill="currentColor" />
    </motion.svg>
    </span>
  );
}
