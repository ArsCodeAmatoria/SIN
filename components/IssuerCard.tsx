"use client";

import { useEffect, useState } from "react";
import { SignatureField } from "@/components/form-builder/SignatureField";
import {
  EMPTY_ISSUER,
  fileToDataUrl,
  loadIssuer,
  saveIssuer,
  type Issuer,
} from "@/lib/ohs/issuer";
import type { SignatureValue } from "@/lib/form-builder/types";

export function IssuerCard({ compact = false }: { compact?: boolean }) {
  const [issuer, setIssuer] = useState<Issuer>(EMPTY_ISSUER);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIssuer(loadIssuer());
    setReady(true);
  }, []);

  function patch(partial: Partial<Issuer>) {
    setIssuer((prev) => {
      const next = { ...prev, ...partial };
      saveIssuer(next);
      return next;
    });
  }

  if (!ready) return null;

  const sig: SignatureValue = {
    kind: issuer.signatureDataUrl ? "drawn" : "typed",
    printed: issuer.signedBy,
    date: new Date().toISOString().slice(0, 10),
    typed: issuer.signatureTyped,
    dataUrl: issuer.signatureDataUrl || undefined,
  };

  return (
    <section className={`issuer-card${compact ? " is-compact" : ""}`}>
      <p className="mono kicker">YOUR COMPANY ON THE PDF</p>
      {compact ? null : (
        <p className="lede mt">
          Name, logo and signature stay on this device. They print on Proven
          forms, policies and binders you download — not on the public document.
        </p>
      )}
      <div className="binder-fields">
        <label className="field">
          <span>Company / contractor</span>
          <input
            type="text"
            value={issuer.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="The name that issues this copy"
          />
        </label>
        <label className="field">
          <span>Logo</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                patch({ logoDataUrl: await fileToDataUrl(file) });
              } catch {
                patch({ logoDataUrl: "" });
              }
            }}
          />
        </label>
        <label className="field">
          <span>Signed by</span>
          <input
            type="text"
            value={issuer.signedBy}
            onChange={(e) => patch({ signedBy: e.target.value })}
            placeholder="Name on the signature block"
          />
        </label>
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            value={issuer.title}
            onChange={(e) => patch({ title: e.target.value })}
            placeholder="Owner, supervisor, safety"
          />
        </label>
      </div>
      {issuer.logoDataUrl ? (
        <p className="issuer-logo-preview">
          <img src={issuer.logoDataUrl} alt="" />
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => patch({ logoDataUrl: "" })}
          >
            REMOVE LOGO
          </button>
        </p>
      ) : null}
      <p className="mono steel issuer-sig-label">SIGNATURE</p>
      <SignatureField
        fill
        value={sig}
        onChange={(v) =>
          patch({
            signedBy: v.printed || issuer.signedBy,
            signatureTyped: v.typed ?? "",
            signatureDataUrl: v.dataUrl ?? "",
          })
        }
      />
    </section>
  );
}
