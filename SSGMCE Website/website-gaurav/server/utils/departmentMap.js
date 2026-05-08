/**
 * Department code mapping between User model and Research model.
 *
 * User Model:     ["All", "CSE", "IT", "MECH", "ELECTRICAL", "ENTC", "MBA", "ASH"]
 * Research Model:  ["CSE", "IT", "ENTC", "EE", "ME", "CE", "MBA", "Applied Sciences"]
 *
 * This module provides helpers so that a Coordinator whose User.department
 * is "ELECTRICAL" can correctly query / create research data stored as "EE".
 */

// User-code → Research-code
const USER_TO_RESEARCH = {
  CSE: "CSE",
  IT: "IT",
  ENTC: "ENTC",
  ELECTRICAL: "EE",
  MECH: "ME",
  MBA: "MBA",
  ASH: "Applied Sciences",
};

// Research-code → User-code  (reverse map)
const RESEARCH_TO_USER = {};
for (const [userCode, researchCode] of Object.entries(USER_TO_RESEARCH)) {
  RESEARCH_TO_USER[researchCode] = userCode;
}

/**
 * Convert a User-model department code to the Research-model equivalent.
 * Returns the original value if no mapping exists (safe pass-through).
 */
const toResearchDept = (userDept) => USER_TO_RESEARCH[userDept] || userDept;

/**
 * Convert a Research-model department code to the User-model equivalent.
 */
const toUserDept = (resDept) => RESEARCH_TO_USER[resDept] || resDept;

module.exports = { toResearchDept, toUserDept, USER_TO_RESEARCH, RESEARCH_TO_USER };
