// backend/models/Party.js
const mongoose = require('mongoose');

const responsibilitySchema = new mongoose.Schema({
  name: String,
  assignedTo: String,
  status: { type: String, default: 'pending' }
});

const partySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  budget: { type: Number, required: true },
  responsibilities: [responsibilitySchema]
});

module.exports = mongoose.model('Party', partySchema);
