# Frontend Architecture

## Routing

`App.jsx` owns the route table. Public routes (`/`, `/order`, `/login`, `/register`) render
directly; admin routes (`/admin`, `/datasets`, `/datasetupload`, `/orders`) are wrapped in
`components/ProtectedRoute.jsx`, which redirects to `/login` if there's no token in
`localStorage`. The backend is the actual authority — those endpoints require an Admin JWT
regardless of what the frontend does — this wrapper just avoids showing a broken page to a
logged-out visitor.

## Data flow

```
Page component
  → custom hook (useFetchDatasets / useFetchOrders / useOrderForm), if the page has one
  → service module (services/*.js)
  → services/apiClient.js (shared axios instance)
  → backend API
```

Every service module (`authService`, `datasetService`, `ndaService`, `orderService`) is a thin
wrapper: build the request, call `apiClient`, translate a failure into a plain `Error` via
`services/apiError.js`. `apiClient` is the one place that knows the base URL and attaches the
`Authorization: Bearer <token>` header — services and components never touch `localStorage` or
build headers themselves (except `Login.jsx`, which is where the token is *stored* after a
successful login).

## Folder conventions

- Directories are lowercase (`components/`, `pages/`, `services/`, …); component/page files
  themselves stay PascalCase (`Sidebar.jsx`, `Dashboard.jsx`) — the common JS convention.
- `pages/` has one file per route. `pages/admin/` holds routes that render inside `AdminLayout`.
- `components/` holds anything reused by more than one page, grouped by area
  (`layout/`, `common/`, `home/`, `admin/`) plus a couple of standalone ones
  (`EmailCaptureDialog.jsx`, `ProtectedRoute.jsx`).
- `constants/`, `helpers/`, `hooks/` each have a barrel `index.js`; use it or a direct import,
  whichever is already used nearby in the file you're editing.

## Adding a new page

1. Add the component under `pages/` (or `pages/admin/` if it's admin-only).
2. Add its path to `constants/routes.js`.
3. Register it in `App.jsx` — wrap it in `<ProtectedRoute>` if it calls an admin-only endpoint.
4. If it fetches data, add a service function in the relevant `services/*.js` file rather than
   calling `apiClient`/`fetch` directly from the component.
