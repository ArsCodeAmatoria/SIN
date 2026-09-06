"use client";

import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import { downloadPdf, formToPdf, pdfFilename } from "@/lib/form-builder/pdf";
import { loadIssuer } from "@/lib/ohs/issuer";
import type { FormValues, FormDef } from "@/lib/form-builder/types";

export function EmailPdf({
  form,
  values,
}: {
  form: FormDef;
  values: FormValues;
}) {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState(`${form.number} ${form.title}`);
  const [message, setMessage] = useState(
    "Proven completed safety form attached.",
  );
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    setStatus("");
    setBusy(true);
    try {
      const bytes = await formToPdf(form, values, loadIssuer());
      let binary = "";
      bytes.forEach((b) => {
        binary += String.fromCharCode(b);
      });
      const pdfBase64 = btoa(binary);
      const res = await fetch("/api/safety/form-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          cc,
          subject,
          message,
          filename: pdfFilename(form),
          pdfBase64,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; reason?: string };
      if (json.ok) {
        setStatus("Sent.");
        return;
      }
      if (json.reason === "email-not-configured") {
        downloadPdf(bytes, pdfFilename(form));
        setStatus("Email is not configured on this site. PDF downloaded instead.");
        return;
      }
      setStatus("Could not send. Download the PDF.");
    } catch {
      setStatus("Could not send. Download the PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="btn btn-ghost" onClick={() => setOpen(true)}>
        EMAIL PDF
      </button>
      <Dialog open={open} title="EMAIL PDF" onClose={() => setOpen(false)}>
        <div className="fb-email">
          <label className="field">
            <span className="mono">TO</span>
            <input
              type="email"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <label className="field">
            <span className="mono">CC</span>
            <input type="email" value={cc} onChange={(e) => setCc(e.target.value)} />
          </label>
          <label className="field">
            <span className="mono">SUBJECT</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>
          <label className="field">
            <span className="mono">MESSAGE</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          {status ? <p className="steel">{status}</p> : null}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-solid"
              disabled={busy || !to.trim()}
              onClick={() => void send()}
            >
              {busy ? "SENDING…" : "SEND"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              CLOSE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
