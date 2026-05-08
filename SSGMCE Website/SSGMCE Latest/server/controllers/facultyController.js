const Faculty = require('../models/Faculty');

// @desc    Get all faculty
// @route   GET /api/faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = { isActive: true };
    if (department) filter.department = department;
    
    const faculty = await Faculty.find(filter).sort({ name: 1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get faculty by ID
// @route   GET /api/faculty/:id
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create faculty
// @route   POST /api/faculty
exports.createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update faculty
// @route   PUT /api/faculty/:id
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
