import { describe, expect, it } from "vitest";
import {
  retiredUsNewsRedirects,
  seoRouteManifest,
} from "../shared/seoRouteManifest";
import {
  allStaticRoutes,
  renderSitemap,
  representativeStructuredData,
  structuredData,
} from "../shared/seoOutput";
import { representativeRouteManifest } from "../shared/site2RouteManifest";

describe("static route contract", () => {
  it("removes six contradicted US article routes from the public baseline", () => {
    expect(seoRouteManifest).toHaveLength(107);
    expect(representativeRouteManifest).toHaveLength(2);
    expect(allStaticRoutes).toHaveLength(107);
    expect(new Set(allStaticRoutes.map(page => page.canonical)).size).toBe(107);
    expect(allStaticRoutes).not.toContainEqual(representativeRouteManifest[0]);
    expect(allStaticRoutes).not.toContainEqual(representativeRouteManifest[1]);
  });

  it("keeps canonical trailing slashes and regional hreflang parity", () => {
    const sitemap = renderSitemap(allStaticRoutes);
    expect(sitemap.match(/<loc>/g)).toHaveLength(107);
    expect(sitemap).not.toContain(
      "<loc>https://www.tengcle.com/companies/japan/</loc>"
    );
    expect(sitemap).not.toContain(
      "<loc>https://www.tengcle.com/activities/property-management/</loc>"
    );
    for (const page of allStaticRoutes) {
      expect(page.canonical.endsWith("/")).toBe(true);
    }
  });

  it("maps every retired US article directly to its language-matched About page", () => {
    expect(retiredUsNewsRedirects).toHaveLength(6);
    expect(new Set(retiredUsNewsRedirects.map(redirect => redirect.from)).size).toBe(6);
    for (const redirect of retiredUsNewsRedirects) {
      expect(allStaticRoutes.some(page => page.route === redirect.from)).toBe(false);
      expect(redirect.to).toMatch(/^\/us\/(?:en|ja|zh)\/about\/$/);
    }
  });

  it("keeps the typed representative schemas available but unexposed", () => {
    const legacy = structuredData(seoRouteManifest[2]);
    const representative = representativeStructuredData(
      representativeRouteManifest[0],
      "company"
    );
    for (const graph of [legacy["@graph"], representative["@graph"]]) {
      expect(graph.filter(node => node["@type"] === "WebPage")).toHaveLength(1);
    }
  });

  it("keeps unreviewed contact and operational addresses out of Organization JSON-LD", () => {
    const organizationFor = (route: string) => {
      const page = seoRouteManifest.find(entry => entry.route === route);
      expect(page).toBeDefined();
      return structuredData(page!)["@graph"].find(
        node => node["@type"] === "Organization"
      );
    };

    const hongKong = organizationFor("/hk/en");
    const japan = organizationFor("/jp/ja");
    const unitedStates = organizationFor("/us/en");

    for (const organization of [hongKong, japan, unitedStates]) {
      expect(organization).not.toHaveProperty("email");
    }
    expect(hongKong).not.toHaveProperty("address");
    expect(unitedStates).not.toHaveProperty("address");
    expect(japan).toMatchObject({
      address: {
        streetAddress: "2-19-20 Takanawa",
        postalCode: "108-0074",
        addressCountry: "JP",
      },
    });
  });

  it("publishes only verified entity facts and verified article graphs", () => {
    const graphFor = (route: string) => {
      const page = seoRouteManifest.find(entry => entry.route === route);
      expect(page).toBeDefined();
      return structuredData(page!)["@graph"];
    };

    expect(graphFor("/hk/en").find(node => node["@type"] === "Organization")).toMatchObject({
      name: "Tengcle Limited",
      foundingDate: "2025-04-29",
    });
    expect(graphFor("/us/en").find(node => node["@type"] === "Organization")).toMatchObject({
      name: "Tengcle Development LLC",
      foundingDate: "2026-01-05",
    });
    expect(graphFor("/hk/en/news/hk-founding").some(node => node["@type"] === "NewsArticle")).toBe(true);
    expect(graphFor("/hk/en/news/odoo-erp-launch").some(node => node["@type"] === "NewsArticle")).toBe(false);

    for (const route of [
      "/jp/ja/services/property-management",
      "/hk/en/services/hotel-ffe-procurement",
      "/hk/en/faq",
    ]) {
      const types = graphFor(route).map(node => node["@type"]);
      expect(types).not.toContain("Service");
      expect(types).not.toContain("FAQPage");
      expect(types).not.toContain("LocalBusiness");
    }
  });
});
