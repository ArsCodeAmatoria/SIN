import type { Metadata } from "next";
import Link from "next/link";
import {
  PackDownload,
  PackOutline,
  PackSdsIndex,
  PackTabs,
} from "@/components/OhsPack";
import { ProvenColophon, ProvenName } from "@/components/ProvenMark";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Download the Proven OH&S program as PDFs",
  description:
    "Download the whole Proven occupational health and safety program as a zip of PDFs. Folder structure matches binder tabs. Includes manufacturer SDS for products a tower crane crew actually uses.",
  path: "/safety/pack",
});

export default function SafetyPackPage() {
  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">
          <ProvenName />
        </p>
        <div className="num">ZIP</div>
        <h1 className="display">OH&S PACK</h1>
        <p className="lede mt">
          The whole program as PDFs. Unzip. Print. Tab a binder. Manufacturer
          SDS for diesel, hydraulic oil, grease, WD-40, wire-rope dressing,
          battery acid and hand cleaner are in Tab 18.
        </p>
      </header>

      <PackDownload />
      <p className="lede mt">
        Printed copies are uncontrolled. The current version is on this site.
        The SDS for the exact product on this machine wins over the example
        sheets in the pack.
      </p>

      <section>
        <p className="mono kicker">TABS FOR THE COMPANY BINDER</p>
        <p className="lede">
          Twenty-two tabs. Same numbers as the program. Libraries sit behind
          their section: policies behind 13, SWPs behind 14, forms behind 17,
          SDS behind 18. The crane site binder is a second binder - folder 22.
        </p>
        <PackTabs />
      </section>

      <section>
        <p className="mono kicker">HOW TO TAB IT</p>
        <ul className="bullets">
          <li>2-inch D-ring binder. Write-on or 31-tab dividers.</li>
          <li>Print 00-START-HERE / 00-Binder-tab-inserts.pdf. Cut. Tape.</li>
          <li>Front pocket: table of contents and this read-me.</li>
          <li>Tab 18: field cards first, manufacturer SDS in sleeves, label out.</li>
          <li>
            Tab 22 is the map to the tower / self-erect / mobile site binder -
            not the place to file NOP-TC.
          </li>
        </ul>
      </section>

      <section>
        <p className="mono kicker">MANUFACTURER SDS IN THE PACK</p>
        <p className="lede">
          Common products a crane crew meets. Replace them when the drum on
          site is a different brand.
        </p>
        <div className="wire-table-wrap">
          <PackSdsIndex />
        </div>
      </section>

      <section>
        <p className="mono kicker">FOLDER STRUCTURE</p>
        <PackOutline />
      </section>

      <p className="lede mt">
        <Link href="/safety">Back to the program</Link>
        {" · "}
        <Link href="/safety/whmis-sds">WHMIS + SDS</Link>
        {" · "}
        <Link href="/safety/binder">Crane binders</Link>
      </p>
      <ProvenColophon />
    </article>
  );
}
