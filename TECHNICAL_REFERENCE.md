# SSGMCE Website - Technical Reference

Last updated: 2026-05-11
Repository root: `/home/aditya/Programming/SSGMCE/website`

## Developed By

This project was developed from scratch by SSGMCE Shegaon students.  
With the knowledge and resources available to us, we gave our best effort from our side to build and complete this website.

- Aditya Kulkarni
- Gaurav Ghatol
- Prajwal Kathole
- Sagar Palhade
- Aditya Siras

## 1. Project Overview

### 1.1 What this project is
SSGMCE Website is a full-stack college website + CMS for Shri Sant Gajanan Maharaj College of Engineering (SSGMCE).

It has two major user groups:
- Public users (students/parents/faculty/alumni/visitors) browsing institute content.
- Admin users (SuperAdmin + department Coordinators) managing content from an authenticated admin panel.

Core capabilities:
- Public content pages (about, admissions, departments, facilities, IQAC, placements, research, documents, etc.).
- CRUD modules for faculty/news/notices/events/gallery/documents/placements/research/NIRF/IQAC.
- CMS-like page editing via `PageContent` records and visual editor.
- File uploads (images/documents/NIRF PDFs) with GridFS-first storage and local-disk fallback.
- Auth via HTTP-only JWT cookie session.

### 1.2 Complete tech stack

#### Languages
- JavaScript (frontend + backend)
- HTML/CSS (React + Tailwind)
- Markdown (stored/rendered content)
- Shell scripting (`.sh` style via npm scripts)
- PowerShell scripts (`.ps1` under `server/scripts`)
- Python script (`server/scripts/generateInnovativePracticeTemplates.py`)

#### Frontend
- React 18
- React Router DOM 6
- Vite 7
- Tailwind CSS 3 + PostCSS + Autoprefixer
- Axios
- Framer Motion
- React Icons + Lucide React
- React Markdown + remark-gfm + rehype-raw
- DOMPurify
- react-quill-new
- markdown-it + markdown-it-attrs
- Recharts + Chart.js

#### Backend
- Node.js (CommonJS)
- Express 4
- Mongoose 7
- MongoDB driver (via mongoose dependency, `mongodb@5.9.2`)
- bcryptjs
- jsonwebtoken
- multer
- cors
- helmet
- express-rate-limit
- dotenv
- pdf-parse
- mammoth
- turndown + turndown-plugin-gfm

#### Tooling / Ops
- npm workspaces-style orchestration from root scripts
- concurrently
- nodemon
- GitHub Actions CI (`.github/workflows/verify.yml`)
- syntax checker script (`server/scripts/checkSyntax.js`)

### 1.3 Architecture overview

```text
Browser (React SPA @ client)
  -> axios (withCredentials: true)
  -> Express API (/api/* @ server)
      -> Controllers (business logic)
      -> Mongoose Models
      -> MongoDB (Atlas/local)
      -> GridFS Bucket "uploads" for binary storage
      -> Local disk fallback in server/uploads/*
```

Architecture layers:
- Frontend: Route-heavy SPA (`client/src/App.jsx`) with lazy-loaded pages.
- Backend: Express monolith with route modules under `server/routes` and controllers under `server/controllers`.
- Data layer: MongoDB via Mongoose models (`server/models/*`).
- CMS layer: `PageContent` collection drives generic content pages and navigation metadata.
- Asset layer: `/uploads/*` served statically + streamed from GridFS by category/filename.

---

## 2. Repository & File Structure

### 2.1 Annotated directory tree (all folders)

```text
website/
├─ .agents/                         # Agent metadata
├─ .codex/                          # Codex metadata
├─ .github/
│  └─ workflows/                    # CI workflows
├─ .vscode/                         # Editor settings
├─ client/                          # React frontend app
│  ├─ public/
│  │  ├─ documents/                 # Public static PDFs (institution/admin/research)
│  │  │  ├─ admin-office/
│  │  │  │  ├─ aicte-approvals/
│  │  │  │  ├─ financial-statements/
│  │  │  │  ├─ mandatory-disclosure/
│  │  │  │  └─ policies/
│  │  │  ├─ institution/
│  │  │  │  ├─ academics/
│  │  │  │  ├─ administration/
│  │  │  │  ├─ iqac/
│  │  │  │  └─ others/
│  │  │  └─ research/
│  │  │     ├─ coe/
│  │  │     ├─ nisp/
│  │  │     ├─ phd/
│  │  │     └─ policy/
│  │  ├─ gallery/                   # Public gallery placeholders/assets
│  │  │  ├─ photos/
│  │  │  ├─ posters/
│  │  │  └─ videos/
│  │  └─ ug_projects/
│  │     └─ cse/                    # UG project PDFs
│  ├─ src/
│  │  ├─ assets/
│  │  │  └─ images/                 # Bundled static images by section
│  │  │     ├─ NIRF/
│  │  │     ├─ about/
│  │  │     ├─ common/
│  │  │     ├─ departments/
│  │  │     ├─ home/
│  │  │     ├─ navbar/
│  │  │     └─ placements/
│  │  ├─ components/
│  │  │  ├─ admin/                  # Admin editing/management components
│  │  │  └─ research/               # Research-specific shared components
│  │  ├─ config/                    # API/admin feature flags
│  │  ├─ constants/                 # Nav + route constants
│  │  ├─ contexts/                  # Auth/edit/page/theme contexts
│  │  ├─ data/                      # Default static fallback data
│  │  ├─ hooks/                     # Custom hooks (auth/fetch/page)
│  │  ├─ pages/
│  │  │  ├─ about/
│  │  │  ├─ academics/
│  │  │  ├─ activities/
│  │  │  ├─ admin/
│  │  │  ├─ admissions/
│  │  │  ├─ departments/
│  │  │  ├─ documents/
│  │  │  ├─ facilities/
│  │  │  │  ├─ admin-office/
│  │  │  │  │  ├─ aicte-approvals/
│  │  │  │  │  ├─ financial-statements/
│  │  │  │  │  ├─ mandatory-disclosure/
│  │  │  │  │  └─ policies/
│  │  │  │  ├─ computing/
│  │  │  │  ├─ hostel/
│  │  │  │  ├─ library/
│  │  │  │  ├─ other/
│  │  │  │  └─ sports/
│  │  │  ├─ iqac/
│  │  │  ├─ placements/
│  │  │  └─ research/
│  │  └─ utils/                     # API/storage/sanitization/url/cache helpers
│  └─ (vite/tailwind/postcss config files)
├─ server/                          # Express backend app
│  ├─ config/                       # DB connection setup
│  ├─ controllers/                  # Route handlers
│  ├─ data/                         # Seed content datasets
│  ├─ middleware/                   # Auth/rate-limit/NoSQL guards
│  ├─ models/                       # Mongoose schemas
│  ├─ routes/                       # API routers
│  ├─ scripts/                      # Seed/migration/maintenance scripts
│  ├─ uploads/                      # Local uploaded assets (disk fallback/static)
│  │  ├─ documents/
│  │  │  ├─ academics/
│  │  │  │  ├─ results/
│  │  │  │  ├─ syllabus/
│  │  │  │  ├─ teaching-learning/
│  │  │  │  └─ timetable/
│  │  │  ├─ admin-office/
│  │  │  │  ├─ aicte-approvals/
│  │  │  │  ├─ circulars/
│  │  │  │  ├─ financial-statements/
│  │  │  │  ├─ mandatory-disclosure/
│  │  │  │  ├─ notices/
│  │  │  │  └─ policies/
│  │  │  ├─ departments/
│  │  │  │  ├─ applied-sciences/
│  │  │  │  ├─ cse/
│  │  │  │  ├─ electrical/
│  │  │  │  ├─ entc/
│  │  │  │  ├─ it/
│  │  │  │  ├─ mba/
│  │  │  │  ├─ mechanical/
│  │  │  │  └─ shared/
│  │  │  ├─ institution/
│  │  │  │  ├─ academics/
│  │  │  │  ├─ administration/
│  │  │  │  ├─ governance/
│  │  │  │  ├─ iqac/
│  │  │  │  ├─ others/
│  │  │  │  └─ reports/
│  │  │  └─ research/
│  │  │     ├─ coe/
│  │  │     ├─ nisp/
│  │  │     ├─ phd/
│  │  │     └─ policy/
│  │  ├─ files/                     # Generic uploaded docs/files
│  │  ├─ images/                    # Uploaded images + category folders
│  │  │  ├─ about/
│  │  │  ├─ achievements/
│  │  │  │  ├─ cse/
│  │  │  │  ├─ electrical/
│  │  │  │  ├─ entc/
│  │  │  │  ├─ it/
│  │  │  │  ├─ mba/
│  │  │  │  └─ mechanical/
│  │  │  ├─ cse/
│  │  │  │  └─ activities/
│  │  │  ├─ electrical/
│  │  │  │  └─ activities/
│  │  │  ├─ entc/
│  │  │  │  └─ activities/
│  │  │  ├─ it/
│  │  │  │  └─ activities/
│  │  │  ├─ mba/
│  │  │  │  └─ activities/
│  │  │  └─ mechanical/
│  │  │     └─ activities/
│  │  └─ nirf/                      # NIRF report PDFs
│  ├─ utils/                        # Auth/db/path/gridfs helpers
│  └─ server.js                     # API bootstrap + middleware + mounts
├─ README.md
├─ README_COMPREHENSIVE.md
├─ SECURITY_TESTING_REPORT.md
└─ package.json                     # Root orchestration scripts
```

### 2.2 Major file purposes
- Root `package.json`: monorepo-style scripts (`dev`, `verify`, `seed`, etc.).
- `client/src/App.jsx`: full frontend route map (public + admin).
- `client/src/utils/apiClient.js`: central axios config, cookie credentials, interceptors.
- `client/src/hooks/useAuth.jsx`: auth bootstrap/login/logout and admin session state.
- `server/server.js`: security middleware, CORS, rate limits, static uploads, route mounts, DB connection.
- `server/models/*.js`: schema definitions for all persistent entities.
- `server/routes/*.js`: endpoint declarations.
- `server/controllers/*.js`: endpoint logic and DB operations.
- `server/data/allNavPages.js`: canonical page seed dataset for CMS pages.
- `server/utils/dbInit.js`: startup auto-seeding behavior.
- `.env.example` + `server/.env.example`: deployment environment templates.

### 2.3 Naming conventions
- React components/pages: `PascalCase.jsx`.
- Hooks: `useXxx.js|jsx`.
- Utility modules: `camelCase.js`.
- Backend route/controller/model files: `camelCase` + suffix (`authRoutes.js`, `authController.js`).
- CMS `pageId`: kebab-case, usually route-derived (e.g., `about-vision`, `facilities-admin-office-policies-ict`).
- API routes: plural nouns under `/api/*` (e.g., `/api/news`, `/api/research/*`).

### 2.4 Where to find key artifacts
- Frontend routes: `client/src/App.jsx`
- Backend route mounts: `server/server.js`
- Route definitions: `server/routes/*.js`
- Controllers: `server/controllers/*.js`
- Models/schemas: `server/models/*.js`
- Config files:
  - frontend: `client/vite.config.js`, `client/tailwind.config.js`, `client/src/config/*.js`
  - backend: `server/config/db.js`, `server/utils/authSecurity.js`
- Static assets:
  - bundled: `client/src/assets/*`
  - public static: `client/public/*`
  - uploaded/runtime: `server/uploads/*`
- Environment files:
  - root template: `.env.example`
  - server template: `server/.env.example`
  - server runtime (local): `server/.env`

---

## 3. Database

### 3.1 Database engine/version/type
- Type: Document database (NoSQL).
- Engine: MongoDB (Atlas or local instance, runtime-configured).
- ODM: Mongoose `7.8.9`.
- MongoDB driver in lockfile: `mongodb@5.9.2`.
- Runtime DB server version: not pinned in code; depends on deployed MongoDB server.

### 3.2 DB connection config location
- `server/config/db.js` (generic connect helper)
- Primary runtime connect path in `server/server.js` (`connectToMongo`)
- URI env vars:
  - `MONGODB_URI`
  - optional fallback `MONGODB_DIRECT_URI`

### 3.3 Collections and full schema

#### `users` (model: `User`)
- `name` String, required
- `email` String, required, unique, lowercase, regex validated
- `password` String, required, min 8, `select:false`, bcrypt-hashed pre-save
- `role` enum: `SuperAdmin | Coordinator` (legacy `admin` still tolerated in middleware)
- `department` enum: `All | CSE | IT | MECH | ELECTRICAL | ENTC | MBA | ASH`
- `isActive` Boolean default true
- `lastLogin` Date nullable
- timestamps

#### `loginattempts` (model: `LoginAttempt`)
- `scope` enum `ip|email`, indexed
- `value` String indexed
- `expiresAt` Date indexed
- TTL index on `expiresAt` (`expireAfterSeconds: 0`)

#### `pagecontents` (model: `PageContent`)
Top-level fields:
- `pageId` String required unique lowercase
- `pageTitle` String required
- `pageDescription` String
- `route` String required
- `category` enum (`about|academics|facilities|admissions|research|placements|iqac|nirf|documents|activities|departments|other`)
- menu fields: `parentMenu`, `menuLabel`, `menuOrder`, `showInMenu`
- `template` enum (`generic|department|home`)
- `templateData` Mixed
- `sections` Array of section docs
- `isPublished` Boolean
- `lastEditedBy` ObjectId ref `User`
- timestamps, `strict:false`
Indexes: `pageId`, `category`, `(parentMenu,menuOrder)`

Section subdocument (`sections[]`):
- `sectionId` String required
- `title` String
- `type` enum (`text|richtext|markdown|list|image|stats|timeline|cards|table|quote|tabs|accordion|faculty|gallery|video|pdf|sidebar|hod|link|iqac-stats|meeting-records|year-reports|naac-criteria|video-gallery|document-grid|process-steps|info-cards`)
- `order` Number
- `isVisible` Boolean
- `content` Mixed

#### `editlogs` (model: `EditLog`)
- `user` ObjectId ref `User`, required
- `userName`, `userRole`, `userDepartment`
- `pageId`, `pageTitle`
- `action` enum `edit|reset|login|logout`
- `previousData` Mixed
- `summary`
- timestamps
Indexes: `(pageId,createdAt)`, `(user,createdAt)`, `createdAt`

#### `departments` (model: `Department`)
- `name` String required unique
- `code` String required unique uppercase
- `description` String required
- `hodName`, `hodEmail`, `vision`, `mission`
- `programs[]` objects: `{name,duration,intake,type(enum UG|PG|PhD)}`
- `facilities[]` String
- `achievements[]` String
- `image` String default
- `isActive` Boolean
- timestamps

#### `faculties` (model: `Faculty`)
- `name` required
- `designation` required
- `department` required
- `qualification`, `specialization`, `experience`, `email`, `phone`
- `image`, `isActive`
- timestamps

#### `news` (model: `News`)
- `title`, `description` required
- `content`
- `category` enum `Achievement|Event|Placement|Research|General`
- `image`, `author`, `isActive`, `publishDate`
- timestamps

#### `notices` (model: `Notice`)
- `title`, `description` required
- `category` enum `Announcement|Admission|Examination|Result|General`
- `fileUrl`
- `priority` enum `High|Medium|Low`
- `isActive`, `publishDate`
- timestamps

#### `events` (model: `Event`)
- `title`, `description`, `eventDate` required
- `endDate`, `location`, `organizer`, `category`, `image`, `registrationLink`
- `isActive`
- timestamps

#### `eventcategories` (model: `EventCategory`)
- `name` required
- `normalizedName` required unique indexed (derived in pre-validate)
- `order`, `isActive`
- timestamps

#### `galleryitems` (model: `GalleryItem`)
- `title` required
- `category` String
- `imageUrl` required
- `order`, `isActive`
- timestamps

#### `gallerycategories` (model: `GalleryCategory`)
- `name` required
- `normalizedName` required unique indexed
- `order`, `isActive`
- timestamps

#### `documents` (model: `Document`)
- `title` required
- `category` enum (`aicte|naac|nba|nirf|policies|audit|newsletter|mandatory|iso|financial|tattwadarshi|student-forms|university|other`)
- `subcategory`, `description`
- `fileUrl` required
- `fileSize`, `fileType` enum
- `year`, `uploadDate`
- `isActive`, `isPrivate`
- `accessLevel` enum `public|admin`
- `order`, `downloadCount`
- timestamps
Indexes: `(category, year desc)`, text index on `title+description`

#### `nirfs` (model: `NIRF`)
- `year` required
- `category` enum `engineering|overall|management|innovation`
- `rank`, `overallScore`
- `parameters` object `{tlr,rp,go,oi,pr}`
- `reportUrl`, `submissionDate`, `isActive`, `order`
- timestamps
Index: `(year desc, category)`

#### `iqacdocuments` (model: `IQACDocument`)
- `title` required
- `category` enum (`AQAR|Minutes|NAAC|NBA|Best Practices|Feedback|Survey|Gender|E-Content|Other`)
- `academicYear`, `fileUrl` required, `fileType`, `fileSize`, `description`
- `uploadDate`, `isPublished`
- timestamps
Indexes: `(category, academicYear desc)`, `isPublished`

#### `iqacmembers` (model: `IQACMember`)
- `name`, `designation` required
- `role` enum (`Chairperson|Coordinator|Faculty|Administrative|External|Student|Alumni`)
- `department`, `email`, `phone`, `photo`
- `order`, `isActive`
- timestamps
Index: `(order, role)`

#### `iqacnews` (model: `IQACNews`)
- `title` required
- `content`, `link`
- `priority`, `isActive`, `expiresAt`
- timestamps
Index: `(isActive, priority desc, createdAt desc)`

#### `placementstats` (model: `PlacementStat`)
- `academicYear` required unique
- `placementPercentage`, `highestPackage`, `averagePackage`, `totalOffers`, `companiesVisited` required
- `departmentWise[]` entries `{department, placedCount}`
- timestamps

#### `recruiters` (model: `Recruiter`)
- `name` required
- `logoUrl` required
- `category` enum
- `website`, `order`, `showOnHome`
- timestamps

#### `testimonials` (model: `Testimonial`)
- `studentName`, `batch`, `department`, `company`, `message` required
- `photoUrl`, `designation`
- timestamps

#### `alumnihighlights` (model: `AlumniHighlight`)
- `name`, `role`, `organization`, `imageUrl` required
- `department`, `batch`, `profileUrl`, `quote`
- `order`, `showOnHome`
- timestamps

#### `popupbanners` (model: `PopupBanner`)
- `title`, `description`, `imageUrl`(required), `linkUrl`
- `isActive`, `priority`
- `startDate`, `endDate`
- `displayFrequency` enum `always|once-per-session|once-per-day`
- timestamps

#### Research module collections (`server/models/Research.js`)
- `publications`
- `patents`
- `fundedprojects`
- `researchareas`
- `innovations`

Key fields:
- `Publication`: `title`, `authors[]`, `year`, `type`, `department(enum)`, `isPublished`, plus bibliographic metadata.
- `Patent`: `title`, `inventors[]`, patent identifiers/dates, `status`, `type`, `department`, `isPublished`.
- `FundedProject`: `title`, PI/co-PI, funding fields, dates/status, `department`, `milestones[]`, `outcomes[]`, `isPublished`.
- `ResearchArea`: `name`, `description`, `department`, counts, keywords, `isActive`.
- `Innovation`: `title`, `type`, `team`, `mentor`, `year`, `status`, `achievements`, `funding`, `imageUrl`, `isPublished`.

### 3.4 Relationships

```text
User (_id)
  1 ───< EditLog.user
  1 ───< PageContent.lastEditedBy (optional)

All other domain entities are mostly denormalized/independent.
Event.category and Gallery.category are string-based (not ObjectId refs).
```

### 3.5 Which app parts read/write which collections

- Auth/admin user management: `users`, `loginattempts`, `editlogs`.
- CMS pages/navigation: `pagecontents` (+ `editlogs` for audit/reset).
- Departments/faculty pages: `departments`, `faculties`.
- Home/public feeds: `news`, `events`, `notices`.
- Events gallery subsystem: `events`, `eventcategories`, `galleryitems`, `gallerycategories`.
- Documents subsystem: `documents` + physical files in uploads/GridFS.
- IQAC module: `iqacmembers`, `iqacdocuments`, `iqacnews`.
- Placements module: `placementstats`, `recruiters`, `testimonials`, `alumnihighlights`.
- Research module: `publications`, `patents`, `fundedprojects`, `researchareas`, `innovations`.
- NIRF module: `nirfs` + NIRF PDF assets.
- Popup banner module: `popupbanners` (API route currently not mounted, see debt section).

### 3.6 Seed/default data required
- `PageContent`: auto-seeded from `defaultPages + allNavPages` during startup (`initializeDatabase` -> `autoSeedMissingPages`), controlled by `ADMIN_AUTO_SEED` (default true in code path).
- Home seed: default news/events inserted by `seedHomepageContent()`.
- Event categories: auto-created on first access (`Technical`, `Cultural`, `Sports`, etc.).
- Gallery categories: auto-created on first access (`Campus`, `Events`, `Labs`, etc.).
- Optional scripts:
  - `server/scripts/createAdmin.js` sync/creates SuperAdmin from env.
  - `server/scripts/seedAdminOfficePages.js`
  - module-specific seed scripts (`seedPlacementStatistics`, `syncIqacMarkdownContent`, etc.).

---

## 4. Local Storage & Client-Side Storage

### 4.1 localStorage/sessionStorage/cookie keys

| Key | Storage | Purpose | Format |
|---|---|---|---|
| `adminUser` | `sessionStorage` | Cached current admin profile for UI session | JSON object |
| `adminUser` | `localStorage` (clear only) | Legacy cleanup path | removed |
| `adminToken` | `localStorage` | Legacy token key (actively purged) | removed |
| `admin-theme` | `localStorage` | Admin theme preference | string: `light|dark|auto` |
| `adminEntryVerified` | `sessionStorage` | Admin-entry flag helper (currently unused by route guard) | string `"true"` |
| `adminEntryVerified` | `localStorage` (clear only) | Cleanup mirror | removed |
| `popup-banner-<bannerId>` | `sessionStorage` | Once-per-session popup suppression | string `shown` |
| `popup-banner-<bannerId>` | `localStorage` | Once-per-day popup suppression | date string `YYYY-MM-DD` |
| `ssgmce-page-cache:<pageId>` | `sessionStorage` | Cached page payload + timestamp | JSON `{data,timestamp}` |
| `ssgmce_admin_session` (default) | Cookie (HTTP-only) | Auth session JWT | opaque JWT string |

Cookie name is configurable via `AUTH_COOKIE_NAME`; default is `ssgmce_admin_session`.

### 4.2 Set/read/clear lifecycle
- `adminUser`
  - set: on successful `/auth/login` or `/auth/register`, and `/auth/me` bootstrap.
  - read: app startup in `useAuth`.
  - clear: logout, auth bootstrap failure, global 401 interceptor.
- `admin-theme`
  - set/read: `ThemeContext`.
- `popup-banner-*`
  - read before showing active banner.
  - set on close based on `displayFrequency`.
- `ssgmce-page-cache:*`
  - set when `GenericContentPage` fetch succeeds.
  - read on navigation before API request.
  - clear on TTL expiration or after admin save in `EditContext`.

### 4.3 Caching logic
- In-memory page cache: window/global `Map` keyed by pageId.
- Session cache mirror: `sessionStorage` entries per page.
- TTL: 5 minutes (`PAGE_CACHE_TTL_MS = 300000`).
- Request de-duplication: separate in-memory request promise cache (`__ssgmcePageRequestCache`).

---

## 5. API & Data Flow

Base URL: `/api`

## 5.1 Endpoint inventory

### Auth (`/api/auth`)
| Method | Route | Auth | Purpose | Request | Response |
|---|---|---|---|---|---|
| POST | `/register` | public (or SuperAdmin after first user) | create user | `{name,email,password,role?,department?}` | `{success,data:{_id,name,email,role,department}}` + auth cookie |
| POST | `/login` | public | login | `{email,password}` | `{success,data:{_id,name,email,role,department}}` + auth cookie |
| POST | `/logout` | public | logout current session | none | `{success,message}` clears cookie |
| POST | `/verify-gate` | public | validate admin gate key | `{accessKey}` | `{success,gateEnabled,message}` |
| GET | `/me` | protected | current user profile | none | `{success,data:{...}}` |
| PUT | `/password` | protected | change password | `{currentPassword,newPassword}` | `{success,message}` |
| GET | `/coordinators` | protected + superAdminOnly | list users | none | `{success,data:[users]}` |
| POST | `/coordinators` | protected + superAdminOnly | create coordinator | `{name,email,password,department}` | `{success,data:user}` |
| PUT | `/coordinators/:id` | protected + superAdminOnly | update coordinator | partial user payload | `{success,data:user}` |
| DELETE | `/coordinators/:id` | protected + superAdminOnly | delete coordinator | none | `{success,message}` |

### Pages/CMS (`/api/pages`)
| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/` | public | list pages (optional `?category=`) |
| GET | `/menu-structure` | public | grouped menu tree from DB |
| GET | `/edit-logs` | protected+adminOnly | recent edit logs (filters: `pageId`,`userId`,`limit`) |
| POST | `/reset/:logId` | protected+adminOnly | reset page to pre-edit snapshot |
| GET | `/:pageId` | public | full page content by pageId/alias |
| POST | `/` | protected+adminOnly | create page |
| PUT | `/:pageId` | protected+adminOrCoordinator | update page |
| DELETE | `/:pageId` | protected+adminOnly | delete page |
| POST | `/seed` | protected+adminOnly | seed default about pages |
| POST | `/seed-all` | protected+adminOnly | seed all nav pages (`?force=true` optional) |

### Core content modules
| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/news` | public | list active news |
| GET | `/news/:id` | public | get news item |
| POST/PUT/DELETE | `/news` / `/news/:id` | adminOnly | news CRUD |
| GET | `/notices` | public | list active notices |
| GET | `/notices/:id` | public | get notice |
| POST/PUT/DELETE | `/notices` / `/notices/:id` | adminOnly | notice CRUD |
| GET | `/events` | public | list active events |
| GET | `/events/upcoming` | public | upcoming events |
| GET | `/events/:id` | public | event detail (active only) |
| GET | `/events/admin` or `/events/admin/all` | adminOnly | all events |
| POST/PUT/DELETE | `/events` / `/events/:id` | adminOnly | event CRUD |
| GET | `/events/categories` | public | active event categories |
| GET | `/events/categories/admin/all` | adminOnly | all event categories |
| POST/PUT/DELETE | `/events/categories` | adminOnly | category CRUD + re-mapping |

### Department/faculty
| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/departments` | public | list active departments |
| GET | `/departments/code/:code` | public | by department code |
| GET | `/departments/:id` | public | by id |
| POST/PUT/DELETE | `/departments` or `/:id` | adminOnly | department CRUD |
| GET | `/faculty` | public | list faculty (`?department=` optional; coordinator filter auto-injected on protected calls) |
| GET | `/faculty/:id` | public | faculty detail |
| POST/PUT/DELETE | `/faculty` / `/:id` | adminOrCoordinator | faculty CRUD with department ownership checks |

### Research (`/api/research`)
- Stats: `GET /stats`
- Seed: `POST /seed` (adminOnly)
- Publications: `GET/POST /publications`, `GET/PUT/DELETE /publications/:id`
- Patents: `GET/POST /patents`, `PUT/DELETE /patents/:id`
- Projects: `GET/POST /projects`, `PUT/DELETE /projects/:id`
- Areas: `GET/POST /areas`, `PUT /areas/:id`
- Innovations: `GET /innovations`, `POST/PUT/DELETE /innovations*` (adminOnly)

### Placements (`/api/placements`)
- `GET /public` consolidated data (`stats+recruiters+testimonials+alumni`)
- `GET/POST/PUT/DELETE /stats`
- `GET/POST/PUT/DELETE /recruiters`
- `GET/POST/PUT/DELETE /alumni`
- `GET/POST/PUT/DELETE /testimonials`
- `POST /seed`

### IQAC (`/api/iqac`)
- Public: `GET /members`, `GET /documents/:category`, `GET /news`
- Admin: members/docs/news CRUD via `/admin/*` list endpoints + write endpoints on base paths
- `POST /seed`

### NIRF (`/api/nirf`)
- Public: `GET /`, `/latest`, `/comparison`, `/year/:year`
- Admin: `GET /admin/all`, `POST /admin/create`, `POST /admin/seed`, `PUT/DELETE /admin/:id`

### Documents and downloads

#### Metadata CRUD (`/api/documents`)
- Public:
  - `GET /` list active docs
  - `GET /stats` category counts
  - `GET /category/:category`
  - `GET /:id` (private/admin docs enforce auth rules)
  - `POST /:id/download` increment counter
- Admin:
  - `GET /admin/all`
  - `POST /admin/create`
  - `POST /admin/seed`
  - `PUT/DELETE /admin/:id`

#### File-serving routes (mounted from `documentDownloadRoutes`)
- `GET /api/documents/download/*` download/inline by nested filename.
- `GET /api/documents/list/*` list PDF names in directory.
- `GET /api/documents/*` direct structured file-serving with legacy path alias support.
- also mounted on `/api/document-download/*` alias path.

### Uploads (`/api/upload`)
| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/image` | adminOrCoordinator | upload image |
| POST | `/file` | adminOrCoordinator | upload document |
| GET | `/files` | adminOrCoordinator | list uploaded images |
| DELETE | `/files/:filename` or `/file?path=` | adminOrCoordinator | delete file |
| POST | `/nirf-pdf` | adminOnly | upload NIRF PDF |

### Document conversion (`/api/convert`)
- `POST /document` (multipart field: `document`) — protected admin/coordinator.
- Supports `.pdf` and `.docx`; returns markdown extraction output.

### Gallery (`/api/gallery`)
- Items:
  - public `GET /`
  - admin `GET /admin/all`, `POST /`, `PUT /:id`, `DELETE /:id`
- Categories:
  - public `GET /categories`
  - admin `GET /categories/admin/all`, `POST /categories`, `PUT/DELETE /categories/:id`

### Popup banner routes
- Implemented in `server/routes/popupBannerRoutes.js` as expected `/active`, `/`, `/:id`, `/:id/toggle`.
- **Important**: currently not mounted in `server/server.js`, so `/api/popup-banners/*` calls from frontend fail unless mount is added.

## 5.2 Data flow (UI -> API -> DB -> UI)

### Typical CMS page read
1. `GenericContentPage` requests `GET /api/pages/:pageId` via `apiClient`.
2. Server resolves aliases (`pageIdAliases`), loads `PageContent`, normalizes markdown-only documents pages.
3. Response cached in memory + `sessionStorage` (5 min TTL).
4. UI renders sections by type.

### Typical admin page edit
1. Admin loads visual editor (`/admin/visual/:pageId`).
2. Edits happen in `EditContext` local state.
3. Save triggers `PUT /api/pages/:pageId` with full payload.
4. Server enforces role/department checks, updates page, writes `EditLog` snapshot.
5. Frontend invalidates/repopulates local page cache.

### Typical file upload flow
1. UI sends multipart to `/api/upload/image` or `/api/upload/file`.
2. Request interceptor adds scope headers (`X-Upload-Category`, `X-Upload-Source-Path`).
3. Server validates mime+extension+signature where applicable.
4. Stores file in GridFS bucket (`uploads`) or local `server/uploads/*` fallback on quota/unavailable errors.
5. Returns file URL under `/uploads/<category>/<scoped-filename>`.

## 5.3 Authentication flow
- Login endpoint: `POST /api/auth/login` validates credentials.
- On success server sets HTTP-only cookie (`setAuthCookie`), default name `ssgmce_admin_session`.
- Browser sends cookie automatically (`axios withCredentials: true`).
- Protected APIs read token from cookie or Authorization header fallback.
- Logout blacklists current token in-memory and clears cookie.
- Client stores only non-sensitive profile (`adminUser`) in `sessionStorage`.
- Global 401 interceptor clears stored auth and redirects to `/admin/login`.

Security notes:
- `tokenBlacklist` is in-memory (process-local, non-distributed).
- cookie secure behavior depends on env + loopback detection.

---

## 6. Key Logic & Important Code Sections

### 6.1 Backend critical modules
- `server/server.js`
  - CORS allowlist + origin/referer guard for unsafe API methods.
  - Security headers + CSP + Helmet.
  - Rate limiting for auth/API/upload.
  - Route mounting and static upload serving.
  - Mongo connection fallback (`MONGODB_DIRECT_URI` on SRV DNS failures).
- `server/middleware/authMiddleware.js`
  - `protect`, `adminOnly`, `superAdminOnly`, `adminOrCoordinator`.
  - department-based coordinator constraints (`checkDepartmentAccess`, `verifyDocDepartment`).
- `server/controllers/pageContentController.js`
  - Page alias resolution and backward compatibility.
  - Documents-page markdown normalization migration on read.
  - Edit snapshots in `EditLog` for revert support.
- `server/controllers/uploadController.js`
  - strict MIME/extension/signature checks.
  - scope-derived filenames to partition uploads by functional area.
  - GridFS primary + disk fallback design.
- `server/controllers/convertController.js`
  - PDF/DOCX to markdown conversion using `pdf-parse`, `mammoth`, `turndown`.
  - DOCX image extraction to uploads.

### 6.2 Frontend critical modules
- `client/src/App.jsx`: global route map, protected admin routes.
- `client/src/hooks/useAuth.jsx`: session bootstrap via `/auth/me`, login/logout behavior.
- `client/src/utils/apiClient.js`: cookie-first auth behavior, upload metadata headers, global 401 redirect.
- `client/src/components/GenericContentPage.jsx`: dynamic CMS renderer, page prefetch, memory/session caching.
- `client/src/contexts/EditContext.jsx`: staged edits + save pipeline + cache invalidation.
- `client/src/components/admin/MarkdownEditor.jsx` and `RichTextEditor.jsx`: content editing UX and sanitization.

### 6.3 Non-obvious logic/workarounds (and why)
- Page aliasing (`about-glance` -> `about-at-glance`) exists to preserve older page IDs and links.
- Document path alias resolver remaps legacy file path prefixes to new structured paths to avoid broken historical links.
- Upload scope is inferred from current route to avoid manual category selection on each upload.
- Event/Gallery categories are normalized with `normalizedName` to enforce case-insensitive uniqueness.
- Research department code translation (`ELECTRICAL` -> `EE`, `MECH` -> `ME`) bridges user-role department enum and research schema enum mismatch.
- Generic page prefetch cache improves perceived navigation speed across adjacent pages.

### 6.4 Third-party integrations
- MongoDB Atlas/local MongoDB as datastore.
- GridFS bucket for binary storage.
- Document conversion stack:
  - `pdf-parse` for PDF text extraction.
  - `mammoth` for DOCX -> HTML.
  - `turndown + gfm plugin` for HTML -> markdown.
- Deployment assumptions in env docs: frontend (Vercel), backend (Render), DB (Atlas).

---

## 7. Known Issues & Technical Debt

1. Popup banner API wiring is incomplete.
- `popupBannerRoutes.js` exists and frontend calls `/popup-banners/*`, but route is not mounted in `server/server.js`.
- Impact: admin popup banner management and active banner fetch fail at runtime.

2. Popup banner modal component is currently not mounted in the public layout.
- `PopupBannerModal.jsx` exists but has no usage in `App`/`Layout`.
- Impact: even with API fixed, banner may never display publicly.

3. Schema/type drift in admin office seed data.
- `server/data/adminOfficePages.js` emits section `type: "component"`, but `PageContent` section enum does not include `component`.
- Impact: potential validation failures during seeding/update.

4. In-memory token blacklist and login lock maps are single-process only.
- `tokenBlacklist` and `loginAttempts` maps reset on restart and do not synchronize across instances.
- Impact: logout invalidation and lockout guarantees weaken in multi-instance deployments.

5. `usePageContent` hook is effectively dead/dummy.
- Returns simulated static data and appears unused.
- Impact: confusion for maintainers, risk of accidental adoption.

6. `adminAccess` gate helpers are mostly unused.
- `adminEntryVerified` set/check helpers exist with little/no active routing enforcement.
- Impact: stale access-control abstraction.

7. Heavy `PageContent` use of `Mixed` and `strict:false`.
- Flexible but weakly typed; easier to store inconsistent section payloads.
- Impact: migration and validation complexity over time.

8. Startup auto-seeding default is write-enabled.
- `ADMIN_AUTO_SEED` defaults to true when unset.
- Impact: unexpected writes in some environments if not explicitly configured.

9. Some scripts/data are operationally large and manually curated.
- Large seed files (`allNavPages.js`, markdown datasets) increase merge conflict and review surface.

10. Live DB introspection was not verified in this environment.
- Local runtime dependencies are not installed in this workspace session, so runtime DB server version/collection state could not be directly queried here.

---

## Appendix A: Route-to-code map

- Server entry + route mount: `server/server.js`
- Route modules: `server/routes/*.js`
- Controllers: `server/controllers/*.js`
- Models: `server/models/*.js`
- Frontend routes: `client/src/App.jsx`
- Frontend API calls: `client/src/pages/admin/*`, `client/src/components/*`, `client/src/hooks/*`

## Appendix B: Environment variables (operational)

### Server
- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `MONGODB_DIRECT_URI` (fallback)
- `JWT_SECRET`
- `AUTH_COOKIE_NAME` (optional)
- `AUTH_COOKIE_SECURE`
- `AUTH_COOKIE_ALLOW_INSECURE_LOOPBACK`
- `AUTH_COOKIE_SAME_SITE`
- `AUTH_COOKIE_MAX_AGE_MS`
- `ADMIN_GATE_TOKEN`
- `ADMIN_AUTO_SEED`
- `CORS_ORIGIN` / `CLIENT_URL`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`

### Client
- `VITE_BACKEND_URL`
- `VITE_API_PROXY_TARGET` (dev proxy target for Vite)

---

## 8. Change & Maintenance Guide

This section is the operational handover guide for making common changes safely.

### 8.1 Content changes (text, images, copy)

#### A) What can be changed from admin panel (no code)

1. Edit CMS-driven page sections from visual editor.
2. Edit module data from dedicated admin CRUD screens (news, notices, events, gallery, documents, placements, IQAC, NIRF, etc.).
3. Upload images/files via admin upload flows (`/api/upload/*`).

```text
client/src/pages/admin/VisualPageEditor.jsx
client/src/components/GenericContentPage.jsx
client/src/pages/admin/AdminPages.jsx
client/src/pages/admin/AdminNews.jsx
client/src/pages/admin/AdminNotices.jsx
client/src/pages/admin/AdminEvents.jsx
client/src/pages/admin/AdminGallery.jsx
client/src/pages/admin/AdminDocuments.jsx
client/src/pages/admin/AdminPlacements.jsx
client/src/pages/admin/AdminIQAC.jsx
client/src/pages/admin/AdminNIRF.jsx
server/controllers/uploadController.js
server/routes/uploadRoutes.js
```

#### B) What requires code change

1. Hardcoded React page content (especially large department pages and custom static pages).
2. Navbar labels/quick links/mega menu content.
3. Static fallback data in code.
4. Bundled image assets imported from `client/src/assets/...`.

```text
client/src/pages/departments/*.jsx
client/src/pages/facilities/admin-office/**/*.jsx
client/src/components/Navbar.jsx
client/src/pages/News.jsx
client/src/assets/images/**/*
```

WARNING: Deleting records from admin pages (`DELETE` actions) is destructive. Keep DB backup before bulk cleanup.

---

### 8.2 UI / design changes

#### A) Style/token locations

```text
client/tailwind.config.js                 # Tailwind theme extensions (colors, fonts, sizes)
client/src/index.css                      # Global styles, CSS variables, base layer, animations
client/src/components/admin/RichTextEditor.css   # Component-specific CSS file
```

#### B) Global styles vs component styles

1. Use `index.css` for app-wide typography, CSS vars, scrollbar/base overrides.
2. Use Tailwind utility classes in individual components for component-level styling.
3. Keep specialized editor styling in `RichTextEditor.css`.

```text
client/src/index.css
client/src/components/**/*.jsx
client/src/pages/**/*.jsx
```

#### C) Add/modify a page layout

1. Update layout wrappers/components used by target page.
2. If this is a routed page, verify route entry in `App.jsx`.
3. For CMS layout pages, update `GenericPage`/`GenericContentPage` rendering rules.

```text
client/src/components/Layout.jsx
client/src/components/GenericPage.jsx
client/src/components/GenericContentPage.jsx
client/src/App.jsx
```

#### D) Add/modify a component

1. Create/update component in `client/src/components/`.
2. Import and use in target page/component.
3. If component needs data, connect to API through `apiClient`.

```text
client/src/components/
client/src/utils/apiClient.js
```

---

### 8.3 Adding a new page

#### A) CMS-driven page (recommended when content should be admin-editable)

1. Create a page component that renders `GenericContentPage` with a `pageId`.
2. Add lazy import + route entry in `client/src/App.jsx`.
3. Ensure DB page record exists:
4. Option 1: open `/admin/visual/<pageId>` and create page from UI.
5. Option 2: add seed entry in `server/data/allNavPages.js` (or `server/data/adminOfficePages.js`) and seed.
6. Add link in navigation/sidebar so users can reach the route.

```text
client/src/pages/<Section>/<NewPage>.jsx
client/src/App.jsx
server/data/allNavPages.js
server/data/adminOfficePages.js
client/src/components/Navbar.jsx
client/src/components/*Sidebar.jsx
```

#### B) Non-CMS page (custom logic-heavy page)

1. Create page component with custom UI/data.
2. Add route in `App.jsx`.
3. Add nav/sidebar links if needed.

```text
client/src/pages/<Section>/<NewPage>.jsx
client/src/App.jsx
client/src/components/Navbar.jsx
```

Note: Facilities routing has a path->`pageId` map and may require map update.

```text
client/src/pages/facilities/FacilitiesContentRouter.jsx
```

---

### 8.4 Modifying navigation / menu

Navigation is defined in multiple places.

#### A) Public navbar (actual website nav used by users)

1. Edit top-level menu and dropdown items in `Navbar.jsx`.
2. Update link order/labels/paths there.

```text
client/src/components/Navbar.jsx
```

#### B) Admin menu metadata (CMS menu manager)

1. Open admin menu manager to set `parentMenu`, `menuOrder`, `menuLabel`, `showInMenu`.
2. This updates `PageContent` metadata.

```text
client/src/pages/admin/AdminMenuManager.jsx
server/controllers/pageContentController.js   # getMenuStructure/updatePage
server/models/PageContent.js                  # parentMenu/menuOrder/menuLabel/showInMenu
```

#### C) Seed/config sources to keep aligned

```text
server/data/allNavPages.js
client/src/constants/navConfig.js   # used by AdminDashboard counts/cards, not current Navbar rendering
```

WARNING: If you change navbar paths without updating route definitions in `App.jsx`, links will break immediately.

---

### 8.5 Database changes

There is no formal migration framework in this repo. Migrations are script-based.

#### A) Add a new field to existing collection

1. Add field in the relevant Mongoose schema.
2. Update controller create/update handlers for validation/default behavior.
3. Update admin form/UI to capture the field.
4. Update frontend display components that read the entity.
5. Backfill existing documents with a script under `server/scripts/`.

```text
server/models/<Model>.js
server/controllers/<module>Controller.js
server/routes/<module>Routes.js
client/src/pages/admin/Admin<Module>.jsx
client/src/pages/<PublicPage>.jsx
server/scripts/<migration-name>.js
```

#### B) Add a new collection/table

1. Create schema/model file.
2. Create controller with CRUD endpoints.
3. Create route file and mount it in `server/server.js`.
4. Add admin UI page to manage records.
5. Add public UI integration where needed.

```text
server/models/
server/controllers/
server/routes/
server/server.js
client/src/pages/admin/
client/src/App.jsx
```

#### C) Migration process (current project pattern)

1. Create script in `server/scripts/` using mongoose connection.
2. Add dry-run mode first (recommended).
3. Run on staging DB and validate.
4. Run on production with backups available.

```bash
cd server
node scripts/<script>.js
```

Examples in repository:

```text
server/scripts/migrateRichtextToMarkdown.js
server/scripts/migrateplacementMarkdown.js
server/scripts/seedAdminOfficePages.js
```

WARNING: `seedAdminOfficePages.js --overwrite` and scripts that call `updateOne/insertOne` can overwrite production content. Take backup first.

#### D) How DB changes connect to admin panel and frontend

1. Schema change defines persisted shape.
2. Controller/route exposes shape to API.
3. Admin page updates data through `apiClient`.
4. Public page renders updated payload.

```text
server/models -> server/controllers -> server/routes -> client/src/pages/admin -> client/src/pages/components
```

---

### 8.6 Adding a new CMS-editable section

#### A) Add new section instance to a page (no new type)

1. Open `/admin/visual/<pageId>`.
2. Use "Add Markdown Section" or edit existing section JSON.
3. Save from toolbar.

```text
client/src/components/GenericContentPage.jsx
client/src/components/admin/SectionContentEditor.jsx
client/src/contexts/EditContext.jsx
```

#### B) Add a brand-new section type (code change)

1. Register type in `PageContent` section enum.
2. Update server-side allowed type list in page update controller.
3. Implement rendering logic in `GenericContentPage`.
4. Update editor components if type needs custom editing UX.
5. Add seed/sample payloads for this type in page seed data if required.

```text
server/models/PageContent.js
server/controllers/pageContentController.js
client/src/components/GenericContentPage.jsx
client/src/components/admin/EditableSection.jsx
client/src/components/admin/SectionContentEditor.jsx
server/data/allNavPages.js
```

Data format baseline for a section:

```json
{
  "sectionId": "my-section-id",
  "title": "Section Title",
  "type": "markdown",
  "order": 1,
  "isVisible": true,
  "content": { "text": "..." }
}
```

---

### 8.7 Third-party services and API keys

#### A) Where secrets/config live

```text
server/.env                 # runtime backend secrets/config (do not commit)
.env.example                # root template reference
server/.env.example         # backend template reference
client/vercel.json          # frontend rewrite target (non-secret but env-sensitive)
client/src/config/api.js    # reads VITE_BACKEND_URL
client/vite.config.js       # reads VITE_API_PROXY_TARGET
```

#### B) Key/config purpose map

1. `MONGODB_URI` / `MONGODB_DIRECT_URI`: MongoDB connection.
2. `JWT_SECRET`: auth token signing secret.
3. `ADMIN_GATE_TOKEN`: server-side admin gate verification token.
4. `CORS_ORIGIN` / `CLIENT_URL`: allowed frontend origins.
5. `AUTH_COOKIE_*`: cookie name/secure/same-site/max-age behavior.
6. `ADMIN_AUTO_SEED`: startup auto-seeding toggle.
7. `VITE_BACKEND_URL`: frontend API base URL.
8. `VITE_API_PROXY_TARGET`: local dev proxy target.

#### C) Safe key rotation procedure

1. Add new secret value in staging environment first.
2. Deploy and verify login, admin saves, uploads, and API calls.
3. Deploy same secret in production.
4. Remove old value after verification window.

WARNING: Rotating `JWT_SECRET` invalidates all active sessions immediately (forced logout).

WARNING: Changing `MONGODB_URI` to a different cluster can make app appear to lose data if wrong DB is targeted.

---

### 8.8 Adding new admin panel features

Admin panel architecture:

```text
client/src/pages/admin/            # feature pages (AdminNews, AdminEvents, ...)
client/src/components/admin/       # layout/shared admin UI
client/src/components/admin/AdminSidebar.jsx
client/src/App.jsx                 # /admin/* route mapping
server/routes/*.js + controllers/*.js + models/*.js
```

#### Process

1. Add/extend backend API (`model` + `controller` + `route` + mount in `server/server.js`).
2. Create admin page in `client/src/pages/admin/`.
3. Add route in `client/src/App.jsx` protected by `ProtectedRoute`.
4. Add menu item in `AdminSidebar.jsx`.
5. Enforce RBAC (`adminOnly`, `superAdminOnly`, `adminOrCoordinator`) in backend routes.
6. Connect admin UI via `client/src/utils/apiClient.js`.

```text
server/middleware/authMiddleware.js
client/src/components/admin/ProtectedRoute.jsx
client/src/components/admin/AdminSidebar.jsx
```

---

### 8.9 Deployment & build

#### A) Safe production release process

1. Create branch and commit changes.
2. Run full verification locally.
3. Open PR and wait for CI (`.github/workflows/verify.yml`).
4. Merge to `main` only after green checks.
5. Deploy backend + frontend with correct environment values.
6. Run post-deploy smoke tests (login, content save, uploads, public page rendering).

```bash
npm run verify
```

```text
.github/workflows/verify.yml
package.json
server/package.json
client/package.json
```

#### B) Environment-specific config to watch

1. Set `NODE_ENV=production` on backend.
2. Set `AUTH_COOKIE_SECURE=true` for HTTPS deployments.
3. Ensure `CORS_ORIGIN`/`CLIENT_URL` matches exact frontend domain.
4. Set `ADMIN_AUTO_SEED=false` in production unless intentional.
5. Ensure `VITE_BACKEND_URL` matches deployed backend URL.
6. Verify `client/vercel.json` rewrites point to active backend.

```text
server/server.js
server/utils/authSecurity.js
client/src/config/api.js
client/vercel.json
```

WARNING: Production deploy with wrong `CORS_ORIGIN` or cookie security settings can break admin login/save flows even when site loads normally.
