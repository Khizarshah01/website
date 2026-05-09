# Document Storage - Server-Side

## Overview
Documents are served from `server/uploads/documents/` using nested, department-first folders.
This keeps department assets organized and lets legacy URLs continue working through the server alias mapper.

## Current Structure

```text
server/uploads/documents/
|-- departments/
|   |-- applied-sciences/
|   |   `-- templates/
|   |-- cse/
|   |   |-- industrial-visits/
|   |   |-- innovative-practices/
|   |   |-- mous/
|   |   |-- syllabus/
|   |   `-- templates/
|   |-- electrical/
|   |   |-- innovative-practices/
|   |   |-- internships/
|   |   |-- mous/
|   |   |-- newsletters/
|   |   |-- publications/
|   |   `-- templates/
|   |-- entc/
|   |   |-- course-outcomes/
|   |   |-- industrial-visits/
|   |   |-- innovative-practices/
|   |   |-- internships/
|   |   |-- magazines/
|   |   |-- mous/
|   |   |-- publications/
|   |   `-- templates/
|   |-- it/
|   |   |-- course-outcomes/
|   |   |-- industrial-visits/
|   |   |-- innovative-practices/
|   |   |-- mous/
|   |   |-- publications/
|   |   |-- services/
|   |   |-- templates/
|   |   `-- ug-projects/
|   |-- mba/
|   |   |-- corporate-leader-speaks/
|   |   |-- industrial-visits/
|   |   |-- mous/
|   |   |-- publications/
|   |   |-- ranking/
|   |   |-- templates/
|   |   `-- workshops/
|   |-- mechanical/
|   |   |-- internships/
|   |   |-- mous/
|   |   |-- publications/
|   |   `-- templates/
|   `-- shared/
|       `-- templates/
|-- institution/
|-- admin-office/
|-- academics/
`-- research/
```

## Routing Notes
- Public static URLs still use `/uploads/documents/...`.
- Department files now live under `/uploads/documents/departments/<department>/<section>/...`.
- Old flat paths such as `/uploads/documents/cse_mous/...` are remapped in `server/utils/documentPathAliases.js`.
- `/api/document-download/download/*` also resolves both old and new document paths.

## Manual Upload Guidance
1. Put new department documents in the correct folder under `server/uploads/documents/departments/`.
2. Keep file paths consistent with the links used in the client data/pages.
3. If you are replacing an older flat-path document, update the client link to the new nested path.

## Key Files
- `server/server.js`
- `server/routes/documentDownloadRoutes.js`
- `server/utils/documentPathAliases.js`
