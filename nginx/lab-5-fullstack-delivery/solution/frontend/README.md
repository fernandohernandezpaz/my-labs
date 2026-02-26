# Frontend Admin (React + TypeScript)

React admin panel connected to Nest backend (`/api/v1`) with JWT auth and CRUD modules for brands, models, and products.

## Stack
- React + TypeScript + Vite
- React Router v6
- TanStack Query + Axios
- Ant Design with Element-style tokens
- React Hook Form + Zod
- Vitest + Testing Library + MSW

## Setup
1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` (default `http://localhost:3000/api/v1`).
3. Install dependencies and run:

```bash
pnpm install
pnpm dev
```

## Scripts
```bash
pnpm dev
pnpm build
pnpm preview
pnpm test
```

## Features
- `/login`: auth via `POST /auth/login`
- Protected routes with JWT guard
- `/admin/brands`: CRUD Brand
- `/admin/models`: CRUD Model
- `/admin/products`: CRUD Product

## Structure
Main folders:
- `src/app`: providers, router, styles
- `src/shared`: reusable api/ui/utils/constants
- `src/features`: auth/brands/models/products modules
- `src/pages`: dashboard and fallback pages

## Backend Contract
- Public: `POST /auth/login` => `{ accessToken }`
- Protected: `GET/POST/PATCH/DELETE /brand|/model|/product`

## Notes
- Seed credentials in backend: `admin / admin123.`
- Pagination/search/filter can be added later without changing base architecture.
