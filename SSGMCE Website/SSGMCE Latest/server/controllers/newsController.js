const News = require('../models/News');

// @desc    Get all news
// @route   GET /api/news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isActive: true })
      .sort({ publishDate: -1 })
      .limit(20);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create news
// @route   POST /api/news
exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};
