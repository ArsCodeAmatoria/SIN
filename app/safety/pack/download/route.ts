import { PACK_FILENAME, buildOhsPack } from "@/lib/ohs/pack";

export const dynamic = "force-static";
export const revalidate = false;
export const runtime = "nodejs";

export async function GET() {
  const { bytes } = await buildOhsPack();
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new Response(copy, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${PACK_FILENAME}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
