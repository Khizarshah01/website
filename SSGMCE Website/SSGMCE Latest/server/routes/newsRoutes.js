const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

router.route('/')
  .get(getAllNews)
  .post(createNews);

router.route('/:id')
  .get(getNewsById)
  .put(updateNews)
  .delete(deleteNews);

module.exports = router;
