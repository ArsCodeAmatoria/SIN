import Link from "next/link";
import { CorMark } from "@/components/CorMark";
import { ProvenName } from "@/components/ProvenMark";
import { StandardMarks } from "@/components/StandardsList";
import { COR, SITE } from "@/lib/site";
import { WIRE } from "@/lib/whoopwire";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h2 className="brand">{SITE.name}</h2>
        </div>
        <nav className="footer-links mono">
          <Link href="/safety" title="Crane safety program, procedures and forms">
            <ProvenName />
          </Link>
          <Link href={WIRE.path} title="Crane safety and rigging articles">
            {WIRE.name}
          </Link>
          <Link href="/redtc" title="Tower Crane Red Seal practice test">
            REDTC
          </Link>
          <Link href="/redmc" title="Mobile Crane Red Seal practice test">
            REDMC
          </Link>
          <Link href="/#cor">COR®</Link>
          <Link href="/about" title="About the author">
            ABOUT
          </Link>
          <Link href="/philosophy" title="How this crane safety program is written">
            PHILOSOPHY
          </Link>
          <Link
            href="/safety/builder"
            title="Crane safety form builder — FLHA, lift plans and inspections"
          >
            FORM BUILDER
          </Link>
          <a href={SITE.emailHref}>{SITE.email}</a>
        </nav>
      </div>
      <p className="display giant-sm">
        {SITE.tagline}
        <br />
        {SITE.sub}
      </p>
      <div className="footer-cred">
        <CorMark className="cor-mark cor-mark-foot" />
        <p className="mono">
          {COR.mark}
          <br />
          Certifying partner:{" "}
          <a href={COR.partnerUrl} rel="noreferrer" target="_blank">
            {COR.partner}
          </a>
        </p>
      </div>
      <div className="footer-marks">
        <StandardMarks compact />
      </div>
      <p className="mono footer-std">
        <Link href="/safety#standards">Work done to</Link> CSA Z150 / Z248, WorkSafeBC,
        BC Crane Safety, Technical Safety BC, applicable ASME B30 standards, manufacturer
        requirements and site policies. Those marks identify the bodies — they
        are not a claim those organizations endorse {SITE.name}.
      </p>
      <div className="footer-bot mono">
        <span>© {new Date().getFullYear()} {SITE.legalName}</span>
        <span>OPEN. USABLE. ACCOUNTABLE.</span>
      </div>
    </footer>
  );
}
