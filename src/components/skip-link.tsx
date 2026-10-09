"use client";

import { useLocale } from "./providers";
import { ui } from "@/content/ui";

// First thing keyboard users reach: jumps past the navigation.
export function SkipLink({ href = "#intro" }: { href?: string }) {
  const { t } = useLocale();
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-marker-solid focus:px-4 focus:py-2 focus:font-semibold focus:text-on-marker"
    >
      {t(ui.nav.skip)}
    </a>
  );
}
