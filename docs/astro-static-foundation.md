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
the static foundation is evaluated. The Global home uses the same adapter, so
JavaScript-enabled visitors continue to receive the established
`GlobalGateway.tsx` UI and each regional route retains its existing component,
palette, imagery, layout, and navigation.

The public route contract remains exactly the existing 113 routes. The former
design-only experiments at `/companies/japan/` and
`/activities/property-management/` are intentionally not generated and are not
included in the sitemap. Their typed draft content may remain internal for
future evidence and copy work, but it has no public route.

This PR is therefore a technical migration, not a redesign. UI changes and
claim/copy changes require separate review.

## Contracts

- Content entries are validated through Astro Content Collections and Zod.
- Canonical, hreflang, sitemap, and JSON-LD output reuse the existing manifest.
- Every sitemap page contains one `main`, one H1, meaningful text, and internal
  links before JavaScript runs.
- The deployed CSP remains compatible because executable scripts are external;
  only JSON-LD is inline.
- The established master logo image and Global Seigaiha treatment are preserved
  as-is. Recovering an approved vector and improving tagline legibility remain
  separate brand work; this foundation does not crop, redraw, or substitute the
  logo.

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

The site audit enforces the exact 113-route baseline, trailing slashes, canonical
and hreflang parity, JSON-LD, 404 rules, semantic initial HTML, CSP-compatible
scripts, security headers, and the Global runtime budget. Playwright covers
no-JS SEO, Axe, mobile overflow, reduced motion, cookies, the established Global
gateway, and regional UI parity.

The preserved US footer's related-company helper line remains at a 4.01:1
contrast ratio instead of the WCAG AA 4.5:1 target for small text. The focused
UI-restoration test records that one existing exception explicitly and rejects
any additional serious or critical Axe finding. Changing that color belongs in
a separately reviewed visual/accessibility adjustment because this foundation
must not silently alter the accepted regional UI.

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
