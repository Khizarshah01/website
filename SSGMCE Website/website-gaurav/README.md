# SSGMCE College Website

Full-stack college website for Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon.
It includes a public-facing site and an admin CMS with markdown-based content editing.

## Tech Stack

- Frontend: React 18, Vite 7, React Router 6, Tailwind CSS 3
- Backend: Node.js, Express 4, Mongoose 7
- Database: MongoDB
- Auth: JWT + bcryptjs
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
JWT_SECRET=<your-jwt-secret>
ADMIN_JWT_SECRET=<your-admin-jwt-secret>
```

If `mongodb+srv://...` fails locally with a `querySrv ECONNREFUSED` error, use the standard Atlas connection string in `MONGODB_DIRECT_URI` as a fallback. If Atlas says your machine is not allowed to connect, add your current IP address under Atlas Network Access first.

## Core Features

- Public website with institution-wide sections
- CMS-driven pages using reusable markdown content blocks
- Admin visual editor for page sections (markdown, image, table, stats, etc.)
- Structured page data seeded from `server/data/allNavPages.js`
- News, notices, events, documents, department and placement modules

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
```

## Notes

- If frontend shows proxy errors like `ECONNREFUSED 127.0.0.1:5000`, backend is not running.
- Keep `allNavPages.js` aligned with navbar order so admin page ordering remains consistent.

## License

MIT
