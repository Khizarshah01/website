const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

router.route('/')
  .get(getAllNews)
  .post(protect, adminOnly, createNews);

router.route('/:id')
  .get(getNewsById)
  .put(protect, adminOnly, updateNews)
  .delete(protect, adminOnly, deleteNews);

module.exports = router;
