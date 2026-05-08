# SSGMCE Backend

Express + MongoDB API server for the SSGMCE college website.

## Quick Start

```bash
npm install
cp .env.example .env    # fill in MONGODB_URI, JWT_SECRET, ADMIN_JWT_SECRET
npm start               # or: npm run dev (nodemon)
```

Runs on `http://localhost:5000`.

## Directory Structure

```
server/
├── server.js              # Entry point, middleware, route mounting
├── config/db.js           # MongoDB connection
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/                # 18 Mongoose schemas
│   ├── User.js            # Admin users
│   ├── Department.js      # Department data + sub-pages
│   ├── Faculty.js
│   ├── Event.js, News.js, Notice.js
│   ├── PageContent.js     # CMS page content (sections, markdown)
│   ├── PlacementStat.js, Recruiter.js, Testimonial.js
│   ├── Research.js
│   ├── IQACDocument.js, IQACMember.js, IQACNews.js
│   ├── NIRF.js
│   ├── Document.js
│   ├── PopupBanner.js
│   └── EditLog.js         # Content change audit log
├── controllers/           # 14 controllers
├── routes/                # 14 route files
├── data/
│   ├── allNavPages.js     # Master page definitions (auto-seeded on startup)
│   ├── researchMarkdownContent.js
│   └── iqacMarkdownContent.js
├── scripts/
│   ├── syncResearchMarkdownContent.js  # Re-seed research pages
│   └── syncIqacMarkdownContent.js      # Re-seed IQAC pages
├── uploads/               # User-uploaded files
│   ├── documents/         # Department docs (MOUs, publications, etc.)
│   ├── images/            # Uploaded images
│   └── nirf/              # NIRF PDF reports
└── utils/
    ├── dbInit.js          # Auto-seeds pages from allNavPages.js
    └── departmentMap.js   # Slug ↔ department name mapping
```

## Environment Variables

See `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
JWT_SECRET=<random-string>
ADMIN_JWT_SECRET=<random-string>
```

## API Routes

All prefixed with `/api`:

| Route | Auth | Description |
|-------|------|-------------|
| `/api/auth` | — | Login, register, verify token |
| `/api/pages` | Read: public, Write: admin | CMS page content by pageId |
| `/api/departments` | Read: public, Write: admin | Department CRUD |
| `/api/faculty` | Read: public, Write: admin | Faculty CRUD |
| `/api/news` | Read: public, Write: admin | News articles |
| `/api/events` | Read: public, Write: admin | College events |
| `/api/notices` | Read: public, Write: admin | Notices & announcements |
| `/api/placements` | Read: public, Write: admin | Stats, records, recruiters |
| `/api/research` | Read: public, Write: admin | Research data |
| `/api/iqac` | Read: public, Write: admin | IQAC documents, members, news |
| `/api/nirf` | Read: public, Write: admin | NIRF rankings & parameters |
| `/api/documents` | Read: public, Write: admin | Document management |
| `/api/upload` | Admin | File uploads (images, PDFs) |

## Auto-Seeding

On first startup, `dbInit.js` reads `allNavPages.js` and seeds all page definitions into the `pagecontents` collection. Pages already in the DB are skipped.

## Sync Scripts

Re-runnable utilities for fresh deployments or DB resets:

```bash
node scripts/syncResearchMarkdownContent.js   # Seed/update research pages
node scripts/syncIqacMarkdownContent.js        # Seed/update IQAC pages
```

These are idempotent — they skip pages that already have content.

## Models

| Model | Collection | Purpose |
|-------|-----------|---------|
| PageContent | pagecontents | CMS-managed page sections (markdown) |
| Department | departments | Department info + sub-page content |
| Faculty | faculties | Faculty profiles |
| User | users | Admin authentication |
| Event | events | College events |
| News | news | News articles |
| Notice | notices | Announcements |
| PlacementStat | placementstats | Year-wise placement data |
| Recruiter | recruiters | Recruiting companies |
| Testimonial | testimonials | Student testimonials |
| Research | researches | Research entries |
| NIRF | nirfs | NIRF ranking data |
| IQACDocument | iqacdocuments | IQAC files |
| IQACMember | iqacmembers | IQAC committee members |
| IQACNews | iqacnews | IQAC announcements |
| Document | documents | Uploaded documents |
| PopupBanner | popupbanners | Homepage popup announcements |
| EditLog | editlogs | Content change audit trail |

## 🤝 Contributing

Follow the MVC pattern when adding new features:
1. Create model in `/models`
2. Create controller in `/controllers`
3. Create routes in `/routes`
4. Import routes in `server.js`
