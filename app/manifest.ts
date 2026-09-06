import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} Proven`,
    short_name: "Proven",
    description:
      "Crane safety program and sling desk. Open once on a network. Stays on this device when the trailer Wi-Fi is dead.",
    start_url: "/safety",
    scope: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#ffd500",
    lang: "en-CA",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
