# AI4CUAV Backend

ASP.NET Core 8 Web API: accounts/JWT auth, order intake, dataset upload/listing (Google
Cloud Storage), and NDA generation + email delivery (SMTP, via MailKit).

See the repository root [README](../README.md) for how this fits together with the frontend.

## Requirements

- .NET 8 SDK
- SQL Server (a local instance is fine — `(localdb)\MSSQLLocalDB` or a named instance)
- A Google Cloud Storage bucket + service-account key, if you need dataset upload to work
- An SMTP account, if you need NDA emails to actually send (see below for Gmail)

## First-time setup

Nothing secret lives in `appsettings.json` — set the real values locally with
[user-secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets):

```bash
cd AI4CUAV
dotnet user-secrets init   # only if AI4CUAV.csproj doesn't already have a UserSecretsId
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=...;Database=AI4CUAV;Trusted_Connection=True;TrustServerCertificate=True"
dotnet user-secrets set "Jwt:Key" "<a long random string>"
dotnet user-secrets set "Smtp:Username" "<your gmail address>"
dotnet user-secrets set "Smtp:Password" "<a 16-character Gmail App Password>"

# Optional: seed a local admin account (skipped if either is left unset)
dotnet user-secrets set "Seed:AdminEmail" "admin@example.com"
dotnet user-secrets set "Seed:AdminPassword" "<a password>"
```

### Email (Gmail SMTP)

`Smtp:Host`/`Port`/`FromEmail`/`FromName` in `appsettings.json` default to Gmail already —
only `Smtp:Username` and `Smtp:Password` need to be set, via user-secrets, per above.

Gmail SMTP needs an **App Password**, not the account's regular password (regular passwords
are rejected by SMTP auth once 2-Step Verification is on, and Google requires 2-Step
Verification to even generate an App Password):

1. Turn on 2-Step Verification for the sending account, if it isn't already:
   https://myaccount.google.com/security
2. Generate an App Password: https://myaccount.google.com/apppasswords (choose "Mail" /
   "Other", name it "AI4CUAV") — Google gives you a 16-character password.
3. `dotnet user-secrets set "Smtp:Username" "the-account@gmail.com"` and
   `dotnet user-secrets set "Smtp:Password" "<the 16-character app password>"` (spaces don't
   matter, Google shows it grouped in 4s).

Gmail's free sending limit is ~500 emails/day, plenty for NDA sends.

For Google Cloud Storage (used by dataset upload/download), set the ambient
`GOOGLE_APPLICATION_CREDENTIALS` environment variable to point at a service-account key file
kept **outside** this repository — the app relies on this being set in the environment; it
doesn't read a path from config.

Then apply migrations and run:

```bash
dotnet ef database update
dotnet run --launch-profile https
```

The API listens on `https://localhost:7184` (matches the frontend's default `VITE_API_URL`)
and `http://localhost:5299`. Swagger UI is available at `/swagger` in Development.

## Authorization

- `POST /api/account/register` and `/login`, `POST /api/orders` (order submission),
  `POST /api/orders/{id}/dataset-proof`, and `POST /api/nda/send` are anonymous — they're
  used by unauthenticated visitors submitting an order.
- Everything else (`GET /api/orders`, `GET/POST /api/datasets/*`, dataset-proof review,
  marking a dataset verified) requires a JWT for a user in the `Admin` role.

## Tests

There is no automated test project yet. Manually verify with `AI4CUAV.http` (VS Code REST
Client / Visual Studio) or Swagger.
