const News = require('../models/News');

const sendRequestError = (res, error, fallbackStatus = 500) => {
  const status =
    error?.name === 'CastError' || error?.name === 'ValidationError'
      ? 400
      : fallbackStatus;
  const message =
    status === 400 ? 'Invalid news request data' : 'News request failed';

  return res.status(status).json({ error: message });
};

// @desc    Get all news
// @route   GET /api/news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isActive: true })
      .sort({ publishDate: -1 })
      .limit(20);
    res.json(news);
  } catch (error) {
    sendRequestError(res, error);
  }
};

// @desc    Get single news by ID
// @route   GET /api/news/:id
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    sendRequestError(res, error);
  }
};

// @desc    Create news
// @route   POST /api/news
exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    sendRequestError(res, error, 400);
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    sendRequestError(res, error, 400);
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    sendRequestError(res, error);
  }
};
