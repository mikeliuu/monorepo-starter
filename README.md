# monorepo-starter

Turborepo + Bun monorepo with two Next.js 15 apps sharing a real package layer.

## Stack

|              |                                                      |
| ------------ | ---------------------------------------------------- |
| Framework    | Next.js 15 (App Router), React 19, TypeScript strict |
| Monorepo     | Turborepo + Bun workspaces                           |
| Styling      | Tailwind CSS + shadcn/ui (Radix)                     |
| Server state | TanStack React Query v5                              |
| Forms        | React Hook Form + Zod                                |
| Toasts       | Sonner                                               |
| Git hooks    | Husky + commitlint (conventional commits)            |

## Structure

```
apps/
  website/     consumer app — :3000
  business/    partner portal — :3001
packages/
  ui/          shared shadcn/Radix components
  types/       Zod schemas + inferred types (leaf)
  api/         axios client, queryClient, tokenStore, queryKeys
  config/      tsconfigs, tailwind preset, eslint base
```

## Setup

```bash
bun install
cp apps/website/.env.example apps/website/.env.local
cp apps/business/.env.example apps/business/.env.local
```

## Dev

```bash
bun run dev:website    # http://localhost:3000
bun run dev:business   # http://localhost:3001
bun run dev            # both apps concurrently
```

## Build / CI

```bash
bun run build          # packages then apps in dep order
bun run type-check     # tsc --noEmit across all workspaces
bun run lint           # eslint across all workspaces
bun run test           # jest across all workspaces
```

## Package boundaries

- `@starter/types` → no workspace deps (leaf)
- `@starter/api` → depends only on `@starter/types`
- `@starter/ui` → depends only on `@starter/config`
- Apps → depend on all four; **never import from each other**

See [CLAUDE.md](./CLAUDE.md) for agent instructions.
