const express = require('express');
const router = express.Router();
const {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice
} = require('../controllers/noticeController');

router.route('/')
  .get(getAllNotices)
  .post(createNotice);

router.route('/:id')
  .get(getNoticeById)
  .put(updateNotice)
  .delete(deleteNotice);

module.exports = router;
