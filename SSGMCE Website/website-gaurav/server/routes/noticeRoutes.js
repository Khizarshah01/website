const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice
} = require('../controllers/noticeController');

router.get('/', getAllNotices);
router.get('/:id', getNoticeById);

router.post('/', protect, adminOnly, createNotice);
router.put('/:id', protect, adminOnly, updateNotice);
router.delete('/:id', protect, adminOnly, deleteNotice);

module.exports = router;
