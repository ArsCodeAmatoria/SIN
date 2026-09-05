import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const ORIGIN = SITE.url;

export function absUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (path === "/" || path === "") return ORIGIN;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${ORIGIN}/`).toString();
}

type ShareImage = { url: string; alt?: string; width?: number; height?: number };

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  images?: ShareImage[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
};

const SHARE_IMAGE: ShareImage = {
  url: "/og.png",
  alt: SITE.title,
  width: 1200,
  height: 630,
};

export function pageMeta({
  title,
  description,
  path = "/",
  type = "website",
  images,
  publishedTime,
  modifiedTime,
  authors,
  section,
}: PageMetaInput): Metadata {
  const url = absUrl(path);
  const ogImages = (images?.length ? images : [SHARE_IMAGE]).map((image) => {
    const url = absUrl(image.url);
    const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
    const type =
      image.url === SHARE_IMAGE.url || ext === "png"
        ? ("image/png" as const)
        : ext === "jpg" || ext === "jpeg"
          ? ("image/jpeg" as const)
          : ext === "webp"
            ? ("image/webp" as const)
            : undefined;
    return {
      url,
      alt: image.alt ?? title,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      ...(type ? { type } : {}),
    };
  });

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_CA",
      type,
      images: ogImages,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}
