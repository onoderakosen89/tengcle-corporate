import express from "express";
import { createServer } from "http";
import path from "path";
import { allStaticRoutes } from "../shared/seoOutput";

const knownRoutes = new Set(allStaticRoutes.map(page => page.route));

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath = path.resolve(process.cwd(), "dist", "public");

  app.use(express.static(staticPath, { redirect: false }));

  // Serve the SPA only for the public routes declared above. Unknown document URLs
  // return an actual HTTP 404, avoiding a soft-404 response for search engines.
  app.get("/{*path}", (req, res) => {
    const normalizedPath = req.path.replace(/\/$/, "") || "/";
    if (knownRoutes.has(normalizedPath)) {
      if (normalizedPath !== "/" && !req.path.endsWith("/")) {
        return res.redirect(
          308,
          `${req.path}/${req.url.slice(req.path.length)}`
        );
      }
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
