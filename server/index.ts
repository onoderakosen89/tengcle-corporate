import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const knownRoutes = new Set([
  "/",
  "/privacy",
  ...["hk", "jp", "us"].flatMap((region) => ["en", "ja", "zh"].flatMap((language) => [
    `/${region}/${language}`,
    `/${region}/${language}/services`,
    `/${region}/${language}/about`,
    `/${region}/${language}/contact`,
    `/${region}/${language}/faq`,
    `/${region}/${language}/news`,
    `/${region}/${language}/privacy`,
    ...(region === "hk" ? [`/${region}/${language}/portfolio`] : []),
    ...(region === "jp" ? [`/${region}/${language}/careers`] : []),
    ...(region === "us" ? [
      `/${region}/${language}/services/property-development`,
      `/${region}/${language}/services/property-management`,
      `/${region}/${language}/services/vacation-rentals`,
    ] : []),
  ])),
]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Serve the SPA only for the public routes declared above. Unknown document URLs
  // return an actual HTTP 404, avoiding a soft-404 response for search engines.
  app.get("/{*path}", (req, res) => {
    const normalizedPath = req.path.replace(/\/$/, "") || "/";
    if (knownRoutes.has(normalizedPath)) {
      return res.sendFile(path.join(staticPath, "index.html"));
    }
    return res.status(404).type("html").send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Page Not Found | Tengcle Group</title></head><body><h1>Page Not Found</h1><p>The requested page does not exist.</p><p><a href="/">Return to Tengcle Group</a></p></body></html>`);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
