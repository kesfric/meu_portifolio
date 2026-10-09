"use client";

// Makes its child drift slightly toward the mouse pointer.
// Only for mouse users (not touch), and off when reduced motion is on.

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function Magnetic({ children, strength = 0.22 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 18, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy }} onPointerMove={onPointerMove} onPointerLeave={reset} className="inline-block">
      {children}
    </motion.span>
  );
}
