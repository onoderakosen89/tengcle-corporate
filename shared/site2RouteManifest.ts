import { canonicalUrl, type SeoRoute } from "./seoRouteManifest";

export const representativeRouteManifest = [
  {
    route: "/companies/japan",
    canonical: canonicalUrl("/companies/japan"),
    lang: "en",
    locale: "en_US",
    title: "Japan Company | Tengcle",
    description:
      "Company and business information for 株式会社Tengcle in Japan.",
    company: "株式会社Tengcle",
    ogType: "website",
  },
  {
    route: "/activities/property-management",
    canonical: canonicalUrl("/activities/property-management"),
    lang: "en",
    locale: "en_US",
    title: "Property Management Activity Structure | Tengcle",
    description:
      "A representative structure for future property-management activity information, without claiming unverified operations or outcomes.",
    company: "株式会社Tengcle",
    ogType: "website",
  },
] as const satisfies readonly SeoRoute[];
