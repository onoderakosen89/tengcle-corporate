import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const SITE_ORIGIN = "https://www.tengcle.com";
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function fail(message) {
  failures.push(message);
}

const sourceFiles = (
  await Promise.all(
    ["client", "src"].map(directory => walk(path.join(root, directory)))
  )
)
  .flat()
  .filter(file => /\.(?:astro|html|tsx?|xml|json)$/.test(file));
const forbiddenSourcePatterns = [
  ["retired TCSP claim", /\bTCSP\b/i],
  ["retired LCC claim", /\bLCC\b/],
  ["known mojibake", /食競|優遅|上璐|上璯|Tengcle株式会社/],
  [
    "obsolete US establishment copy",
    /設立準備中|筹备中|\bEstablishing\b|正式登記予定|scheduled to be officially registered/,
  ],
  [
    "unresolved analytics placeholder",
    /%VITE_ANALYTICS_(?:ENDPOINT|WEBSITE_ID)%/,
  ],
  ["missing legacy OGP filename", /og-image(?:-(?:hk|jp|us))?\.jpg/],
];

for (const file of sourceFiles) {
  const contents = await readFile(file, "utf8");
  for (const [label, pattern] of forbiddenSourcePatterns) {
    if (pattern.test(contents)) fail(`${label}: ${path.relative(root, file)}`);
  }
}

const repoScanExcludedDirectories = new Set([
  ".astro",
  ".git",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);
async function walkRepoText(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && repoScanExcludedDirectories.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walkRepoText(fullPath)));
    else if (/\.(?:astro|html|md|mjs|tsx?|xml|json|ya?ml)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const approvedPublicEmails = new Set([
  "hk@tengcle.com",
  "jp@tengcle.com",
  "us@tengcle.com",
  "careers-jp@tengcle.com",
  "privacy@tengcle.com",
]);
for (const file of await walkRepoText(root)) {
  if (path.basename(file) === "pnpm-lock.yaml") continue;
  const contents = await readFile(file, "utf8");
  const addresses = contents.match(/[A-Z0-9._%+-]+@tengcle\.com/gi) ?? [];
  for (const address of addresses) {
    if (!approvedPublicEmails.has(address.toLowerCase())) {
      fail(
        `unapproved public Tengcle email ${address}: ${path.relative(root, file)}`
      );
    }
  }
}

const outputDirectory = path.join(root, "dist", "public");
const builtHtml = (await walk(outputDirectory)).filter(file =>
  file.endsWith(".html")
);
for (const file of builtHtml) {
  const contents = await readFile(file, "utf8");
  if (/manus-runtime|vite-plugin-manus|jsx-loc/i.test(contents)) {
    fail(`development runtime leaked into ${path.relative(root, file)}`);
  }
  if (/%VITE_[A-Z0-9_]+%/.test(contents)) {
    fail(`unresolved Vite placeholder in ${path.relative(root, file)}`);
  }
  const executableInlineScripts = [
    ...contents.matchAll(
      /<script(?![^>]*type=["']application\/ld\+json["'])([^>]*)>([\s\S]*?)<\/script>/gi
    ),
  ].filter(match => !/\ssrc=["'][^"']+["']/.test(match[1]) && match[2].trim());
  if (executableInlineScripts.length) {
    fail(
      `inline executable script violates the deployed CSP in ${path.relative(root, file)}`
    );
  }
  const rawBytes = Buffer.byteLength(contents);
  const gzipBytes = gzipSync(contents).byteLength;
  if (rawBytes > 50_000 || gzipBytes > 20_000) {
    fail(
      `initial HTML budget exceeded in ${path.relative(root, file)}: ${rawBytes} raw / ${gzipBytes} gzip bytes`
    );
  }
}

const notFoundHtml = await readFile(
  path.join(outputDirectory, "404.html"),
  "utf8"
);
const rootHtml = await readFile(
  path.join(outputDirectory, "index.html"),
  "utf8"
);
const iconUrls = [
  ...rootHtml.matchAll(
    /<link\s+rel=["']icon["'][^>]+href=["'](\/[^"']+)["'][^>]*>/gi
  ),
].map(match => match[1]);
if (iconUrls.length < 2)
  fail("root HTML is missing expected favicon references");
for (const iconUrl of iconUrls) {
  try {
    await access(path.join(outputDirectory, iconUrl.slice(1)));
  } catch {
    fail(`root HTML references missing favicon: ${iconUrl}`);
  }
}
if (!/<meta name="robots" content="noindex, nofollow"/i.test(notFoundHtml)) {
  fail("404.html is missing noindex, nofollow");
}
if (/<link\s+rel=["']canonical["']/i.test(notFoundHtml)) {
  fail("404.html must not contain a canonical link");
}
if (/<meta\s+property=["']og:url["']/i.test(notFoundHtml)) {
  fail("404.html must not contain og:url");
}

const expectedStaticRoutes = [
  "hk/en/index.html",
  "jp/ja/index.html",
  "jp/ja/services/property-management/index.html",
  "hk/en/services/hotel-ffe-procurement/index.html",
  "us/en/index.html",
];
for (const route of expectedStaticRoutes) {
  try {
    await access(path.join(outputDirectory, route));
  } catch {
    fail(`missing static route output: ${route}`);
  }
}

const sitemap = await readFile(
  path.join(outputDirectory, "sitemap.xml"),
  "utf8"
);
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  match => match[1]
);
const baselineRouteCount = 98;
const expectedSitemapCount = baselineRouteCount;
if (sitemapLocations.length !== expectedSitemapCount) {
  fail(
    `sitemap route count is ${sitemapLocations.length}; expected the ${expectedSitemapCount}-route public baseline`
  );
}
if (/<link\s/i.test(sitemap)) {
  fail("sitemap contains bare HTML link elements instead of xhtml:link");
}
for (const location of sitemapLocations) {
  const url = new URL(location);
  if (!url.pathname.endsWith("/")) {
    fail(`sitemap URL is missing its canonical trailing slash: ${location}`);
  }
  const routeDirectory =
    url.pathname === "/"
      ? outputDirectory
      : path.join(outputDirectory, url.pathname.slice(1, -1));
  const routeHtmlPath = path.join(routeDirectory, "index.html");
  try {
    const routeHtml = await readFile(routeHtmlPath, "utf8");
    const canonicals = [
      ...routeHtml.matchAll(
        /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/gi
      ),
    ].map(match => match[1]);
    if (canonicals.length !== 1 || canonicals[0] !== location) {
      fail(
        `${path.relative(root, routeHtmlPath)} canonical is ${canonicals.join(", ") || "missing"}; expected ${location}`
      );
    }
    const isRegional = /^\/(?:hk|jp|us)\//.test(url.pathname);
    const language = url.pathname.split("/")[2];
    const expectedHtmlLanguage = language === "zh" ? "zh-Hans" : language;
    if (
      isRegional &&
      !new RegExp(`<html\\s+lang=["']${expectedHtmlLanguage}["']`, "i").test(
        routeHtml
      )
    ) {
      fail(
        `${path.relative(root, routeHtmlPath)} has the wrong or missing HTML language`
      );
    }
    if (!/<title>[^<]+<\/title>/i.test(routeHtml)) {
      fail(
        `${path.relative(root, routeHtmlPath)} is missing its initial title`
      );
    }
    const mainCount = [...routeHtml.matchAll(/<main(?:\s|>)/gi)].length;
    if (mainCount !== 1) {
      fail(
        `${path.relative(root, routeHtmlPath)} has ${mainCount} main elements; expected 1`
      );
    }
    const h1Count = [...routeHtml.matchAll(/<h1(?:\s|>)/gi)].length;
    if (h1Count !== 1) {
      fail(
        `${path.relative(root, routeHtmlPath)} has ${h1Count} H1 elements; expected 1`
      );
    }
    const visibleText = routeHtml
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (visibleText.length < 80) {
      fail(
        `${path.relative(root, routeHtmlPath)} has insufficient initial body text`
      );
    }
    if (!/<a\s+[^>]*href=["']\/(?!\/)/i.test(routeHtml)) {
      fail(
        `${path.relative(root, routeHtmlPath)} has no initial internal link`
      );
    }
    if (
      !/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(
        routeHtml
      )
    ) {
      fail(
        `${path.relative(root, routeHtmlPath)} is missing its initial description`
      );
    }
    const alternateCount = [
      ...routeHtml.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=/gi),
    ].length;
    if (alternateCount !== (isRegional ? 4 : 0)) {
      fail(
        `${path.relative(root, routeHtmlPath)} has ${alternateCount} hreflang links; expected ${isRegional ? 4 : 0}`
      );
    }
    const expectedOgType = "website";
    if (
      !new RegExp(
        `<meta\\s+property=["']og:type["']\\s+content=["']${expectedOgType}["']`,
        "i"
      ).test(routeHtml)
    ) {
      fail(
        `${path.relative(root, routeHtmlPath)} is missing og:type=${expectedOgType}`
      );
    }
    const structuredMatch = routeHtml.match(
      /<script\s+type=["']application\/ld\+json["']\s+data-seo-route-structured=["']true["']>(.*?)<\/script>/s
    );
    if (!structuredMatch) {
      fail(`${path.relative(root, routeHtmlPath)} is missing route JSON-LD`);
    } else {
      const structured = JSON.parse(structuredMatch[1]);
      const graph = Array.isArray(structured["@graph"])
        ? structured["@graph"]
        : [structured];
      const typeCount = type =>
        graph.filter(item => item?.["@type"] === type).length;
      if (typeCount("WebPage") !== 1) {
        fail(
          `${path.relative(root, routeHtmlPath)} must contain exactly one WebPage node`
        );
      }
      const segments = url.pathname.split("/").filter(Boolean);
      const isRegionalHome = isRegional && segments.length === 2;
      const isAbout = /\/about\/$/.test(url.pathname);
      if (isRegional && !isRegionalHome && typeCount("BreadcrumbList") !== 1) {
        fail(
          `${path.relative(root, routeHtmlPath)} must contain one BreadcrumbList node`
        );
      }
      if (
        isRegional &&
        (isRegionalHome || isAbout || expectedOgType === "article") &&
        typeCount("Organization") !== 1
      ) {
        fail(
          `${path.relative(root, routeHtmlPath)} must contain one regional Organization node`
        );
      }
      if (expectedOgType === "article" && typeCount("NewsArticle") !== 1) {
        fail(
          `${path.relative(root, routeHtmlPath)} must contain exactly one NewsArticle node`
        );
      }
      if (
        typeCount("Service") !== 0 ||
        typeCount("FAQPage") !== 0 ||
        typeCount("LocalBusiness") !== 0
      ) {
        fail(
          `${path.relative(root, routeHtmlPath)} contains an unverified Service, FAQPage, or LocalBusiness node`
        );
      }
      if (/"(?:sameAs|alternateName)"\s*:/.test(structuredMatch[1])) {
        fail(
          `${path.relative(root, routeHtmlPath)} uses an unverified sameAs or alternateName entity link`
        );
      }
    }
    if (expectedOgType === "article") {
      if (!/<meta\s+property=["']article:published_time["']/i.test(routeHtml)) {
        fail(
          `${path.relative(root, routeHtmlPath)} is missing article:published_time`
        );
      }
      if (!/["']@type["']\s*:\s*["']NewsArticle["']/i.test(routeHtml)) {
        fail(
          `${path.relative(root, routeHtmlPath)} is missing NewsArticle JSON-LD`
        );
      }
    }
  } catch (error) {
    if (error?.code === "ENOENT")
      fail(`sitemap route has no generated HTML: ${location}`);
    else throw error;
  }
}
const regionalSitemapRoutes = sitemapLocations.filter(location =>
  /https:\/\/www\.tengcle\.com\/(?:hk|jp|us)\//.test(location)
).length;
const sitemapAlternates = [...sitemap.matchAll(/<xhtml:link\s/g)].length;
if (sitemapAlternates !== regionalSitemapRoutes * 4) {
  fail(
    `sitemap has ${sitemapAlternates} alternates; expected ${regionalSitemapRoutes * 4}`
  );
}

for (const retiredExperimentalRoute of [
  "/companies/japan/",
  "/activities/property-management/",
]) {
  if (sitemapLocations.includes(`${SITE_ORIGIN}${retiredExperimentalRoute}`)) {
    fail(
      `sitemap exposes retired experimental route: ${retiredExperimentalRoute}`
    );
  }
}
for (const expectedRoute of [
  "/hk/ja/privacy/",
  "/jp/en/privacy/",
  "/us/zh/privacy/",
]) {
  if (!sitemapLocations.includes(`https://www.tengcle.com${expectedRoute}`)) {
    fail(`sitemap is missing route: ${expectedRoute}`);
  }
}
const redirects = await readFile(
  path.join(outputDirectory, "_redirects"),
  "utf8"
);
const redirectLines = redirects
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(Boolean);
const languages = ["en", "ja", "zh"];
const retiredUsArticles = [
  "property-management-launch-2025",
  "group-global-network-2024",
];
const expectedRedirects = languages.flatMap(language =>
  retiredUsArticles.map(
    article =>
      `/us/${language}/news/${article}/ /us/${language}/about/ 301`
  )
);
const expectedFormationRedirects = languages.flatMap(language => [
  `/hk/${language}/news/hk-founding/ /hk/${language}/about/ 301`,
  `/jp/${language}/news/company-incorporation-2021/ /jp/${language}/about/ 301`,
  `/us/${language}/news/us-founding-2026/ /us/${language}/about/ 301`,
]);
const allExpectedRedirects = [
  ...expectedRedirects,
  ...expectedFormationRedirects,
];
if (
  redirectLines.length !== allExpectedRedirects.length ||
  allExpectedRedirects.some(line => !redirectLines.includes(line))
) {
  fail("_redirects must contain all retired article redirects exactly once");
}
for (const line of allExpectedRedirects) {
  const source = line.split(" ")[0];
  const outputPath = path.join(outputDirectory, source.slice(1), "index.html");
  try {
    await access(outputPath);
    fail(`retired contradicted article is still generated: ${source}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}
const localAssetUrls = [
  ...sitemap.matchAll(
    /https:\/\/www\.tengcle\.com(\/[^<]+\.(?:webp|png|ico))/g
  ),
].map(match => match[1]);
for (const assetUrl of new Set(localAssetUrls)) {
  try {
    await access(path.join(outputDirectory, assetUrl.slice(1)));
  } catch {
    fail(`sitemap references missing asset: ${assetUrl}`);
  }
}

const usHomeAssetDirectory = path.join(outputDirectory, "images", "us", "home");
const usHomeAssets = await walk(usHomeAssetDirectory);
let usHomeBytes = 0;
for (const file of usHomeAssets) usHomeBytes += (await stat(file)).size;
if (usHomeBytes > 1_000_000) {
  fail(`US Home responsive assets exceed 1 MB: ${usHomeBytes} bytes`);
}

if (!rootHtml.includes('id="legacy-runtime-root"')) {
  fail("Global home is not using the legacy React UI adapter");
}
if (!rootHtml.includes("https://fonts.googleapis.com/css2?family=Playfair+Display")) {
  fail("Global home is missing the established UI font stylesheet");
}
if (!rootHtml.includes('src="/scripts/legacy-boot.js"')) {
  fail("Global home is missing the early legacy UI boot script");
}
try {
  await access(path.join(outputDirectory, "scripts", "legacy-boot.js"));
} catch {
  fail("Global home references a missing early legacy UI boot script");
}
if (
  !/<script\s+type=["']module["']\s+src=["'][^"']+["']><\/script>/i.test(
    rootHtml
  )
) {
  fail("Global home is missing the legacy React runtime entry");
}
for (const retiredRoute of [
  "/companies/japan/",
  "/activities/property-management/",
]) {
  const outputPath = path.join(
    outputDirectory,
    retiredRoute.slice(1),
    "index.html"
  );
  try {
    await access(outputPath);
    fail(`retired experimental route is still generated: ${retiredRoute}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

const rootEntryScripts = [
  ...rootHtml.matchAll(
    /<script\s+type=["']module["']\s+src=["']([^"']+)["']/gi
  ),
].map(match => match[1]);
const visitedScripts = new Set();
async function collectModule(url) {
  if (visitedScripts.has(url)) return;
  visitedScripts.add(url);
  const contents = await readFile(
    path.join(outputDirectory, url.slice(1)),
    "utf8"
  );
  const imports = [
    ...contents.matchAll(/(?:from\s*|import\s*)["']([^"']+\.js)["']/g),
  ].map(match => new URL(match[1], `${SITE_ORIGIN}${url}`).pathname);
  await Promise.all(imports.map(collectModule));
}
await Promise.all(rootEntryScripts.map(collectModule));
let globalRuntimeJsGzipBytes = 0;
for (const url of visitedScripts) {
  const contents = await readFile(path.join(outputDirectory, url.slice(1)));
  globalRuntimeJsGzipBytes += gzipSync(contents).byteLength;
}
if (globalRuntimeJsGzipBytes > 175_000) {
  fail(
    `Global legacy runtime JavaScript exceeds 175 KB gzip: ${globalRuntimeJsGzipBytes} bytes`
  );
}

const headers = await readFile(path.join(outputDirectory, "_headers"), "utf8");
for (const header of [
  "Content-Security-Policy:",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: SAMEORIGIN",
  "Strict-Transport-Security:",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
]) {
  if (!headers.includes(header)) fail(`_headers is missing ${header}`);
}
if (/script-src[^;]*'unsafe-inline'/i.test(headers)) {
  fail("_headers must not allow inline executable scripts");
}

if (failures.length) {
  console.error(failures.map(failure => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Site audit passed (${builtHtml.length} HTML files; ${sitemapLocations.length} sitemap routes; Global legacy runtime ${globalRuntimeJsGzipBytes} gzip bytes; US Home assets ${usHomeBytes} bytes).`
  );
}
