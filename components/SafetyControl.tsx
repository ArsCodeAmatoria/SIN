import type { DocControl } from "@/lib/ohs";
import { OHS_META } from "@/lib/ohs";
import { controlTypeLabel } from "@/lib/ohs/doc";

export function SafetyControl({
  doc,
  current = true,
}: {
  doc: DocControl;
  current?: boolean;
}) {
  return (
    <dl className="ohs-control">
      <div>
        <dt className="mono">TYPE</dt>
        <dd className="display">{controlTypeLabel(doc.number)}</dd>
      </div>
      <div>
        <dt className="mono">DOCUMENT</dt>
        <dd className="display">{doc.number}</dd>
      </div>
      <div>
        <dt className="mono">STATUS</dt>
        <dd>
          {current ? <span className="ohs-current">CURRENT</span> : "WORKING COPY"}
        </dd>
      </div>
      <div>
        <dt className="mono">REVISION</dt>
        <dd>{doc.revision}</dd>
      </div>
      <div>
        <dt className="mono">EFFECTIVE</dt>
        <dd>{doc.effective}</dd>
      </div>
      <div>
        <dt className="mono">OWNER</dt>
        <dd>{doc.owner}</dd>
      </div>
      <div>
        <dt className="mono">APPROVED BY</dt>
        <dd>{doc.approvedBy}</dd>
      </div>
      <div>
        <dt className="mono">REVIEW</dt>
        <dd>{doc.review}</dd>
      </div>
    </dl>
  );
}

export function SafetyControlStamp({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <SafetyControl
      doc={{
        number,
        title,
        ...OHS_META,
      }}
    />
  );
}
