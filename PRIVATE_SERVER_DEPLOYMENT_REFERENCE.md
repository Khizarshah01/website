# Private Server Deployment Reference (Architecture + Operations)

Last updated: 2026-05-14
Repository root: `/home/aditya/Programming/SSGMCE/website`

## 1. Scope

This document is for developers/admins who need to:
- Understand how the current codebase runs in production.
- Deploy it on a private server (VPS/LAN/on-prem) without changing architecture.

It describes the architecture as implemented today and the minimum operational details needed to run it safely.

## 2. Runtime Architecture (As Implemented)

```text
Browser
  -> HTTPS (Nginx reverse proxy)
  -> Node.js Express app (server/server.js)
      -> /api/* (JSON API)
      -> /uploads/* (files)
      -> React build (client/dist) for all non-API routes
      -> MongoDB (Mongoose)
           -> App collections (users, pages, faculty, etc.)
           -> GridFS bucket "uploads" (images/documents/nirf binaries)
      -> Local disk fallback: server/uploads/*
```

Key points:
- This is a single deployable Node backend serving both API and frontend build.
- Frontend and backend are expected on the same origin in production.
- Auth uses HTTP-only cookie sessions (JWT in cookie).
- Upload storage is GridFS-first, with local disk fallback when Mongo write quota/storage failures occur.

## 3. Stack Summary

- Frontend: React 18, React Router 6, Vite 7, Tailwind 3
- Backend: Node.js (CommonJS), Express 4, Mongoose 7
- Database: MongoDB
- Process manager: PM2 (`ecosystem.config.cjs`)
- Reverse proxy/TLS: Nginx + Let's Encrypt (recommended)

## 4. Server Requirements

- OS: Linux server (Ubuntu recommended)
- Node.js: `^20.19.0 || >=22.12.0`
- npm: `>=10`
- MongoDB: reachable from server (local or remote)
- Open ports:
  - `80/443` for Nginx
  - Internal app port (default `5000`) only for local proxy binding

## 5. Environment Variables (Production)

Create `server/.env` using `server/.env.production.example` as base.

Required for production startup:
- `NODE_ENV=production`
- `PORT=5000` (or another internal app port)
- `MONGODB_URI` or `MONGODB_DIRECT_URI` (at least one must be valid)
- `JWT_SECRET` (strong secret, minimum 32 chars; weak/missing fails startup in production)

Strongly recommended:
- `ADMIN_GATE_TOKEN` (enables gate on admin entry)
- `CORS_ORIGIN=https://your-domain`
- `CLIENT_URL=https://your-domain`
- `AUTH_COOKIE_SECURE=true`
- `AUTH_COOKIE_SAME_SITE=lax` or `strict` (default in code is `strict`)
- `ADMIN_AUTO_SEED=false` (avoid startup writes on production)

Optional admin bootstrap values:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`

Notes from code behavior:
- `server/.env` is loaded first, then root `.env` as fallback.
- If `MONGODB_URI` SRV DNS fails and `MONGODB_DIRECT_URI` is set, server auto-falls back.
- In production, cookies are always secure unless explicitly altered in code/env behavior.

## 6. Deployment Procedure (No Architecture Changes)

## 6.1 Install dependencies

From repo root:

```bash
npm run install:all
```

## 6.2 Build frontend

From repo root:

```bash
npm run client:build
```

This generates `client/dist`, which Express serves automatically.

## 6.3 Configure env

```bash
cd server
cp .env.production.example .env
```

Edit values for your environment (Mongo, JWT secret, domain/origin, admin values).

## 6.4 Start app with PM2

From repo root:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Default process name: `ssgmce-website`.

## 6.5 Configure Nginx reverse proxy

Example `/etc/nginx/sites-available/website`:

```nginx
server {
    listen 80;
    server_name 10.0.0.95;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

For this private LAN deployment, users should open:

- `http://10.0.0.95`

and should not need `:5000` in the browser URL.

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/website /etc/nginx/sites-enabled/website
sudo nginx -t
sudo systemctl reload nginx
```

## 6.6 Enable TLS

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Keep `AUTH_COOKIE_SECURE=true` with HTTPS.

## 7. First-Run Admin Access

Two valid approaches:

- API/UI first-user registration flow:
  - First created user becomes `SuperAdmin`.
- Explicit sync/create from env:
  - `cd server && npm run admin:sync`
  - Uses `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`.

Admin gate:
- `POST /api/auth/verify-gate` validates `ADMIN_GATE_TOKEN` when configured.

## 8. Persistence and Backup Requirements

Persist these data stores:

- MongoDB database:
  - Business data + CMS content + users + GridFS binary files.
- `server/uploads/` directory:
  - Required because uploads fall back to local disk when GridFS writes fail (e.g., quota issues).

Minimum backup policy:
- Daily MongoDB backup.
- Daily filesystem backup of `server/uploads`.
- Retention based on institutional policy.

## 9. Health and Validation Checklist

After deployment:

- `GET /api/health` returns success JSON.
- Open homepage and refresh a deep route (React SPA fallback should work).
- Verify admin login/logout.
- Test at least one image upload and one document upload.
- Confirm uploaded file opens from `/uploads/...`.
- Check PM2 logs for Mongo/CORS/cookie errors.

Useful commands:

```bash
pm2 status
pm2 logs ssgmce-website
curl -I https://your-domain.com/api/health
```

## 10. Update Procedure

For new releases:

```bash
cd /var/www/website
git pull
npm run install:all
npm run client:build
pm2 restart ssgmce-website
```

Recommended before restart:

```bash
npm run verify
```

## 11. Known Operational Constraints

- If `client/dist` is missing, frontend routes are not served (API still runs).
- Production startup fails if `JWT_SECRET` is missing/weak.
- Browser auth depends on correct cookie and origin setup; keep domain/origin values consistent.
- Local upload fallback means disk usage can grow even when GridFS is primary.
