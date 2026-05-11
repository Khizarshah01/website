# VPS Deployment

This project can run on a personal VPS without Vercel or Render.

## Recommended setup

- Ubuntu VPS
- Node.js 20
- MongoDB on the same VPS or reachable private host
- Nginx as reverse proxy
- PM2 for process management
- HTTPS via Let's Encrypt

## 1. Install dependencies

```bash
cd /var/www/website
npm install
cd server && npm install
cd ../client && npm install
```

## 2. Build the frontend

```bash
cd /var/www/website/client
npm run build
```

The backend now serves `client/dist` automatically in production.

## 3. Create backend env

```bash
cd /var/www/website/server
cp .env.production.example .env
```

Edit these values:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_JWT_SECRET`
- `ADMIN_GATE_TOKEN`
- `CORS_ORIGIN`
- `CLIENT_URL`
- `ADMIN_PASSWORD`

Use production-safe values:

```env
NODE_ENV=production
AUTH_COOKIE_SECURE=true
AUTH_COOKIE_ALLOW_INSECURE_LOOPBACK=false
ADMIN_AUTO_SEED=false
CORS_ORIGIN=https://your-domain.com
CLIENT_URL=https://your-domain.com
```

## 4. Start with PM2

From the project root:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## 5. Nginx reverse proxy

Example `/etc/nginx/sites-available/website`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/website /etc/nginx/sites-enabled/website
sudo nginx -t
sudo systemctl reload nginx
```

## 6. Enable HTTPS

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

After HTTPS is live, keep:

```env
AUTH_COOKIE_SECURE=true
NODE_ENV=production
```

## 7. Update the app

When deploying new code:

```bash
cd /var/www/website
git pull
npm install
cd client && npm install && npm run build
cd ../server && npm install
cd ..
pm2 restart ssgmce-website
```

## Notes

- Frontend and backend run on the same domain in production.
- No `client/.env.production` is required for this VPS setup.
- `/api` and `/uploads` are served from the same Node app.
- Health check is available at `/api/health`.
