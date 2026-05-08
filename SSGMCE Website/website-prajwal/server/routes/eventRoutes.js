const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.route('/')
  .get(getAllEvents)
  .post(createEvent);

router.route('/upcoming')
  .get(getUpcomingEvents);

router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;
