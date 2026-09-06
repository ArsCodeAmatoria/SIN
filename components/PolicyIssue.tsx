"use client";

import { useState } from "react";
import { IssuerCard } from "@/components/IssuerCard";
import { loadIssuer } from "@/lib/ohs/issuer";
import {
  downloadPolicyPdf,
  policyPdfFilename,
  policyToPdf,
} from "@/lib/ohs/policy-pdf";
import type { Policy } from "@/lib/ohs/types";

export function PolicyIssue({ policy }: { policy: Policy }) {
  const [busy, setBusy] = useState("");

  async function download() {
    setBusy("Building PDF…");
    try {
      const issuer = loadIssuer();
      const bytes = await policyToPdf(policy, issuer);
      downloadPolicyPdf(bytes, policyPdfFilename(policy, issuer));
      setBusy("");
    } catch {
      setBusy("PDF failed.");
    }
  }

  return (
    <div className="policy-issue">
      <IssuerCard />
      <div className="form-actions">
        <button type="button" className="btn btn-solid" onClick={download}>
          DOWNLOAD POLICY PDF
        </button>
      </div>
      {busy ? <p className="fb-warn">{busy}</p> : null}
    </div>
  );
}
