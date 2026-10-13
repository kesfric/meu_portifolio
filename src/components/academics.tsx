"use client";

// Four sections that sit between Experience and Skills:
// Research (high school), Fellowships, Coursework and Publications.
// All the text lives in src/content/academics.ts.

import { motion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { courseworkCS, courseworkLS, fellowships, publications, research, type Course } from "@/content/academics";
import type { L } from "@/content/site";
import { ui } from "@/content/ui";
import { cardShapes, cx } from "@/lib/blobs";

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

function CourseCard({ course, shapeIndex }: { course: Course; shapeIndex: number }) {
  const { t } = useLocale();
  const shape = cardShapes[shapeIndex % cardShapes.length];
  return (
    <motion.li
      initial={{ rotate: shape.tilt }}
      whileHover={{ borderRadius: shape.hover, rotate: 0 }}
      transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
      style={{ borderRadius: shape.rest }}
      className="flex min-h-[9.5rem] flex-col justify-between border-2 border-ink bg-paper px-6 pb-6 pt-7"
    >
      <div>
        {course.level && <Tag>{`${t(ui.coursework.graduate)} · ${t(course.level)}`}</Tag>}
        <h4 className={cx("text-[1.2rem] font-semibold leading-tight tracking-tight", course.level && "mt-3")}>
          <span className="marker marker-sweep">{course.title}</span>
        </h4>
        {course.note && <p className="mt-3 text-[0.95rem] leading-snug text-graphite">{t(course.note)}</p>}
      </div>
      {(course.code || course.term) && (
        <p className="mt-4 text-sm text-graphite">{[course.code, course.term ? t(course.term) : null].filter(Boolean).join(" · ")}</p>
      )}
    </motion.li>
  );
}

function CourseGroup({ title, courses, offset }: { title: L; courses: Course[]; offset: number }) {
  const { t } = useLocale();
  return (
    <div className="mt-10">
      <h3 className="hand text-[2rem] leading-none md:text-[2.4rem]">{t(title)}</h3>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => (
          <CourseCard key={c.title} course={c} shapeIndex={offset + i} />
        ))}
      </ul>
    </div>
  );
}

export function Coursework() {
  return (
    <section id="coursework" aria-labelledby="coursework-title" className={wrap}>
      <SectionTitle id="coursework-title" text={ui.coursework.title} />
      <CourseGroup title={ui.coursework.cs} courses={courseworkCS} offset={0} />
      <CourseGroup title={ui.coursework.ls} courses={courseworkLS} offset={2} />
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
