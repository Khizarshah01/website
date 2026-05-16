# Security Code Review And Remediation Plan

Date: 2026-05-15  
Scope: `server/`, `client/`, auth middleware, upload/document paths, route guards, error handling, security headers

## Implemented Security Measures

| # | Measure Name | Where Implemented | Protects Against | How It Works |
|---|---|---|---|---|
| 1 | JWT secret strength enforcement | `server/utils/authSecurity.js` (`getJwtSecret`, `isWeakSecret`) | Token forgery from weak secrets | Rejects weak/missing `JWT_SECRET` in production; only uses generated dev fallback in non-prod. |
| 2 | Hardened auth cookies | `server/utils/authSecurity.js` (`getAuthCookieOptions`) | Token theft via JS, weaker CSRF posture, plaintext cookie transit | Sets `httpOnly`, `sameSite`, context-aware `secure`, `path`, `maxAge`. |
| 3 | JWT auth middleware | `server/middleware/authMiddleware.js` (`protect`) | Unauthorized API access | Extracts token, verifies signature/expiry, checks blacklist, user existence, and `isActive`. |
| 4 | RBAC (admin/superadmin/coordinator) | `server/middleware/authMiddleware.js` + route usage in `server/routes/*.js` | Privilege escalation | Role-specific middleware gates mutation/admin endpoints. |
| 5 | Department-level authorization | `server/middleware/authMiddleware.js` (`checkDepartmentAccess`, `verifyDocDepartment`), used in faculty/research routes | IDOR / cross-department tampering | Forces coordinator operations to their department and verifies ownership on update/delete. |
| 6 | Coordinator approval workflow | `server/controllers/pageContentController.js`, `server/models/PageApproval.js` | Unauthorized publication or direct coordinator publish | Coordinator edits are staged as pending; only SuperAdmin can approve/reject. |
| 7 | Password hashing | `server/models/User.js` (`pre("save")`, bcrypt) | Password disclosure on DB compromise | Salts and hashes password before persistence. |
| 8 | Password field suppression | `server/models/User.js` (`select: false`) | Accidental secret exposure in responses | Password omitted unless explicitly selected. |
| 9 | Password policy validation | `server/utils/passwordPolicy.js` + auth controller calls | Weak-password compromise | Enforces length, upper/lowercase, numeric, and special character constraints. |
| 10 | Multi-layer login abuse protection | `server/controllers/authController.js`, `server/middleware/authRateLimit.js`, `server/models/LoginAttempt.js`, `server/server.js` | Brute force / credential stuffing | In-memory account lockout + DB-backed IP/email failure tracking with TTL + route rate limits + `Retry-After`. |
| 11 | Logout token revocation | `server/utils/tokenBlacklist.js`, checked in auth/document flows | Reuse of logged-out tokens | Blacklists token post-logout and blocks it in auth checks. |
| 12 | CORS allowlist with credentialed requests | `server/server.js` (CORS config) | Browser-based cross-origin misuse | Allows only configured/recognized origins and private-network development origins. |
| 13 | CSRF origin/referrer guard | `server/server.js` (`csrfOriginGuard`) | CSRF on mutating API methods | Blocks non-GET API calls when `Origin`/`Referer` is not allowed. |
| 14 | Security headers + CSP | `server/server.js` (`securityHeaders`) + `helmet` | XSS, clickjacking, MIME sniffing, data leakage | Emits CSP and key hardening headers (`nosniff`, frame/referrer/permissions policies). |
| 15 | API/auth/upload rate limiting | `server/server.js` (`apiRateLimiter`, `authRateLimiter`, `uploadRateLimiter`) | Abuse, DoS, auth spraying, upload flood | Applies different windows and thresholds per path class. |
| 16 | NoSQL injection key filtering | `server/middleware/nosqlGuard.js` | Mongo operator injection | Rejects keys starting with `$`, containing `.`, or null byte across params/query/body. |
| 17 | Upload content/type/size validation | `server/controllers/uploadController.js` + multer route setup | Malicious file upload, spoofed extension/MIME | Enforces allowed MIME/extensions, file size limits, and magic-byte checks for image/PDF. |
| 18 | Upload filename and path sanitization | `server/controllers/uploadController.js` (`sanitizeOriginalName`, `sanitizeStoredFilename`, `resolveUploadPath`) | Path traversal / unsafe file names | Normalizes/sanitizes names and ensures resolved paths remain under upload root. |
| 19 | Document path traversal protection | `server/utils/documentPathAliases.js` | Arbitrary filesystem reads | Resolves requested path under known document roots and rejects escapes. |
| 20 | Protected document prefix auth | `server/routes/documentDownloadRoutes.js` (`ensureProtectedPathAccess`) | Unauthorized access to sensitive document trees | Requires valid active-user token for protected top-level document prefixes. |
| 21 | Safe error abstraction | `server/utils/apiErrors.js` + global error handler in `server/server.js` | Internal info leakage | Returns generic user-facing errors while handling validation/cast cases safely. |
| 22 | Schema-level validation | Models in `server/models/*.js` (required/enums/match/validators) | Invalid or unsafe data persistence | Mongoose constraints validate shape and allowed values server-side. |
| 23 | Frontend HTML sanitization | `client/src/utils/sanitizeMarkdown.js`, `client/src/components/admin/RichTextEditor.jsx`, `client/src/components/admin/EditableText.jsx`, `client/src/components/GenericContentPage.jsx` | Stored/reflected XSS | Sanitizes rendered HTML with DOMPurify before injection. |
| 24 | Reverse-tabnabbing mitigation | `client/src/components/AdminOfficePageLayout.jsx`, `client/src/components/GenericContentPage.jsx` | `window.opener` abuse on external links | Uses `rel="noopener noreferrer"` for `target="_blank"` links. |
| 25 | Repo secret hygiene | `.gitignore` | Accidental secret commit | Ignores `.env*` and `server/.dev-jwt-secret`. |

## Remediation Plan (Prioritized)

### Critical

| ID | Gap | Risk | Remediation | File Targets | Validation |
|---|---|---|---|---|---|
| C1 | Token blacklist is in-memory only | Logout revocation lost on restart/multi-instance | Move revocation list to Redis or DB with token hash + expiry; check in auth middleware | `server/utils/tokenBlacklist.js`, `server/middleware/authMiddleware.js` | Logout token remains invalid across restarts and instances |
| C2 | CSRF relies on origin/referrer checks only | CSRF bypass risk in edge browser/proxy scenarios | Add CSRF token pattern (double-submit cookie or synchronizer token) for mutating routes | `server/server.js`, auth/client request flow | Mutating requests fail without valid CSRF token |
| C3 | Sensitive files potentially reachable via static `/uploads` path | Private document bypass | Enforce private/public split at storage path level or remove direct static serving for protected prefixes | `server/server.js`, `server/routes/documentDownloadRoutes.js`, upload strategy | Protected docs inaccessible via direct URL without auth |
| C4 | Coordinator file deletion scope not department-bound | Cross-department file deletion (IDOR) | Store uploader metadata (dept/user) and enforce ownership/admin checks on delete | `server/controllers/uploadController.js`, storage metadata, routes | Coordinator cannot delete files outside own dept |

### High

| ID | Gap | Risk | Remediation | File Targets | Validation |
|---|---|---|---|---|---|
| H1 | No malware scanning for uploaded files | Malicious payload distribution | Add AV/CDR pipeline (ClamAV, cloud scanning, async quarantine) before publish | `server/controllers/uploadController.js` + infra | Known EICAR/malicious samples are blocked |
| H2 | Public first-user bootstrap registration | Rogue superadmin creation if deployment starts empty | Disable public bootstrap in production; require one-time setup token or CLI-only init | `server/controllers/authController.js`, env policy | Cannot create first admin without setup token/manual bootstrap |
| H3 | No MFA for privileged roles | Higher account takeover impact | Implement TOTP/WebAuthn for SuperAdmin/Admin login | auth flow server+client | Admin login requires second factor |
| H4 | No refresh-token rotation/session management | Token replay window | Introduce short-lived access tokens + rotating refresh tokens + session revocation store | auth controller/middleware/client | Stolen old refresh token cannot be reused |

### Medium

| ID | Gap | Risk | Remediation | File Targets | Validation |
|---|---|---|---|---|---|
| M1 | NoSQL guard does not filter prototype keys | Prototype pollution edge cases | Block `__proto__`, `prototype`, `constructor` keys recursively | `server/middleware/nosqlGuard.js` | Payloads containing those keys are rejected |
| M2 | Broad private-network origin allowance | Excessive trust boundary in prod | Disable private-network wildcard unless explicitly enabled by env in production | `server/server.js` | Only explicit production origins accepted |
| M3 | Some endpoints allow unbounded or weakly bounded query limits | Resource exhaustion | Clamp pagination (`limit`, `page`) globally or per controller | multiple controllers (research/news/etc.) | Large limit requests are capped server-side |
| M4 | Mixed error styles across controllers | Inconsistent leakage/control | Standardize all controllers on shared `sendSafeError` helper | `server/controllers/*.js` | Uniform response contract and safe messages |

## 30-60-90 Day Execution Plan

| Timeline | Deliverables |
|---|---|
| 0-30 days | C1, C2, C4 fixes; lock bootstrap registration; add pagination clamps |
| 31-60 days | C3 protected file architecture, AV scanning rollout (H1), unify safe error handling |
| 61-90 days | MFA (H3), refresh-token/session redesign (H4), harden NoSQL guard (M1), tighten CORS strategy (M2) |

## Verification Checklist

| Check | Status |
|---|---|
| Unauthorized requests to admin routes return 401/403 | Pending |
| Brute-force attempts receive 429 and lockout behavior | Pending |
| Logged-out token denied after restart | Pending (requires C1) |
| Protected docs inaccessible without auth via all paths | Pending (requires C3) |
| Coordinator cannot modify/delete other department assets/data | Pending |
| XSS payloads in richtext/markdown are sanitized on render | Pending |
| Upload policy blocks spoofed MIME/extension files | Pending |
| CSRF token required on mutating endpoints | Pending (requires C2) |

## Quick Summary (One-Liners)

1. JWT + cookie-based auth with secure cookie flags and strong secret requirements.
2. RBAC with SuperAdmin/Admin/Coordinator and department-level data isolation.
3. Multi-layer brute-force defenses on login (rate limit, TTL attempt tracking, lockout).
4. CSRF-origin guard and strict CORS allowlist for browser requests.
5. Helmet + custom CSP and hardening headers across responses.
6. NoSQL injection key filtering for body/query/params.
7. Hardened upload pipeline with size/type/magic-byte validation and sanitized paths.
8. Protected document access checks for sensitive path prefixes.
9. DOMPurify-based HTML sanitization in client rendering paths.
10. Secrets excluded from source control via `.gitignore`.
