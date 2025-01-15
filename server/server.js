const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

// 中间件配置
app.use(express.json());
app.use(cors());

// IP限制配置
const submitLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5分钟
  max: 1, // 限制次数
  message: {
    zh: '操作频繁，请稍后重试',
    en: 'Too many submissions, please try again later'
  }
});

// 应用IP限制到提交路由
app.use('/api/records/submit', submitLimiter);

// 导入路由
const recordsRouter = require('./routes/records');
const suggestionsRouter = require('./routes/suggestions');

// 添加路由
app.use('/api/records', recordsRouter);
app.use('/api/suggestions', suggestionsRouter);

// 配置静态文件服务
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost/income-sharing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 