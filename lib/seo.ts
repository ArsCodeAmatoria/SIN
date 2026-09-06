import type { Metadata } from "next";
import { AUTHOR, SITE } from "@/lib/site";

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
  index?: boolean;
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
  index = true,
}: PageMetaInput): Metadata {
  const url = absUrl(path);
  const ogImages = (images?.length ? images : [SHARE_IMAGE]).map((image) => {
    const imageUrl = absUrl(image.url);
    const ext = imageUrl.split("?")[0].split(".").pop()?.toLowerCase();
    const imageType =
      image.url === SHARE_IMAGE.url || ext === "png"
        ? ("image/png" as const)
        : ext === "jpg" || ext === "jpeg"
          ? ("image/jpeg" as const)
          : ext === "webp"
            ? ("image/webp" as const)
            : undefined;
    return {
      url: imageUrl,
      alt: image.alt ?? title,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      ...(imageType ? { type: imageType } : {}),
    };
  });

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
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

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": `${ORIGIN}/#org`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: ORIGIN,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.descriptionLong,
    areaServed: SITE.location,
    logo: absUrl("/og.png"),
    image: absUrl("/og.png"),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    name: SITE.name,
    url: ORIGIN,
    description: SITE.description,
    inLanguage: "en-CA",
    publisher: { "@id": `${ORIGIN}/#org` },
  };
}

export function personLd() {
  return {
    "@type": "Person",
    "@id": `${ORIGIN}/about#author`,
    name: AUTHOR.name,
    url: absUrl(AUTHOR.path),
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.bio,
    worksFor: { "@id": `${ORIGIN}/#org` },
  };
}

export function breadcrumbLd(items: { name: string; path?: string }[]) {
  const listed = items.filter((item) => item.name && item.path);
  return {
    "@type": "BreadcrumbList",
    itemListElement: listed.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.path as string),
    })),
  };
}

export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
