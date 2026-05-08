const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ name: 1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get department by ID
// @route   GET /api/departments/:id
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get department by code
// @route   GET /api/departments/code/:code
exports.getDepartmentByCode = async (req, res) => {
  try {
    const department = await Department.findOne({ 
      code: req.params.code.toUpperCase(),
      isActive: true 
    });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create department
// @route   POST /api/departments
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
