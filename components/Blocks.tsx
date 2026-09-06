import { ProcedureSteps } from "./ProcedureSteps";
import type { Block } from "@/lib/safety";
import Link from "next/link";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        if (block.type === "p") return <p key={i}>{block.text}</p>;
        if (block.type === "h") return <h2 key={i}>{block.text}</h2>;
        if (block.type === "quote")
          return (
            <blockquote className="quote" key={i}>
              {block.text}
            </blockquote>
          );
        if (block.type === "list")
          return (
            <ul className="bullets" key={i}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        if (block.type === "steps")
          return <ProcedureSteps key={i} items={block.items} />;
        if (block.type === "cta") {
          const offsite = /^https?:\/\//i.test(block.href);
          const binder = block.href.includes("/binder");
          return (
            <p className={`doc-cta${binder ? " is-binder" : ""}`} key={i}>
              {offsite ? (
                <a href={block.href} target="_blank" rel="noreferrer">
                  {block.label}
                </a>
              ) : (
                <Link href={block.href}>{block.label}</Link>
              )}
            </p>
          );
        }
        if (block.type === "table") {
          return (
            <div className="wire-table-wrap" key={i}>
              {block.caption ? (
                <p className="mono">{block.caption}</p>
              ) : null}
              <table className="wire-table">
                <thead>
                  <tr>
                    {block.columns.map((col) => (
                      <th key={col} className="mono">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
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
        return (
          <div className="rules" key={i}>
            {block.items.map((rule) => (
              <article className="rule" key={rule.title}>
                <h3 className="display">{rule.title}</h3>
                <p>{rule.body}</p>
              </article>
            ))}
          </div>
        );
      })}
    </div>
  );
}
