# SSGMCE Website — Server Update Guide

## Prerequisites
- SSH access to the server
- Access to the Git repository

---

## Step 1: SSH into the Server
```bash
ssh web@103.127.35.3
```

---

## Step 2: Backup the Current Website (Recommended for major updates only)
```bash
cp -r /var/www/website /var/www/website_backup_$(date +%Y%m%d)
```
This creates a dated backup like `website_backup_20260516`.

---

---

## Step 3: Replace the Codebase
```bash
cd /var/www/website

git status
git fetch origin
git reset --hard origin/main
```

---

## Step 4: Restore the `.env` File
> ⚠️ **Critical — the `.env` is never in git. Never skip this step.**

Copy the master environment file:
```bash
cp /var/www/ssgmce.env /var/www/website/server/.env
```
Or manually recreate it using the values from the original.

---

## Step 5: Install Server Dependencies
```bash
cd /var/www/website/server
npm ci
```

---

## Step 6: Build the React Frontend (Only needed if frontend/client files changed)  
```bash
cd /var/www/website/client
npm ci
npm run build
```

Verify the build succeeded:
```bash
ls /var/www/website/client/dist/assets/
```
Should show JS/CSS/image files. If the folder is empty, the build failed — check the error output.

---

## Step 7: Start PM2
```bash
cd /var/www/website/server
pm2 reload ssgmce-website
```

Check it's running:
```bash
pm2 list
# status should show "online"
```

Check logs for startup errors:
```bash
pm2 logs ssgmce-website --lines 30 --nostream
```
Look for `[READY] Server is ready to accept requests!`  
If you see MongoDB errors instead, the `.env` file is missing or incorrect.

---

## Step 8: Nginx — No Restart Needed
Nginx config does not change between updates. Run a sanity check:
```bash
sudo nginx -t
sudo systemctl status nginx
```
Both should show OK/active. Only reload if you edited the Nginx config:
```bash
sudo systemctl reload nginx
```

---

## Step 9: Verify the Website
```bash
curl http://localhost:5000/api/health
```
Expected response: `{"success":true,"status":"ok",...}`

Then open in browser:
- Internal (college network only): `http://10.0.0.95`
- Public: `http://103.127.35.3`

---

## Quick Checklist
- [ ] Backup taken
- [ ] Latest code fetched from GitHub
- [ ] PM2 reloaded successfully
- [ ] `.env` restored to `/var/www/website/server/.env`
- [ ] `npm ci` done in `/server`
- [ ] `npm ci && npm run build` done in `/client`
- [ ] PM2 shows `online`
- [ ] Health check returns 200
- [ ] Site loads in browser on both IPs

---

## If Something Goes Wrong

Restore from backup:

```bash
pm2 stop ssgmce-website

sudo rm -rf /var/www/website

cp -r /var/www/website_backup_YYYYMMDD /var/www/website

cp /var/www/ssgmce.env /var/www/website/server/.env

cd /var/www/website/server

pm2 start server.js --name "ssgmce-website"
```

Replace `YYYYMMDD` with the actual backup date (e.g. `20260516`).

## Notes
- The `.env` file contains secrets (DB credentials, JWT keys). Keep it safe and never commit it to git.
- Nginx runs as a separate service and does not need to be restarted on code updates.
- PM2 persists across reboots via `pm2 save` — no need to start it manually after a server reboot.
- If the terminal shows `Error opening terminal: xterm-ghostty`, run `export TERM=xterm-256color` before using `nano`.
