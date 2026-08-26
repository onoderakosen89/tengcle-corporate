import { describe, expect, it } from "vitest";
import { onRequest } from "../functions/_middleware";

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
