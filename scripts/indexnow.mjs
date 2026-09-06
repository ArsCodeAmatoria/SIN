#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver, Yep). Google is not a member.
 *
 *   npm run indexnow              sitemap on https://sin.ae.org
 *   npm run indexnow -- --priority
 *   npm run indexnow -- --dry-run
 *   npm run indexnow -- --check
 *   npm run indexnow -- /redtc /wire
 *
 * The key file must already be live at the site root before the first POST.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ORIGIN = "https://sin.ae.org";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const PRIORITY = [
  "/",
  "/redtc",
  "/tower-crane-red-seal-practice-test",
  "/redmc",
  "/wire",
  "/wire/height-over-length-is-the-angle",
];

function findKey() {
  const dir = join(process.cwd(), "public");
  for (const name of readdirSync(dir)) {
    const match = name.match(/^([a-zA-Z0-9-]{8,128})\.txt$/);
    if (!match) continue;
    const body = readFileSync(join(dir, name), "utf8").trim();
    if (body === match[1]) return match[1];
  }
  throw new Error("IndexNow key file missing from public/");
}

function abs(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return path === "/" ? ORIGIN : `${ORIGIN}${path}`;
}

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

function sameHost(urls, host) {
  return [...new Set(urls)].filter((url) => {
    try {
      return new URL(url).host === host;
    } catch {
      return false;
    }
  });
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const check = args.includes("--check");
const priority = args.includes("--priority");
const extra = args.filter((arg) => !arg.startsWith("--"));

const key = findKey();
const host = new URL(ORIGIN).host;
const keyLocation = `${ORIGIN}/${key}.txt`;

if (check) {
  const res = await fetch(keyLocation);
  const body = (await res.text()).trim();
  if (!res.ok || body !== key) {
    console.error(`key file ${res.status} at ${keyLocation}`);
    process.exit(1);
  }
  console.log(`ok ${keyLocation}`);
  process.exit(0);
}

const listed = extra.length
  ? extra.map(abs)
  : priority
    ? PRIORITY.map(abs)
    : await sitemapUrls();
const urlList = sameHost(listed, host);

if (!urlList.length) {
  console.error("no URLs to submit");
  process.exit(1);
}

if (dryRun) {
  console.log(`${urlList.length} URLs → ${ENDPOINT}`);
  for (const url of urlList) console.log(url);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
const body = await res.text();
if (![200, 202].includes(res.status)) {
  console.error(`IndexNow ${res.status}: ${body || res.statusText}`);
  process.exit(1);
}
console.log(`IndexNow ${res.status} · ${urlList.length} URLs`);
