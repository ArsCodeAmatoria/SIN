/* sin() cab copy — Proven + sling desk. Not the exam banks. Not the Wire. */
const CACHE = "sin-cab-v2";
const OFFLINE = "/cab-offline.html";
const MANIFEST = "/safety/cab-manifest";
const SHELL = [OFFLINE, "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "cab-warm") return;
  event.waitUntil(warm(event.source));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.headers.has("range")) return;
  if (skipPath(url.pathname)) return;

  if (isMark(url.pathname)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  if (isStatic(url.pathname)) {
    event.respondWith(networkFirst(req, url));
    return;
  }

  if (isCab(url.pathname)) {
    if (req.mode === "navigate") {
      event.respondWith(networkFirstPage(req, url));
      return;
    }
    event.respondWith(networkFirst(req, url));
  }
});

function skipPath(pathname) {
  const local =
    self.location.hostname === "localhost" || self.location.hostname === "127.0.0.1";
  return (
    pathname.endsWith(".pdf") ||
    pathname.endsWith(".zip") ||
    pathname.startsWith("/redtc") ||
    pathname.startsWith("/redmc") ||
    pathname.startsWith("/wire") ||
    pathname.startsWith("/_next/webpack") ||
    (local && pathname.startsWith("/_next/")) ||
    pathname.endsWith(".map")
  );
}

function isCab(pathname) {
  return pathname === "/sling" || pathname.startsWith("/sling/") || pathname === "/safety" || pathname.startsWith("/safety/");
}

function isStatic(pathname) {
  return pathname.startsWith("/_next/static/");
}

function isMark(pathname) {
  return pathname.startsWith("/marks/") || pathname === "/icon.svg" || pathname === OFFLINE;
}

function pageKey(url) {
  return url.origin + url.pathname;
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return new Response("", { status: 503, statusText: "Offline" });
  }
}

async function networkFirst(req, url) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) {
      cache.put(req, res.clone());
      if (isCab(url.pathname) && !isRsc(req)) {
        cache.put(pageKey(url), res.clone());
      }
    }
    return res;
  } catch (err) {
    const hit = (await cache.match(req)) || (await cache.match(pageKey(url), { ignoreSearch: true }));
    if (hit) return hit;
    throw err;
  }
}

async function networkFirstPage(req, url) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) {
      cache.put(pageKey(url), res.clone());
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const hit =
      (await cache.match(pageKey(url))) ||
      (await cache.match(req)) ||
      (await cache.match(OFFLINE));
    if (hit) return hit;
    throw err;
  }
}

function isRsc(req) {
  return req.headers.get("RSC") === "1" || req.headers.get("Next-Router-Prefetch") != null;
}

let warming = false;

async function warm(client) {
  if (warming) return;
  warming = true;
  try {
    let urls = [];
    try {
      const res = await fetch(MANIFEST, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      urls = Array.isArray(data.urls) ? data.urls : [];
    } catch (err) {
      return;
    }

    const cache = await caches.open(CACHE);
    let done = 0;
    const queue = urls.filter((path) => typeof path === "string" && path.startsWith("/"));
    const total = queue.length;

    async function worker() {
      for (;;) {
        const path = queue.shift();
        if (!path) return;
        try {
          await cacheTree(cache, path);
        } catch (err) {
          /* keep going */
        }
        done += 1;
        if (done === total || done % 15 === 0) {
          say(client, { type: "cab", state: done === total ? "ready" : "warming", done, total });
        }
      }
    }

    say(client, { type: "cab", state: "warming", done: 0, total });
    await Promise.all([worker(), worker(), worker()]);
    say(client, { type: "cab", state: "ready", done, total });
  } finally {
    warming = false;
  }
}

function say(_client, payload) {
  self.clients.matchAll({ type: "window" }).then((windows) => {
    for (const c of windows) c.postMessage(payload);
  });
}

async function cacheTree(cache, path) {
  const url = new URL(path, self.location.origin);
  if (skipPath(url.pathname)) return;
  const key = pageKey(url);
  if (await cache.match(key)) {
    return;
  }
  const res = await fetch(url, { credentials: "same-origin" });
  if (!res.ok) return;
  const copy = res.clone();
  const type = res.headers.get("content-type") || "";
  await cache.put(key, copy);
  if (!type.includes("text/html") && !type.includes("text/css")) return;
  const body = await res.text();
  const found = new Set();
  const re = /\/_next\/static\/[a-zA-Z0-9._\-\/]+/g;
  let m;
  while ((m = re.exec(body))) {
    if (!m[0].endsWith(".map")) found.add(m[0]);
  }
  for (const asset of found) {
    const assetUrl = new URL(asset, self.location.origin);
    if (await cache.match(assetUrl)) continue;
    try {
      const assetRes = await fetch(assetUrl, { credentials: "same-origin" });
      if (assetRes.ok) await cache.put(assetUrl, assetRes.clone());
      const assetType = assetRes.headers.get("content-type") || "";
      if (assetType.includes("text/css")) {
        const css = await assetRes.text();
        const fonts = css.match(/\/_next\/static\/media\/[a-zA-Z0-9._\-]+/g) || [];
        for (const font of fonts) {
          const fontUrl = new URL(font, self.location.origin);
          if (await cache.match(fontUrl)) continue;
          const fontRes = await fetch(fontUrl, { credentials: "same-origin" });
          if (fontRes.ok) await cache.put(fontUrl, fontRes);
        }
      }
    } catch (err) {
      /* asset miss is fine; page HTML is stored */
    }
  }
}
