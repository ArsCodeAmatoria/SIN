import type { Metadata } from "next";
import { WireIndex } from "@/components/WhoopwireIndex";
import { pageMeta } from "@/lib/seo";
import { WIRE, getSummaries } from "@/lib/whoopwire";

export const metadata: Metadata = pageMeta({
  title: WIRE.name,
  description: WIRE.dek,
  path: "/whoopwire",
});

export default function WirePage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="mono kicker">{WIRE.name}</p>
        <h1 className="display giant">{WIRE.name}</h1>
        <p className="mono mt">{WIRE.descriptor}</p>
        <p className="lede mt-2">{WIRE.dek}</p>
      </header>
      <WireIndex stories={getSummaries()} />
    </>
  );
}
