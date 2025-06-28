const mongoose = require('mongoose');

const Applicationschema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  date: {
  type: Date,
  default: Date.now
}, 
  status: String,
  notes: String
});

module.exports = mongoose.model('Application', Applicationschema);