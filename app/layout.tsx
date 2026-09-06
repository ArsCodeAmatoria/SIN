import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Oswald,
  Poppins,
} from "next/font/google";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { ORIGIN, jsonLdGraph, organizationLd, pageMeta, personLd, websiteLd } from "@/lib/seo";
import { AUTHOR, SITE } from "@/lib/site";
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
    template: "%s",
  },
  metadataBase: new URL(ORIGIN),
  applicationName: SITE.name,
  authors: [{ name: AUTHOR.name, url: `${ORIGIN}/about` }],
  creator: AUTHOR.name,
  publisher: SITE.name,
  category: "Education",
  keywords: [
    "crane safety British Columbia",
    "tower crane Red Seal practice test",
    "mobile crane Red Seal practice test",
    "WorkSafeBC crane",
    "WorkSafeBC rigging",
    "BC Crane Safety",
    "SkilledTradesBC",
    "Fulford Level B",
    "tower crane Level 1 exam BC",
    "tower crane load chart practice",
    "rigging",
  ],
  robots: { index: true, follow: true },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      "XQGkrtfYzxVzmujfPIcUdEsf3fqVsaf-N4DO4Wp0X6Q",
  },
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
            __html: JSON.stringify(
              jsonLdGraph([organizationLd(), websiteLd(), personLd()]),
            ),
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
