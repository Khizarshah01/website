# Environment Profiles

Use separate env values for local debugging and private-server deployment.

## Local Debug

`server/.env`

- `PORT=5050`
- `SERVER_IP=127.0.0.1`
- `CORS_ORIGIN=http://localhost:3000`
- `AUTH_COOKIE_ALLOW_INSECURE_LOOPBACK=true`
- `AUTH_COOKIE_ALLOW_INSECURE_LAN=false`

`client/.env.development`

- `VITE_API_PROXY_TARGET=http://127.0.0.1:5050`

## Private Server

`server/.env`

- `PORT=5000` (internal app port only; users should not access this directly)
- `SERVER_IP=10.0.0.95` (or the actual server LAN IP)
- `CORS_ORIGIN=http://10.0.0.95`
- `AUTH_COOKIE_ALLOW_INSECURE_LOOPBACK=true`
- `AUTH_COOKIE_ALLOW_INSECURE_LAN=true` (only if using plain HTTP on LAN)

`client/.env.development` (for local dev only)

- `VITE_API_PROXY_TARGET=http://127.0.0.1:5000`

Nginx reverse proxy (recommended for LAN/private server):

- Expose `http://10.0.0.95` on port `80`
- Proxy internally to `http://127.0.0.1:5000`
- Use [`ops/nginx/ssgmce-10.0.0.95.conf`](/home/aditya/Programming/SSGMCE/website/ops/nginx/ssgmce-10.0.0.95.conf)

## Important

- `client/vite.config.js` now reads env with `loadEnv(...)`, so Vite proxy uses `.env.development` values correctly.
- If backend fails to start, frontend will show proxy errors even when routes are correct.
- If you run over plain `http://10.0.0.95` (no HTTPS), do not force secure cookies.
