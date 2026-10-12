"use client";

// Resume block + contact section.
// Contact is an email address shown as words ("name at host dot edu").
// The real mailto link is only built when someone clicks it, so scrapers
// reading the page HTML don't find a full address.

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

const { user, host, tld } = site.emailParts;
const spokenEmail = `${user} at ${host} dot ${tld}`;

function openEmail() {
  window.location.href = `mailto:${user}@${host}.${tld}`;
}

export function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="contact-title" text={ui.contact.title} />
      <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">{t(ui.contact.lead)}</p>

      <p className="mt-8 text-sm font-semibold">{t(ui.contact.emailMe)}</p>
      <button
        type="button"
        onClick={openEmail}
        aria-describedby="email-hint"
        className="marker mt-2 text-left text-2xl font-semibold tracking-tight md:text-4xl"
      >
        {spokenEmail}
      </button>
      <p id="email-hint" className="mt-2 text-sm text-graphite">
        {t(ui.contact.emailHint)}
      </p>

      <p className="mt-10 text-sm font-semibold">{t(ui.contact.direct)}</p>
      <ul className="mt-2 space-y-1.5">
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
    </section>
  );
}
