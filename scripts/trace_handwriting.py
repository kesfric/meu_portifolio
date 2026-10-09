"""
Turn a photo/screenshot of a handwritten word into an SVG path for the site.

How to use (run in your terminal, inside the project folder):
  1. Write the word on your iPad on a plain or dotted page, black pen, fairly thick.
  2. Crop the screenshot so only the word is in it (no frame lines).
  3. pip install pillow numpy scipy potracer
  4. python3 scripts/trace_handwriting.py path/to/word.png about
  5. Paste the printed block into src/content/handwriting.ts

What it does, step by step:
  - keeps only dark pixels (the ink) and drops the light dot grid
  - removes tiny specks
  - upscales + blurs a little so the curves come out smooth
  - traces the ink outline into SVG curves with potrace
"""

import sys

import numpy as np
import potrace
from PIL import Image, ImageFilter
from scipy import ndimage

INK_THRESHOLD = 120  # 0 = black, 255 = white. Raise it if thin strokes disappear.
MIN_SPECK = 6        # connected ink blobs smaller than this (in pixels) are dropped
SCALE = 4            # upscale factor before tracing


def trace(path: str):
    gray = np.array(Image.open(path).convert("L"))
    ink = gray < INK_THRESHOLD

    labels, _ = ndimage.label(ink)
    keep = np.zeros_like(ink)
    for i, sl in enumerate(ndimage.find_objects(labels)):
        if (labels[sl] == i + 1).sum() >= MIN_SPECK:
            keep |= labels == i + 1

    ys, xs = np.where(keep)
    keep = np.pad(keep[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1], 3)

    img = Image.fromarray(np.where(keep, 0, 255).astype("uint8"))
    img = img.resize((img.width * SCALE, img.height * SCALE), Image.LANCZOS)
    img = img.filter(ImageFilter.GaussianBlur(2.0))
    ink_big = np.array(img) < 128

    # potracer treats True as background, so pass the inverse.
    curves = potrace.Bitmap(~ink_big).trace(
        turdsize=30, alphamax=1.0, opticurve=True, opttolerance=0.4
    )

    parts = []
    for c in curves:
        p = c.start_point
        d = [f"M{p.x:.0f} {p.y:.0f}"]
        for s in c.segments:
            if s.is_corner:
                d.append(f"L{s.c.x:.0f} {s.c.y:.0f}L{s.end_point.x:.0f} {s.end_point.y:.0f}")
            else:
                d.append(
                    f"C{s.c1.x:.0f} {s.c1.y:.0f} {s.c2.x:.0f} {s.c2.y:.0f} "
                    f"{s.end_point.x:.0f} {s.end_point.y:.0f}"
                )
        d.append("Z")
        parts.append("".join(d))

    return ink_big.shape[1], ink_big.shape[0], "".join(parts)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: python3 scripts/trace_handwriting.py <image.png> <exportName>")
    w, h, d = trace(sys.argv[1])
    print(f'export const {sys.argv[2]}: HandwritingGlyph = {{\n  width: {w},\n  height: {h},\n  d: "{d}",\n}};')
