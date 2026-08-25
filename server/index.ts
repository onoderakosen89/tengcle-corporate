import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const knownRoutes = new Set([
  "/",
  "/privacy",
  ...["hk", "jp", "us"].flatMap(region =>
    ["en", "ja", "zh"].flatMap(language => [
      `/${region}/${language}`,
      `/${region}/${language}/services`,
      `/${region}/${language}/about`,
      `/${region}/${language}/contact`,
      `/${region}/${language}/faq`,
      `/${region}/${language}/news`,
      `/${region}/${language}/privacy`,
      ...(region === "hk" ? [`/${region}/${language}/portfolio`] : []),
      ...(region === "jp" ? [`/${region}/${language}/careers`] : []),
      ...(region === "us"
        ? [
            `/${region}/${language}/services/property-development`,
            `/${region}/${language}/services/property-management`,
            `/${region}/${language}/services/vacation-rentals`,
          ]
        : []),
    ])
  ),
]);

const newsArticleIds = {
  hk: [
    "first-ffe-project-2026",
    "odoo-erp-launch",
    "expansion-preparation",
    "hotel-operations-launch",
    "hk-founding",
  ],
  jp: ["company-incorporation-2021"],
  us: [
    "property-management-launch-2025",
    "us-founding-2026",
    "group-global-network-2024",
  ],
} as const;

for (const [region, articleIds] of Object.entries(newsArticleIds)) {
  for (const language of ["en", "ja", "zh"]) {
    for (const articleId of articleIds) {
      knownRoutes.add(`/${region}/${language}/news/${articleId}`);
    }
  }
}

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

  app.use(express.static(staticPath, { redirect: false }));

  // Serve the SPA only for the public routes declared above. Unknown document URLs
  // return an actual HTTP 404, avoiding a soft-404 response for search engines.
  app.get("/{*path}", (req, res) => {
    const normalizedPath = req.path.replace(/\/$/, "") || "/";
    if (knownRoutes.has(normalizedPath)) {
      const routeIndex =
        normalizedPath === "/"
          ? path.join(staticPath, "index.html")
          : path.join(staticPath, normalizedPath.slice(1), "index.html");
      return res.sendFile(routeIndex);
    }
    return res.status(404).sendFile(path.join(staticPath, "404.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
