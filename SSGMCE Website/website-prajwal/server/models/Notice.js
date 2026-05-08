const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Announcement', 'Admission', 'Examination', 'Result', 'General'],
    default: 'General'
  },
  fileUrl: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
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

module.exports = mongoose.model('Notice', noticeSchema);
