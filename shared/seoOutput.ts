import { companyProfiles } from "../client/src/data/companyProfiles";
import {
  SITE_ORIGIN,
  canonicalUrl,
  hreflangAlternates,
  seoRouteManifest,
  type SeoRoute,
} from "./seoRouteManifest";
export const allStaticRoutes = seoRouteManifest;

function routeSuffix(page: SeoRoute) {
  if (!page.region || !page.language) return "";
  return page.route.replace(`/${page.region}/${page.language}`, "");
}

const entityHomeLanguages = { hk: "en", jp: "ja", us: "en" } as const;

function organizationSchema(page: SeoRoute) {
  if (!page.region) return undefined;
  const profile = companyProfiles[page.region];
  const entityUrl = canonicalUrl(
    `/${page.region}/${entityHomeLanguages[page.region]}`
  );
  // Keep the static entity graph narrower than the visible legacy copy. The
  // first Japan address is the reviewed registered office; other operational
  // addresses and contact channels require their own evidence review before
  // entering machine-readable Organization data.
  const registeredOffice = page.region === "jp" ? profile.addresses[0] : null;
  return {
    "@type": "Organization",
    "@id": `${entityUrl}#organization`,
    name: profile.legalName,
    url: entityUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/images/tengcle-logo.png`,
    },
    foundingDate: profile.established,
    ...(registeredOffice && {
      address: {
        "@type": "PostalAddress",
        streetAddress: registeredOffice.street,
        addressLocality: registeredOffice.city,
        addressRegion: registeredOffice.region,
        postalCode: registeredOffice.postalCode,
        addressCountry: registeredOffice.country,
      },
    }),
  };
}

function breadcrumbSchema(page: SeoRoute) {
  if (!page.region || !page.language || routeSuffix(page) === "") {
    return undefined;
  }
  const regionHome = canonicalUrl(`/${page.region}/${page.language}`);
  return {
    "@type": "BreadcrumbList",
    "@id": `${page.canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tengcle",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.company,
        item: regionHome,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title.split(" | ")[0],
        item: page.canonical,
      },
    ],
  };
}

export function structuredData(page: SeoRoute) {
  const organization = organizationSchema(page);
  const breadcrumb = breadcrumbSchema(page);
  const graph: Record<string, unknown>[] = [];

  if (page.ogType === "article") {
    graph.push({
      "@type": "NewsArticle",
      "@id": `${page.canonical}#article`,
      mainEntityOfPage: { "@id": `${page.canonical}#webpage` },
      url: page.canonical,
      headline: page.title,
      description: page.description,
      image: `${SITE_ORIGIN}/images/og-image.webp`,
      datePublished: page.datePublished,
      inLanguage: page.lang,
      ...(organization && { publisher: { "@id": organization["@id"] } }),
    });
  }

  graph.push({
    "@type": "WebPage",
    "@id": `${page.canonical}#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    inLanguage: page.lang,
    ...(organization && { about: { "@id": organization["@id"] } }),
    ...(breadcrumb && { breadcrumb: { "@id": breadcrumb["@id"] } }),
  });

  if (page.service) {
    graph.push({
      "@type": "Service",
      "@id": `${page.canonical}#service`,
      name: page.service.name,
      description: page.service.description,
      provider: {
        "@type": "Organization",
        "@id": `${page.service.providerUrl}#organization`,
        name: page.service.provider,
        url: page.service.providerUrl,
      },
      areaServed: page.service.areaServed.map(name => ({
        "@type": "Place",
        name,
      })),
    });
  }
  if (page.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${page.canonical}#faq`,
      mainEntity: page.faqs.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  const isEntityPage =
    routeSuffix(page) === "" || routeSuffix(page) === "/about";
  if (organization && (isEntityPage || page.ogType === "article")) {
    graph.push(organization);
  }
  if (breadcrumb) graph.push(breadcrumb);

  return { "@context": "https://schema.org", "@graph": graph };
}

export function representativeStructuredData(
  page: SeoRoute,
  kind: "home" | "company" | "activity"
) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${page.canonical}#webpage`,
      url: page.canonical,
      name: page.title,
      description: page.description,
      inLanguage: page.lang,
    },
  ];

  if (kind === "home") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: "Tengcle",
      slogan: "think into the future",
    });
  }
  if (kind === "company") {
    graph.push({
      "@type": "Organization",
      "@id": `${page.canonical}#organization`,
      name: "株式会社Tengcle",
      url: page.canonical,
      foundingDate: "2021-10-25",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2-19-20 Takanawa",
        addressLocality: "Minato-ku",
        addressRegion: "Tokyo",
        addressCountry: "JP",
      },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function hreflangForRoute(page: SeoRoute) {
  if (!page.region || !page.language) return [];
  return hreflangAlternates(page.region, page.language, page.route);
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, character => {
    const escaped: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return escaped[character];
  });
}

export function renderSitemap(pages: readonly SeoRoute[]) {
  const entries = pages.map(page => {
    const alternates = hreflangForRoute(page)
      .map(
        alternate =>
          `<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeXml(alternate.href)}" />`
      )
      .join("\n    ");
    const priority =
      page.route === "/"
        ? "1.0"
        : page.region && routeSuffix(page) === ""
          ? "0.95"
          : "0.8";
    return `  <url>
    <loc>${escapeXml(page.canonical)}</loc>${alternates ? `\n    ${alternates}` : ""}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${SITE_ORIGIN}/images/og-image.webp</image:loc>
      <image:title>${escapeXml(page.title)}</image:title>
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
