# Security, Testing, and Code Review Report

Date: 2026-05-10

Scope: Full-stack website review focused on authentication, admin flows, uploads/documents, API protection, dependency posture, build stability, and production hardening.

## Executive Summary

The project received a production-safety hardening pass across the server and client. The highest-risk items fixed were legacy JWT storage in browser `localStorage`, admin API calls manually sending bearer tokens, protected document access not validating the token against an active user, a conversion route missing admin protection, tracked generated JWT secret material, and rich-text HTML sanitization gaps.

The application build and local verification workflow are currently passing. Server dependency audit reports zero vulnerabilities. Client dependency audit has one remaining low-severity advisory from `quill` through `react-quill-new`; registry checks confirmed the latest currently available `react-quill-new` still depends on `quill@2.0.3`, so this should be upgraded when a compatible patched release is available and verified. Server and client `npm audit --audit-level=moderate` checks pass, so there are no currently known moderate, high, or critical dependency advisories in the checked dependency trees.

## Changes Made

### Critical / High Severity Fixes

- Fixed client-side token exposure risk by removing active use of legacy `adminToken` from admin pages, department editing pages, and shared API calls.
- Added centralized cleanup for legacy `adminToken` in [client/src/utils/authStorage.js](client/src/utils/authStorage.js).
- Updated [client/src/utils/apiClient.js](client/src/utils/apiClient.js) to use cookie credentials, strip unsafe default `Authorization` headers, and avoid manually setting `Content-Type` for `FormData`.
- Updated auth initialization in [client/src/hooks/useAuth.jsx](client/src/hooks/useAuth.jsx) so login/register store user session state without persisting JWTs in browser storage.
- Removed JWT token values from login/register JSON responses in [server/controllers/authController.js](server/controllers/authController.js); authentication now relies on the HTTP-only session cookie.
- Removed manual bearer-token request config from admin and editor surfaces including admin dashboards, content managers, document import, markdown editing, NIRF editing, and department pages.
- Fixed stale deleted-token guards in department upload delete helpers so cookie-authenticated file deletion does not crash on undefined `token`.
- Protected document download access in [server/routes/documentDownloadRoutes.js](server/routes/documentDownloadRoutes.js) by validating decoded JWTs against an existing active user before serving protected files.
- Hardened private document metadata access in [server/controllers/documentController.js](server/controllers/documentController.js) by checking that decoded JWTs belong to an existing active user.
- Protected document conversion/import route in [server/routes/convertRoutes.js](server/routes/convertRoutes.js) with authenticated admin/coordinator access control.
- Protected unauthenticated department write routes in [server/routes/departmentRoutes.js](server/routes/departmentRoutes.js) with `protect` and `adminOnly`.
- Protected unauthenticated faculty create/update/delete routes in [server/routes/facultyRoutes.js](server/routes/facultyRoutes.js) with `protect`, `adminOrCoordinator`, and department auto-assignment.
- Added faculty update/delete ownership checks in [server/controllers/facultyController.js](server/controllers/facultyController.js) so coordinators cannot modify another department's faculty records by ID.
- Removed generated secret tracking from Git for `server/.dev-jwt-secret`; the local file remains ignored and should not be committed.
- Removed tracked production client environment file `client/.env.production` from Git tracking while preserving the local file; added the correct ignore rule so deployment environment configuration is not committed going forward.

### Medium Severity Fixes

- Hardened security middleware and server defaults in [server/server.js](server/server.js), including security headers, safer CORS handling, request limiting, upload limiting, NoSQL guard behavior, and static upload cache behavior.
- Added upload-specific CORS allowance for `X-Upload-Category` and `X-Upload-Source-Path` in [server/server.js](server/server.js).
- Added a CSRF origin/referer guard for unsafe `/api` methods in [server/server.js](server/server.js), complementing HTTP-only `SameSite=strict` auth cookies.
- Enabled Express API/auth/upload rate limiters in non-production with relaxed development thresholds instead of fully disabling them.
- Hardened auth cookie security for shared/non-loopback test targets: localhost/127.0.0.1 can still use HTTP for development, but non-loopback HTTP testing should use HTTPS or explicit secure-cookie configuration.
- Updated Helmet usage in [server/server.js](server/server.js) to avoid emitting a second conflicting CSP header; the project custom CSP remains the source of truth.
- Tightened production CSP script policy in [server/server.js](server/server.js) so production no longer permits `unsafe-inline` or `unsafe-eval` scripts; development keeps the relaxed script policy for tooling compatibility.
- Reduced production error-handler stack exposure in [server/server.js](server/server.js) while keeping development diagnostics.
- Reduced raw database/Mongoose error disclosure in [server/controllers/departmentController.js](server/controllers/departmentController.js), [server/controllers/facultyController.js](server/controllers/facultyController.js), [server/controllers/newsController.js](server/controllers/newsController.js), and [server/controllers/noticeController.js](server/controllers/noticeController.js) by returning generic safe API error messages.
- Added shared safe API error response helper in [server/utils/apiErrors.js](server/utils/apiErrors.js).
- Extended generic API error hardening to [server/controllers/documentController.js](server/controllers/documentController.js), [server/controllers/eventController.js](server/controllers/eventController.js), and [server/controllers/galleryController.js](server/controllers/galleryController.js), removing raw `error.message` exposure from those public/admin controller responses.
- Extended generic API error hardening to upload listing/deletion, placement, IQAC, NIRF, research, and page-content controllers so server controller responses no longer expose raw `error.message` details to clients.
- Tightened document ID access in [server/controllers/documentController.js](server/controllers/documentController.js) so inactive/admin-only documents require an active admin session and private documents require an active authenticated session before metadata/download counters can be accessed.
- Tightened event ID access in [server/controllers/eventController.js](server/controllers/eventController.js) so public `GET /api/events/:id` only returns active events.
- Added repeatable server syntax verification via [server/scripts/checkSyntax.js](server/scripts/checkSyntax.js), `npm run check:server`, and `npm run verify`.
- Improved JWT secret handling and development-secret behavior in [server/utils/authSecurity.js](server/utils/authSecurity.js).
- Improved login brute-force protection flow in [server/middleware/authRateLimit.js](server/middleware/authRateLimit.js).
- Strengthened user model role/password handling in [server/models/User.js](server/models/User.js).
- Updated admin creation behavior in [server/scripts/createAdmin.js](server/scripts/createAdmin.js).
- Sanitized rich-text HTML before save/render in [client/src/components/admin/RichTextEditor.jsx](client/src/components/admin/RichTextEditor.jsx) using DOMPurify integration.
- Added shared raw-HTML Markdown sanitization in [client/src/utils/sanitizeMarkdown.js](client/src/utils/sanitizeMarkdown.js).
- Sanitized `rehypeRaw` Markdown render paths in [client/src/components/AdminOfficePageLayout.jsx](client/src/components/AdminOfficePageLayout.jsx), [client/src/components/admin/DocImportModal.jsx](client/src/components/admin/DocImportModal.jsx), and [client/src/components/admin/MarkdownEditor.jsx](client/src/components/admin/MarkdownEditor.jsx).
- Added DOMPurify-based sanitization support for rich text and raw Markdown render paths.
- Replaced browser-side sanitizer imports with lighter [dompurify](client/package.json) usage and removed the extra client `isomorphic-dompurify` dependency to reduce dependency surface and avoid pulling server-oriented sanitizer code into the client bundle.
- Removed unused root-level `mongodb` dependency from [package.json](package.json) and [package-lock.json](package-lock.json); the server continues to use Mongoose from [server/package.json](server/package.json).
- Corrected the root Node/npm engine policy in [package.json](package.json) to match Vite 7 requirements and added [.nvmrc](.nvmrc) with Node `20.19.0` for reproducible local/CI/deployment runtime selection.
- Added matching Node/npm engine policies to [client/package.json](client/package.json) and [server/package.json](server/package.json) so folder-based Vercel/Render-style deployments use the same compatible runtime expectations.
- Added CI verification workflow in [.github/workflows/verify.yml](.github/workflows/verify.yml) to run root verification plus server/client audits at `moderate` severity or higher on pushes and pull requests.

### Low Severity / Reliability Fixes

- Added crash containment with [client/src/components/ErrorBoundary.jsx](client/src/components/ErrorBoundary.jsx).
- Wrapped the app root in the error boundary from [client/src/main.jsx](client/src/main.jsx).
- Added [client/public/robots.txt](client/public/robots.txt) for crawler guidance.
- Updated [.gitignore](.gitignore) to ignore generated dev secrets, build outputs, logs, document uploads, production client environment files, environment files, and temporary files.
- Updated environment examples to remove stale `ADMIN_JWT_SECRET` guidance and document the active `JWT_SECRET` plus `ADMIN_GATE_TOKEN` setup.
- Cleaned a `.gitignore` encoding artifact in the editor-comment line.
- Converted brochure utility scripts from UTF-16LE to UTF-8 so Node can parse them during verification: [server/scripts/convertBrochureToMarkdown.js](server/scripts/convertBrochureToMarkdown.js), [server/scripts/fixBrochureMarkdown.js](server/scripts/fixBrochureMarkdown.js), and [server/scripts/seedBrochurePage.js](server/scripts/seedBrochurePage.js).
- Updated project documentation to describe the hardened HTTP-only cookie authentication flow and current production verification commands.
- Updated README runtime guidance so setup documentation no longer recommends Node 16/18 for a Vite 7 build.
- Updated the main [README.md](README.md) with security status, production checklist, verification commands, and the known remaining Quill advisory.
- Removed a browser-side backend URL debug log from [client/src/config/api.js](client/src/config/api.js) to reduce production console noise and avoid exposing deployment details unnecessarily.

## Files Touched By Area

- Auth/session cleanup: [client/src/utils/authStorage.js](client/src/utils/authStorage.js), [client/src/utils/apiClient.js](client/src/utils/apiClient.js), [client/src/hooks/useAuth.jsx](client/src/hooks/useAuth.jsx).
- Admin bearer-token removal: files under [client/src/pages/admin](client/src/pages/admin), [client/src/components/admin/DocImportModal.jsx](client/src/components/admin/DocImportModal.jsx), and [client/src/components/admin/MarkdownEditor.jsx](client/src/components/admin/MarkdownEditor.jsx).
- Public/editor token cleanup: [client/src/pages/NIRFRanking.jsx](client/src/pages/NIRFRanking.jsx) and department pages under [client/src/pages/departments](client/src/pages/departments).
- XSS/crash hardening: [client/src/components/admin/RichTextEditor.jsx](client/src/components/admin/RichTextEditor.jsx), [client/src/components/ErrorBoundary.jsx](client/src/components/ErrorBoundary.jsx), [client/src/main.jsx](client/src/main.jsx).
- Raw Markdown XSS hardening: [client/src/utils/sanitizeMarkdown.js](client/src/utils/sanitizeMarkdown.js), [client/src/components/AdminOfficePageLayout.jsx](client/src/components/AdminOfficePageLayout.jsx), [client/src/components/admin/DocImportModal.jsx](client/src/components/admin/DocImportModal.jsx), [client/src/components/admin/MarkdownEditor.jsx](client/src/components/admin/MarkdownEditor.jsx).
- Server auth/API hardening: [server/server.js](server/server.js), [server/routes/documentDownloadRoutes.js](server/routes/documentDownloadRoutes.js), [server/routes/convertRoutes.js](server/routes/convertRoutes.js), [server/models/User.js](server/models/User.js), [server/scripts/createAdmin.js](server/scripts/createAdmin.js).
- CSRF/header/error hardening: [server/server.js](server/server.js).
- Generic API error hardening: [server/utils/apiErrors.js](server/utils/apiErrors.js), [server/controllers/departmentController.js](server/controllers/departmentController.js), [server/controllers/facultyController.js](server/controllers/facultyController.js), [server/controllers/newsController.js](server/controllers/newsController.js), [server/controllers/noticeController.js](server/controllers/noticeController.js), [server/controllers/documentController.js](server/controllers/documentController.js), [server/controllers/eventController.js](server/controllers/eventController.js), [server/controllers/galleryController.js](server/controllers/galleryController.js), [server/controllers/uploadController.js](server/controllers/uploadController.js), [server/controllers/placementController.js](server/controllers/placementController.js), [server/controllers/iqacController.js](server/controllers/iqacController.js), [server/controllers/nirfController.js](server/controllers/nirfController.js), [server/controllers/researchController.js](server/controllers/researchController.js), [server/controllers/pageContentController.js](server/controllers/pageContentController.js).
- Verification tooling: [package.json](package.json), [server/package.json](server/package.json), [server/scripts/checkSyntax.js](server/scripts/checkSyntax.js).
- Security documentation alignment: [README.md](README.md), [README_COMPREHENSIVE.md](README_COMPREHENSIVE.md), [server/README.md](server/README.md).
- Client config hygiene: [client/src/config/api.js](client/src/config/api.js).
- Document access hardening: [server/controllers/documentController.js](server/controllers/documentController.js).
- Auth response hardening: [server/controllers/authController.js](server/controllers/authController.js).
- Department/faculty API hardening: [server/routes/departmentRoutes.js](server/routes/departmentRoutes.js), [server/routes/facultyRoutes.js](server/routes/facultyRoutes.js), [server/controllers/facultyController.js](server/controllers/facultyController.js).
- Dependency and secret handling: [client/package.json](client/package.json), [client/package-lock.json](client/package-lock.json), [server/package.json](server/package.json), [server/package-lock.json](server/package-lock.json), [.gitignore](.gitignore), `server/.dev-jwt-secret` removed from Git tracking.
- Root dependency cleanup: [package.json](package.json), [package-lock.json](package-lock.json).
- Runtime version alignment: [package.json](package.json), [package-lock.json](package-lock.json), [client/package.json](client/package.json), [client/package-lock.json](client/package-lock.json), [server/package.json](server/package.json), [server/package-lock.json](server/package-lock.json), [.nvmrc](.nvmrc), [README.md](README.md), [README_COMPREHENSIVE.md](README_COMPREHENSIVE.md).
- CI hardening: [.github/workflows/verify.yml](.github/workflows/verify.yml).
- External workflow-report follow-up: [server/utils/authSecurity.js](server/utils/authSecurity.js), [server/server.js](server/server.js), [server/controllers/documentController.js](server/controllers/documentController.js), [server/controllers/eventController.js](server/controllers/eventController.js), [README.md](README.md), [.env.example](.env.example), [server/.env.example](server/.env.example).
- Production environment exposure cleanup: `client/.env.production` removed from Git tracking and kept ignored locally.
- Environment examples: [.env.example](.env.example), [server/.env.example](server/.env.example).

## Verification Performed

- `npm run build` from the project root completed successfully.
- `npm run build` in the client completed successfully after client token cleanup.
- `npm audit --json` in the server reported zero vulnerabilities.
- `npm audit --json` in the client reported one low-severity advisory from `quill`.
- `node --check server.js` completed successfully.
- Requiring `server/routes/documentDownloadRoutes.js` completed successfully.
- `rg` search confirmed `adminToken` only remains as the intentional legacy cleanup key in [client/src/utils/authStorage.js](client/src/utils/authStorage.js).
- `node --check` passed for updated auth, document, department, faculty, and route files touched during the access-control pass.
- Server write-route scan confirmed department and faculty mutation routes now include protection; remaining intentionally public POST routes are login, logout, admin-gate verification, registration bootstrap, and download-count incrementing.
- Final `npm run build` after the department/faculty/document hardening pass completed successfully.
- `rg` scan confirmed every remaining `rehypeRaw` Markdown render path now passes content through `sanitizeMarkdownHtml`.
- Final `npm run build` after raw Markdown XSS hardening completed successfully.
- `node --check` passed for [server/server.js](server/server.js), [server/controllers/departmentController.js](server/controllers/departmentController.js), [server/controllers/facultyController.js](server/controllers/facultyController.js), [server/controllers/newsController.js](server/controllers/newsController.js), and [server/controllers/noticeController.js](server/controllers/noticeController.js) after the CSP/error-disclosure pass.
- Final `npm run build` after CSP tightening, generic error response hardening, and sanitizer dependency cleanup completed successfully.
- `rg` scan confirmed `isomorphic-dompurify` no longer remains in client package files or client source imports.
- `node --check` passed for [server/utils/apiErrors.js](server/utils/apiErrors.js), [server/controllers/documentController.js](server/controllers/documentController.js), [server/controllers/eventController.js](server/controllers/eventController.js), and [server/controllers/galleryController.js](server/controllers/galleryController.js).
- `rg` scan confirmed document, event, and gallery controllers no longer expose raw `error.message` responses.
- Final `npm run build` after document/event/gallery error-response hardening completed successfully.
- `node --check` passed for [server/controllers/uploadController.js](server/controllers/uploadController.js), [server/controllers/placementController.js](server/controllers/placementController.js), [server/controllers/iqacController.js](server/controllers/iqacController.js), [server/controllers/nirfController.js](server/controllers/nirfController.js), [server/controllers/researchController.js](server/controllers/researchController.js), and [server/controllers/pageContentController.js](server/controllers/pageContentController.js).
- `rg` scan confirmed no remaining server controller responses expose raw `error.message` values.
- Final `npm run build` after the full controller error-disclosure cleanup completed successfully.
- Initial `npm run check:server` found three UTF-16LE brochure utility scripts that Node could not parse; those scripts were converted to UTF-8.
- `npm run check:server` now passes and checks 104 server JavaScript files.
- `npm run verify` now passes, running the server syntax check followed by the production build.
- `npm view` checks confirmed `react-quill-new@3.8.3` is the latest currently available package and still depends on `quill~2.0.3`; `quill@2.0.3` is also the latest currently published version.
- `npm audit fix --dry-run --json` did not identify a safe automatic package change for the remaining client `quill` advisory.
- Final audit rerun confirmed server remains at zero vulnerabilities and client remains at one low-severity indirect `quill` advisory.
- Documentation scan found outdated `localStorage` JWT guidance; README documentation was updated to match HTTP-only cookie authentication.
- [client/public/robots.txt](client/public/robots.txt) now disallows `/admin`, `/admin/`, and `/api/` crawling.
- Direct HTML rendering scan confirmed remaining `dangerouslySetInnerHTML` and `rehypeRaw` render paths pass content through DOMPurify or `sanitizeMarkdownHtml`.
- Client runtime scan confirmed no remaining `console.log` or `debugger` statements in [client/src](client/src) after removing the backend URL debug log.
- Final `npm run verify` after client config cleanup completed successfully.
- `git check-ignore` confirmed `.env`, `server/.env`, `server/.dev-jwt-secret`, and `client/.env.production` are ignored after the environment-file cleanup.
- Root `npm uninstall mongodb` removed unused MongoDB driver packages from the root install surface; root npm audit reported zero vulnerabilities.
- Local package engine check confirmed Vite 7 requires Node `^20.19.0 || >=22.12.0`; root engines were updated from Node 18/npm 9 to the compatible runtime policy.
- Final `npm run verify` after environment-file untracking and root dependency cleanup completed successfully.
- `npm install --package-lock-only` completed successfully after the engine update and root audit reported zero vulnerabilities.
- Final `npm run verify` after runtime engine alignment completed successfully.
- Client and server `npm install --package-lock-only` completed after adding subproject engines; server audit remained zero vulnerabilities and client remained at the known single low-severity Quill advisory.
- Final `npm run verify` after adding client/server engine policies completed successfully.
- Added GitHub Actions workflow that verifies build/server syntax and runs dependency audits with `--audit-level=moderate`, so the known low Quill advisory stays reported without blocking CI.
- Final registry-backed `npm audit --audit-level=moderate` verification passed for both server and client; server reported zero vulnerabilities and client reported only the known low-severity indirect Quill advisory.
- Reviewed external workflow report `workflow-report-host-docker-internal_shannon-1778423176889.md`; follow-up fixes were applied for non-production rate limiting, non-loopback auth-cookie transport hardening, document ID access control, and inactive event ID enumeration.
- Final `npm run verify` after the workflow-report follow-up passed, including the 104-file server syntax check and production client build.
- Cookie security sanity check confirmed localhost development keeps `Secure=false` for HTTP compatibility, while `host.docker.internal`/non-loopback testing resolves to `Secure=true`.

## External Workflow Report Follow-Up

- AUTH-VULN-01 Transport Exposure: Mitigated. Auth cookies remain HTTP-only and now default to `Secure` for production and non-loopback test targets; insecure cookies are only allowed by default for localhost/127.0.0.1 development to avoid breaking normal local work.
- AUTH-VULN-02 Missing Abuse Defenses: Mitigated. Express auth/API/upload rate limiters are no longer disabled in development, and the DB-backed failed-login limiter remains active across environments.
- AUTHZ-VULN-01 Document IDOR: Mitigated for private/admin/inactive records. Public active documents remain intentionally public; private documents require an active authenticated user, and inactive/admin-only documents require an active admin session.
- AUTHZ-VULN-02 Event IDOR: Mitigated for inactive records. Public active events remain intentionally public, while guessed IDs for inactive events now return not found from the public detail endpoint.
- Non-findings confirmed by the workflow report: SSRF and XSS were not confirmed; prior DOMPurify-based XSS hardening remains in place.

## Remaining Risks

- Low: `quill@2.0.3` remains flagged through `react-quill-new`; the latest checked `react-quill-new@3.8.3` still depends on `quill~2.0.3`, so upgrade when a compatible patched release is available and regression-test the editor.
- Medium: A first-party server syntax check now exists, but full linting and automated unit/integration test coverage are still not available.
- Medium: Full live database CRUD, admin workflow, and upload E2E testing still needs a running production-like MongoDB and seeded admin accounts.
- Medium: Lighthouse/Core Web Vitals testing still needs the site running in a browser environment with production assets.
- Low: Production build shows several large lazy chunks/assets, including department pages and editor-related bundles. They are below Vite's default warning threshold in this run, but should be reviewed with Lighthouse and route-level usage data before deeper code-splitting.
- Medium: CSP script policy is tightened for production, but `style-src 'unsafe-inline'` and broad image/connect allowances still need live UI validation before further tightening.
- High if unresolved before deployment: ensure `server/.dev-jwt-secret` and any historical secrets are removed from Git history before publishing a public repository or production release.
- Medium if unresolved before deployment: rotate/recreate deployment environment values if `client/.env.production` or other environment files were ever pushed to a shared remote, even if current client values are not server secrets.
- Low: local verification is currently running on Node 24/npm 11, while `.nvmrc` pins Node 20.19.0 for reproducible deployment. CI should run with `.nvmrc`/declared engines before final release.

## Current Completion Status

All safe local code hardening, dependency cleanup, build verification, syntax verification, README updates, and report updates from this pass are complete. The remaining items are not code edits I can honestly mark solved without a production-like environment: live MongoDB/admin E2E testing, browser Lighthouse/Core Web Vitals testing, final CSP validation in the deployed UI, upstream Quill patch adoption, and Git history/credential rotation if secrets were ever pushed before this cleanup.

## Production Hardening Recommendations

- Set a strong production `JWT_SECRET` through secure environment management only.
- Use HTTPS-only deployment with secure cookies enabled behind a trusted proxy.
- Configure production CORS to exact trusted origins only.
- Add CI checks for build, audit, lint, and tests on every pull request.
- Add Playwright or Cypress coverage for login, admin role access, content CRUD, document upload/download, and public navigation.
- Add server-side validation schemas for every create/update route if any route still accepts broad request bodies.
- Rotate any credentials that were ever committed or exposed in local/generated files.
- Add monitoring for login failures, upload errors, 5xx responses, and admin write operations.
