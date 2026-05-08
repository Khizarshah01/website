# SSGMCE Frontend

React SPA for the SSGMCE college website.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Directory Structure

```
src/
├── components/          # Shared UI components
│   ├── admin/           # Admin panel (MarkdownEditor, EditableText, etc.)
│   ├── GenericContentPage.jsx   # CMS page renderer
│   ├── GenericPage.jsx          # Layout wrapper (header + sidebar + content)
│   ├── Navbar.jsx, Footer.jsx, Layout.jsx
│   ├── *Sidebar.jsx     # Section sidebars (IQAC, Placement, Research, etc.)
│   └── ...              # Cards, charts, document viewers
│
├── pages/
│   ├── Home.jsx, Contact.jsx, Events.jsx, Gallery.jsx
│   ├── about/           # 8 pages (VisionMission, BoardOfDirectors, etc.)
│   ├── academics/       # 11 pages (Syllabus, TimeTable, etc.)
│   ├── activities/      # 17 student club pages
│   ├── admin/           # 22 admin pages (Dashboard, VisualPageEditor, etc.)
│   ├── admissions/      # 13 pages (FeeStructure, Scholarships, etc.)
│   ├── departments/     # 8 department pages
│   ├── documents/       # 12 document category pages
│   ├── facilities/      # Hostel (13), Library (11), Sports (7) sub-pages
│   ├── iqac/            # 14 CMS-editable pages (GenericContentPage)
│   ├── placements/      # 12 CMS-editable pages
│   └── research/        # 15 CMS-editable pages
│
├── contexts/            # EditContext, ThemeContext, PageDataContext
├── hooks/               # useAuth, useFetch, usePageContent, useDepartmentData
├── config/              # adminAccess.js
├── constants/           # navConfig.js
├── data/                # Client-side default data for departments
├── App.jsx              # Main routing
├── main.jsx             # Entry point
└── index.css            # Tailwind directives
```

## Key Patterns

- **GenericContentPage** — Fetches page content by `pageId` from the API, renders Markdown sections with a sidebar. Used by all IQAC, Placement, and Research pages.
- **MarkdownEditor** — Admin inline editor with live preview. Detects bullet-list-of-links and renders them as document card grids; tables render with custom styled components.
- **EditContext** — Toggles edit mode across the app. Admin toolbar appears when logged in.
- **Sidebar components** — Auto-generated navigation from DB section titles (e.g., `IQACSidebar`, `PlacementSidebar`).

## Styling

- Tailwind CSS only (no separate CSS files except `RichTextEditor.css` for Quill)
- Custom SSGMCE color palette (`ssgmce-blue`, `ssgmce-orange`, etc.)
- Mobile-first responsive design
- Framer Motion animations

## Dependencies

| Package | Purpose |
|---------|---------|
| react, react-dom | UI library |
| react-router-dom | Client-side routing |
| axios | HTTP client |
| tailwindcss | Styling |
| react-markdown, remark-gfm | Markdown rendering |
| react-quill | WYSIWYG editor |
| chart.js, recharts | Data visualization |
| framer-motion | Animations |
| react-icons | Icon library |
