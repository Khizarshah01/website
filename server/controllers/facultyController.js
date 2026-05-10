const Faculty = require('../models/Faculty');
const { verifyDocDepartment } = require('../middleware/authMiddleware');

const sendRequestError = (res, error, fallbackStatus = 500) => {
  const status =
    error?.name === 'CastError' || error?.name === 'ValidationError'
      ? 400
      : fallbackStatus;
  const message =
    status === 400 ? 'Invalid faculty request data' : 'Faculty request failed';

  return res.status(status).json({ error: message });
};

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
    sendRequestError(res, error);
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
    sendRequestError(res, error);
  }
};

// @desc    Create faculty
// @route   POST /api/faculty
exports.createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (error) {
    sendRequestError(res, error, 400);
  }
};

// @desc    Update faculty
// @route   PUT /api/faculty/:id
exports.updateFaculty = async (req, res) => {
  try {
    const existingFaculty = await Faculty.findById(req.params.id);
    if (!existingFaculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    const accessError = verifyDocDepartment(req, existingFaculty);
    if (accessError) {
      return res.status(403).json({ error: accessError });
    }

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    sendRequestError(res, error, 400);
  }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
exports.deleteFaculty = async (req, res) => {
  try {
    const existingFaculty = await Faculty.findById(req.params.id);
    if (!existingFaculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    const accessError = verifyDocDepartment(req, existingFaculty);
    if (accessError) {
      return res.status(403).json({ error: accessError });
    }

    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    sendRequestError(res, error);
  }
};
