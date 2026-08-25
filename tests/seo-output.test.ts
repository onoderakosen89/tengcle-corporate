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
  it("preserves the 113-route baseline and adds only two representatives", () => {
    expect(seoRouteManifest).toHaveLength(113);
    expect(representativeRouteManifest).toHaveLength(2);
    expect(allStaticRoutes).toHaveLength(115);
    expect(new Set(allStaticRoutes.map(page => page.canonical)).size).toBe(115);
  });

  it("keeps canonical trailing slashes and regional hreflang parity", () => {
    const sitemap = renderSitemap(allStaticRoutes);
    expect(sitemap.match(/<loc>/g)).toHaveLength(115);
    expect(sitemap).toContain(
      "<loc>https://www.tengcle.com/companies/japan/</loc>"
    );
    expect(sitemap).toContain(
      "<loc>https://www.tengcle.com/activities/property-management/</loc>"
    );
    for (const page of allStaticRoutes) {
      expect(page.canonical.endsWith("/")).toBe(true);
    }
  });

  it("produces one WebPage node for legacy and representative routes", () => {
    const legacy = structuredData(seoRouteManifest[2]);
    const representative = representativeStructuredData(
      representativeRouteManifest[0],
      "company"
    );
    for (const graph of [legacy["@graph"], representative["@graph"]]) {
      expect(graph.filter(node => node["@type"] === "WebPage")).toHaveLength(1);
    }
  });
});
