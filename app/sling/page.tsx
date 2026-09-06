import type { Metadata } from "next";
import Link from "next/link";
import { CabLine } from "@/components/CabCopy";
import { DeskPrintButton, SlingDesk } from "@/components/SlingDesk";
import { JsonLd } from "@/components/SeoLanding";
import { formatReviewed, LAST_REVIEWED } from "@/lib/reviewed";
import { absUrl, breadcrumbLd, jsonLdGraph, organizationLd, pageMeta, websiteLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Sling Angle Calculator — θ, Tension, WLL | sin()",
  description:
    "Bookmarkable sling-angle desk. θ = sin⁻¹(H/L). Two-leg tension T = W / (2 × sin θ). Compare T to the sling tag. Printable. Two equal legs, θ from the horizontal.",
  path: "/sling",
});

export default function SlingDeskPage() {
  const crumbs = [
    { name: SITE.name, path: "/" },
    { name: "Sling angle desk", path: "/sling" },
  ];

  return (
    <div className="desk-page wrap">
      <JsonLd
        data={jsonLdGraph([
          organizationLd(),
          websiteLd(),
          breadcrumbLd(crumbs),
          {
            "@type": "WebApplication",
            name: "sin() sling-angle desk",
            url: absUrl("/sling"),
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            description:
              "Calculate sling angle from height and length, two-leg tension from sine, and compare tension to WLL.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
            publisher: { "@id": `${SITE.url}/#org` },
          },
        ])}
      />
      <header className="page-hero">
        <p className="mono kicker">sin() — DESK</p>
        <h1 className="display giant">
          SLING
          <br />
          ANGLE.
        </h1>
        <p className="lede mt-2">
          Two-leg bridle. θ from height and length. Tension from sin(). Compare T
          to the tag. Bookmark this URL. Print the numbers you just ran. Open
          once on a network — the desk stays on this device when the trailer
          Wi-Fi is dead.
        </p>
        <CabLine where="sling" />
        <div className="inline-cta desk-chrome">
          <DeskPrintButton />
          <Link className="btn btn-ghost" href="/wire/height-over-length-is-the-angle">
            Why H / L is θ
          </Link>
          <Link className="btn btn-ghost" href="/wire/sling-tension-is-sin">
            Why tension is sin()
          </Link>
        </div>
        <p className="mono steel mt">Last reviewed: {formatReviewed(LAST_REVIEWED)}</p>
      </header>

      <SlingDesk />

      <p className="mono steel mt-2 desk-print-url">
        {SITE.url}/sling · Printed copy uncontrolled · Last reviewed:{" "}
        {formatReviewed(LAST_REVIEWED)}
      </p>

      <div className="inline-cta desk-chrome mt-2">
        <Link className="btn btn-solid" href="/safety/swp/sling-selection">
          Sling selection SWP
        </Link>
        <Link className="btn btn-ghost" href="/redtc/rigging-charts">
          Sling charts — REDTC
        </Link>
        <Link className="btn btn-ghost" href="/redmc/rigging-charts">
          Sling charts — REDMC
        </Link>
      </div>
    </div>
  );
}
