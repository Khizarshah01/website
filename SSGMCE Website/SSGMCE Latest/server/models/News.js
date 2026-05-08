const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Achievement', 'Event', 'Placement', 'Research', 'General'],
    default: 'General'
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: 'SSGMCE Admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('News', newsSchema);
