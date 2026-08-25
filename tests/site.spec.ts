import { expect, test } from "@playwright/test";

test("known routes and article routes return route-specific initial HTML", async ({
  request,
}) => {
  const cases = [
    ["/hk/en", "en", "https://www.tengcle.com/hk/en/"],
    ["/jp/ja", "ja", "https://www.tengcle.com/jp/ja/"],
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
    expect(body).toContain(`<html lang="${lang}">`);
    expect(body).toContain(`<link rel="canonical" href="${canonical}" />`);
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
    'content="Tengcle Development LLC was officially registered in Weehawken, New Jersey in January 2026 as the US office of Tengcle Group."'
  );
  expect(body).toContain('<meta property="og:type" content="article" />');
  expect(body).toContain(
    '<meta property="article:published_time" content="2026-01-01" />'
  );
  expect(body).toContain('"@type":"NewsArticle"');
  expect(body.match(/rel="canonical"/g)).toHaveLength(1);
  expect(body.match(/rel="alternate"/g)).toHaveLength(4);
});

test("unknown documents return a real noindex 404 without canonical", async ({
  request,
  page,
}) => {
  const response = await request.get("/us/en/definitely-not-a-page");
  expect(response.status()).toBe(404);
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
