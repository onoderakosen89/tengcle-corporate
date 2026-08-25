import type { APIRoute } from "astro";
import { allStaticRoutes, renderSitemap } from "../../shared/seoOutput";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(renderSitemap(allStaticRoutes), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
