import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Oswald,
  Poppins,
} from "next/font/google";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { ORIGIN, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const brand = Poppins({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["600", "700"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const share = pageMeta({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export const metadata: Metadata = {
  ...share,
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  metadataBase: new URL(ORIGIN),
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: ORIGIN }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Education",
  keywords: [
    "crane safety",
    "British Columbia",
    "Red Seal",
    "tower crane",
    "mobile crane",
    "WorkSafeBC",
    "Proven",
  ],
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  appleWebApp: {
    title: SITE.name,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="image_src" href={`${ORIGIN}/og.png`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("wire-theme")||localStorage.getItem("whoop-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`,
          }}
        />
      </head>
      <body
        className={`${display.variable} ${brand.variable} ${sans.variable} ${mono.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: SITE.name,
                  url: ORIGIN,
                  description: SITE.description,
                  inLanguage: "en-CA",
                },
                {
                  "@type": "Organization",
                  name: SITE.name,
                  legalName: SITE.legalName,
                  description: SITE.descriptionLong,
                  url: ORIGIN,
                  email: SITE.email,
                  telephone: SITE.phone,
                  areaServed: SITE.location,
                },
              ],
            }),
          }}
        />
        <div className="grain" aria-hidden />
        <Header />
        <main id="content" className="main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
