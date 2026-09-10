# AI4CUAV Frontend

React 19 + Vite single-page app for the AI4CUAV platform: a public marketing home page, a
public order-submission wizard, and an admin area (dashboard, datasets, orders) gated behind
a JWT login.

See the repository root [README](../README.md) for how this fits together with the backend.

## Requirements

- Node.js 18+
- The backend API running locally (see `../backend/README.md`)

## Setup

```bash
npm install
cp .env.example .env   # adjust VITE_API_URL if your API runs elsewhere
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint
- `npm run preview` — serve the production build locally

## Project structure

```
src/
├── assets/        images used by the home page
├── components/    shared UI — layout (Sidebar, TopNavigation), common (DataTable),
│                  home (HeroSection), admin (DashboardStats, DashboardChart),
│                  EmailCaptureDialog, ProtectedRoute
├── constants/     colors, enum option lists, route paths
├── helpers/       small formatting/validation utilities
├── hooks/         useOrderForm (order wizard state), useFetchDatasets/useFetchOrders
├── layouts/       AdminLayout (sidebar + content shell for admin pages)
├── pages/         one file per route
├── services/      apiClient (shared axios instance + auth header), one module per
│                  backend resource (authService, datasetService, ndaService, orderService)
├── App.jsx        route table
└── main.jsx       React entry point
```

## Auth

`services/apiClient.js` attaches the token stored in `localStorage` under `authToken`
(set by `pages/Login.jsx`) as a `Bearer` header on every request. `components/ProtectedRoute.jsx`
redirects to `/login` if that token is missing before rendering an admin page — the API is the
source of truth for authorization (`[Authorize(Roles = "Admin")]` on the backend), this is just
about not showing a broken admin page to a logged-out visitor.
