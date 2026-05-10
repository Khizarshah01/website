const Notice = require('../models/Notice');

const sendRequestError = (res, error, fallbackStatus = 500) => {
  const status =
    error?.name === 'CastError' || error?.name === 'ValidationError'
      ? 400
      : fallbackStatus;
  const message =
    status === 400 ? 'Invalid notice request data' : 'Notice request failed';

  return res.status(status).json({ error: message });
};

// @desc    Get all notices
// @route   GET /api/notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true })
      .sort({ publishDate: -1 })
      .limit(30);
    res.json(notices);
  } catch (error) {
    sendRequestError(res, error);
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
    sendRequestError(res, error);
  }
};

// @desc    Create notice
// @route   POST /api/notices
exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (error) {
    sendRequestError(res, error, 400);
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
    sendRequestError(res, error, 400);
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
    sendRequestError(res, error);
  }
};
