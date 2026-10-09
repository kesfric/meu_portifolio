import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/la-belle-aurore/400.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";

// Runs before the page paints, so dark mode never flashes white.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Product, AI and software engineering`,
    template: `%s | ${site.name}`,
  },
  description: site.description.en,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    "Ester Borges Frickes Ricardo",
    "Northwestern",
    "computer science",
    "learning sciences",
    "product engineering",
    "applied AI",
    "AI deployment",
    "software engineering internship",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description.en,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description.en },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#17181a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
