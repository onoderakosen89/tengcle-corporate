import { canonicalUrl, type SeoRoute } from "./seoRouteManifest";

export const representativeRouteManifest = [
  {
    route: "/companies/japan",
    canonical: canonicalUrl("/companies/japan"),
    lang: "en",
    locale: "en_US",
    title: "Japan Company | Tengcle",
    description:
      "Verified institutional information for 株式会社Tengcle, a Tengcle related company incorporated in Tokyo in 2021.",
    company: "株式会社Tengcle",
    ogType: "website",
  },
  {
    route: "/activities/property-management",
    canonical: canonicalUrl("/activities/property-management"),
    lang: "en",
    locale: "en_US",
    title: "Property Management Activity | Tengcle",
    description:
      "A restrained overview of property-management activity led by 株式会社Tengcle in Tokyo, with status and responsibility stated clearly.",
    company: "株式会社Tengcle",
    ogType: "website",
  },
] as const satisfies readonly SeoRoute[];
