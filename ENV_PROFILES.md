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

- `PORT=5000` (or your deployed backend port)
- `SERVER_IP=10.0.0.95` (or the actual server LAN IP)
- `CORS_ORIGIN=http://10.0.0.95:3000` (or the actual frontend origin)
- `AUTH_COOKIE_ALLOW_INSECURE_LOOPBACK=true`
- `AUTH_COOKIE_ALLOW_INSECURE_LAN=true` (only if using plain HTTP on LAN)

`client/.env.development` (or process env in deployment scripts)

- `VITE_API_PROXY_TARGET=http://10.0.0.95:5000` (or deployed backend origin)

## Important

- `client/vite.config.js` now reads env with `loadEnv(...)`, so Vite proxy uses `.env.development` values correctly.
- If backend fails to start, frontend will show proxy errors even when routes are correct.
