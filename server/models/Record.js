const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  incomeItems: [{
    title: {
      zh: String,
      en: String
    },
    amount: Number,
    imageUrl: String
  }],
  expenseItems: [{
    title: {
      zh: String,
      en: String
    },
    amount: Number,
    imageUrl: String
  }],
  comments: [{
    content: {
      zh: String,
      en: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    ipAddress: String
  }],
  ipAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Record', RecordSchema); 