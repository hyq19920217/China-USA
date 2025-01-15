const express = require('express');
const router = express.Router();
const multer = require('multer');
const Record = require('../models/Record');

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// 获取所有记录
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ 
      zh: '服务器错误',
      en: 'Server error'
    });
  }
});

// 提交新记录
router.post('/submit', upload.array('images'), async (req, res) => {
  try {
    const { country, incomeItems, expenseItems } = req.body;
    const ipAddress = req.ip;
    
    const record = new Record({
      country,
      incomeItems,
      expenseItems,
      ipAddress
    });
    
    await record.save();
    res.json({ 
      zh: '记录提交成功',
      en: 'Record submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      zh: '提交失败',
      en: 'Submission failed'
    });
  }
});

// 添加评论
router.post('/:recordId/comments', async (req, res) => {
  try {
    const record = await Record.findById(req.params.recordId);
    record.comments.push({
      content: req.body.content,
      ipAddress: req.ip
    });
    await record.save();
    res.json({ 
      zh: '评论添加成功',
      en: 'Comment added successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      zh: '评论失败',
      en: 'Failed to add comment'
    });
  }
});

module.exports = router; 