const path = require("path");
const fs = require("fs");

const LEGACY_DOCUMENT_PREFIXES = [
  ["cse-syllabus", "departments/cse/syllabus"],
  ["cse_industrial_visits", "departments/cse/industrial-visits"],
  ["cse_innovative", "departments/cse/innovative-practices"],
  ["cse_mous", "departments/cse/mous"],
  ["electrical_innovative", "departments/electrical/innovative-practices"],
  ["electrical_internships", "departments/electrical/internships"],
  ["electrical_mous", "departments/electrical/mous"],
  ["electrical_newsletters", "departments/electrical/newsletters"],
  ["electrical_patents", "departments/electrical/publications"],
  ["electrical_publications", "departments/electrical/publications"],
  ["entc", "departments/entc"],
  ["entc_course_outcomes", "departments/entc/course-outcomes"],
  ["entc_innovative", "departments/entc/innovative-practices"],
  ["entc_internships", "departments/entc/internships"],
  ["entc_mous", "departments/entc/mous"],
  ["entc_publications", "departments/entc/publications"],
  ["it", "departments/it"],
  ["it_course_outcomes", "departments/it/course-outcomes"],
  ["it_innovative", "departments/it/innovative-practices"],
  ["it_mous", "departments/it/mous"],
  ["it_publications", "departments/it/publications"],
  ["it_services", "departments/it/services"],
  ["mba", "departments/mba"],
  ["mba_corporate_leader_speaks", "departments/mba/corporate-leader-speaks"],
  ["mba_mous", "departments/mba/mous"],
  ["mba_publications", "departments/mba/publications"],
  ["mba_ranking", "departments/mba/ranking"],
  ["mba_workshops", "departments/mba/workshops"],
  ["mech_internships", "departments/mechanical/internships"],
  ["mech_mous", "departments/mechanical/mous"],
  ["mech_publications", "departments/mechanical/publications"],
  ["pride_templates/cse_placement_details_template.docx", "departments/shared/templates/placement_details_template.docx"],
  ["pride_templates/ash_toppers_template.docx", "departments/applied-sciences/templates/ash_toppers_template.docx"],
  ["pride_templates/cse_", "departments/cse/templates/cse_"],
  ["pride_templates/electrical_", "departments/electrical/templates/electrical_"],
  ["pride_templates/entc_", "departments/entc/templates/entc_"],
  ["pride_templates/it_", "departments/it/templates/it_"],
  ["pride_templates/mba_", "departments/mba/templates/mba_"],
  ["pride_templates/mechanical_", "departments/mechanical/templates/mechanical_"],
  ["pride_templates/mech_", "departments/mechanical/templates/mech_"],
  ["innovative_practice_templates/cse_template.docx", "departments/cse/templates/cse_template.docx"],
  ["innovative_practice_templates/electrical_template.docx", "departments/electrical/templates/electrical_template.docx"],
  ["innovative_practice_templates/entc_template.docx", "departments/entc/templates/entc_template.docx"],
  ["innovative_practice_templates/it_template.docx", "departments/it/templates/it_template.docx"],
  ["innovative_practice_templates/mba_template.docx", "departments/mba/templates/mba_template.docx"],
  ["innovative_practice_templates/mechanical_template.docx", "departments/mechanical/templates/mechanical_template.docx"],
];

const isPrefixAlias = (legacyPrefix = "") => /(?:^|\/)[^/]+_$/.test(legacyPrefix);

const normalizeDocumentRelativePath = (unsafeRelativePath = "") =>
  String(unsafeRelativePath || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/\/+/g, "/");

const mapLegacyDocumentPath = (unsafeRelativePath = "") => {
  const normalized = normalizeDocumentRelativePath(unsafeRelativePath);

  for (const [legacyPrefix, nextPrefix] of LEGACY_DOCUMENT_PREFIXES) {
    if (normalized === legacyPrefix) {
      return nextPrefix;
    }

    if (normalized.startsWith(`${legacyPrefix}/`)) {
      return `${nextPrefix}${normalized.slice(legacyPrefix.length)}`;
    }

    if (isPrefixAlias(legacyPrefix) && normalized.startsWith(legacyPrefix)) {
      return `${nextPrefix}${normalized.slice(legacyPrefix.length)}`;
    }
  }

  return normalized;
};

const resolveDocumentPathFromRoot = (documentsRoot, unsafeRelativePath = "") => {
  const normalized = normalizeDocumentRelativePath(unsafeRelativePath);
  const resolvedPath = path.resolve(documentsRoot, normalized);

  if (!resolvedPath.startsWith(documentsRoot)) {
    return null;
  }

  return resolvedPath;
};

const resolveExistingDocumentPath = (documentsRoot, unsafeRelativePath = "") => {
  const normalized = normalizeDocumentRelativePath(unsafeRelativePath);
  const directPath = resolveDocumentPathFromRoot(documentsRoot, normalized);

  if (directPath && fs.existsSync(directPath)) {
    return {
      relativePath: normalized,
      absolutePath: directPath,
      usedLegacyAlias: false,
    };
  }

  const aliasedRelativePath = mapLegacyDocumentPath(normalized);
  const aliasedPath = resolveDocumentPathFromRoot(documentsRoot, aliasedRelativePath);

  if (aliasedPath && fs.existsSync(aliasedPath)) {
    return {
      relativePath: aliasedRelativePath,
      absolutePath: aliasedPath,
      usedLegacyAlias: aliasedRelativePath !== normalized,
    };
  }

  return null;
};

module.exports = {
  mapLegacyDocumentPath,
  normalizeDocumentRelativePath,
  resolveDocumentPathFromRoot,
  resolveExistingDocumentPath,
};
