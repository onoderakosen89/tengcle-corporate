import { describe, expect, it } from "vitest";
import { seoRouteManifest } from "../shared/seoRouteManifest";
import {
  allStaticRoutes,
  renderSitemap,
  representativeStructuredData,
  structuredData,
} from "../shared/seoOutput";
import { representativeRouteManifest } from "../shared/site2RouteManifest";

describe("static route contract", () => {
  it("preserves exactly the 113-route public baseline", () => {
    expect(seoRouteManifest).toHaveLength(113);
    expect(representativeRouteManifest).toHaveLength(2);
    expect(allStaticRoutes).toHaveLength(113);
    expect(new Set(allStaticRoutes.map(page => page.canonical)).size).toBe(113);
    expect(allStaticRoutes).not.toContainEqual(representativeRouteManifest[0]);
    expect(allStaticRoutes).not.toContainEqual(representativeRouteManifest[1]);
  });

  it("keeps canonical trailing slashes and regional hreflang parity", () => {
    const sitemap = renderSitemap(allStaticRoutes);
    expect(sitemap.match(/<loc>/g)).toHaveLength(113);
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
});
