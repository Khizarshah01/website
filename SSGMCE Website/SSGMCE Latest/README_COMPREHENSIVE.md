# SSGMCE College Website - Complete Documentation

Full-stack MERN college website for **Shri Sant Gajanan Maharaj College of Engineering (SSGMCE)**, Shegaon. This project includes a public-facing website with a powerful admin CMS powered by markdown-based content editing.

**Status**: ✅ Production Ready | **Last Updated**: 2026-03-28

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure & File Explanations](#project-structure--file-explanations)
4. [Core Features](#core-features)
5. [Local Development Setup](#local-development-setup)
6. [API Overview & Routes](#api-overview--routes)
7. [Environment Variables](#environment-variables)
8. [Deployment Guide](#deployment-guide)
9. [Database Models](#database-models)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)

---

## Project Overview

This is a complete MERN (MongoDB, Express, React, Node.js) stack application for managing an engineering college's web presence. It includes:

- **Public Website**: Multi-page site with about, academics, admissions, placements, research, and other sections
- **Admin CMS**: Visual editor for managing markdown-based page content
- **Authentication**: JWT-based admin authentication with role-based access control
- **Content Management**: Markdown-driven sections with live preview
- **File Uploads**: Support for images, PDFs, and documents
- **Database Seeding**: Auto-initialization of default content on first startup

---

## Tech Stack

### Frontend

- **React 18** - UI library
- **Vite 7** - Fast build tool
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Axios** - HTTP client (centralized via `apiClient`)
- **React Markdown** - Markdown rendering
- **React Quill** - Rich text editor
- **Framer Motion** - Animations
- **Chart.js / Recharts** - Data visualization
- **React Icons** - Icon library

### Backend

- **Node.js** - Runtime
- **Express 4** - Web framework
- **Mongoose 7** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variable management

### Database & DevOps

- **MongoDB** - NoSQL database (Atlas for cloud)
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Frontend hosting
- **Render.com** - Backend hosting

---

## Project Structure & File Explanations

### Root Directory Structure

```
website/
├── README_COMPREHENSIVE.md    ← THIS FILE (combined documentation)
├── .gitignore                 ← Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml         ← GitHub Actions CI/CD pipeline
├── package.json               ← Root project scripts
├── client/                    ← React Frontend (Vite)
├── server/                    ← Express Backend
└── node_modules/              ← Dependencies
```

---

## 📁 Frontend Structure (`client/src`)

```
client/src/
├── main.jsx                   ← React entry point
├── App.jsx                    ← Main routing component
├── index.css                  ← Tailwind CSS directives
│
├── components/                ← Reusable UI components
│   ├── Navbar.jsx             ← Top navigation with mega menu
│   ├── Footer.jsx             ← Footer component
│   ├── Layout.jsx             ← Main layout wrapper
│   ├── GenericContentPage.jsx ← CMS page renderer (used by IQAC, Research, Placements)
│   ├── GenericPage.jsx        ← Layout wrapper with sidebar
│   ├── admin/
│   │   ├── AdminLayout.jsx    ← Admin panel layout
│   │   ├── AdminSidebar.jsx   ← Admin sidebar navigation
│   │   ├── AdminToolbar.jsx   ← Edit mode toolbar
│   │   ├── MarkdownEditor.jsx ← Visual markdown editor with live preview
│   │   ├── EditableText.jsx   ← Inline text editor
│   │   ├── EditableImage.jsx  ← Inline image editor
│   │   └── ...                ← Other admin components
│   ├── *Sidebar.jsx           ← Section sidebars (IQAC, Placement, Research, etc.)
│   └── ...                    ← Other UI components
│
├── pages/                     ← Route pages (one per main path)
│   ├── Home.jsx               ← Homepage
│   ├── Contact.jsx            ← Contact page
│   ├── Events.jsx             ← Events listing
│   ├── Gallery.jsx            ← Photo gallery
│   ├── about/                 ← 8 About section pages
│   │   ├── AboutGlance.jsx
│   │   ├── VisionMission.jsx
│   │   ├── OurInspiration.jsx
│   │   ├── PrincipalSpeaks.jsx
│   │   ├── OrganizationalStructure.jsx
│   │   ├── GoverningBody.jsx
│   │   ├── BoardOfDirectors.jsx
│   │   └── Committees.jsx
│   ├── academics/             ← 11 Academics pages
│   │   ├── AcademicsPlanner.jsx
│   │   ├── Syllabus.jsx
│   │   ├── TimeTable.jsx
│   │   ├── Rules.jsx
│   │   └── ...
│   ├── admissions/            ← 13 Admissions pages
│   ├── activities/            ← 17 Student club pages
│   ├── departments/           ← 8 Department detail pages
│   ├── facilities/            ← Hostel, Library, Sports sub-pages
│   ├── documents/             ← 12 Document category pages
│   ├── placements/            ← 12 CMS-editable pages
│   ├── research/              ← 15 CMS-editable pages
│   ├── iqac/                  ← 14 CMS-editable pages
│   ├── admin/                 ← 22 Admin panel pages
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminPages.jsx
│   │   ├── VisualPageEditor.jsx
│   │   ├── AdminNews.jsx
│   │   ├── AdminEvents.jsx
│   │   ├── AdminFaculty.jsx
│   │   └── ...                ← Other admin management pages
│   └── ...                    ← Other page directories
│
├── contexts/                  ← React Context providers
│   ├── AuthContext.jsx        ← Authentication context
│   ├── EditContext.jsx        ← Edit mode toggle context
│   ├── ThemeContext.jsx       ← Theme/styling context
│   └── PageDataContext.jsx    ← Page data caching context
│
├── hooks/                     ← Custom React hooks
│   ├── useAuth.jsx            ← Authentication hook (login, logout, role checks)
│   ├── useFetch.js            ← Generic data fetching hook
│   ├── usePageContent.js      ← Fetch page content by pageId
│   └── useDepartmentData.js   ← Department-specific data fetching
│
├── utils/
│   ├── apiClient.js           ← Centralized Axios instance (IMPORTANT)
│   └── ...
│
├── config/                    ← Configuration files
│   ├── adminAccess.js         ← Admin role access control
│   └── adminOfficeHybridFlags.js
│
├── constants/                 ← Static configuration
│   ├── navConfig.js           ← Navigation menu structure
│   └── ...
│
├── data/                      ← Client-side default data
│   └── departments.js         ← Department fallback data
│
└── assets/
    ├── images/                ← Static images
    │   ├── common/            ← Logo, navbar images
    │   └── ...
    └── ...
```

### Key Frontend Files Explained

| File                                    | Purpose                                                              |
| --------------------------------------- | -------------------------------------------------------------------- |
| **App.jsx**                             | Main routing component that defines all routes (public, admin, etc.) |
| **components/GenericContentPage.jsx**   | Renders CMS pages by fetching markdown content from API              |
| **components/Navbar.jsx**               | Top navigation with mega menu (fixed width dropdown pattern)         |
| **components/admin/MarkdownEditor.jsx** | Visual markdown editor with live preview for admin                   |
| **hooks/useAuth.jsx**                   | Authentication context hook for login/logout/role checks             |
| **utils/apiClient.js**                  | **CENTRALIZED axios instance** - all API calls use this              |
| **contexts/EditContext.jsx**            | Global toggle for admin edit mode                                    |
| **pages/admin/AdminDashboard.jsx**      | Admin main page showing stats and quick links                        |

---

## 🖥️ Backend Structure (`server/`)

```
server/
├── server.js                  ← Express app entry point, middleware setup
├── package.json               ← NPM dependencies and scripts
├── .env.example               ← Template for environment variables
│
├── config/
│   └── db.js                  ← MongoDB connection setup
│
├── middleware/
│   ├── authMiddleware.js      ← JWT verification for protected routes
│   │
├── models/                    ← 18 Mongoose schemas
│   ├── User.js                ← Admin users (email, password, role)
│   ├── PageContent.js         ← CMS page sections (pageId, sections with markdown)
│   ├── Department.js          ← Departments (name, description, faculty list)
│   ├── Faculty.js             ← Faculty profiles
│   ├── News.js                ← News articles
│   ├── Event.js               ← College events
│   ├── Notice.js              ← Announcements/notices
│   ├── PlacementStat.js       ← Year-wise placement statistics
│   ├── Recruiter.js           ← Recruiting companies
│   ├── Testimonial.js         ← Student testimonials
│   ├── Research.js            ← Research publications
│   ├── Document.js            ← Uploaded documents
│   ├── NIRF.js                ← NIRF ranking data and parameters
│   ├── IQACDocument.js        ← IQAC committee documents
│   ├── IQACMember.js          ← IQAC members
│   ├── IQACNews.js            ← IQAC announcements
│   ├── PopupBanner.js         ← Homepage popup announcements
│   └── EditLog.js             ← Audit trail of all content changes
│
├── controllers/               ← 14 API controllers (business logic)
│   ├── authController.js      ← Login, register, token verification
│   ├── pageContentController.js ← Fetch/update CMS page content
│   ├── departmentController.js ← CRUD for departments
│   ├── facultyController.js    ← CRUD for faculty
│   ├── newsController.js       ← CRUD for news
│   ├── eventController.js      ← CRUD for events
│   ├── noticeController.js     ← CRUD for notices
│   ├── placementController.js  ← Placement stats and recruiters
│   ├── researchController.js   ← Research entries
│   ├── iqacController.js       ← IQAC documents and members
│   ├── documentController.js   ← Document management
│   ├── nirfController.js       ← NIRF ranking data
│   ├── uploadController.js     ← File upload handling
│   └── editLogController.js    ← Audit log retrieval
│
├── routes/                    ← 14 Express route files
│   ├── authRoutes.js          → POST /api/auth/login, /register, /verify
│   ├── pageContentRoutes.js   → GET/PUT /api/pages/:pageId
│   ├── departmentRoutes.js    → GET/POST/PUT /api/departments
│   ├── facultyRoutes.js       → GET/POST/PUT /api/faculty
│   ├── newsRoutes.js          → GET/POST/PUT /api/news
│   ├── eventRoutes.js         → GET/POST/PUT /api/events
│   ├── noticeRoutes.js        → GET/POST/PUT /api/notices
│   ├── placementRoutes.js     → GET/POST/PUT /api/placements
│   ├── researchRoutes.js      → GET/POST/PUT /api/research
│   ├── iqacRoutes.js          → GET/POST/PUT /api/iqac
│   ├── documentRoutes.js      → GET/POST/PUT /api/documents
│   ├── nirfRoutes.js          → GET/POST/PUT /api/nirf
│   ├── uploadRoutes.js        → POST /api/upload (multipart)
│   └── ...                    → Other routes
│
├── utils/
│   ├── dbInit.js              ← Auto-seed pages from allNavPages.js on startup
│   ├── departmentMap.js       ← Slug ↔ department name mapping
│   └── ...
│
├── data/                      ← Default/seed data
│   ├── allNavPages.js         ← MASTER page definitions (auto-seeded)
│   ├── researchMarkdownContent.js
│   ├── iqacMarkdownContent.js
│   └── ...
│
├── scripts/                   ← Re-runnable utility scripts
│   ├── syncResearchMarkdownContent.js  ← Re-seed research pages
│   ├── syncIqacMarkdownContent.js      ← Re-seed IQAC pages
│   └── ...
│
├── uploads/                   ← User-uploaded files
│   ├── images/                ← Uploaded images
│   ├── documents/             ← Department documents, MOUs, etc.
│   ├── nirf/                  ← NIRF PDF reports
│   └── ...
│
└── node_modules/              ← NPM dependencies
```

### Key Backend Files Explained

| File                                     | Purpose                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| **server.js**                            | Entry point: sets up Express, middleware, routes, MongoDB connection   |
| **models/PageContent.js**                | Stores CMS page sections with markdown content (pageId-based)          |
| **controllers/pageContentController.js** | Fetches/updates page content; handles markdown rendering               |
| **data/allNavPages.js**                  | **MASTER CONFIG** - defines all page IDs, titles, and default sections |
| **utils/dbInit.js**                      | Runs on startup; seeds allNavPages.js into DB (idempotent)             |
| **middleware/authMiddleware.js**         | JWT verification for protected `/api` routes                           |
| **models/User.js**                       | Admin user schema with email, password (bcrypt), role                  |

---

## Core Features

### 1. **Public Website**

- Multi-section college website (About, Academics, Admissions, etc.)
- Responsive design (mobile, tablet, desktop)
- SEO-friendly structure
- Department pages with faculty listings
- Placement statistics and recruiter information
- Research and publications
- Calendar and event management

### 2. **Admin CMS**

- **Markdown-driven content editing** - All page content stored as markdown
- **Visual editor** - MarkdownEditor component with live preview
- **Role-based access** - Admin and Coordinator roles with different permissions
- **Inline editing** - Edit text, images, sections directly on page
- **Auto-save** - Changes saved to database immediately
- **Edit audit trail** - EditLog tracks all changes with timestamps and user info

### 3. **Authentication**

- JWT-based authentication with tokens stored in localStorage
- Admin login/register functionality
- Role-based access control (Admin, SuperAdmin, Coordinator)
- Protected API routes with `authMiddleware`
- Token refresh mechanism

### 4. **File Management**

- Image uploads for profiles, departments, news
- PDF document uploads (MOUs, NIRF reports, etc.)
- Automatic file organization into subdirectories
- File size validation (max 10MB)

### 5. **Database Seeding**

- Automatic initialization of default pages on first startup
- Idempotent seeding (safe to run multiple times)
- Support for re-seeding specific content (research, IQAC) via scripts

---

## Local Development Setup

### Prerequisites

- **Node.js 16+** and **npm 8+**
- **MongoDB** (local or Atlas account)
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/Saggy2323210/website.git
cd website
```

### Step 2: Install Dependencies

**Backend:**

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
```

**Frontend:**

```bash
cd ../client
npm install
```

### Step 3: Configure Environment Variables

**`server/.env`:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ssgmce
JWT_SECRET=your-random-jwt-secret-here
ADMIN_JWT_SECRET=your-random-admin-jwt-secret-here
CORS_ORIGIN=http://localhost:3000
ADMIN_AUTO_SEED=true
```

### Step 4: Start Backend

```bash
cd server
npm run dev    # Uses nodemon for auto-reload
```

**Expected output:**

```
[OK] MongoDB Connected Successfully
[SERVER] Running on port 5000
[READY] Server is ready to accept requests!
```

### Step 5: Start Frontend (in a new terminal)

```bash
cd client
npm run dev
```

**Frontend runs at**: `http://localhost:3000`

### Step 6: Access Admin Panel

```
http://localhost:3000/admin
```

Credentials (if seeded):

- Email: `admin@example.com`
- Password: Check `.env` file

---

## Environment Variables

### Backend (`server/.env`)

| Variable           | Default                            | Description                          |
| ------------------ | ---------------------------------- | ------------------------------------ |
| `PORT`             | `5000`                             | Server port                          |
| `NODE_ENV`         | `development`                      | Environment (development/production) |
| `MONGODB_URI`      | `mongodb://localhost:27017/ssgmce` | MongoDB connection string            |
| `JWT_SECRET`       | Required                           | JWT secret for public auth           |
| `ADMIN_JWT_SECRET` | Required                           | JWT secret for admin auth            |
| `CORS_ORIGIN`      | `http://localhost:3000`            | Allowed frontend URL                 |
| `ADMIN_AUTO_SEED`  | `true`                             | Auto-seed DB on startup              |
| `ADMIN_EMAIL`      | `admin@example.com`                | Initial admin email                  |
| `ADMIN_PASSWORD`   | Required                           | Initial admin password               |

### Frontend (`client/.env` or Vercel)

| Variable           | Default                 | Description          |
| ------------------ | ----------------------- | -------------------- |
| `VITE_BACKEND_URL` | `http://localhost:5000` | Backend API base URL |

---

## API Overview & Routes

All APIs are prefixed with `/api`. The backend uses centralized error handling and JWT authentication.

### Authentication Routes (`/api/auth`)

```
POST   /api/auth/login           → Login with email/password
POST   /api/auth/register        → Register new admin user
POST   /api/auth/verify          → Verify JWT token
```

### Content Routes (Protected)

```
GET    /api/pages/:pageId        → Fetch page content by ID
PUT    /api/pages/:pageId        → Update page content (admin only)

GET    /api/departments          → List all departments
GET    /api/departments/:slug    → Get department details
POST   /api/departments          → Create department (admin)
PUT    /api/departments/:id      → Update department (admin)
DELETE /api/departments/:id      → Delete department (admin)

GET    /api/faculty              → List all faculty
POST   /api/faculty              → Create faculty (admin)
PUT    /api/faculty/:id          → Update faculty (admin)

GET    /api/news                 → List news articles
POST   /api/news                 → Create news (admin)
PUT    /api/news/:id             → Update news (admin)

GET    /api/events               → List events
POST   /api/events               → Create event (admin)

GET    /api/notices              → List notices
POST   /api/notices              → Create notice (admin)

GET    /api/placements           → Placement stats
POST   /api/placements           → Add placement stats (admin)

GET    /api/research             → Research entries
POST   /api/research             → Add research (admin)

GET    /api/iqac                 → IQAC documents and members
POST   /api/iqac                 → Add IQAC content (admin)

GET    /api/nirf                 → NIRF rankings
POST   /api/nirf                 → Add NIRF data (admin)

GET    /api/documents            → List documents
POST   /api/documents            → Upload document (admin)

POST   /api/upload               → Upload file (images, PDFs) (admin)
GET    /uploads/:filename        → Serve uploaded files
```

### Example API Call

**Fetch page content:**

```javascript
const apiClient = require("./utils/apiClient");

// In frontend
apiClient
  .get("/api/pages/research-overview")
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));
```

---

## Database Models

### Key Collections

| Model             | Used For                                                     |
| ----------------- | ------------------------------------------------------------ |
| **PageContent**   | CMS-managed page sections (IQAC, Research, Placements, etc.) |
| **Department**    | Department info, faculty lists, contact info                 |
| **Faculty**       | Faculty profiles with images and departments                 |
| **User**          | Admin authentication (email, role, password hash)            |
| **News**          | News articles with images                                    |
| **Event**         | College events and activities                                |
| **Notice**        | Announcements and notices                                    |
| **PlacementStat** | Year-wise placement data and statistics                      |
| **Recruiter**     | List of recruiting companies                                 |
| **Research**      | Research publications and projects                           |
| **NIRF**          | NIRF ranking data and parameters                             |
| **IQACDocument**  | IQAC committee documents                                     |
| **IQACMember**    | IQAC committee members and roles                             |
| **Document**      | Uploaded policy documents, PDFs                              |
| **EditLog**       | Audit trail of all content changes                           |

---

## Deployment Guide

### Overview

- **Frontend**: Vercel (free tier forever)
- **Backend**: Render.com (free tier, limited uptime)
- **Database**: MongoDB Atlas (free tier 512MB)
- **CI/CD**: GitHub Actions (free)

### Phase 1: Prepare Project

1. **Ensure Git is initialized:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/website.git
   ```

2. **Verify .env is in .gitignore:**
   ```bash
   # .gitignore should contain:
   node_modules/
   .env
   .env.local
   dist/
   build/
   ```

### Phase 2: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (free tier)
4. Create database user (username/password)
5. Whitelist IP: `0.0.0.0/0` (allows all)
6. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### Phase 3: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

### Phase 4: Deploy Backend (Render)

1. Go to https://render.com, sign up with GitHub
2. Create "New Web Service"
3. Select repository → Configure:
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=<strong-random-string>
   ADMIN_JWT_SECRET=<strong-random-string>
   CORS_ORIGIN=<your-vercel-url>
   ```
5. Deploy → Note backend URL (e.g., `https://ssgmce-backend.onrender.com`)

### Phase 5: Deploy Frontend (Vercel)

1. Go to https://vercel.com, sign up with GitHub
2. "Import Project" → Select repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   ```
   VITE_BACKEND_URL=https://ssgmce-backend.onrender.com
   ```
5. Deploy → Note frontend URL (e.g., `https://ssgmce-website.vercel.app`)

### Phase 6: Update CORS

Go back to Render dashboard, update:

```
CORS_ORIGIN=https://ssgmce-website.vercel.app
```

### Phase 7: GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy MERN Application

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Verify Build
        run: |
          cd server && npm install --production
          cd ../client && npm install && npm run build
```

---

## Useful Commands

### Development

```bash
# Start both frontend and backend
npm run dev

# Start only backend
cd server && npm run dev

# Start only frontend
cd client && npm run dev

# Build frontend for production
cd client && npm run build

# Preview production build locally
cd client && npm run preview
```

### Database

```bash
# Re-seed pages from allNavPages.js
cd server && node scripts/syncResearchMarkdownContent.js
cd server && node scripts/syncIqacMarkdownContent.js
```

### Deployment

```bash
# Push to GitHub (triggers CI/CD)
git add .
git commit -m "Update description"
git push origin main
```

---

## Troubleshooting

### Frontend Can't Connect to Backend

**Error**: `ECONNREFUSED 127.0.0.1:5000`

**Solution**:

1. Ensure backend is running: `npm run dev` in `server/` directory
2. Check backend is listening on port 5000
3. Verify `CORS_ORIGIN` in `.env` matches frontend URL
4. Check network tab in browser for actual error

### MongoDB Connection Failed

**Error**: `MongoDB connection error`

**Solution**:

1. Verify `MONGODB_URI` in `.env` is correct
2. If MongoDB Atlas: ensure IP whitelist includes your IP (or `0.0.0.0/0`)
3. Test connection string: Copy it to MongoDB Compass
4. Check credentials (user/password) are correct

### Admin Login Not Working

**Error**: 401 Unauthorized

**Solution**:

1. Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
2. Verify database was seeded: Check `users` collection
3. Create admin manually if needed:
   ```bash
   cd server && node scripts/createAdmin.js
   ```
4. Clear browser localStorage: `localStorage.clear()`

### Build Fails

**Error**: `npm run build` fails

**Solution**:

1. Clear `node_modules`: `rm -rf node_modules && npm install`
2. Clear cache: `npm cache clean --force`
3. Check for TypeScript errors (if applicable)
4. Ensure all imports are correct (no broken imports)

### Vercel Deploy Fails

**Error**: Build fails on Vercel

**Solution**:

1. Check Vercel logs: Deployments → Production logs
2. Ensure `VITE_BACKEND_URL` is set in Vercel environment (not `.env`)
3. Check that `root directory` is set to `client/`
4. Rebuild: Settings → Redeploy from git

### Render Deploy Fails

**Error**: Build fails on Render

**Solution**:

1. Check Render logs: Web Service → Logs → Build
2. Ensure `root directory` is set to `server/`
3. Check all environment variables are set
4. Verify MongoDB connection string is correct
5. Manually redeploy: Dashboard → Manual Deploy

---

## About Admin Updates (2026-03-12)

### Recent Changes

- **About Section Pages**: Redesigned to match website theme
  - SSGMCE At A Glance
  - Vision-Mission, Core Values & Goals
  - Our Inspiration
  - Principal Speaks (with profile card + message)
  - Organizational Structure
  - Governing Body
  - Board of Directors
  - Committees

- **Admin CMS Improvements**:
  - Fixed markdown editability for About pages
  - Standardized markdown rendering path
  - Improved page ordering in admin list
  - Better visual hierarchy

- **Performance Notes**:
  - Optimize and compress images for faster loading
  - Keep backend running before frontend startup
  - Use persistent database connections

---

## Contributing

### Adding New Features

Follow the MVC pattern:

1. **Create Model** in `server/models/YourModel.js`
2. **Create Controller** in `server/controllers/yourController.js`
3. **Create Routes** in `server/routes/yourRoutes.js`
4. **Import Routes** in `server/server.js`:
   ```javascript
   const yourRoutes = require("./routes/yourRoutes");
   app.use("/api/your", yourRoutes);
   ```
5. **Create Frontend Pages** in `client/src/pages/your/`
6. **Add Routing** in `client/src/App.jsx`

### Naming Conventions

- **Models**: PascalCase (e.g., `PageContent`, `PlacementStat`)
- **Controllers**: lowercase with "Controller" suffix (e.g., `pageContentController.js`)
- **Routes**: lowercase with "Routes" suffix (e.g., `pageContentRoutes.js`)
- **Pages**: PascalCase (e.g., `VisionMission.jsx`)
- **Components**: PascalCase (e.g., `MarkdownEditor.jsx`)

---

## Quick Reference

| Task                     | Command                                     |
| ------------------------ | ------------------------------------------- |
| Install dependencies     | `npm install` (in both server/ and client/) |
| Start development        | `npm run dev` (from root)                   |
| Build frontend           | `cd client && npm run build`                |
| Start production backend | `cd server && npm start`                    |
| Deploy to GitHub         | `git push origin main`                      |
| Clear database           | Delete collections in MongoDB Atlas         |
| Reset admin user         | Run `node scripts/createAdmin.js`           |

---

## Resources

- **React Documentation**: https://react.dev
- **Mongoose Documentation**: https://mongoosejs.com
- **Tailwind CSS**: https://tailwindcss.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions

---

## License

MIT License - See LICENSE file

---

## Support

For issues or questions:

1. Check **Troubleshooting** section above
2. Review error logs in browser console or server terminal
3. Check GitHub Issues
4. Contact development team

---

**Last Updated**: 2026-03-28
**Status**: ✅ Production Ready
**Deployment**: Free (Forever)
