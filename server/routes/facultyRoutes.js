const express = require('express');
const router = express.Router();
const {
  protect,
  adminOrCoordinator,
  checkDepartmentAccess,
} = require('../middleware/authMiddleware');
const {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
} = require('../controllers/facultyController');

const deptCheck = checkDepartmentAccess({ bodyField: 'department', autoAssign: true });

router.route('/')
  .get(getAllFaculty)
  .post(protect, adminOrCoordinator, deptCheck, createFaculty);

router.route('/:id')
  .get(getFacultyById)
  .put(protect, adminOrCoordinator, deptCheck, updateFaculty)
  .delete(protect, adminOrCoordinator, deleteFaculty);

module.exports = router;
