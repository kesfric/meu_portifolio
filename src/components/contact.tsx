"use client";

// Contact section.
// Contact is an email address shown as words ("name at host dot edu").
// The real mailto link is only built when someone clicks it, so scrapers
// reading the page HTML don't find a full address.

import { useLocale } from "./providers";
import { SectionTitle } from "./section-title";
import { EmailLink } from "./email-link";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

export function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
      <SectionTitle id="contact-title" text={ui.contact.title} />
      <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">{t(ui.contact.lead)}</p>

      <p className="mt-8 text-sm font-semibold">{t(ui.contact.emailMe)}</p>
      <EmailLink describedBy="email-hint" className="mt-2 text-2xl md:text-4xl" />
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
