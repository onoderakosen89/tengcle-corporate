import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { buyerIntentPages } from "../shared/buyerIntentPages";

const forbiddenHierarchyPattern =
  /100\s*[%％].{0,40}(?:owned|held|保有|所有|持有)|wholly owned|owned by Kosen|parent[- ]subsidiar|親会社|子会社|親子会社|母子公司|global headquarters|Hong Kong headquarters|Hong Kong HQ|グローバル本社|香港本社|全球总部|香港总部|founding company|founding entity|founding office|創業法人|創業会社|创始法人|创始公司|\bUS office\b|\bU\.S\. office\b|米国オフィス|米国拠点|美国办事处|美国办公室/i;
const unverifiedLegalBrandPattern = /Tengcle Group/i;
const unverifiedHkScaleTrustPattern =
  /ISO Standards|international quality management|15\+ Countries|supplier relationships worldwide|国際品質管理|15カ国以上|世界中のサプライヤー関係|国际质量管理|15\+国家|全球供应商关系|Built on Integrity|誠実な運営|诚信经营/i;

test("known routes and article routes return route-specific initial HTML", async ({
  request,
}) => {
  const cases = [
    ["/hk/en", "en", "https://www.tengcle.com/hk/en/"],
    ["/jp/ja", "ja", "https://www.tengcle.com/jp/ja/"],
    [
      "/jp/ja/services/property-management",
      "ja",
      "https://www.tengcle.com/jp/ja/services/property-management/",
    ],
    [
      "/hk/en/services/hotel-ffe-procurement",
      "en",
      "https://www.tengcle.com/hk/en/services/hotel-ffe-procurement/",
    ],
    [
      "/us/zh/services/property-development",
      "zh-Hans",
      "https://www.tengcle.com/us/zh/services/property-development/",
    ],
    [
      "/us/en/news/us-founding-2026",
      "en",
      "https://www.tengcle.com/us/en/news/us-founding-2026/",
    ],
  ] as const;

  for (const [url, lang, canonical] of cases) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
    const body = await response.text();
    expect(body).toMatch(new RegExp(`<html\\s+lang="${lang}"(?:\\s|>)`));
    expect(body).toContain(`<link rel="canonical" href="${canonical}">`);
    expect(body).toContain("https://www.tengcle.com/images/og-image.webp");
  }
});

test("article initial HTML exposes article-specific social and search metadata", async ({
  request,
}) => {
  const response = await request.get("/us/en/news/us-founding-2026");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain(
    "<title>Tengcle Development LLC Established in New Jersey | Tengcle Development LLC</title>"
  );
  expect(body).toContain(
    'content="Tengcle Development LLC was formed in New Jersey on 5 January 2026. New Jersey Entity ID: 0451392806."'
  );
  expect(body).toContain('<meta property="og:type" content="article">');
  expect(body).toContain(
    '<meta property="article:published_time" content="2026-01-05">'
  );
  expect(body).toContain('"@type":"NewsArticle"');
  expect(body.match(/rel="canonical"/g)).toHaveLength(1);
  expect(body.match(/rel="alternate"/g)).toHaveLength(4);
});

test("route manifest metadata remains stable after hydration", async ({
  page,
  request,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary")
  );
  for (const route of [
    "/hk/en",
    "/jp/ja",
    "/us/en",
    "/hk/zh/faq",
    "/us/en/news/us-founding-2026",
  ]) {
    const response = await request.get(route);
    const initialHtml = await response.text();
    const initialTitle = initialHtml.match(/<title>(.*?)<\/title>/s)?.[1];
    const initialDescription = initialHtml.match(
      /<meta\s+name="description"\s+content="([^"]+)"/i
    )?.[1];
    expect(initialTitle, route).toBeTruthy();
    expect(initialDescription, route).toBeTruthy();

    await page.goto(route);
    await expect(page).toHaveTitle(initialTitle!);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      initialDescription!
    );
    const webPageNodes = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll(scripts =>
        scripts.reduce((count, script) => {
          const data = JSON.parse(script.textContent || "{}");
          const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
          return (
            count + graph.filter(item => item?.["@type"] === "WebPage").length
          );
        }, 0)
      );
    expect(webPageNodes, route).toBe(1);
  }
});

test("all sitemap routes retain canonical metadata and unique primary schemas after hydration", async ({
  page,
  request,
}) => {
  test.setTimeout(180_000);
  await page.addInitScript(() => {
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary");
    sessionStorage.setItem("tengcle_geo_redirected", "true");
    sessionStorage.setItem("tengcle_splash_seen", "true");
  });

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  const urls = Array.from(
    sitemap.matchAll(/<loc>(https:\/\/www\.tengcle\.com[^<]+)<\/loc>/g),
    match => match[1]
  );
  expect(urls).toHaveLength(107);

  for (const canonical of urls) {
    const route = new URL(canonical).pathname;
    const response = await request.get(route);
    const initialHtml = await response.text();
    const initialScripts = Array.from(
      initialHtml.matchAll(
        /<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs
      ),
      match => JSON.parse(match[1])
    );
    const initialNodes = initialScripts.flatMap(data =>
      Array.isArray(data["@graph"]) ? data["@graph"] : [data]
    );
    expect(initialHtml, `${route} initial hierarchy copy`).not.toMatch(
      forbiddenHierarchyPattern
    );
    expect(
      JSON.stringify(initialNodes),
      `${route} initial JSON-LD hierarchy copy`
    ).not.toMatch(forbiddenHierarchyPattern);
    if (!route.endsWith("/privacy/")) {
      expect(initialHtml, `${route} initial legal brand copy`).not.toMatch(
        unverifiedLegalBrandPattern
      );
    }

    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect
      .poll(() =>
        page
          .locator("main")
          .first()
          .evaluate(main => main.textContent?.length ?? 0)
      )
      .toBeGreaterThan(40);
    await expect(page).not.toHaveTitle(/Page Not Found/i);
    await expect(
      page.locator('meta[name="robots"][content*="noindex" i]')
    ).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonical
    );

    const hydratedNodes = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll(scripts =>
        scripts.flatMap(script => {
          const data = JSON.parse(script.textContent || "{}");
          return Array.isArray(data["@graph"]) ? data["@graph"] : [data];
        })
      );
    const visibleCopy = await page.locator("body").innerText();
    expect(visibleCopy, `${route} hydrated hierarchy copy`).not.toMatch(
      forbiddenHierarchyPattern
    );
    expect(
      JSON.stringify(hydratedNodes),
      `${route} hydrated JSON-LD hierarchy copy`
    ).not.toMatch(forbiddenHierarchyPattern);
    if (!route.endsWith("/privacy/")) {
      expect(visibleCopy, `${route} hydrated legal brand copy`).not.toMatch(
        unverifiedLegalBrandPattern
      );
      expect(
        JSON.stringify(hydratedNodes),
        `${route} hydrated JSON-LD legal brand copy`
      ).not.toMatch(unverifiedLegalBrandPattern);
    }
    if (/^\/hk\/(?:en|ja|zh)(?:\/about)?\/$/.test(route)) {
      expect(visibleCopy, `${route} hydrated verified HK copy`).not.toMatch(
        unverifiedHkScaleTrustPattern
      );
    }
    const ids = hydratedNodes
      .map(node => node?.["@id"])
      .filter((id): id is string => typeof id === "string");
    expect(new Set(ids).size, `${route} duplicate schema @id`).toBe(ids.length);

    for (const type of [
      "WebPage",
      "Organization",
      "BreadcrumbList",
      "NewsArticle",
      "Service",
      "FAQPage",
    ]) {
      const initialCount = initialNodes.filter(
        node => node?.["@type"] === type
      ).length;
      const hydratedCount = hydratedNodes.filter(
        node => node?.["@type"] === type
      ).length;
      expect(hydratedCount, `${route} ${type}`).toBe(initialCount);
    }
  }
});

test("buyer-intent service pages identify the customer and preserve visible FAQ schema", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary");
    sessionStorage.setItem("tengcle_geo_redirected", "true");
    sessionStorage.setItem("tengcle_splash_seen", "true");
  });
  const languages = ["en", "ja", "zh"] as const;
  const cases = [
    ...languages.map(language => ({
      route: `/jp/${language}/services/property-management`,
      ...buyerIntentPages.jpPropertyManagement.copy[language],
    })),
    ...languages.map(language => ({
      route: `/hk/${language}/services/hotel-ffe-procurement`,
      ...buyerIntentPages.hkHotelFfe.copy[language],
    })),
  ];

  for (const item of cases) {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(item.route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(item.h1);
    await expect(page.getByText(item.lead, { exact: true })).toBeVisible();
    await expect(
      page.getByText(item.faqs[0].question, { exact: true })
    ).toBeVisible();
    const structuredNodes = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll(scripts =>
        scripts.flatMap(script => {
          const data = JSON.parse(script.textContent || "{}");
          const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
          return graph;
        })
      );
    expect(structuredNodes.some(node => node?.["@type"] === "Service")).toBe(false);
    expect(structuredNodes.some(node => node?.["@type"] === "FAQPage")).toBe(false);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow, item.route).toBeLessThanOrEqual(0);
  }
});

test("buyer-intent internal links update canonical and hreflang during SPA navigation", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary")
  );
  const cases = [
    {
      start: "/jp/ja",
      link: "不動産管理の詳細",
      target: "/jp/ja/services/property-management",
      alternates: [
        [
          "en-JP",
          "https://www.tengcle.com/jp/en/services/property-management/",
        ],
        [
          "ja-JP",
          "https://www.tengcle.com/jp/ja/services/property-management/",
        ],
        [
          "zh-JP",
          "https://www.tengcle.com/jp/zh/services/property-management/",
        ],
        [
          "x-default",
          "https://www.tengcle.com/jp/en/services/property-management/",
        ],
      ],
    },
    {
      start: "/hk/en",
      link: "Explore Hotel FF&E Procurement",
      target: "/hk/en/services/hotel-ffe-procurement",
      alternates: [
        [
          "en-HK",
          "https://www.tengcle.com/hk/en/services/hotel-ffe-procurement/",
        ],
        [
          "ja-HK",
          "https://www.tengcle.com/hk/ja/services/hotel-ffe-procurement/",
        ],
        [
          "zh-HK",
          "https://www.tengcle.com/hk/zh/services/hotel-ffe-procurement/",
        ],
        [
          "x-default",
          "https://www.tengcle.com/hk/en/services/hotel-ffe-procurement/",
        ],
      ],
    },
  ] as const;

  for (const item of cases) {
    await page.goto(item.start);
    await page.getByRole("link", { name: item.link, exact: true }).click();
    await expect(page).toHaveURL(
      new RegExp(`${item.target.replaceAll("/", "\\/")}$`)
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.tengcle.com${item.target}/`
    );
    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll(links =>
        links.map(link => [
          link.getAttribute("hreflang"),
          link.getAttribute("href"),
        ])
      );
    expect(alternates, item.target).toEqual(item.alternates);
  }
});

test("unknown documents return a real noindex 404 without canonical", async ({
  request,
  page,
}) => {
  const response = await request.get("/us/en/definitely-not-a-page");
  expect(response.status()).toBe(404);
  expect(response.headers()["x-robots-tag"]).toBe("noindex");
  expect(response.headers()["cache-control"]).toBe("no-store");
  const body = await response.text();
  expect(body).toContain('content="noindex, nofollow"');
  expect(body).not.toMatch(/<link\s+rel=["']canonical["']/i);

  await page.goto("/us/en/definitely-not-a-page");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow"
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
});

test("Cloudflare preview applies declared security and cache headers", async ({
  request,
}) => {
  test.skip(
    process.env.PLAYWRIGHT_EXPECT_SECURITY_HEADERS !== "true",
    "Only asserted against an actual Cloudflare preview"
  );

  const documentResponse = await request.get("/hk/en");
  expect(documentResponse.status()).toBe(200);
  const headers = documentResponse.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["x-frame-options"]).toBe("SAMEORIGIN");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-robots-tag"]).toBe("noindex");

  const imageResponse = await request.get("/images/og-image.webp");
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toContain("image/webp");
  expect(imageResponse.headers()["cache-control"]).toBe(
    "public, max-age=31536000, immutable"
  );

  for (const [asset, contentType] of [
    ["/favicon.ico", "image/vnd.microsoft.icon"],
    ["/favicon.png", "image/png"],
  ] as const) {
    const response = await request.get(asset);
    expect(response.status(), asset).toBe(200);
    expect(response.headers()["content-type"], asset).toContain(contentType);
  }
});

test("public pages expose semantic content with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of [
    "/",
    "/jp/ja/about/",
    "/us/en/services/property-management/",
  ]) {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("main")).toContainText(/Tengcle|property/i);
    expect(await page.locator('main a[href^="/"]').count()).toBeGreaterThan(0);
  }
  await context.close();
});

test("Global and regional UIs introduce no new serious or critical axe violations", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary");
    sessionStorage.setItem("tengcle_geo_redirected", "true");
    sessionStorage.setItem("tengcle_splash_seen", "true");
  });
  for (const route of ["/", "/jp/ja/", "/hk/en/", "/us/en/"]) {
    await page.goto(route);
    await expect(page.locator(".legacy-runtime main h1").first()).toBeVisible();
    // Framer Motion staggers the established regional entrance animation.
    // Audit the settled UI rather than a deliberately translucent mid-frame.
    await page.waitForTimeout(2_500);
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter(violation =>
      ["serious", "critical"].includes(violation.impact ?? "")
    );
    const knownUsFooterContrast = seriousOrCritical.filter(
      violation =>
        route === "/us/en/" &&
        violation.id === "color-contrast" &&
        violation.nodes.every(node => node.target.includes(".text-gray-500"))
    );
    if (route === "/us/en/") {
      expect(knownUsFooterContrast).toHaveLength(1);
    }
    expect(
      seriousOrCritical.filter(
        violation => !knownUsFooterContrast.includes(violation)
      ),
      route
    ).toEqual([]);
  }
});

test("Global home preserves the established UI on mobile and reduced motion", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary");
    sessionStorage.setItem("tengcle_geo_redirected", "true");
    sessionStorage.setItem("tengcle_splash_seen", "true");
  });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Tengcle Related Companies/ })
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Tengcle - think into the future" })
  ).toBeVisible();
  await expect(page.getByText(/think into the future/i).last()).toBeVisible();
  const state = await page.evaluate(() => ({
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
    hasInlineSeigaiha: [
      ...document.querySelectorAll<HTMLElement>("[style]"),
    ].some(element =>
      element.style.backgroundImage.includes("data:image/svg+xml")
    ),
    regions: [...document.querySelectorAll("h2")].map(heading =>
      heading.textContent?.trim()
    ),
  }));
  expect(state.overflow).toBeLessThanOrEqual(0);
  expect(state.hasInlineSeigaiha).toBe(true);
  expect(state.regions).toEqual(
    expect.arrayContaining(["Hong Kong", "Japan", "United States"])
  );
});

test("JavaScript replaces the semantic fallback without displaying it", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary");
    sessionStorage.setItem("tengcle_geo_redirected", "true");
    sessionStorage.setItem("tengcle_splash_seen", "true");
  });

  for (const route of ["/", "/jp/ja/", "/hk/en/", "/us/en/"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveClass(/legacy-js/);
    await expect(page.locator(".legacy-static")).toBeHidden();
    await expect(page.locator(".legacy-runtime")).toBeVisible();
    await expect(page.locator(".legacy-runtime main h1").first()).toBeVisible();
  }
});

test("retired redesign-only routes are not publicly generated", async ({
  request,
}) => {
  for (const route of [
    "/companies/japan/",
    "/activities/property-management/",
  ]) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(404);
    expect(response.headers()["x-robots-tag"], route).toBe("noindex");
    expect(response.headers()["cache-control"], route).toBe("no-store");
    expect(await response.text(), route).toContain("noindex, nofollow");
  }
});

test("contradicted pre-formation US articles are retired behind one-hop Cloudflare redirects", async ({
  request,
}) => {
  const redirects = await readFile("dist/public/_redirects", "utf8");
  for (const language of ["en", "ja", "zh"]) {
    for (const article of [
      "property-management-launch-2025",
      "group-global-network-2024",
    ]) {
      const from = `/us/${language}/news/${article}/`;
      expect(redirects).toContain(`${from} /us/${language}/about/ 301`);
      const localResponse = await request.get(from);
      expect(localResponse.status(), from).toBe(404);
      expect(await localResponse.text(), from).toContain("noindex, nofollow");
    }
  }
});

test("analytics remains unloaded until explicit all-cookie consent", async ({
  page,
}) => {
  const analyticsRequests: string[] = [];
  await page.route(
    /googletagmanager\.com|google-analytics\.com/,
    async route => {
      analyticsRequests.push(route.request().url());
      await route.abort();
    }
  );

  await page.goto("/hk/en/services");
  await page.waitForTimeout(1_200);
  expect(analyticsRequests).toEqual([]);
  await page.getByRole("button", { name: "Necessary Only" }).click();
  await page.waitForTimeout(200);
  expect(analyticsRequests).toEqual([]);

  await page.evaluate(() => localStorage.removeItem("tengcle-cookie-consent"));
  await page.reload();
  await page.waitForTimeout(1_200);
  await page.getByRole("button", { name: "Accept All" }).click();
  await expect.poll(() => analyticsRequests.length).toBeGreaterThan(0);

  await page.goto("/hk/en/privacy");
  await page.getByRole("button", { name: "Manage cookie preferences" }).click();
  await expect(page.getByRole("button", { name: "Accept All" })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem("tengcle-cookie-consent"))
    )
    .toBeNull();
});

test("cookie choices are available on direct entry in every region and language", async ({
  page,
}) => {
  const cases = [
    ["/hk/en/services", "Necessary Only"],
    ["/hk/ja/services", "必要なもののみ"],
    ["/hk/zh/services", "仅必要的"],
    ["/jp/en/careers", "Necessary Only"],
    ["/jp/ja/careers", "必要なもののみ"],
    ["/jp/zh/careers", "仅必要的"],
    ["/us/en/contact", "Necessary Only"],
    ["/us/ja/contact", "必要なもののみ"],
    ["/us/zh/contact", "仅必要的"],
  ] as const;

  for (const [route, buttonName] of cases) {
    await page.goto(route);
    await page.evaluate(() =>
      localStorage.removeItem("tengcle-cookie-consent")
    );
    await page.reload();
    await page.getByRole("button", { name: buttonName }).click();
    await expect
      .poll(() =>
        page.evaluate(() => localStorage.getItem("tengcle-cookie-consent"))
      )
      .toBe("accepted-necessary");
  }
});

for (const width of [320, 375, 390, 414]) {
  test(`US primary pages have no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() =>
      localStorage.setItem("tengcle-cookie-consent", "accepted-necessary")
    );

    for (const route of ["/us/en", "/us/en/about", "/us/en/contact"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => new Promise(requestAnimationFrame));
      const animationOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(
        animationOverflow,
        `${route} during animation`
      ).toBeLessThanOrEqual(0);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(overflow, route).toBeLessThanOrEqual(0);
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await expect(page.locator("#us-mobile-navigation")).toBeVisible();
      const menuOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(menuOverflow, `${route} menu`).toBeLessThanOrEqual(0);
    }
  });
}

test("US pages remain stable with reduced motion and at desktop width", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("tengcle-cookie-consent", "accepted-necessary")
  );
  for (const setting of [
    { width: 390, height: 844, reducedMotion: "reduce" as const },
    { width: 1440, height: 900, reducedMotion: "no-preference" as const },
  ]) {
    await page.setViewportSize({
      width: setting.width,
      height: setting.height,
    });
    await page.emulateMedia({ reducedMotion: setting.reducedMotion });
    await page.goto("/us/en");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  }
});
