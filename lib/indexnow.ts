import { ORIGIN } from "@/lib/seo";

/** 8–128 chars, [a-zA-Z0-9-]. Public by design — engines fetch this file to prove host ownership. */
export const INDEXNOW_KEY = "ea5497ae4d184e49ba89e75b7d4c1cf7";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function indexNowHost() {
  return new URL(ORIGIN).host;
}

export function indexNowKeyLocation() {
  return `${ORIGIN}/${INDEXNOW_KEY}.txt`;
}

export async function submitIndexNow(urls: string[]) {
  const host = indexNowHost();
  const urlList = [...new Set(urls)].filter((url) => {
    try {
      return new URL(url).host === host;
    } catch {
      return false;
    }
  });

  if (!urlList.length) {
    throw new Error("IndexNow: no URLs for this host");
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: indexNowKeyLocation(),
      urlList,
    }),
  });

  const body = await res.text();
  if (![200, 202].includes(res.status)) {
    throw new Error(`IndexNow ${res.status}: ${body || res.statusText}`);
  }

  return { status: res.status, count: urlList.length, urlList };
}
