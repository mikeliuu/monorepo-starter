# CLAUDE.md — Monorepo Starter

## Commit format

Conventional Commits enforced by commitlint + Husky.

```
<type>(<scope>): <description>

Types: feat | fix | chore | docs | style | refactor | test | ci | build | perf
Scope: optional — e.g. website, business, ui, types, api
```

Examples:

- `feat(website): add product listing page`
- `fix(api): handle 204 no-content response`
- `chore: bump turbo to v2.1`

## TDD mandate

Write tests before implementation. Red → green → refactor.

- Unit tests: `packages/*/src/**/*.test.ts`
- Integration tests: `apps/*/tests/**/*.test.ts`
- Run: `bun test` or `bun run test` (turbo)

## Key paths

```
packages/
  config/       — tsconfigs, tailwind preset, eslint base (leaf, no workspace deps)
  types/        — Zod schemas + inferred types (leaf, only depends on zod)
  api/          — axios client, query client, token store, query-keys (depends on types)
  ui/           — shadcn/Radix components, cn() util (depends on config)

apps/
  website/      — consumer-facing Next.js app (port 3000)
  business/     — partner portal Next.js app (port 3001)
```

## Package boundary rules

- `types` → zero workspace dependencies (leaf)
- `api` → depends only on `@starter/types`
- `ui` → depends only on `@starter/config` (no app logic)
- Apps → depend on all four packages; **never import from each other**
- No `apps/business` importing `apps/website/**` or vice versa

## Build order

`types` → (`api` ∥ `ui`) → apps

Turbo's `^build` pipeline enforces this automatically.

## Dev workflow

```bash
bun install              # install all deps
bun run build            # build packages in dep order, then apps
bun run dev:website      # website on :3000
bun run dev:business     # business on :3001
bun run lint             # eslint across all workspaces
bun run type-check       # tsc --noEmit across all workspaces
```

## Environment variables

- `API_BASE_URL` — REST API base URL (server-side, both apps)
- `NEXT_PUBLIC_SITE_URL` — website canonical URL
- `NEXT_PUBLIC_BUSINESS_URL` — business portal canonical URL

Copy `.env.example` → `.env.local` in each app before running.
