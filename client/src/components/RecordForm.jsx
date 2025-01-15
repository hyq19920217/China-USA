import React, { useState } from 'react';
import axios from 'axios';

const RecordForm = () => {
  const [country, setCountry] = useState('');
  const [incomeItems, setIncomeItems] = useState([{ titleZh: '', titleEn: '', amount: '', image: null }]);
  const [expenseItems, setExpenseItems] = useState([{ titleZh: '', titleEn: '', amount: '', image: null }]);
  const [message, setMessage] = useState({ zh: '', en: '' });

  const handleIncomeChange = (index, field, value) => {
    const newIncomeItems = [...incomeItems];
    newIncomeItems[index][field] = value;
    setIncomeItems(newIncomeItems);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenseItems = [...expenseItems];
    newExpenseItems[index][field] = value;
    setExpenseItems(newExpenseItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('country', country);
    formData.append('incomeItems', JSON.stringify(incomeItems));
    formData.append('expenseItems', JSON.stringify(expenseItems));
    
    // 添加图片文件
    incomeItems.forEach((item, index) => {
      if (item.image) {
        formData.append(`incomeImage${index}`, item.image);
      }
    });
    
    expenseItems.forEach((item, index) => {
      if (item.image) {
        formData.append(`expenseImage${index}`, item.image);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/records/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data);
    } catch (error) {
      setMessage({
        zh: '提交失败，请稍后重试',
        en: 'Submission failed, please try again later'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="record-form">
      <div className="form-group">
        <label>
          <span className="label-zh">国家</span>
          <span className="label-en">Country</span>
        </label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} required>
          <option value="">--请选择/Please select--</option>
          <option value="CN">中国/China</option>
          <option value="US">美国/USA</option>
          {/* 添加更多国家选项 */}
        </select>
      </div>

      <div className="income-section">
        <h3>
          <span className="zh">收入项目</span>
          <span className="en">Income Items</span>
        </h3>
        {incomeItems.map((item, index) => (
          <div key={index} className="item-group">
            <div className="item-inputs">
              <div className="input-group">
                <label>
                  <span className="zh">收入名目（中文）</span>
                  <span className="en">Income Title (Chinese)</span>
                </label>
                <input
                  type="text"
                  value={item.titleZh}
                  onChange={(e) => handleIncomeChange(index, 'titleZh', e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>
                  <span className="zh">收入名目（英文）</span>
                  <span className="en">Income Title (English)</span>
                </label>
                <input
                  type="text"
                  value={item.titleEn}
                  onChange={(e) => handleIncomeChange(index, 'titleEn', e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>
                  <span className="zh">金额</span>
                  <span className="en">Amount</span>
                </label>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>
                  <span className="zh">证明图片</span>
                  <span className="en">Proof Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleIncomeChange(index, 'image', e.target.files[0])}
                />
              </div>
            </div>
            
            <button
              type="button"
              className="remove-button"
              onClick={() => {
                const newIncomeItems = [...incomeItems];
                newIncomeItems.splice(index, 1);
                setIncomeItems(newIncomeItems);
              }}
            >
              <span className="zh">删除</span>
              <span className="en">Remove</span>
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setIncomeItems([...incomeItems, { titleZh: '', titleEn: '', amount: '', image: null }])}>
          <span className="zh">添加收入项目</span>
          <span className="en">Add Income Item</span>
        </button>
      </div>

      {/* 支出部分类似 */}

      <button type="submit">
        <span className="zh">提交</span>
        <span className="en">Submit</span>
      </button>

      {message.zh && (
        <div className="message">
          <p className="zh">{message.zh}</p>
          <p className="en">{message.en}</p>
        </div>
      )}
    </form>
  );
};

export default RecordForm; 