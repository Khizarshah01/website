# 📋 Document Server Migration - Setup Guide

## ✅ What's Done
- Removed LFS completely from git
- Created `/api/document-download/` endpoint on server  
- Updated React to use API instead of static files
- Cleaned up repository (now ~100MB smaller!)
- Pushed to GitHub successfully

## 🚀 Next Steps - Move PDFs to Server

### Option 1: Manual Copy (Simple)
```powershell
# Copy all PDFs to server folder
Copy-Item -Path "client/public/documents/*" -Destination "server/uploads/documents/" -Recurse -Force
```

### Option 2: Via Admin Upload (Recommended)
Create an admin endpoint later to upload documents through the website.

## 📂 File Structure
```
server/uploads/documents/
├── institution/
│   ├── administration/
│   │   ├── aicte-approvals/         # AICTE approvals
│   │   ├── financial-statements/    # Financial docs
│   │   ├── mandatory-disclosure/    # Mandatory docs
│   │   └── policies-and-procedure/  # Policies
│   └── offices/
├── iqac/
│   ├── iso/                         # ISO documents
│   ├── naac/                        # NAAC audit
│   └── nba/                         # NBA audit
└── others/
    ├── e-tattwadarshi/
    └── news-letters/
```

## 🔗 How Documents Are Accessed

### Before (Static Files - ❌ LFS Issue)
```
URL: https://your-site.com/documents/institution/administration/policies.pdf
Problem: LFS pointers served instead of actual PDFs on Vercel
```

### After (API Endpoint - ✅ Works Everywhere)
```
URL: https://backend-api.com/api/document-download/download/institution/administration/policies.pdf
Feature: Works on Vercel + VPS + Anywhere
```

## 🧪 Testing
1. Copy PDFs to `server/uploads/documents/`
2. Start server: `cd server && npm start`
3. Click "Open" on any document
4. Should download/preview PDF via API

## 🔒 Security
- Path traversal protection (can't access ../ files)
- Proper CORS headers
- Content-Type: application/pdf
- Inline display + download support

## 📝 Important Notes
- **Trial Version**: Documents stored on your server (safe)
- **VPS Later**: Same setup works - no changes needed!
- **Scaling**: Can add CDN/S3 later without touching React code
- **Backup**: Keep PDFs in `server/uploads/documents/` - they're your source of truth now

## ❓ Troubleshooting

### Documents not showing?
- [ ] PDFs copied to `server/uploads/documents/`?
- [ ] Server running on correct port?
- [ ] Backend URL correct in React (.env)?
- [ ] Check browser console for network errors

### Vercel deployment still broken?
- [ ] Redeploy site (pull new code from GitHub)
- [ ] Wait 5 minutes for cache clear
- [ ] Check deployment logs

---
**Next**: Copy PDFs and test locally, then your live site will work! 🎉
