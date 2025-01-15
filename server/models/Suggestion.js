const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  content: {
    zh: String,
    en: String
  },
  ipAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Suggestion', SuggestionSchema); 