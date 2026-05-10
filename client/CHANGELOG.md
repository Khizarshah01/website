# Changelog

## 2026-05-10

### Updated Add Section button visibility
- **File:** `client/src/components/GenericContentPage.jsx`
- Modified the conditional rendering of the "Add Markdown Section" button:
  - Previously displayed only on pages with IDs starting with `facilities-`.
  - Updated to display on **all** admin pages when in edit mode, enabling users to add sections universally.
- Change made by replacing the condition:
  ```diff
- {isEditing && pageId?.startsWith("facilities-") && (
+ {isEditing && (
  ```
- This aligns the UI behavior with the requirement to have an "Add Section" button on every admin page.

### Minor formatting adjustments
- **File:** `client/src/components/GenericContentPage.jsx`
- Adjusted line breaks and spacing in several utility functions for better readability (e.g., `resolveAqarTitle`, `buildAqarMarkdownFromItems`, `isLikelyNameColumnHeader`, and `getVisionMissionIcon`).
- These changes do not affect functionality but improve code maintainability.

---

*All changes were made on the development branch and have been validated with no linting or runtime errors.*