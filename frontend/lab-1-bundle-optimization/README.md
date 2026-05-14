# Lab 1: Murdering the Huge Bundle

Sample app: [`react_lazy_app/`](./react_lazy_app/). Step-by-step notes: [`guide_to_solution.md`](./guide_to_solution.md).

## Context

Your React application has grown. The main bundle is large. Users on slower networks wait a long time before the app becomes interactive.

## The issue

Heavy dependencies are imported eagerly. Code for routes or widgets the user never opens still ships in the initial download.

## Goal

Implement **code splitting** and **lazy loading** so the first load stays small and optional UI loads on demand. Measure the difference with `pnpm build` (chunk list and gzip sizes).

## Prerequisites

- Node.js (see [`react_lazy_app/.nvmrc`](./react_lazy_app/.nvmrc) if present)
- [pnpm](https://pnpm.io/)

## Run the lab app

```bash
cd react_lazy_app
pnpm install
pnpm dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Navigate between routes and use conditional UI (for example **Show chart**) to trigger lazy chunks.

```bash
pnpm build
```

Inspect `dist/assets/` for multiple JavaScript chunks (route-level and optional components).

## What to explore

- `React.lazy` + `import()` for route modules and heavy children
- `Suspense` with a visible `fallback`
- `BrowserRouter` in the entry file so `Routes` work correctly

## Optional tooling

See [`guide_to_solution.md`](./guide_to_solution.md) for adding a bundle visualizer (for example `rollup-plugin-visualizer`) during investigation.
