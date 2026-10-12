"use client";

// Four sections that sit between Experience and Skills:
// Research (high school), Fellowships, Coursework and Publications.
// All the text lives in src/content/academics.ts.

import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { coursework, fellowships, publications, research } from "@/content/academics";
import { ui } from "@/content/ui";

const wrap = "mx-auto max-w-7xl px-6 py-16 md:px-14 md:py-20";

/** Green marker label used to highlight high-school research and graduate-level classes. */
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="marker inline-block px-1.5 text-[0.82rem] font-semibold uppercase tracking-wide">{children}</span>;
}

export function Research() {
  const { t } = useLocale();
  return (
    <section id="research" aria-labelledby="research-title" className={wrap}>
      <SectionTitle id="research-title" text={ui.research.title} />
      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {research.map((r) => (
          <li key={r.id} className="border-2 border-ink px-6 py-6" style={{ borderRadius: "14px 120px 14px 100px / 100px 14px 120px 14px" }}>
            <Tag>{t(ui.research.highSchool)}</Tag>
            <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight">{t(r.title)}</h3>
            <p className="mt-1 text-graphite">
              {r.org} · {r.program}
              {r.years ? ` · ${r.years}` : ""}
            </p>
            <p className="mt-3 max-w-[56ch] text-[1.02rem] leading-relaxed">{t(r.summary)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Fellowships() {
  const { t } = useLocale();
  return (
    <section id="fellowships" aria-labelledby="fellowships-title" className={wrap}>
      <SectionTitle id="fellowships-title" text={ui.fellowships.title} />
      <ul className="mt-8 space-y-3 text-lg">
        {fellowships.map((f, i) => (
          <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2">
            <span aria-hidden="true" className="hand text-2xl leading-none text-leaf">
              ✦
            </span>
            <span>{t(f)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Coursework() {
  const { t } = useLocale();
  return (
    <section id="coursework" aria-labelledby="coursework-title" className={wrap}>
      <SectionTitle id="coursework-title" text={ui.coursework.title} />
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {coursework.map((c) => (
          <li key={c.title} className={c.level ? "border-2 border-ink px-5 py-4" : "border-l-2 border-ink/40 px-5 py-4"} style={c.level ? { borderRadius: "10px 60px 10px 50px / 50px 10px 60px 10px" } : undefined}>
            {c.level && <Tag>{`${t(ui.coursework.graduate)} · ${t(c.level)}`}</Tag>}
            <h3 className="mt-1 text-lg font-semibold leading-snug">{c.title}</h3>
            <p className="mt-1 text-sm text-graphite">
              {c.code ? `${c.code} · ` : ""}
              {t(c.term)}
            </p>
            {c.note && <p className="mt-2 text-[0.98rem] leading-relaxed">{t(c.note)}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Publications() {
  // Hidden until there is at least one entry, so no empty heading shows up.
  if (publications.length === 0) return null;
  return (
    <section id="publications" aria-labelledby="publications-title" className={wrap}>
      <SectionTitle id="publications-title" text={ui.publications.title} />
      <ul className="mt-8 space-y-5">
        {publications.map((p) => (
          <li key={p.title} className="max-w-[70ch] leading-relaxed">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener" className="ink-link font-semibold">
                {p.title}
              </a>
            ) : (
              <span className="font-semibold">{p.title}</span>
            )}
            <p className="text-graphite">
              {p.authors ? `${p.authors}. ` : ""}
              {p.venue}, {p.year}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
