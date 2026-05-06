# tengcle-corporate

Public web repository for Tengcle corporate site work.

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
pnpm format
```
