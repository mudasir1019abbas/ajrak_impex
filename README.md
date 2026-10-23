# Ajrak Impex International - Frontend

React 18 + Vite + Tailwind CSS v4 (via the official Vite plugin - **no PostCSS**) + React Router 6.
Frontend only. Auth and contact forms call a REST API you can build in Express/Node.

## Run

```bash
npm install
cp .env.example .env     # optional
npm run dev              # http://localhost:5173
npm run build            # production build in /dist
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home (hero, promise, services preview, catalog, case studies) |
| `/about` | About / history timeline / story / values / certifications |
| `/services` | Logistics, supply chain, catalog, case studies |
| `/global-trade` | Trade lanes and why buyers choose us |
| `/models/trade-with-us` | Import and trade support model |
| `/models/back-a-product` | Product participation model |
| `/models/grow-with-us` | Investor or shareholder model |
| `/news` | News list with topic filter |
| `/news/:slug` | News article |
| `/contact` | Contact form, map, contact info |
| `/login`, `/signup` | Auth pages with validation |
| `/account` | Example protected page |

## Responsive breakpoints

Tailwind defaults: base (mobile), `sm` 640, `md` 768, `lg` 1024 (desktop nav appears), `xl` 1280.

## Animations (Tailwind only)

- Custom keyframes and `animate-*` utilities are declared in `src/index.css` inside `@theme` (`animate-fade-up`, `animate-float`, `animate-drive`, ...).
- Scroll reveals use `src/components/Reveal.jsx` (Tailwind transition utilities + IntersectionObserver).
- Hover/transition effects use Tailwind `transition`, `duration-*`, `hover:` utilities. Reduced-motion is respected.

## Connecting your backend

Everything network-related lives in `src/services/`:

- `api.js` - fetch wrapper, adds `Authorization: Bearer <token>`.
- `authService.js` - endpoints. Expected contract:
  - `POST /api/auth/register` `{ name, email, password }` -> `{ token, user }`
  - `POST /api/auth/login` `{ email, password }` -> `{ token, user }`
  - `GET  /api/auth/me` -> `{ user }`
  - `POST /api/contact` `{ name, email, subject, message }` -> `{ message }`
- Errors: return `{ message }` with a non-2xx status and it is shown in the form.
- Set `VITE_API_URL` in `.env`, or rely on the dev proxy in `vite.config.js` (`/api` -> `http://localhost:5000`).
- Session state is in `src/context/AuthContext.jsx` (`useAuth()`); protect routes with `<ProtectedRoute>`.

Note: the token is kept in `localStorage` for simplicity. For production consider an httpOnly cookie.

## Images

Drop your photos into `public/images/` using the names referenced in `src/data/content.js`
(e.g. `containers.jpg`, `ajrak-hands.jpg`, `handshake.jpg`, `founders.jpg`, `office.jpg`, `port.jpg`, `case-1.jpg` ...).
Missing images fall back to a branded pattern placeholder, so the layout never breaks.

## Structure

```
src/
  components/  Navbar, Footer, Logo, Icons, Reveal, ImageBox, UI, AuthLayout, ProtectedRoute
  pages/       Home, About, Services, News, NewsArticle, Contact, Login, Signup, Account, NotFound
  context/     AuthContext
  services/    api, authService
  hooks/       useReveal
  data/        content.js (all copy and lists)
```
