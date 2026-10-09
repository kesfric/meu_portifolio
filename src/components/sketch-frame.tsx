"use client";

// The wobbly frame around the first screen, like the window in your sketch.
// It measures its box (ResizeObserver) and builds the four strokes in real
// pixels, so the line keeps the same thickness on a phone and on a monitor.

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

function framePaths(w: number, h: number) {
  const a = Math.min(24, w * 0.03); // how much the edges curve
  return {
    // Left edge: straight, running a little past the bottom (like the sketch).
    left: `M10 ${a * 0.4} L9 ${h + 6}`,
    // Top edge: rises toward the middle, then settles on the right.
    top: `M2 ${a + 8} C${w * 0.28} ${a + 2} ${w * 0.42} 2 ${w * 0.6} 3 S${w * 0.9} 6 ${w - 6} ${a * 0.5 + 6}`,
    // Right edge: the heavier stroke, with a slight wobble.
    right: `M${w - 7} ${a * 0.5 + 2} C${w - 14} ${h * 0.3} ${w - 1} ${h * 0.55} ${w - 6} ${h * 0.76} S${w - 3} ${h - a} ${w - 9} ${h - a * 1.15}`,
    // Bottom edge: slopes up toward the right.
    bottom: `M16 ${h - 3} C${w * 0.3} ${h - 5} ${w * 0.62} ${h - a * 0.6} ${w - 4} ${h - a * 1.3}`,
  };
}

export function SketchFrame({ animate = true }: { animate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const draw = animate && !reduce;
  const strokes = size ? framePaths(size.w, size.h) : null;
  const order: (keyof ReturnType<typeof framePaths>)[] = ["left", "top", "right", "bottom"];

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {size && strokes && (
        <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className="absolute inset-0 overflow-visible">
          {order.map((key, i) => (
            <motion.path
              key={key}
              d={strokes[key]}
              fill="none"
              stroke="currentColor"
              strokeWidth={key === "right" ? 3.5 : 2.5}
              strokeLinecap="round"
              initial={draw ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.16, ease: [0.65, 0, 0.35, 1] }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
