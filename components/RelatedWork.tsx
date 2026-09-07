import Link from "next/link";
import type { RelatedLink } from "@/lib/ohs/relations";

export function RelatedWork({
  records,
  governed,
}: {
  records?: RelatedLink[];
  governed?: RelatedLink;
}) {
  if (!governed && !records?.length) return null;
  return (
    <div className="related-work">
      {governed ? (
        <p className="doc-cta">
          <span className="mono steel related-kicker">GOVERNING PROCEDURE</span>
          <Link href={governed.href}>{governed.label}</Link>
        </p>
      ) : null}
      {records?.length ? (
        <nav className="related-records" aria-label="Required records">
          <p className="mono kicker">REQUIRED RECORDS</p>
          {records.map((item) => (
            <p className="doc-cta" key={item.href + item.label}>
              <Link href={item.href}>{item.label}</Link>
            </p>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
