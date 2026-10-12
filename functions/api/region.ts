interface RegionContext {
  request: Request & { cf?: { country?: unknown } };
}

// Use only country metadata already available to the existing Cloudflare edge.
// Do not send IP/location data to another service or return it to the browser.
export function onRequestGet({ request }: RegionContext): Response {
  const country = request.cf?.country;
  const routes: Record<string, string> = {
    HK: "/hk/en",
    SG: "/hk/en",
    JP: "/jp/ja",
    US: "/us/en",
    CA: "/us/en",
  };
  const route =
    typeof country === "string" ? routes[country.toUpperCase()] : undefined;
  return Response.json(
    { route: route || "/" },
    {
      headers: {
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex",
      },
    }
  );
}
