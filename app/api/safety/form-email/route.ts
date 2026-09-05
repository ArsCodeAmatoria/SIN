import { NextResponse } from "next/server";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const to = String(data.to ?? "").trim();
  const cc = String(data.cc ?? "").trim();
  const subject = String(data.subject ?? "sin() safety form").trim();
  const message = String(data.message ?? "").trim();
  const filename = String(data.filename ?? "sin-form.pdf").replace(
    /[^\w.\-]+/g,
    "_"
  );
  const pdfBase64 = String(data.pdfBase64 ?? "");
  if (!validEmail(to) || !pdfBase64 || pdfBase64.length > 12_000_000) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (cc && !validEmail(cc)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.PROVEN_FORM_FROM || process.env.WHOOP_FORM_FROM || "sin() <noreply@sin.ae.org>";
  if (!key) {
    return NextResponse.json({ ok: false, reason: "email-not-configured" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      cc: cc ? [cc] : undefined,
      subject,
      text: message || "Proven completed safety form attached.",
      attachments: [{ filename, content: pdfBase64 }],
    }),
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
