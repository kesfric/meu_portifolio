// The project cards in the sketch are all different hand-drawn shapes.
// Each shape here is an 8-value border-radius ("top-left top-right bottom-right
// bottom-left / same four, vertical"). `hover` is the shape it morphs into.

export type BlobShape = {
  rest: string;
  hover: string;
  /** Slight tilt in degrees, like a card drawn by hand. */
  tilt: number;
  /** Desktop min-height in px. Different heights on a shared baseline, like the sketch. */
  height: number;
  /** Relative width on desktop. */
  grow: number;
};

export const cardShapes: BlobShape[] = [
  // Left to right, as drawn in the sketch.
  // 1: rounded, leaning top-right
  { rest: "22% 30% 16% 26% / 18% 24% 14% 20%", hover: "28% 24% 20% 22% / 14% 28% 16% 22%", tilt: -0.7, height: 300, grow: 1 },
  // 2: arched top-right like a tombstone
  { rest: "10% 40% 8% 8% / 10% 26% 6% 8%", hover: "14% 34% 10% 8% / 8% 30% 8% 10%", tilt: 0.5, height: 330, grow: 1 },
  // 3: tall, wavy bottom edge
  { rest: "8% 18% 12% 22% / 6% 14% 20% 16%", hover: "12% 14% 18% 18% / 8% 12% 16% 20%", tilt: -0.4, height: 360, grow: 1 },
  // 4: tall, with a curved tail at the bottom-left
  { rest: "6% 22% 24% 28% / 5% 16% 26% 20%", hover: "10% 18% 28% 24% / 8% 14% 22% 24%", tilt: 0.6, height: 350, grow: 1 },
  // 5: the widest, soft wavy top
  { rest: "12% 26% 16% 20% / 18% 14% 20% 18%", hover: "16% 22% 20% 16% / 14% 18% 16% 22%", tilt: -0.5, height: 320, grow: 1.3 },
];

export const photoShape = {
  rest: "34% 46% 38% 52% / 30% 34% 46% 54%",
  hover: "40% 40% 44% 46% / 36% 30% 50% 48%",
};

// Classic hand-drawn border trick for buttons and small boxes.
export const sketchyRadius = "255px 18px 225px 18px / 18px 225px 18px 255px";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
