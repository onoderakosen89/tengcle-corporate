import { describe, expect, it } from "vitest";
import { onRequest } from "../functions/_middleware";
import { onRequestGet as selectRegion } from "../functions/api/region";

describe("Cloudflare Pages response middleware", () => {
  it("marks every 404 response noindex and non-cacheable", async () => {
    const response = await onRequest({
      next: async () =>
        new Response("not found", {
          status: 404,
          headers: { "Content-Type": "text/html" },
        }),
    });

    expect(response.status).toBe(404);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Content-Type")).toContain("text/html");
    expect(await response.text()).toBe("not found");
  });

  it("does not replace or modify successful static responses", async () => {
    const staticResponse = new Response("ok", {
      status: 200,
      headers: { "X-Content-Type-Options": "nosniff" },
    });
    const response = await onRequest({ next: async () => staticResponse });

    expect(response).toBe(staticResponse);
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });
});

describe("Cloudflare region selection", () => {
  it.each([
    ["HK", "/hk/en"],
    ["SG", "/hk/en"],
    ["JP", "/jp/ja"],
    ["US", "/us/en"],
    ["CA", "/us/en"],
    ["DE", "/"],
    ["XX", "/"],
    [null, "/"],
    [undefined, "/"],
  ])(
    "uses edge country %s to select %s without exposing location",
    async (country, route) => {
      const request = Object.assign(
        new Request("https://www.tengcle.com/api/region"),
        { cf: { country } }
      );
      const response = selectRegion({ request });
      expect(await response.json()).toEqual({ route });
      expect(response.headers.get("Cache-Control")).toBe("private, no-store");
      expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
      expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    }
  );

  it("does not use a client-supplied country header when edge data is missing", async () => {
    const request = new Request("https://www.tengcle.com/api/region", {
      headers: { "CF-IPCountry": "JP" },
    });
    expect(await selectRegion({ request }).json()).toEqual({ route: "/" });
  });
});
