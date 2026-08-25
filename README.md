# tengcle-corporate

Public Astro site for Tengcle corporate site work. The production build is
fully static and targets the existing Cloudflare Pages project.

## Development setup

Install project dependencies:

```bash
pnpm install
```

Install pre-commit and enable the local hook before starting development:

```bash
pip install pre-commit
pre-commit install
```

The repository includes a `gitleaks` pre-commit hook to help prevent accidental commits of secret-bearing files or credentials.

## Common commands

```bash
pnpm dev
pnpm build
pnpm check
pnpm test:unit
pnpm audit:site
pnpm test:e2e
pnpm format
```

`pnpm build` writes to `dist/public`, preserving the current Cloudflare Pages
output-directory contract. The manifest-driven adapter keeps all 113 baseline
routes while Global home, Company, and Activity form the first Astro-native
vertical slice.

See [docs/astro-static-foundation.md](docs/astro-static-foundation.md) for the
migration boundary, verification gates, and rollback procedure. Brand hierarchy
and placeholder-logo rules are in
[docs/brand-implementation-principles.md](docs/brand-implementation-principles.md).
