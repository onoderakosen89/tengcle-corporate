interface PagesMiddlewareContext {
  next(): Promise<Response>;
}

export async function onRequest(
  context: PagesMiddlewareContext
): Promise<Response> {
  const response = await context.next();
  if (response.status !== 404) return response;

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex");
  headers.set("Cache-Control", "no-store");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
