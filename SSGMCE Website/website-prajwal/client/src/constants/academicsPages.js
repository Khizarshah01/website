export const ACADEMICS_PAGE_LINKS = [
  { path: "/academics/planner", label: "Academic Planner & Calendar" },
  { path: "/academics/teaching", label: "Teaching Learning Process" },
  { path: "/academics/timetable", label: "Central Time Table" },
  { path: "/academics/rules", label: "Rules & Regulations" },
  { path: "/academics/syllabus", label: "Schemes & Syllabus" },
  { path: "/academics/incentive", label: "Incentive Marks Scheme" },
  { path: "/academics/marks", label: "Sessional Marks Evaluation" },
  { path: "/academics/rubrics", label: "Rubrics" },
  { path: "/academics/innovative", label: "Innovative Practices" },
  { path: "/academics/notices", label: "Notice for Students" },
  { path: "/academics/reports", label: "Annual Reports" },
];

export const ACADEMICS_PAGE_LABEL_BY_ROUTE = ACADEMICS_PAGE_LINKS.reduce(
  (acc, page) => {
    acc[page.path] = page.label;
    return acc;
  },
  {},
);

export const ACADEMICS_PAGE_ORDER_BY_ROUTE = ACADEMICS_PAGE_LINKS.reduce(
  (acc, page, index) => {
    acc[page.path] = index;
    return acc;
  },
  {},
);

export const isAcademicsWebsiteRoute = (route = "") =>
  Object.prototype.hasOwnProperty.call(ACADEMICS_PAGE_LABEL_BY_ROUTE, route);

export const academicsPathToPageId = (path = "") =>
  String(path || "").replace(/^\//, "").replace(/\//g, "-");

export const ACADEMICS_EDITABLE_PAGES = ACADEMICS_PAGE_LINKS.map((page) => ({
  ...page,
  pageId: academicsPathToPageId(page.path),
}));
