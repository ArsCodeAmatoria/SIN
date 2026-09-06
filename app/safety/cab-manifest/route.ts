import { cabManifest } from "@/lib/ohs/cab";

export const dynamic = "force-static";

export function GET() {
  return Response.json(cabManifest(), {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
}
