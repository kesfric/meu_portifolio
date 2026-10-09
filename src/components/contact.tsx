"use client";

// Resume block + contact section.
// The form posts to /api/contact (src/app/api/contact/route.ts).
// States: idle → sending → sent | error. On success a checkmark draws itself.

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { Magnetic } from "./magnetic";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

export function Resume() {
  const { t } = useLocale();
  return (
    <section id="resume" aria-labelledby="resume-title" className="mx-auto max-w-7xl px-6 py-10 md:px-14">
      <div
        className="flex flex-col gap-6 border-2 border-ink px-7 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10"
        style={{ borderRadius: "18px 255px 18px 225px / 225px 18px 255px 18px" }}
      >
        <div>
          <SectionTitle id="resume-title" text={ui.resume.title} />
          <p className="mt-4 max-w-[46ch]">{t(ui.resume.body)}</p>
          <p className="mt-1 text-sm text-graphite">
            {t(ui.resume.updated)} {t(site.resumeUpdated)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <a href={site.resume} target="_blank" rel="noopener" className="btn btn-primary">
              {t(ui.resume.view)}
            </a>
          </Magnetic>
          <Magnetic>
            <a href={site.resume} download="Ester-Borges-Frickes-Ricardo-Resume.pdf" className="btn btn-ghost">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 2.5v8M4.6 7.4 8 10.7l3.4-3.3M3 13.4h10" />
              </svg>
              {t(ui.resume.download)}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const name = data.name?.trim() ?? "";
    const email = data.email?.trim() ?? "";
    const message = data.message?.trim() ?? "";

    if (!name || !EMAIL_RE.test(email) || message.length < 2) {
      setStatus({ kind: "error", message: t(ui.contact.invalid) });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company: data.company ?? "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "sent", email });
    } catch {
      setStatus({ kind: "error", message: t(ui.contact.failed).replace("{email}", site.email) });
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
        <div>
          <SectionTitle id="contact-title" text={ui.contact.title} />
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed">{t(ui.contact.lead)}</p>
          <p className="mt-8 text-sm font-semibold">{t(ui.contact.direct)}</p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <a href={`mailto:${site.email}`} className="ink-link">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.links.linkedin} target="_blank" rel="noopener" className="ink-link">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.links.github} target="_blank" rel="noopener" className="ink-link">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="relative min-h-[22rem]">
          <AnimatePresence mode="wait" initial={false}>
            {status.kind === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col items-start justify-center"
                role="status"
              >
                <svg viewBox="0 0 120 100" className="h-24 w-28 text-leaf" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <motion.path
                    d="M14 54c10 8 19 17 27 28C58 50 79 26 106 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
                <p className="mt-5 text-3xl font-semibold tracking-tight">{t(ui.contact.sent)}</p>
                <p className="mt-2 text-lg text-graphite">{t(ui.contact.sentBody).replace("{email}", status.email)}</p>
                <button type="button" onClick={() => setStatus({ kind: "idle" })} className="btn btn-ghost mt-8">
                  {t(ui.contact.sendAnother)}
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
                <div>
                  <label htmlFor="c-name" className="text-sm font-semibold">
                    {t(ui.contact.name)}
                  </label>
                  <input id="c-name" name="name" type="text" autoComplete="name" required maxLength={120} className="field" />
                </div>
                <div>
                  <label htmlFor="c-email" className="text-sm font-semibold">
                    {t(ui.contact.email)}
                  </label>
                  <input id="c-email" name="email" type="email" autoComplete="email" required maxLength={200} className="field" />
                </div>
                <div>
                  <label htmlFor="c-message" className="text-sm font-semibold">
                    {t(ui.contact.message)}
                  </label>
                  <textarea id="c-message" name="message" required rows={5} maxLength={5000} className="field resize-y" />
                </div>
                {/* Honeypot: hidden from people, bots fill it in. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="c-company">Company</label>
                  <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {status.kind === "error" && (
                  <p role="alert" className="border-l-2 border-ink pl-3 text-[0.98rem]">
                    {status.message}
                  </p>
                )}

                <Magnetic>
                  <button type="submit" disabled={status.kind === "sending"} className="btn btn-primary disabled:opacity-70">
                    {t(status.kind === "sending" ? ui.contact.sending : ui.contact.send)}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
