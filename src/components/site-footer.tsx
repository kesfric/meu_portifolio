"use client";

import { useLocale } from "./providers";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-14">
      <div className="flex flex-col gap-6 border-t-2 border-ink pt-8 md:flex-row md:items-end md:justify-between">
        <p className="hand text-[2rem] leading-tight md:text-[2.4rem]">{t(ui.footer.statement)}</p>
        <div className="space-y-1 text-sm text-graphite md:text-right">
          <p>
            {t(ui.footer.sketch)}{" "}
            <a href="/sketch.png" target="_blank" rel="noopener" className="ink-link">
              {t(ui.footer.seeSketch)}
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
