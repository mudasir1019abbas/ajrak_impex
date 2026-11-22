# Ajrak Impex International

Full-stack Next.js version of the Ajrak Impex website: the same interface as the original React + Vite
frontend, now with a real backend (MySQL) for accounts and the contact form.

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, **JavaScript only** (no TypeScript), **no `src/` folder** |
| Rendering | **Cache Components** + **React Compiler** enabled |
| Styling | Tailwind CSS v4 (same theme, colours and animations as the original) |
| Database | MySQL via mysql2 (connection pool, no ORM) |
| Auth | Email + password, bcrypt, JWT in an **httpOnly cookie** |
| Lint | ESLint (`eslint-config-next`) |
| Agents | `AGENTS.md` included |

## Getting started

```bash
npm install
copy .env.example .env.local   # Windows; then fill in the values
npm run dev                    # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |

### Environment variables

| Name | Required | Notes |
|---|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | yes | MySQL connection details (on Hostinger: created under hPanel → Databases) |
| `JWT_SECRET` | yes | 32+ random characters: `openssl rand -base64 48`. Changing it logs everyone out. |
| `ADMIN_USER_IDS` | for admin access | Comma-separated numeric IDs of existing `users` accounts allowed into `/admin`. Find IDs with `SELECT id, email FROM users;`. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Public URL, used for social-sharing metadata. Set it before building for production. |

The app builds without the `DB_*` variables and `JWT_SECRET`; they are only read when an API route runs.
Set `NEXT_PUBLIC_SITE_URL` to the production URL before building.
The two tables (`users`, `contact_messages`) are created automatically on first use;
`sql/schema.sql` is included if you prefer to create them by hand (e.g. in phpMyAdmin).

## Deploying to Hostinger (Unlimited plan)

The Unlimited plan (formerly Business) supports Node.js "Web Apps" in hPanel; Single and
Premium do not. Follow the steps below to deploy the app.

1. In hPanel -> Databases, create a MySQL database and a user for it; note the database
   name, user name and password (Hostinger shows the host as `localhost`).
2. Create a Web App (Node.js 20 or 22), import this GitHub repository or upload the project,
   and set the environment variables: `DB_HOST`, `DB_PORT` (3306), `DB_USER`, `DB_PASSWORD`,
   `DB_NAME`, `JWT_SECRET`, and `NEXT_PUBLIC_SITE_URL` (your domain, set before building).
   For admin access, also set `ADMIN_USER_IDS` to an existing account ID.
3. Deploy. The tables are created automatically on first use.

## Deploying to GoDaddy

This is a full-stack Next.js app (API routes, authentication, and MySQL), so it needs a GoDaddy plan
that supports a persistent Node.js application. Static-only Web Hosting cannot run it. For cPanel,
confirm **Setup Node.js App** is available and that its Node.js version is 20.19 or newer; otherwise
use a GoDaddy VPS or another Node.js-capable plan.

1. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS URL in `.env.local` before building. Build on a
   machine with Node.js 20.19 or newer:

   ```bash
   npm ci
   npm run build
   ```

   The build creates `.next/standalone` and automatically copies `public` and `.next/static` into it.
2. In cPanel **Setup Node.js App**, select Node.js 20.19 or newer, create an application, and use
   `.next/standalone` as its application root and `server.js` as its startup file. Upload the
   **contents** of `.next/standalone` to that application root. The generated server listens on the
   `PORT` provided by the hosting platform.
3. Configure the `DB_*` variables and `JWT_SECRET` in the application's environment variables. Set
   `NEXT_PUBLIC_SITE_URL` before building (it is embedded in the built site). Do not upload `.env`
   files or put secrets in `NEXT_PUBLIC_*` variables. For admin access, also configure
   `ADMIN_USER_IDS` with an existing user ID.
4. Point the `DB_*` variables at a MySQL database the server can reach, then restart
   the application. Tables (`users`, `contact_messages`) are created automatically on first use.

For a GoDaddy VPS, deploy the same standalone folder and run `node server.js` with the environment
variables set in the process manager. For later releases, rebuild, replace the application files,
and restart the app.

## Deploying to Vercel

1. Create a MySQL database and user with a reachable host (e.g. in hPanel).
2. Push this folder to GitHub and import it in Vercel.
3. Add the `DB_*` variables, `JWT_SECRET`, and `NEXT_PUBLIC_SITE_URL` in the Vercel project settings.
   For admin access, also set `ADMIN_USER_IDS` to an existing account ID.
4. Deploy. Tables (`users`, `contact_messages`) are created automatically on first use.

## Project structure

```
app/
  layout.js            Root layout, shared navigation, auth provider, metadata
  page.js              Home page
  about/ account/ admin/ careers/ contact/ global-trade/ how-we-work/
  legal/ login/ products/ services/ signup/ team/
  news/                News list and [slug]/ article pages
  models/[model]/      Trade, product-funding, and growth pages
  not-found.js         404 page
  icon.png             Favicon
  globals.css          Tailwind theme, brand colours, animations
  api/
    account/route.js
    admin/overview|inquiries|users/route.js
    auth/register|login|logout|me/route.js
    contact/route.js
components/            Shared navigation, forms, dashboards, and UI
context/AuthContext.js Client session state (useAuth)
data/                  Product, service, and image data
hooks/useReveal.js     Scroll-reveal animation
lib/                   Database, auth, validation, API, and admin helpers
models/                User and contact-message data access
sql/schema.sql         Optional manual database schema
public/                Images and other static assets
proxy.js               Redirects visitors without a session away from /account and /admin
```

## API

All endpoints take and return JSON. Errors look like `{ "message": "..." }` with a matching status code.

| Endpoint | Body | Result |
|---|---|---|
| `POST /api/auth/register` | `{ name, email, password }` | `201 { user }` and sets the session cookie. `409` if the email exists. |
| `POST /api/auth/login` | `{ email, password }` | `200 { user }` and sets the cookie. `401` for wrong credentials. |
| `POST /api/auth/logout` | none | Clears the cookie. |
| `GET /api/auth/me` | none | `{ user }`, or `{ user: null }` when signed out. |
| `GET /api/account` | none | Signed-in profile, inquiry summary, and recent inquiries. |
| `POST /api/contact` | `{ name, email, subject, message }` | `201 { message }`; the message is stored in MySQL. |
| `GET /api/admin/overview` | none | Admin-only account and inquiry metrics. |
| `GET /api/admin/inquiries` | `?search=&status=all&page=1` | Admin-only, paginated inquiries. |
| `PATCH /api/admin/inquiries` | `{ id, status }` | Admin-only inquiry status update (`new`, `read`, or `replied`). |
| `GET /api/admin/users` | `?search=&page=1` | Admin-only, paginated customer accounts and linked inquiry counts. |

Validation rules live in `lib/validators.js` and are shared by the browser forms and the API,
so they cannot drift apart.

### Reading contact messages

Messages are stored in the `contact_messages` table (newest first, `status: 'new'`).
Open them in phpMyAdmin, or run:

```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

## Security notes

- Passwords are hashed with bcrypt (cost 12) and never returned by the API.
- The session is a signed JWT (7 days) in an `httpOnly`, `SameSite=Lax`, `Secure` (production) cookie,
  so page scripts cannot read it. (The original React app kept its token in `localStorage`.)
- `/account` is protected twice: by `proxy.js` on the server and by `ProtectedRoute` in the UI.
- `/admin` and its APIs require a valid session and an account ID listed in `ADMIN_USER_IDS`. Register the intended administrator account first, then copy its numeric `id` from the MySQL `users` table into this server-only environment variable. Do not grant admin access by email alone: public sign-up does not verify email addresses.
- Login/register/contact are rate limited per IP. The limiter is in memory, which is fine for one server;
  on serverless each instance counts separately, so use a shared store (e.g. Upstash Redis) if you need strict limits.
- Safari does not accept `Secure` cookies on `http://localhost` when running `npm start`; use `npm run dev`
  there (cookies are not `Secure` in development).

## Notes on the port

- URLs are unchanged. `/services` and `/global-trade` redirect to `/products` (as before, they showed the same page).
- Unknown news articles and models return a real 404 page.
- Images moved to `public/images` and are served through `next/image` (resized, modern formats, lazy-loaded).
- The footer year is cached (`use cache`) so every page stays in the static shell under Cache Components.
- Read `AGENTS.md` before changing framework-level code: this Next.js version has APIs newer than most training data.
