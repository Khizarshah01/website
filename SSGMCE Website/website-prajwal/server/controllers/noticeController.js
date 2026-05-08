const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true })
      .sort({ publishDate: -1 })
      .limit(30);
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get notice by ID
// @route   GET /api/notices/:id
exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create notice
// @route   POST /api/notices
exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
