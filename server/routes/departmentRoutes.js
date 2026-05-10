const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllDepartments,
  getDepartmentById,
  getDepartmentByCode,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

router.route('/')
  .get(getAllDepartments)
  .post(protect, adminOnly, createDepartment);

router.route('/code/:code')
  .get(getDepartmentByCode);

router.route('/:id')
  .get(getDepartmentById)
  .put(protect, adminOnly, updateDepartment)
  .delete(protect, adminOnly, deleteDepartment);

module.exports = router;
