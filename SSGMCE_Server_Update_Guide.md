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

## Step 2: Backup the Current Website
```bash
cp -r /var/www/website /var/www/website_backup_$(date +%Y%m%d)
```
This creates a dated backup like `website_backup_20260516`.

---

## Step 3: Stop & Delete Current PM2 Instance
```bash
pm2 list
pm2 stop ssgmce-website
pm2 delete ssgmce-website
pm2 save
```

---

## Step 4: Replace the Codebase
```bash
cd /var/www
sudo rm -rf website
git clone <your-repo-url> website
```

---

## Step 5: Restore the `.env` File
> ⚠️ **Critical — the `.env` is never in git. Never skip this step.**

Copy it from the backup:
```bash
cp /var/www/website_backup_$(date +%Y%m%d)/server/.env /var/www/website/server/.env
```
Or manually recreate it using the values from the original.

---

## Step 6: Install Server Dependencies
```bash
cd /var/www/website/server
npm install
```

---

## Step 7: Build the React Frontend
```bash
cd /var/www/website/client
npm install
npm run build
```

Verify the build succeeded:
```bash
ls /var/www/website/client/dist/assets/
```
Should show JS/CSS/image files. If the folder is empty, the build failed — check the error output.

---

## Step 8: Start PM2
```bash
cd /var/www/website/server
pm2 start server.js --name "ssgmce-website"
pm2 save
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

## Step 9: Nginx — No Restart Needed
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

## Step 10: Verify the Website
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
- [ ] Old PM2 instance stopped and deleted
- [ ] Repo cloned fresh
- [ ] `.env` restored to `/var/www/website/server/.env`
- [ ] `npm install` done in `/server`
- [ ] `npm install && npm run build` done in `/client`
- [ ] PM2 shows `online`
- [ ] Health check returns 200
- [ ] Site loads in browser on both IPs

---

## If Something Goes Wrong
Restore from backup:
```bash
pm2 stop ssgmce-website
pm2 delete ssgmce-website
sudo rm -rf /var/www/website
cp -r /var/www/website_backup_YYYYMMDD /var/www/website
cd /var/www/website/server
pm2 start server.js --name "ssgmce-website"
pm2 save
```
Replace `YYYYMMDD` with the actual backup date (e.g. `20260516`).

---

## Notes
- The `.env` file contains secrets (DB credentials, JWT keys). Keep it safe and never commit it to git.
- Nginx runs as a separate service and does not need to be restarted on code updates.
- PM2 persists across reboots via `pm2 save` — no need to start it manually after a server reboot.
- If the terminal shows `Error opening terminal: xterm-ghostty`, run `export TERM=xterm-256color` before using `nano`.
