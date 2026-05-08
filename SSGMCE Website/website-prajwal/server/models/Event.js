const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    default: 'SSGMCE Campus'
  },
  organizer: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Conference'],
    default: 'General'
  },
  image: {
    type: String,
    default: ''
  },
  registrationLink: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Event', eventSchema);
