# Lab 2: Efficient State Management with Selectors

Sample app: [`redux-selectors-app/`](./redux-selectors-app/). Step-by-step notes: [`guide_to_solution.md`](./guide_to_solution.md).

## Context

You have a Redux (or Pinia) store with an **OrderList**. Users filter orders by **status** and **date**.

## The issue

Any unrelated global update (for example the current user profile) can cause the list to recompute derived data and re-render more than necessary, which feels laggy on large lists.

## Goal

Use **memoized selectors** (Reselect via `@reduxjs/toolkit`, or Pinia getters) so that:

1. Components subscribe to stable, derived data and re-render only when relevant inputs change.
2. Filtering and sorting logic live in the **store layer** (selectors), not scattered in the UI.

## Prerequisites

- Node.js (see [`redux-selectors-app/.nvmrc`](./redux-selectors-app/.nvmrc) if present)
- [pnpm](https://pnpm.io/)

## Run the lab app

```bash
cd redux-selectors-app
pnpm install
pnpm dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Use the status and date filters, then use the control that updates **only** unrelated user state and confirm (via console logs in selectors, if you keep them) that the expensive selector does not re-run when orders and filters are unchanged.

```bash
pnpm build
pnpm lint
```

## What to explore

- `createSelector` input selectors that return **primitives** or stable references where possible
- `useSelector` with composed selectors instead of ad-hoc `.filter()` in the component on every render
- Normalization patterns (see the end of [`guide_to_solution.md`](./guide_to_solution.md)) for larger apps
