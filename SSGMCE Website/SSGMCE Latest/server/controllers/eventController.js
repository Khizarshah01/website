const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ eventDate: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ 
      isActive: true,
      eventDate: { $gte: new Date() }
    })
      .sort({ eventDate: 1 })
      .limit(10);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
