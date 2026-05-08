const express = require('express');
const router = express.Router();
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
  .post(createDepartment);

router.route('/code/:code')
  .get(getDepartmentByCode);

router.route('/:id')
  .get(getDepartmentById)
  .put(updateDepartment)
  .delete(deleteDepartment);

module.exports = router;
