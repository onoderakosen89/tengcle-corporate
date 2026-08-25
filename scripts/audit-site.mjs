import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
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

const sourceFiles = (await walk(path.join(root, "client"))).filter(file =>
  /\.(?:html|tsx?|xml)$/.test(file)
);
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
  "us/en/index.html",
  "hk/en/news/hk-founding/index.html",
  "jp/ja/news/company-incorporation-2021/index.html",
  "us/en/news/us-founding-2026/index.html",
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
if (sitemapLocations.length !== 107) {
  fail(`sitemap route count is ${sitemapLocations.length}; expected 107`);
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
    const expectedOgType = /\/news\/[^/]+\/$/.test(url.pathname)
      ? "article"
      : "website";
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
for (const expectedRoute of [
  "/hk/ja/privacy/",
  "/jp/en/privacy/",
  "/us/zh/privacy/",
  "/hk/zh/news/hk-founding/",
  "/jp/en/news/company-incorporation-2021/",
  "/us/ja/news/us-founding-2026/",
]) {
  if (!sitemapLocations.includes(`https://www.tengcle.com${expectedRoute}`)) {
    fail(`sitemap is missing route: ${expectedRoute}`);
  }
}
const usFoundingHtml = await readFile(
  path.join(
    outputDirectory,
    "us",
    "en",
    "news",
    "us-founding-2026",
    "index.html"
  ),
  "utf8"
);
if (
  !usFoundingHtml.includes(
    "<title>Tengcle Development LLC Established in New Jersey | Tengcle Development LLC</title>"
  )
) {
  fail("US founding article is missing its article-specific initial title");
}
if (
  !usFoundingHtml.includes(
    "Tengcle Development LLC was officially registered in Weehawken"
  )
) {
  fail(
    "US founding article is missing its article-specific initial description"
  );
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

if (failures.length) {
  console.error(failures.map(failure => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Site audit passed (${builtHtml.length} HTML files; US Home assets ${usHomeBytes} bytes).`
  );
}
