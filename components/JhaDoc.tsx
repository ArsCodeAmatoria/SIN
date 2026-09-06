import Link from "next/link";
import { RiskBadge } from "@/components/RiskBadge";
import { SafetyControlStamp } from "@/components/SafetyControl";
import type { Jha } from "@/lib/ohs";

export function JhaDoc({ doc }: { doc: Jha }) {
  return (
    <div className="prose">
      <SafetyControlStamp number={doc.number} title={doc.title} />
      <h2>THE JOB</h2>
      <p>{doc.job}</p>
      <h2>WHO IS EXPOSED</h2>
      <ul className="bullets">
        {doc.people.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        A JHA names what can hurt someone and how that risk is controlled. It
        is not the procedure. Do the work to the matching SWP. WorkSafeBC does
        not prescribe a JHA form — the Workers Compensation Act s. 21(2)(b)
        requires workers to be made aware of known or reasonably foreseeable
        hazards. This is how Proven does that for this job.
      </p>
      <h2>HAZARDS AND RISK</h2>
      <div className="wire-table-wrap">
        <p className="mono">
          Task is the work being analysed — not a procedure to follow. Controls
          follow the hierarchy: eliminate, substitute, engineer, administer,
          PPE last. The badge is how bad this task going wrong is in this job.
          Extreme is the killer with no recovery. High is serious injury or a
          dropped load you still have a chance to stop. Moderate is lost time
          or a plan that failed. Low is first aid.
        </p>
        <p className="risk-legend" aria-label="Risk levels">
          <RiskBadge level="low" />
          <RiskBadge level="moderate" />
          <RiskBadge level="high" />
          <RiskBadge level="extreme" />
        </p>
        <table className="wire-table">
          <thead>
            <tr>
              <th className="mono">TASK</th>
              <th className="mono">HAZARD</th>
              <th className="mono">RISK</th>
              <th className="mono">CONTROL</th>
            </tr>
          </thead>
          <tbody>
            {doc.rows.map((row) => (
              <tr key={`${row.task}-${row.hazard}`}>
                <td>{row.task}</td>
                <td>{row.hazard}</td>
                <td>
                  <RiskBadge level={row.level} />
                  {row.risk}
                </td>
                <td>{row.control}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>RESIDUAL RISK</h2>
      <p>{doc.residual}</p>
      <h2>THE JOB DOES NOT PROCEED IF</h2>
      <ul className="bullets">
        {doc.stop.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>PPE — LAST LINE</h2>
      <ul className="bullets">
        {doc.ppe.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {doc.swpHref && doc.swpLabel ? (
        <p className="doc-cta">
          <Link href={doc.swpHref}>{doc.swpLabel}</Link>
        </p>
      ) : null}
      <h2>REFERENCES</h2>
      <ul className="bullets">
        {doc.references.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
