# Astro static foundation

## Boundary

This change keeps the Cloudflare Pages project, build command, and
`dist/public` output contract. Astro runs with `output: "static"`, directory
format, and trailing slashes. It does not add SSR, a Cloudflare adapter, Pages
Functions, DNS changes, or a production deployment path.

The existing `shared/seoRouteManifest.ts` remains the golden list for 113
regional and legal routes. A catch-all Astro page generates those routes and
provides semantic initial HTML. The existing React application mounts only
inside this transitional adapter so current interactions remain available while
route-by-route migration continues. Astro-native pages do not mount the global
application; their only client script is the cookie-preference island.

The first native vertical slice is:

- `/` — Global home with the canonical static Seigaiha background;
- `/companies/japan/` — representative Company page;
- `/activities/property-management/` — representative Activity page.

The latter two are explicit additions, so the sitemap contains 115 URLs: the
113-route baseline plus two representative routes.

## Contracts

- Content entries are validated through Astro Content Collections and Zod.
- Canonical, hreflang, sitemap, and JSON-LD output reuse the existing manifest.
- Every sitemap page contains one `main`, one H1, meaningful text, and internal
  links before JavaScript runs.
- The deployed CSP remains compatible because executable scripts are external;
  only JSON-LD is inline.
- The approved logo vector is not yet in the repository. Text lockups remain
  explicit placeholders and use one master brand across all regions.
- The current Global page's 180 × 90 Seigaiha source was identified and used as
  a visual baseline. Site 2.0 carries an independently authored 192 × 96 static
  SVG repeat with source geometry and authorship notes. It is decorative,
  non-animated, enlarged and muted on mobile, and removed for print.

## Verification

Run:

```bash
pnpm check
pnpm test:unit
pnpm build
pnpm audit:site
pnpm test:e2e
pnpm audit --prod --audit-level=high
```

The site audit enforces baseline/new route counts, trailing slashes, canonical
and hreflang parity, JSON-LD, 404 rules, semantic initial HTML, CSP-compatible
scripts, security headers, the Seigaiha asset budget, and a 75 KB gzip
JavaScript budget on the representative Global route. Playwright covers no-JS,
Axe, mobile overflow, reduced motion, print, cookies, and legacy parity.

Cloudflare verification is Preview-only. The preview must return
`X-Robots-Tag: noindex` plus the declared security headers before merge-ready
status. Production promotion, DNS changes, and merging to `main` are excluded.

## Rollback

No production action is part of this change. If the Preview is unsuitable,
close the Draft PR or delete its branch; the current production deployment is
unchanged. If a later human-approved production promotion fails, first restore
the previous successful Cloudflare Pages production deployment. Revert the
Astro cutover through a new PR only if a source rollback is also required. DNS
does not change in either path.
