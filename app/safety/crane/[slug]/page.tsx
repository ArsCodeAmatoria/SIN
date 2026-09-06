import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafetyControlStamp } from "@/components/SafetyControl";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { CRANES, getCrane } from "@/lib/ohs/cranes";
import { pageMeta, provenTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CRANES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getCrane(slug);
  if (!doc) return pageMeta({ title: "Crane", description: "Crane chart and inspection pack.", path: "/safety" });
  return pageMeta({
    title: provenTitle(doc.number, doc.title),
    description: doc.summary,
    path: `/safety/crane/${slug}`,
  });
}

export default async function CranePage({ params }: Props) {
  const { slug } = await params;
  const doc = getCrane(slug);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker={`${doc.maker.toUpperCase()} · ${doc.family}`}
      number={doc.number}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/inspections"
      backLabel="INSPECTIONS"
    >
      <div className="prose">
        <SafetyControlStamp number={doc.number} title={doc.title} />
        <p>
          Lift to the serial chart in the cab — this jib, this reeving, this
          mast, this ballast.{" "}
          {doc.maker === "WOLFFKRAN" ? (
            <>
              The files below are WOLFFKRAN published data sheets from the
              Canada site. Technical information PDFs are the full load tables.
              Operator and maintenance manuals for this serial live in the cab.
              WOLFF Assist and Calgary service support the interval.
            </>
          ) : doc.maker === "Liebherr" ? (
            <>
              The files below are Liebherr published data sheets from the
              Canada tower-crane site. LN sheets are the load tables. Operator
              and maintenance manuals for this serial live in the cab, on the
              Tower Crane Portal and on MyLiebherr.
            </>
          ) : doc.maker === "Zoomlion" ? (
            <>
              The files below are Zoomlion published product pages and Manual
              Download PDFs from the English product site. Serial operator and
              maintenance manuals live in the cab.
            </>
          ) : doc.maker === "Raimondi" || doc.maker === "Terex" ? (
            <>
              The files below are published on raimondi.com. Terex Tower Cranes
              and Self-Erecting Cranes now sit under Raimondi. Data sheets are
              the Downloads on each product page. Serial manuals live in the
              cab. T-Link, T-Torque and Terex Power Plus where fitted.
            </>
          ) : doc.maker === "Jaso" ? (
            <>
              The files below are JASO published technical sheets from the
              English tower site. EN 14439 C25 and FEM 1001. Serial operator
              and maintenance manuals live in the cab. Smartlink and Eco Mode
              where fitted.
            </>
          ) : doc.maker === "Pecco" ? (
            <>
              The files below are Morrow published Pecco / Peiner range
              sheets. Peiner built them. Pecco was the North American name.
              Terex took Peiner in 1998. Current Terex SK hammerheads sit
              under Raimondi. Serial operator and maintenance manuals live
              in the cab.
            </>
          ) : (
            <>
              The files below are Manitowoc published range sheets. Operator,
              maintenance and lubrication manuals for this serial live in the
              cab and on Manitowoc Crane Care.
            </>
          )}
        </p>
        <p className="doc-cta">
          <a href={doc.productUrl} target="_blank" rel="noreferrer">
            {doc.maker.toUpperCase()} PRODUCT PAGE →
          </a>
        </p>
        <h2>PUBLISHED RANGE</h2>
        <div className="rules">
          {doc.specs.map((item) => (
            <article className="rule" key={item.title}>
              <h3 className="display">{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <h2>LOAD CHARTS + DATA SHEETS</h2>
        {doc.charts.map((item) => (
          <div key={item.href}>
            <p className="doc-cta">
              {item.href.startsWith("/") ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              )}
            </p>
            {item.note ? <p>{item.note}</p> : null}
          </div>
        ))}
        <h2>MANUALS + MAINTENANCE</h2>
        {doc.manuals.map((item) => (
          <div key={item.href}>
            <p className="doc-cta">
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </p>
            {item.note ? <p>{item.note}</p> : null}
          </div>
        ))}
        <h2>INSPECT</h2>
        <ul className="bullets">
          {doc.inspect.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>MAINTAIN</h2>
        <ul className="bullets">
          {doc.maint.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>PROVEN FORMS</h2>
        {doc.forms.map((item) => (
          <p className="doc-cta" key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </p>
        ))}
      </div>
    </SafetyDocFrame>
  );
}
