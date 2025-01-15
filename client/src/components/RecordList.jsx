import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      setError({
        zh: '加载记录失败',
        en: 'Failed to load records'
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <span className="zh">加载中...</span>
        <span className="en">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p className="zh">{error.zh}</p>
        <p className="en">{error.en}</p>
      </div>
    );
  }

  return (
    <div className="record-list">
      {records.map(record => (
        <div key={record._id} className="record-card">
          <div className="record-header">
            <h3>{record.country}</h3>
            <span className="date">{new Date(record.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="income-list">
            <h4>
              <span className="zh">收入项目</span>
              <span className="en">Income Items</span>
            </h4>
            {record.incomeItems.map((item, index) => (
              <div key={index} className="item">
                <div className="item-title">
                  <span className="zh">{item.title.zh}</span>
                  <span className="en">{item.title.en}</span>
                </div>
                <div className="amount">{item.amount}</div>
                {item.imageUrl && (
                  <img 
                    src={`http://localhost:5000/${item.imageUrl}`} 
                    alt="Income proof" 
                    className="proof-image"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="expense-list">
            <h4>
              <span className="zh">支出项目</span>
              <span className="en">Expense Items</span>
            </h4>
            {record.expenseItems.map((item, index) => (
              <div key={index} className="item">
                <div className="item-title">
                  <span className="zh">{item.title.zh}</span>
                  <span className="en">{item.title.en}</span>
                </div>
                <div className="amount">{item.amount}</div>
                {item.imageUrl && (
                  <img 
                    src={`http://localhost:5000/${item.imageUrl}`} 
                    alt="Expense proof" 
                    className="proof-image"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="comments-section">
            <h4>
              <span className="zh">评论</span>
              <span className="en">Comments</span>
            </h4>
            {record.comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-content">
                  <span className="zh">{comment.content.zh}</span>
                  <span className="en">{comment.content.en}</span>
                </div>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            <CommentForm recordId={record._id} onCommentAdded={fetchRecords} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordList; 