# SSGMCE College Website..

Full-stack college website for Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon.
It includes a public-facing site and an admin CMS with markdown-based content editing.

## Developed By

This website was developed from scratch by SSGMCE Shegaon students.  
With the knowledge and resources available to us, we gave our best effort from our side to build and deliver this complete college website project.

- Aditya Kulkarni
- Gaurav Ghatol
- Prajwal Kathole
- Sagar Palhade
- Aditya Siras

## Tech Stack

- Frontend: React 18, Vite 7, React Router 6, Tailwind CSS 3
- Backend: Node.js, Express 4, Mongoose 7
- Database: MongoDB
- Auth: HTTP-only JWT cookies + bcryptjs
- Content Editing: Markdown-driven visual editor
- Uploads: Multer

## Project Structure

```text
website/
  client/                  # React app
    src/
      components/          # Shared + admin components
      pages/               # Route pages (about, academics, placements, admin, etc.)
      constants/           # Navigation and route config
      contexts/            # Auth/edit/page contexts
  server/                  # Express API
    controllers/           # API controllers
    routes/                # API routes
    models/                # Mongoose models
    data/                  # Seed/default markdown content
    scripts/               # Data sync and maintenance scripts
    utils/                 # DB init and utilities
```

## Local Setup

### 1. Clone

```bash
git clone https://github.com/gauravghatol/website.git
cd website
```

Use Node.js `20.19.0` or newer compatible with Vite 7 (`^20.19.0 || >=22.12.0`).

### 2. Start Backend

```bash
cd server
npm install
npm run dev
```

Backend runs at `http://127.0.0.1:5000` by default.

### 3. Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:3000` and proxies `/api` and `/uploads` to backend.

## Environment Variables

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<your-mongodb-uri>
MONGODB_DIRECT_URI=<optional-non-srv-mongodb-uri>
JWT_SECRET=<strong-random-secret-at-least-32-characters>
AUTH_COOKIE_ALLOW_INSECURE_LOOPBACK=true
ADMIN_GATE_TOKEN=<strong-random-admin-entry-token>
```

If `mongodb+srv://...` fails locally with a `querySrv ECONNREFUSED` error, use the standard Atlas connection string in `MONGODB_DIRECT_URI` as a fallback. If Atlas says your machine is not allowed to connect, add your current IP address under Atlas Network Access first.

For non-loopback staging or test URLs, use HTTPS and set `AUTH_COOKIE_SECURE=true`. The server only allows insecure auth cookies by default for localhost/127.0.0.1 development so Docker/LAN HTTP targets do not accidentally receive reusable session cookies.

## Core Features

- Public website with institution-wide sections
- CMS-driven pages using reusable markdown content blocks
- Admin visual editor for page sections (markdown, image, table, stats, etc.)
- Structured page data seeded from `server/data/allNavPages.js`
- News, notices, events, documents, department and placement modules

## Documentation Set

- [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md) — full technical architecture and maintenance reference
- [ADMIN_USER_MANUAL.md](ADMIN_USER_MANUAL.md) — non-technical admin panel usage guide
- [MARKDOWN_REFERENCE_GUIDE.md](MARKDOWN_REFERENCE_GUIDE.md) — practical Markdown reference for content editors
- [HANDOVER_ONBOARDING_CHECKLIST.md](HANDOVER_ONBOARDING_CHECKLIST.md) — outgoing/incoming team transfer checklist
- [SECURITY_TESTING_REPORT.md](SECURITY_TESTING_REPORT.md) — security hardening and testing notes

## Security Status

Current local hardening status is documented in [SECURITY_TESTING_REPORT.md](SECURITY_TESTING_REPORT.md).

- Authentication uses HTTP-only JWT cookies; legacy browser `adminToken` storage is purged client-side.
- Admin write routes, document conversion, private document access, and faculty/department mutations are protected server-side.
- Rich text and raw Markdown HTML render paths are sanitized with DOMPurify-based helpers.
- Generated/local secrets and deployment env files are ignored; do not commit `.env`, `server/.env`, `server/.dev-jwt-secret`, or `client/.env.production`.
- Known remaining dependency item: one low-severity indirect `quill@2.0.3` advisory through `react-quill-new`; upgrade when a compatible patched release exists.

## API Overview

All APIs are under `/api`:

- `/api/auth` authentication
- `/api/pages` page content and section updates
- `/api/departments`, `/api/faculty`
- `/api/news`, `/api/notices`, `/api/events`
- `/api/placements`, `/api/research`, `/api/iqac`, `/api/nirf`
- `/api/documents`, `/api/upload`

## Useful Commands

```bash
# client
npm run dev
npm run build
npm run preview

# server
npm run dev
npm start
npm run check:syntax

# root
npm run verify
```

## Production Checklist

- Use Node from `.nvmrc` (`20.19.0`) or another version matching `^20.19.0 || >=22.12.0`.
- Set strong production `JWT_SECRET` and `ADMIN_GATE_TOKEN` values in the deployment platform, not in Git.
- Set `AUTH_COOKIE_SECURE=true` and deploy behind HTTPS for production or shared test environments.
- Set exact production `CORS_ORIGIN` and `VITE_BACKEND_URL` values.
- Run `npm run verify` before release.
- Run server and client audits; the CI workflow fails on moderate-or-higher advisories.
- Complete live testing for login, admin CRUD, uploads/downloads, responsive UI, Lighthouse/Core Web Vitals, and CSP behavior.
- Rotate any credentials that were ever committed and clean Git history before making the repository public.

## Notes

- If frontend shows proxy errors like `ECONNREFUSED 127.0.0.1:5000`, backend is not running.
- Keep `allNavPages.js` aligned with navbar order so admin page ordering remains consistent.

## License

MIT
