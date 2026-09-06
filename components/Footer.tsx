import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { StandardMarks } from "@/components/StandardsList";
import { SITE } from "@/lib/site";
import { WIRE } from "@/lib/whoopwire";

const LINKS = [
  { href: "/about", label: "ABOUT", title: "About the author" },
  {
    href: "/philosophy",
    label: "PHILOSOPHY",
    title: "How this crane safety program is written",
  },
  { href: WIRE.path, label: WIRE.name, title: "Crane safety and rigging articles" },
] as const;

function StandardsLine() {
  return (
    <p className="mono footer-std">
      <Link href="/safety#standards">Work done to</Link> CSA Z150 / Z248, WorkSafeBC,
      BC Crane Safety, Technical Safety BC, applicable ASME B30 standards, manufacturer
      requirements and site policies. Those marks identify the bodies — they
      are not a claim those organizations endorse {SITE.name}.
    </p>
  );
}

export function SiteColophon() {
  return (
    <p className="mono steel site-colophon">
      <span>{SITE.legalName}. Current version on this site.</span>
      <span>
        <Link href="/safety#standards">Work done to</Link> CSA Z150 / Z248,
        WorkSafeBC, BC Crane Safety and the rest — not an endorsement.
      </span>
    </p>
  );
}

export function Footer({ marks = false }: { marks?: boolean }) {
  return (
    <footer className={marks ? "footer footer-full" : "footer"}>
      <div className="footer-top">
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </Link>
        <nav className="footer-links mono" aria-label="Site">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} title={item.title}>
              {item.label}
            </Link>
          ))}
          <a href={SITE.emailHref}>{SITE.email}</a>
        </nav>
      </div>
      {marks ? (
        <div className="footer-marks">
          <StandardMarks compact />
        </div>
      ) : null}
      <StandardsLine />
      <div className="footer-bot mono">
        <span>© {new Date().getFullYear()} {SITE.legalName}</span>
        <span>OPEN. USABLE. ACCOUNTABLE.</span>
      </div>
    </footer>
  );
}
