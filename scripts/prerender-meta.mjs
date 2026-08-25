import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/public");
const baseUrl = "https://www.tengcle.com";

const regionalProfiles = {
  hk: {
    company: "Tengcle Limited",
    titles: {
      en: "Tengcle Limited | Hong Kong",
      ja: "Tengcle Limited | 香港",
      zh: "Tengcle Limited | 香港",
    },
    descriptions: {
      en: "Tengcle Limited is a Hong Kong affiliated company developing hospitality procurement, project coordination, IT, and trade activities.",
      ja: "Tengcle Limitedは、ホスピタリティ調達、プロジェクト調整、IT、貿易の事業を段階的に展開する香港の関連会社です。",
      zh: "Tengcle Limited是香港注册的关联公司，正逐步开展酒店采购、项目协调、IT和贸易相关业务。",
    },
    locale: { en: "en_HK", ja: "ja_HK", zh: "zh_HK" },
    htmlLanguage: { en: "en", ja: "ja", zh: "zh-Hans" },
  },
  jp: {
    company: "株式会社Tengcle",
    titles: {
      en: "株式会社Tengcle | Property Management in Tokyo",
      ja: "株式会社Tengcle | 東京の不動産管理",
      zh: "株式会社Tengcle | 东京的房地产管理",
    },
    descriptions: {
      en: "株式会社Tengcle is a Tokyo-based company providing property management, including rent collection, repair coordination, and tenant communication.",
      ja: "株式会社Tengcleは、家賃回収、修繕手配、テナント対応などの不動産管理を行う東京の法人です。",
      zh: "株式会社Tengcle是一家位于东京的公司，提供租金回收、维修协调和租户沟通等房地产管理服务。",
    },
    locale: { en: "en_JP", ja: "ja_JP", zh: "zh_CN" },
    htmlLanguage: { en: "en", ja: "ja", zh: "zh-Hans" },
  },
  us: {
    company: "Tengcle Development LLC",
    titles: {
      en: "Tengcle Development LLC | New Jersey Real Estate Activities",
      ja: "Tengcle Development LLC | ニュージャージー州の不動産事業準備",
      zh: "Tengcle Development LLC | 新泽西州房地产业务筹备",
    },
    descriptions: {
      en: "Established in January 2026, Tengcle Development LLC is preparing for staged real estate development, property management, and vacation-rental activities in the NJ/NY area.",
      ja: "2026年1月に設立されたTengcle Development LLCは、NJ/NY地域での不動産開発・管理・バケーションレンタル事業の本格始動に向けて準備中です。",
      zh: "Tengcle Development LLC于2026年1月成立，正为NJ/NY地区房地产开发、物业管理和度假租赁业务的分阶段启动做准备。",
    },
    locale: { en: "en_US", ja: "ja_US", zh: "zh_US" },
    htmlLanguage: { en: "en", ja: "ja", zh: "zh-Hans" },
  },
};

const routeSuffixes = {
  hk: [
    "",
    "/services",
    "/portfolio",
    "/about",
    "/contact",
    "/faq",
    "/news",
    "/privacy",
    ...[
      "first-ffe-project-2026",
      "odoo-erp-launch",
      "expansion-preparation",
      "hotel-operations-launch",
      "hk-founding",
    ].map(id => `/news/${id}`),
  ],
  jp: [
    "",
    "/services",
    "/about",
    "/careers",
    "/contact",
    "/faq",
    "/news",
    "/privacy",
    "/news/company-incorporation-2021",
  ],
  us: [
    "",
    "/services",
    "/services/property-development",
    "/services/property-management",
    "/services/vacation-rentals",
    "/about",
    "/contact",
    "/faq",
    "/news",
    "/privacy",
    ...[
      "property-management-launch-2025",
      "us-founding-2026",
      "group-global-network-2024",
    ].map(id => `/news/${id}`),
  ],
};

const staticPages = [
  {
    route: "/",
    lang: "en",
    title:
      "Tengcle Group | Affiliated Companies in Hong Kong, Japan & the United States",
    description:
      "Tengcle Group presents the activities of affiliated companies in Hong Kong, Japan, and the United States.",
  },
  {
    route: "/privacy",
    lang: "en",
    title: "Privacy Policy | Tengcle Group",
    description: "Privacy information for Tengcle Group websites.",
  },
];

function escapeHtml(value) {
  return value.replace(
    /[&<>'"]/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]
  );
}

function replaceTitle(html, title) {
  return html.replace(
    /<title>.*?<\/title>/s,
    `<title>${escapeHtml(title)}</title>`
  );
}

function setMeta(html, attribute, value, content) {
  const matcher = new RegExp(
    `<meta\\s+${attribute}=["']${value}["'][^>]*>`,
    "i"
  );
  const tag = `<meta ${attribute}="${value}" content="${escapeHtml(content)}" />`;
  return matcher.test(html)
    ? html.replace(matcher, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

function setCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${canonical}" />`;
  return /<link\s+rel=["']canonical["'][^>]*>/i.test(html)
    ? html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

function removeHeadElement(html, matcher) {
  return html.replace(matcher, "");
}

function getMetadata(region, language, suffix) {
  const profile = regionalProfiles[region];
  const section = suffix
    ? suffix.replace(/^\//, "").replaceAll("/", " · ")
    : "";
  const baseTitle = profile.titles[language];
  return {
    route: `/${region}/${language}${suffix}`,
    lang: profile.htmlLanguage[language],
    locale: profile.locale[language],
    title: section ? `${section} | ${baseTitle}` : baseTitle,
    description: profile.descriptions[language],
    company: profile.company,
  };
}

function buildHreflang(region, suffix) {
  if (!region) return "";
  const languageTags =
    region === "hk"
      ? { en: "en-HK", ja: "ja-HK", zh: "zh-HK" }
      : region === "jp"
        ? { en: "en-JP", ja: "ja-JP", zh: "zh-JP" }
        : { en: "en-US", ja: "ja-US", zh: "zh-US" };
  return Object.entries(languageTags)
    .map(
      ([language, tag]) =>
        `<link rel="alternate" hreflang="${tag}" href="${baseUrl}/${region}/${language}${suffix}" />`
    )
    .join("\n    ");
}

function renderSitemap(pages) {
  const entries = pages.map(page => {
    const segments = page.route.split("/").filter(Boolean);
    const region = regionalProfiles[segments[0]] ? segments[0] : null;
    const suffix = region
      ? `/${segments.slice(2).join("/")}`.replace(/\/$/, "")
      : "";
    const alternates = region
      ? `${buildHreflang(region, suffix).replaceAll("<link ", "<xhtml:link ")}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/${region}/en${suffix}" />`
      : "";
    const priority =
      page.route === "/" ? "1.0" : suffix === "" && region ? "0.95" : "0.8";
    return `  <url>
    <loc>${baseUrl}${page.route}</loc>
    ${alternates}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/images/og-image.webp</image:loc>
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

function renderPage(baseHtml, page) {
  const canonical = `${baseUrl}${page.route}`;
  let html = baseHtml.replace(
    /<html lang="[^"]+">/i,
    `<html lang="${page.lang}">`
  );
  html = replaceTitle(html, page.title);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:locale", page.locale || "en_US");
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setCanonical(html, canonical);
  const region = page.route.split("/")[1];
  const suffix = page.route.split("/").slice(3).join("/");
  const hreflang = buildHreflang(
    regionalProfiles[region] ? region : null,
    suffix ? `/${suffix}` : ""
  );
  if (hreflang) html = html.replace("</head>", `    ${hreflang}\n  </head>`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    inLanguage: page.lang,
    about: { "@type": "Organization", name: page.company || "Tengcle Group" },
  };
  return html.replace(
    "</head>",
    `    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`
  );
}

function renderNotFoundPage(baseHtml) {
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
  html = removeHeadElement(html, /\s*<link\s+rel=["']canonical["'][^>]*>/i);
  html = removeHeadElement(html, /\s*<meta\s+property=["']og:url["'][^>]*>/i);
  return html;
}

const baseHtml = await readFile(
  path.join(outputDirectory, "index.html"),
  "utf8"
);
const pages = [...staticPages];
for (const [region, suffixes] of Object.entries(routeSuffixes)) {
  for (const language of ["en", "ja", "zh"]) {
    for (const suffix of suffixes)
      pages.push(getMetadata(region, language, suffix));
  }
}

for (const page of pages) {
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
  renderSitemap(pages)
);

console.log(
  `Generated route-specific initial HTML and sitemap for ${pages.length} public routes, plus 404.html.`
);
