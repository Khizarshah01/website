const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    default: ''
  },
  specialization: {
    type: String,
    default: ''
  },
  experience: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: '/images/default-faculty.png'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Faculty', facultySchema);
