"use client";

// The email shown with brackets ("name [at] host [dot] edu"). The real mailto link is
// only built when someone clicks it, so scrapers reading the page HTML don't
// find a full address.

import { site } from "@/content/site";
import { cx } from "@/lib/blobs";

const { user, host, tld } = site.emailParts;
const spokenEmail = `${user} [at] ${host.replaceAll(".", " [dot] ")} [dot] ${tld}`;

export function EmailLink({ className, describedBy }: { className?: string; describedBy?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = `mailto:${user}@${host}.${tld}`;
      }}
      aria-describedby={describedBy}
      className={cx("marker text-left font-semibold tracking-tight", className)}
    >
      {spokenEmail}
    </button>
  );
}
