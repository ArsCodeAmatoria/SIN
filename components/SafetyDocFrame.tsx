import type { ReactNode } from "react";
import Link from "next/link";
import { DocBadge } from "@/components/DocBadge";
import { ProvenName } from "@/components/ProvenMark";
import { shortNumber } from "@/lib/ohs/doc";
import { SITE } from "@/lib/site";

export function SafetyDocFrame({
  kicker,
  num,
  number,
  title,
  intro,
  children,
  backHref,
  backLabel,
}: {
  kicker: string;
  num?: string;
  number?: string;
  title: string;
  intro: string;
  children: ReactNode;
  backHref: string;
  backLabel: string;
}) {
  const display = num ?? (number ? shortNumber(number) : "");
  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">{kicker}</p>
        {number ? <DocBadge number={number} /> : null}
        {display ? <div className="num">{display}</div> : null}
        <h1 className="display">{title}</h1>
        <p className="lede mt">{intro}</p>
      </header>
      {children}
      <nav className="pager">
        <Link href={backHref}>
          <span className="mono steel">LIBRARY</span>
          <strong className="display">{backLabel}</strong>
        </Link>
        <Link href="/safety">
          <span className="mono steel">INDEX</span>
          <strong className="display">
            <ProvenName />
          </strong>
        </Link>
      </nav>
      <p className="mono steel doc-colophon">
        <ProvenName />
        <span>{SITE.legalName}. Current version on this site.</span>
      </p>
    </article>
  );
}
