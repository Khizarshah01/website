const fs = require("fs");
const path = require("path");

const documentsRoot = path.resolve(__dirname, "../uploads/documents");

const leafFolders = [
  "departments/applied-sciences/syllabus",
  "departments/applied-sciences/timetable",
  "departments/applied-sciences/lab-manuals",
  "departments/applied-sciences/results",
  "departments/applied-sciences/notices",
  "departments/cse/syllabus",
  "departments/cse/timetable",
  "departments/cse/lab-manuals",
  "departments/cse/results",
  "departments/cse/ug-projects",
  "departments/cse/notices",
  "departments/electrical/syllabus",
  "departments/electrical/timetable",
  "departments/electrical/lab-manuals",
  "departments/electrical/results",
  "departments/electrical/notices",
  "departments/entc/syllabus",
  "departments/entc/timetable",
  "departments/entc/lab-manuals",
  "departments/entc/results",
  "departments/entc/notices",
  "departments/it/syllabus",
  "departments/it/timetable",
  "departments/it/lab-manuals",
  "departments/it/results",
  "departments/it/notices",
  "departments/mba/syllabus",
  "departments/mba/timetable",
  "departments/mba/results",
  "departments/mba/notices",
  "departments/mechanical/syllabus",
  "departments/mechanical/timetable",
  "departments/mechanical/lab-manuals",
  "departments/mechanical/results",
  "departments/mechanical/notices",
  "departments/shared/academic-calendar",
  "departments/shared/general-notices",
  "academics/syllabus",
  "academics/timetable",
  "academics/results",
  "admin-office/circulars",
  "admin-office/notices",
  "institution/governance",
  "institution/reports",
  "research/nisp",
  "research/phd",
  "research/policy",
  "research/coe",
];

for (const relativeFolder of leafFolders) {
  const folderPath = path.join(documentsRoot, relativeFolder);
  fs.mkdirSync(folderPath, { recursive: true });
  fs.closeSync(fs.openSync(path.join(folderPath, ".gitkeep"), "a"));
}

console.log(`Document folder structure ready: ${leafFolders.length} leaf folders`);
