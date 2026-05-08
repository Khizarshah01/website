const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true
  },
  hodName: {
    type: String,
    default: ''
  },
  hodEmail: {
    type: String,
    default: ''
  },
  vision: {
    type: String,
    default: ''
  },
  mission: {
    type: String,
    default: ''
  },
  programs: [{
    name: String,
    duration: String,
    intake: Number,
    type: { type: String, enum: ['UG', 'PG', 'PhD'] }
  }],
  facilities: [String],
  achievements: [String],
  image: {
    type: String,
    default: '/images/default-dept.png'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Department', departmentSchema);
