import type { MetadataRoute } from "next";
import { ORIGIN } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
    ],
    host: ORIGIN,
  };
}
