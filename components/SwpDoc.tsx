import Link from "next/link";
import { ProcedureSteps } from "@/components/ProcedureSteps";
import { SafetyControlStamp } from "@/components/SafetyControl";
import { RelatedWork } from "@/components/RelatedWork";
import type { DocLink, DocTable, Swp } from "@/lib/ohs";
import { governedBy, recordsFor } from "@/lib/ohs/relations";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <>
      <h2>{title}</h2>
      <ul className="bullets">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

function DocTableView({ table }: { table: DocTable }) {
  return (
    <div className="wire-table-wrap">
      {table.caption ? <p className="mono">{table.caption}</p> : null}
      <table className="wire-table">
        <thead>
          <tr>
            {table.columns.map((col) => (
              <th key={col} className="mono">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocCta({ link }: { link: DocLink }) {
  if (link.external || /^https?:\/\//i.test(link.href)) {
    return (
      <p className="doc-cta">
        <a href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      </p>
    );
  }
  return (
    <p className="doc-cta">
      <Link href={link.href}>{link.label}</Link>
    </p>
  );
}

export function SwpDoc({ doc }: { doc: Swp }) {
  return (
    <div className="prose">
      <SafetyControlStamp number={doc.number} title={doc.title} />
      <RelatedWork
        governed={governedBy(`swp/${doc.slug}`)}
        records={recordsFor(`swp/${doc.slug}`)}
      />
      {(doc.links ?? []).map((link) => (
        <DocCta key={link.href + link.label} link={link} />
      ))}
      {(doc.links ?? [])
        .filter((link) => link.note)
        .map((link) => (
          <p key={link.href}>{link.note}</p>
        ))}
      <h2>PURPOSE</h2>
      <p>{doc.purpose}</p>
      <h2>SCOPE</h2>
      <p>{doc.scope}</p>
      <p>
        This document is the method — the steps. Hazards, consequence and
        residual risk for the same work are in the{" "}
        <Link href="/safety/jha-library">JHA library</Link>. A procedure is
        not a hazard analysis. A hazard analysis is not a procedure.
      </p>
      {(doc.tables ?? []).map((table) => (
        <DocTableView key={table.caption ?? table.columns.join()} table={table} />
      ))}
      <h2>PROCEDURE</h2>
      <ProcedureSteps items={doc.procedure} />
      <h2>RESPONSIBILITIES</h2>
      <div className="rules">
        {doc.responsibilities.map((role) => (
          <article className="rule" key={role.title}>
            <h3 className="display">{role.title}</h3>
            <p>{role.body}</p>
          </article>
        ))}
      </div>
      <List title="REQUIRED COMPETENCY" items={doc.competency} />
      <List title="EQUIPMENT" items={doc.equipment} />
      <List title="PPE" items={doc.ppe} />
      <List title="PROHIBITED PRACTICES" items={doc.prohibited} />
      <h2>EMERGENCY RESPONSE</h2>
      <p>{doc.emergency}</p>
      <List title="DOCUMENTATION" items={doc.documentation} />
      <List title="REFERENCES" items={doc.references} />
    </div>
  );
}
