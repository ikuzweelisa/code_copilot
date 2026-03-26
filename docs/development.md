# Development Workflow

## Prerequisites

- Node.js
- pnpm

## Core Commands

### Setup

```bash
pnpm install
```

### Development Server

Don't run this unless told todo so.

```bash
pnpm run dev
```

Starts at [http://localhost:3000](http://localhost:3000).

### Production Build

Don't run this unless told todo so.

```bash
pnpm run build
pnpm run start
```

## Utility Commands

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `pnpm run lint`        | Lint the codebase              |
| `pnpm run typecheck`   | Run TypeScript compiler checks |
| `pnpm run db:generate` | Generate migration files       |
| `pnpm run db:migrate`  | Apply migrations               |
| `pnpm run db:studio`   | Open Drizzle Studio            |
