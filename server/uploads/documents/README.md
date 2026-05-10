# Documents Folder Structure

All uploadable documents are organized under this folder.

## Structure
- `departments/<dept-name>/<section>/` - department-specific docs
- `academics/` - general academics docs shared across departments
- `admin-office/` - circulars and notices from admin
- `institution/` - governance and annual reports
- `research/` - research policy, CoE, NISP, and PhD docs

## Department Slugs
| Department | Folder name |
|---|---|
| Applied Science & Humanities | applied-sciences |
| Computer Science & Engineering | cse |
| Electrical Engineering | electrical |
| Electronics & Telecommunication | entc |
| Information Technology | it |
| MBA | mba |
| Mechanical Engineering | mechanical |

## Legacy Path Support
Old flat paths are automatically aliased to new nested paths via
`server/utils/documentPathAliases.js`. Old links will continue to resolve
correctly without any frontend changes.
