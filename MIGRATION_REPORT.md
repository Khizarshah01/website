# In-Place Website Upgrade Guide (Same Server, Same IP)

This guide outlines the process of replacing your old website with the **new codebase** directly on the **existing server (Old IP)**. 

Because you are using the exact same server and IP address, this process is vastly simplified:
- **NO DNS changes are required.**
- **NO SSL certificate migration is required** (the certificates are already installed and working on this server).

---

## 1. Pre-Migration Setup (Prepare the New Codebase)

Before stopping the old website, you should get the new codebase ready on the server.

1. **SSH into your existing server.**
2. **Download the new codebase:** Clone your new repository into a fresh directory so it doesn't conflict with the old website.
   ```bash
   # Example: Put the new codebase in a new folder
   cd /var/www/
   git clone https://github.com/ssgmce-website/website.git ssgmce-new
   cd ssgmce-new
   ```
3. **Install Dependencies & Build:**
   ```bash
   # Install dependencies for both server and client (if applicable)
   npm install
   # Build the project (if using React/Vite)
   npm run build
   ```
4. **Configure Environment Variables:** Create any necessary `.env` files for the new backend (port 5000) using your `.env.example`.

---

## 2. Stopping the Old Website

You need to stop whatever process is running your old website to free up system resources.

1. **If the old site is a Node.js app using PM2:**
   ```bash
   pm2 list
   # Find the ID or name of the old website process
   pm2 stop <old-app-name>
   pm2 delete <old-app-name>
   pm2 save
   ```
2. **If the old site is running via Apache (and you are replacing it with Nginx):**
   ```bash
   sudo systemctl stop apache2
   sudo systemctl disable apache2
   ```

*(Keep Nginx running if it is currently acting as your web server, we will just update its configuration in Step 4).*

---

## 3. Start the New Website Process

Now, start your new Node.js backend. Based on your codebase, it runs on port `5000`.

1. Navigate to your new codebase directory.
2. Start the server using PM2 (to keep it running in the background):
   ```bash
   pm2 start ecosystem.config.cjs
   # OR start the server directly:
   pm2 start server/index.js --name "ssgmce-new"
   pm2 save
   ```
3. Verify it is running locally on port 5000:
   ```bash
   curl http://localhost:5000
   ```

---

## 4. Update Server Configurations (Nginx)

Your existing server already has Nginx configured with your domain and SSL certificate. You just need to tell Nginx to route incoming traffic to your *new* app on `localhost:5000` instead of the old app.

1. **Open your existing Nginx configuration file.** It is usually located at `/etc/nginx/sites-available/yourdomain` or `/etc/nginx/conf.d/default.conf`:
   ```bash
   sudo nano /etc/nginx/sites-available/yourdomain
   ```
2. **Locate the `server` block for port 443 (HTTPS).** Leave all the existing SSL lines (`ssl_certificate` and `ssl_certificate_key`) exactly as they are!
3. **Update the `location /` block** inside the HTTPS server block to point to your new Node server on port 5000. It should look like this:

   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com www.yourdomain.com;

       # LEAVE THESE EXACTLY AS THEY ARE IN YOUR CURRENT FILE:
       ssl_certificate /path/to/your/existing/certificate.crt; 
       ssl_certificate_key /path/to/your/existing/private.key;

       client_max_body_size 300M;
       
       # UPDATE THIS BLOCK TO POINT TO YOUR NEW CODEBASE:
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;

           proxy_hide_header Cross-Origin-Opener-Policy;
           proxy_hide_header Cross-Origin-Resource-Policy;
           proxy_hide_header Origin-Agent-Cluster;
       }
   }
   ```
4. **Test the Nginx Configuration** to make sure you didn't make any syntax errors:
   ```bash
   sudo nginx -t
   ```
5. **Reload Nginx** to make the changes live:
   ```bash
   sudo systemctl reload nginx
   ```

**You are done!** Refresh your browser at `https://yourdomain.com`. Because you never changed the DNS or the IP, the traffic stays on the same server, keeps the same SSL certificate, but now securely routes to your brand-new codebase.
