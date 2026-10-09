"use client";

// Section headings look handwritten, like "projects" in the sketch.
// If you've traced a word in your own handwriting (see scripts/), pass it in
// `glyphs` for that language; otherwise the handwriting font is used.

import type { HandwritingGlyph } from "@/content/handwriting";
import type { L, Locale } from "@/content/site";
import { useLocale } from "./providers";
import { Handwriting } from "./handwriting";
import { cx } from "@/lib/blobs";

type Props = {
  id?: string;
  text: L;
  glyphs?: Partial<Record<Locale, HandwritingGlyph>>;
  className?: string;
  /** Height of traced handwriting, as Tailwind classes. */
  glyphClassName?: string;
};

export function SectionTitle({ id, text, glyphs, className, glyphClassName = "h-10 md:h-12" }: Props) {
  const { locale, t } = useLocale();
  const glyph = glyphs?.[locale];

  return (
    <h2 id={id} className={cx("leading-none", className)}>
      {glyph ? (
        <Handwriting glyph={glyph} label={t(text)} reveal="view" className={cx("w-auto", glyphClassName)} duration={0.7} />
      ) : (
        <span className="hand block text-[2.6rem] leading-none md:text-5xl">{t(text)}</span>
      )}
    </h2>
  );
}
