import type { Metadata } from "next";
import { WireIndex } from "@/components/WhoopwireIndex";
import { pageMeta } from "@/lib/seo";
import { WIRE, getSummaries, wirePath } from "@/lib/whoopwire";

export const metadata: Metadata = pageMeta({
  title: "Crane Safety & Rigging Articles BC | The Wire",
  description:
    "Writing about crane safety, rigging, WorkSafeBC and the people who do the work in British Columbia. Not a newsletter mill.",
  path: wirePath(),
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
