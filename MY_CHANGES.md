# My Changes - Current Developer / 2026-05-10

## Summary
Recent work focused on admin-manageable Events and Gallery content, upload/image URL handling, document path resolution, navbar behavior, deployment/security configuration, and admin save/upload reliability. The git worktree also shows a large repository restructuring commit, so merge review should focus on the scoped `website-main` app paths listed below.

## Changed Files
[ADDED] .github/workflows/deploy.yml
[MODIFIED] client/src/App.jsx
[MODIFIED] client/src/components/Navbar.jsx
[MODIFIED] client/src/components/PDFDocumentViewer.jsx
[MODIFIED] client/src/components/admin/AdminSidebar.jsx
[MODIFIED] client/src/components/admin/EditableImage.jsx
[MODIFIED] client/src/contexts/EditContext.jsx
[MODIFIED] client/src/hooks/useAuth.jsx
[MODIFIED] client/src/pages/Events.jsx
[MODIFIED] client/src/pages/Gallery.jsx
[MODIFIED] client/src/pages/admin/AdminEvents.jsx
[ADDED] client/src/pages/admin/AdminGallery.jsx
[MODIFIED] client/src/pages/documents/DocumentsHub.jsx
[MODIFIED] client/src/pages/placements/PlacementStats.jsx
[MODIFIED] client/src/pages/placements/Recruiters.jsx
[ADDED] client/src/utils/documentPaths.js
[MODIFIED] client/src/utils/apiClient.js
[MODIFIED] client/src/utils/uploadUrls.js
[ADDED] env
[MODIFIED] server/controllers/eventController.js
[ADDED] server/controllers/galleryController.js
[MODIFIED] server/models/Event.js
[ADDED] server/models/EventCategory.js
[ADDED] server/models/GalleryCategory.js
[ADDED] server/models/GalleryItem.js
[MODIFIED] server/package-lock.json
[MODIFIED] server/package.json
[MODIFIED] server/routes/eventRoutes.js
[ADDED] server/routes/galleryRoutes.js
[ADDED] server/scripts/addCareerGuidanceSections.js
[MODIFIED] server/server.js

Note: `git status` reported a clean tree from the active repo, but the current `website-main` files contain additional local fixes in `server/server.js`, `client/src/hooks/useAuth.jsx`, `client/src/contexts/EditContext.jsx`, and `client/src/utils/apiClient.js`. Include these when merging.

## Detailed Changes by Section

### Academics - Departments
- No direct committed content changes were found for department page data in the recent scoped git diff.
- Mechanical and other visual department editors are affected by the admin save/upload reliability fixes:
  - `client/src/contexts/EditContext.jsx`: removed the stale `localStorage.adminToken` pre-save gate so `/api/pages/:pageId` saves use cookie-based auth through `apiClient`.
  - `client/src/utils/apiClient.js`: strips `Bearer null` / `Bearer undefined` headers and removes explicit `Content-Type` for `FormData` so department image uploads can rely on browser multipart boundaries.
  - `server/server.js`: guarded JSON parser skips `multipart/form-data`, accepts literal JSON `null` as `{}`, and returns a clean 400 for malformed JSON bodies.

### Academics - Other Pages
- `client/src/components/Navbar.jsx`: changed top-level dropdown clicks to navigate to the first child route instead of only toggling dropdown state; added submenu cleanup when links are clicked.
- `client/src/components/Navbar.jsx`: adjusted dropdown column sizing and link wrapping to handle long academics/navigation labels more cleanly.
- `client/src/pages/documents/DocumentsHub.jsx`: replaced GitHub media URL / Google viewer construction with local document URL resolution through `getDocumentAssetUrl`.
- `client/src/components/PDFDocumentViewer.jsx`: now resolves PDF URLs through `getDocumentAssetUrl` before opening or downloading.
- `client/src/utils/documentPaths.js`: added `getDocumentAssetUrl(input)` to normalize local `/documents/...`, `/uploads/...`, and external document paths.

### Backend / API
- `server/server.js`: added `helmet` and `express-rate-limit`.
- `server/server.js`: added rate limiters:
  - General API limiter: 100 requests per 15 minutes.
  - Auth limiter: 5 non-GET auth requests per 15 minutes.
  - Upload limiter: 20 uploads per hour.
- `server/server.js`: mounted new gallery API at `app.use("/api/gallery", galleryRoutes)`.
- `server/server.js`: added guarded JSON middleware for multipart and null-body tolerance.
- `server/controllers/eventController.js`: reworked event handling around dynamic categories, validation, date parsing, fallback category creation, and admin/public list responses.
- `server/routes/eventRoutes.js`: added routes:
  - `GET /api/events/admin/all`
  - `GET /api/events/categories`
  - `GET /api/events/categories/admin/all`
  - `POST /api/events/categories`
  - `PUT /api/events/categories/:id`
  - `DELETE /api/events/categories/:id`
- `server/models/Event.js`: removed fixed category enum and changed default category to `Other`.
- `server/models/EventCategory.js`: added schema with `name`, `normalizedName`, `order`, and `isActive`, including pre-validation normalization.
- `server/controllers/galleryController.js`: added CRUD and category management for gallery images.
- `server/routes/galleryRoutes.js`: added routes:
  - `GET /api/gallery`
  - `GET /api/gallery/admin/all`
  - `POST /api/gallery`
  - `PUT /api/gallery/:id`
  - `DELETE /api/gallery/:id`
  - `GET /api/gallery/categories`
  - `GET /api/gallery/categories/admin/all`
  - `POST /api/gallery/categories`
  - `PUT /api/gallery/categories/:id`
  - `DELETE /api/gallery/categories/:id`
- `server/models/GalleryItem.js`: added gallery item schema with title, category, image URL, order, and active state.
- `server/models/GalleryCategory.js`: added gallery category schema with name normalization, order, and active state.

### Admin Panel
- `client/src/pages/admin/AdminEvents.jsx`: replaced simple event form/list with a full event manager:
  - Separate event and category state.
  - Category manager with create/edit/delete.
  - Event filtering by category.
  - Image upload with `/upload/image`.
  - Delete confirmations and separate loading states.
  - Uses `resolveUploadedAssetUrl` for uploaded event images.
- `client/src/pages/admin/AdminGallery.jsx`: added a new Gallery Images admin page:
  - Image CRUD with title, category, image URL, order, and active state.
  - Category CRUD with protected `Other` fallback category.
  - Category filters and image counts.
  - Image upload via `/upload/image`.
- `client/src/App.jsx`: registered `/admin/gallery` route.
- `client/src/components/admin/AdminSidebar.jsx`: added Gallery item under CMS Management.
- `client/src/components/admin/EditableImage.jsx`: changed failed image handling to hide broken images or swap to fallback instead of keeping an `imageLoadFailed` state.
- `client/src/hooks/useAuth.jsx`: logout now posts `{}` instead of `null`.
- `client/src/contexts/EditContext.jsx`: visual editor saves now use cookie auth through `apiClient` instead of requiring legacy `adminToken`.
- `client/src/utils/apiClient.js`: added request interceptor to remove invalid legacy bearer headers and let `FormData` uploads set multipart headers automatically.

### Other Changes
- `client/src/pages/Events.jsx`: updated public events page to consume revised event/category data and uploaded asset URLs.
- `client/src/pages/Gallery.jsx`: updated public gallery page to consume backend gallery categories/items.
- `client/src/pages/placements/PlacementStats.jsx`: replaced direct placement stats API/PDF rendering with CMS page content from `/api/pages/placements-statistics`, rendering markdown sections.
- `client/src/pages/placements/Recruiters.jsx`: replaced recruiter API/PDF rendering with CMS page content from `/api/pages/placements-recruiters`, rendering markdown sections.
- `client/src/utils/uploadUrls.js`: added support for legacy bare upload filenames like `image-...jpg` or `upload-...png` by resolving them to `/uploads/images/...`.
- `.github/workflows/deploy.yml`: added SSH deploy workflow that pulls latest code, installs backend deps, restarts PM2 backend, installs frontend deps, writes empty `VITE_BACKEND_URL`, and runs client build.
- `server/scripts/addCareerGuidanceSections.js`: added one-off MongoDB migration script to create/update the `placements-career` page with an `activity-report` markdown section.

## New Components / Functions Added
- `client/src/pages/admin/AdminGallery.jsx`
- `client/src/utils/documentPaths.js`
- `getDocumentAssetUrl(input)` in `client/src/utils/documentPaths.js`
- `apiClient` request interceptor in `client/src/utils/apiClient.js`
- Event category helpers in `server/controllers/eventController.js`:
  - `normalizeCategoryName`
  - `normalizeCategoryPayload`
  - `ensureFallbackCategory`
  - `ensureInitialCategories`
  - `ensureCategoryExists`
  - `escapeRegExp`
- Event category controller actions:
  - `getEventCategories`
  - `getAdminEventCategories`
  - `createEventCategory`
  - `updateEventCategory`
  - `deleteEventCategory`
- `server/controllers/galleryController.js`
- `server/models/EventCategory.js`
- `server/models/GalleryCategory.js`
- `server/models/GalleryItem.js`
- `server/routes/galleryRoutes.js`
- `server/scripts/addCareerGuidanceSections.js`

## Dependencies Added / Removed
- Added backend dependency: `helmet` (`^8.1.0`)
- Added backend dependency: `express-rate-limit` (`^8.5.1`)
- `server/package-lock.json` also updated transitive `ip-address` from `10.1.0` to `10.2.0`.
- No client package dependency changes were found in the scoped recent diff.

## Known Issues / Incomplete Work
- `env` contains real-looking MongoDB credentials and weak placeholder JWT secrets. This should not be committed as-is; move secrets to deployment secrets or `.env` files excluded from git.
- Current git detection is unusual: `git -C website-main rev-parse --show-toplevel` resolved to `D:/SSGMCE Website/website-gaurav`, and `git status` did not show the current local edits in `website-main`. Verify the correct worktree before merging or committing.
- Several admin upload call sites still explicitly pass `Authorization: Bearer ${localStorage.getItem("adminToken")}`. The new `apiClient` interceptor mitigates `Bearer null`, but a future cleanup should remove these legacy headers from individual components.
- Events and Gallery category deletion moves related records to `Other`; verify teammate changes do not expect old hard-coded event categories.
- The backend JSON parser now returns a clean 400 for malformed JSON. If any client sends invalid JSON intentionally, it will need adjustment.

## Merge Notes
- High-conflict files likely:
  - `client/src/components/Navbar.jsx`
  - `client/src/pages/admin/AdminEvents.jsx`
  - `client/src/pages/Events.jsx`
  - `client/src/pages/Gallery.jsx`
  - `server/server.js`
  - `server/controllers/eventController.js`
  - `server/routes/eventRoutes.js`
  - `client/src/utils/apiClient.js`
- Schema/API compatibility areas:
  - Event categories are now dynamic and backed by `EventCategory`; do not restore the old `Event.category` enum.
  - Gallery now has a full backend model/controller/routes; avoid merging with any frontend-only gallery implementation without reconciling APIs.
  - Admin auth has moved toward cookie-based auth; do not reintroduce hard dependency on `localStorage.adminToken` for visual editor saves.
  - Upload routes should continue using multer and should not be parsed by global JSON middleware.
- Repository structure warning:
  - Recent git history includes a large commit that removed/synchronized sibling project copies such as `SSGMCE Latest` and `website-prajwal`. When comparing with another developer, focus on the active `website-main` app files unless the merge intentionally includes repository cleanup.
