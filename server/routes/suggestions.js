const express = require('express');
const router = express.Router();
const Suggestion = require('../models/Suggestion');
const rateLimit = require('express-rate-limit');

const suggestionLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1,
  message: {
    zh: '操作频繁，请稍后重试',
    en: 'Too many submissions, please try again later'
  }
});

router.post('/', suggestionLimiter, async (req, res) => {
  try {
    const suggestion = new Suggestion({
      content: req.body.content,
      ipAddress: req.ip
    });
    
    await suggestion.save();
    res.json({
      zh: '建议提交成功',
      en: 'Suggestion submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      zh: '提交失败',
      en: 'Submission failed'
    });
  }
});

module.exports = router; 