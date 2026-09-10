# AI4CUAV

AI4CUAV is a platform for ordering custom counter-UAS (drone detection/recognition) AI
models and managing the training datasets behind them. It's built under the NATO SPS
Programme (Science for Peace and Security) — see [ai4cuav.org](https://ai4cuav.org/).

This repository is a monorepo with two independent projects:

```
frontend/   React 19 + Vite SPA (public site, order wizard, admin area)
backend/    ASP.NET Core 8 Web API (auth, orders, datasets, NDA generation/email)
```

See [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) for
setup instructions for each, and [frontend/ARCHITECTURE.md](frontend/ARCHITECTURE.md) for how
the frontend is organized.

## Quick start

You need both running locally for the app to work end-to-end:

```bash
# Terminal 1 — backend (see backend/README.md for the one-time user-secrets setup)
cd backend/AI4CUAV
dotnet run --launch-profile https

# Terminal 2 — frontend
cd frontend
npm install
cp .env.example .env
npm run dev
```

Then open http://localhost:5173.

## How it fits together

- **Public visitors** can browse the home page and submit an order through the
  `/order` wizard (no account needed) — this includes optionally uploading proof of a
  dataset they already own, and sending themselves an NDA by email.
- **Admins** log in (`/login`) to reach `/admin`, `/datasets`, and `/orders`, which manage
  submitted orders and uploaded training datasets. These routes require an account with the
  `Admin` role — one is seeded automatically in local development (see backend README).

## Security notes for anyone deploying this

- No secrets live in this repository. Local development uses `dotnet user-secrets` for the
  backend and a git-ignored `.env` for the frontend — see each project's README.
- A real deployment needs its own SendGrid key, database connection string, JWT signing key,
  and GCP service-account credentials, provided via environment variables / your hosting
  platform's secret manager — never committed to source control.
