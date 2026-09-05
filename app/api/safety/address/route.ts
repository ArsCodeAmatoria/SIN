import { NextResponse } from "next/server";
import type { AddressHit } from "@/lib/form-builder/types";

const PROVINCE: Record<string, string> = {
  "british columbia": "BC",
  "alberta": "AB",
  "saskatchewan": "SK",
  "manitoba": "MB",
  "ontario": "ON",
  "quebec": "QC",
  "québec": "QC",
  "new brunswick": "NB",
  "nova scotia": "NS",
  "prince edward island": "PE",
  "newfoundland and labrador": "NL",
  "yukon": "YT",
  "northwest territories": "NT",
  "nunavut": "NU",
};

function regionCode(value: string) {
  const raw = value.trim();
  if (!raw) return "";
  if (/^[A-Z]{2}$/i.test(raw)) return raw.toUpperCase();
  return PROVINCE[raw.toLowerCase()] ?? raw;
}

function joinLabel(parts: string[]) {
  return parts.filter(Boolean).join(", ");
}

async function fromMapbox(q: string, token: string): Promise<AddressHit[]> {
  const url = new URL(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json`
  );
  url.searchParams.set("access_token", token);
  url.searchParams.set("country", "ca");
  url.searchParams.set("proximity", "-123.12,49.28");
  url.searchParams.set("types", "address,poi,place");
  url.searchParams.set("limit", "8");
  url.searchParams.set("language", "en");
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("mapbox");
  const data = (await res.json()) as {
    features?: {
      place_name?: string;
      text?: string;
      address?: string;
      context?: { id: string; text: string; short_code?: string }[];
    }[];
  };
  return (data.features ?? []).map((f) => {
    const ctx = f.context ?? [];
    const locality =
      ctx.find((c) => c.id.startsWith("place") || c.id.startsWith("locality"))
        ?.text ?? "";
    const regionRaw =
      ctx.find((c) => c.id.startsWith("region"))?.short_code?.replace(/^ca-/, "") ??
      ctx.find((c) => c.id.startsWith("region"))?.text ??
      "";
    const postcode = ctx.find((c) => c.id.startsWith("postcode"))?.text ?? "";
    const country = ctx.find((c) => c.id.startsWith("country"))?.text ?? "Canada";
    const line = [f.address, f.text].filter(Boolean).join(" ");
    const region = regionCode(regionRaw);
    return {
      label: f.place_name || joinLabel([line, locality, region, postcode]),
      line,
      locality,
      region,
      postcode,
      country,
    };
  });
}

type PhotonProps = {
  name?: string;
  street?: string;
  housenumber?: string;
  city?: string;
  town?: string;
  village?: string;
  district?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  countrycode?: string;
};

async function fromPhoton(q: string): Promise<AddressHit[]> {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", q);
  url.searchParams.set("limit", "8");
  url.searchParams.set("lang", "en");
  url.searchParams.set("lat", "49.28");
  url.searchParams.set("lon", "-123.12");
  const res = await fetch(url, {
    headers: { "User-Agent": "sin()/1.0 (https://sin.ae.org)" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error("photon");
  const data = (await res.json()) as { features?: { properties?: PhotonProps }[] };
  return (data.features ?? [])
    .map((f) => {
      const p = f.properties ?? {};
      const line = [p.housenumber, p.street || p.name].filter(Boolean).join(" ");
      const locality = p.city || p.town || p.village || p.district || p.county || "";
      const region = regionCode(p.state ?? "");
      const postcode = p.postcode ?? "";
      const country = p.country || (p.countrycode === "ca" ? "Canada" : p.countrycode || "");
      return {
        label: joinLabel([line, locality, region, postcode, country === "Canada" ? "" : country]),
        line,
        locality,
        region,
        postcode,
        country,
      };
    })
    .filter((h) => h.label)
    .sort((a, b) => Number(b.country === "Canada") - Number(a.country === "Canada"));
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 3 || q.length > 80) {
    return NextResponse.json({ results: [] satisfies AddressHit[] });
  }
  const token = process.env.MAPBOX_ACCESS_TOKEN || process.env.MAPBOX_TOKEN;
  try {
    const results = token ? await fromMapbox(q, token) : await fromPhoton(q);
    return NextResponse.json({ results: results.slice(0, 8) });
  } catch {
    return NextResponse.json({ results: [] satisfies AddressHit[] }, { status: 502 });
  }
}
