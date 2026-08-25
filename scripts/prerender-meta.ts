import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  SITE_ORIGIN,
  canonicalPath,
  canonicalUrl,
  seoRouteManifest,
  supportedLanguages,
  type Region,
  type SeoRoute,
} from "../shared/seoRouteManifest.ts";

const outputDirectory = path.resolve("dist/public");

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  );
}

function replaceTitle(html: string, title: string) {
  return html.replace(
    /<title>.*?<\/title>/s,
    `<title>${escapeHtml(title)}</title>`
  );
}

function setMeta(
  html: string,
  attribute: "name" | "property",
  value: string,
  content: string
) {
  const matcher = new RegExp(
    `<meta\\s+${attribute}=["']${value}["'][^>]*>`,
    "i"
  );
  const tag = `<meta ${attribute}="${value}" content="${escapeHtml(content)}" />`;
  return matcher.test(html)
    ? html.replace(matcher, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

function removeHeadElements(html: string, matcher: RegExp) {
  return html.replace(matcher, "");
}

function languageTags(region: Region) {
  if (region === "hk")
    return { en: "en-HK", ja: "ja-HK", zh: "zh-HK" } as const;
  if (region === "jp")
    return { en: "en-JP", ja: "ja-JP", zh: "zh-JP" } as const;
  return { en: "en-US", ja: "ja-US", zh: "zh-US" } as const;
}

function routeSuffix(page: SeoRoute) {
  if (!page.region || !page.language) return "";
  return page.route.replace(`/${page.region}/${page.language}`, "");
}

function buildHreflang(page: SeoRoute, element: "link" | "xhtml:link") {
  if (!page.region) return "";
  const suffix = routeSuffix(page);
  const tags = languageTags(page.region);
  const alternates = supportedLanguages.map(
    language =>
      `<${element} rel="alternate" hreflang="${tags[language]}" href="${canonicalUrl(`/${page.region}/${language}${suffix}`)}" />`
  );
  alternates.push(
    `<${element} rel="alternate" hreflang="x-default" href="${canonicalUrl(`/${page.region}/en${suffix}`)}" />`
  );
  return alternates.join("\n    ");
}

function renderSitemap(pages: readonly SeoRoute[]) {
  const entries = pages.map(page => {
    const alternates = buildHreflang(page, "xhtml:link");
    const priority =
      page.route === "/"
        ? "1.0"
        : routeSuffix(page) === "" && page.region
          ? "0.95"
          : "0.8";
    return `  <url>
    <loc>${page.canonical}</loc>${alternates ? `\n    ${alternates}` : ""}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${SITE_ORIGIN}/images/og-image.webp</image:loc>
      <image:title>${escapeHtml(page.title)}</image:title>
    </image:image>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>
`;
}

function renderPage(baseHtml: string, page: SeoRoute) {
  let html = baseHtml.replace(
    /<html lang="[^"]+">/i,
    `<html lang="${page.lang}">`
  );
  html = removeHeadElements(
    html,
    /\s*<link\s+rel=["'](?:canonical|alternate)["'][^>]*>/gi
  );
  html = removeHeadElements(
    html,
    /\s*<meta\s+property=["']article:(?:published_time|modified_time)["'][^>]*>/gi
  );
  html = replaceTitle(html, page.title);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", page.canonical);
  html = setMeta(html, "property", "og:type", page.ogType);
  html = setMeta(html, "property", "og:locale", page.locale);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  if (page.datePublished) {
    html = setMeta(
      html,
      "property",
      "article:published_time",
      page.datePublished
    );
  }

  const canonical = `<link rel="canonical" href="${page.canonical}" />`;
  const hreflang = buildHreflang(page, "link");
  html = html.replace(
    "</head>",
    `  ${canonical}${hreflang ? `\n    ${hreflang}` : ""}\n</head>`
  );

  const schema =
    page.ogType === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "@id": `${page.canonical}#article`,
          mainEntityOfPage: page.canonical,
          url: page.canonical,
          headline: page.title,
          description: page.description,
          datePublished: page.datePublished,
          inLanguage: page.lang,
          publisher: { "@type": "Organization", name: page.company },
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${page.canonical}#webpage`,
          url: page.canonical,
          name: page.title,
          description: page.description,
          inLanguage: page.lang,
          about: { "@type": "Organization", name: page.company },
        };
  return html.replace(
    "</head>",
    `    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`
  );
}

function renderNotFoundPage(baseHtml: string) {
  let html = baseHtml.replace(/<html lang="[^"]+">/i, '<html lang="en">');
  html = replaceTitle(html, "Page Not Found | Tengcle Group");
  html = setMeta(
    html,
    "name",
    "description",
    "The requested Tengcle Group page does not exist."
  );
  html = setMeta(html, "name", "robots", "noindex, nofollow");
  html = setMeta(html, "name", "googlebot", "noindex, nofollow");
  html = removeHeadElements(
    html,
    /\s*<link\s+rel=["'](?:canonical|alternate)["'][^>]*>/gi
  );
  html = removeHeadElements(
    html,
    /\s*<meta\s+property=["'](?:og:url|article:(?:published_time|modified_time))["'][^>]*>/gi
  );
  return html;
}

const baseHtml = await readFile(
  path.join(outputDirectory, "index.html"),
  "utf8"
);

for (const page of seoRouteManifest) {
  const outputPath =
    page.route === "/"
      ? path.join(outputDirectory, "index.html")
      : path.join(outputDirectory, page.route.slice(1), "index.html");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderPage(baseHtml, page));
}

await writeFile(
  path.join(outputDirectory, "404.html"),
  renderNotFoundPage(baseHtml)
);
await writeFile(
  path.join(outputDirectory, "sitemap.xml"),
  renderSitemap(seoRouteManifest)
);

console.log(
  `Generated route-specific initial HTML and sitemap for ${seoRouteManifest.length} public routes, plus 404.html.`
);
