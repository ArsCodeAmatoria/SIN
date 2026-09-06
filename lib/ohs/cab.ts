import { FORM_TEMPLATES } from "@/lib/form-builder/templates";
import { STANDARDS } from "@/lib/site";
import { safetyCatalog } from "./catalog";

/** Bump when the service worker cache name changes. */
export const CAB_VERSION = "1";

export type CabManifest = {
  version: string;
  urls: string[];
};

/**
 * Pages and marks that belong in the cab copy: Proven + sling desk.
 * Not REDTC, REDMC, or the Wire. Not WorkSafeBC / BCCS PDFs.
 */
export function cabUrls(): string[] {
  const urls = new Set<string>(["/safety", "/sling", "/icon.svg"]);
  for (const item of safetyCatalog()) {
    if (item.href.startsWith("/")) urls.add(item.href);
  }
  for (const form of FORM_TEMPLATES) {
    urls.add(`/safety/builder/${form.id}`);
  }
  for (const item of STANDARDS) {
    if ("logo" in item && item.logo) urls.add(item.logo);
    if ("logoOnInk" in item && item.logoOnInk) urls.add(item.logoOnInk);
  }
  return [...urls].sort();
}

export function cabManifest(): CabManifest {
  return { version: CAB_VERSION, urls: cabUrls() };
}
