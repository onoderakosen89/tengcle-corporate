import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { publicRoutePaths } from "../shared/seoRouteManifest";

const knownRoutes = new Set(publicRoutePaths);

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
