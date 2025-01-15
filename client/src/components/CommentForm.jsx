import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ recordId, onCommentAdded }) => {
  const [comment, setComment] = useState({ zh: '', en: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/records/${recordId}/comments`, {
        content: comment
      });
      setComment({ zh: '', en: '' });
      setMessage({
        zh: '评论已添加',
        en: 'Comment added successfully'
      });
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      setMessage({
        zh: '添加评论失败',
        en: 'Failed to add comment'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="input-group">
        <label>
          <span className="zh">评论（中文）</span>
          <span className="en">Comment (Chinese)</span>
        </label>
        <textarea
          value={comment.zh}
          onChange={(e) => setComment({ ...comment, zh: e.target.value })}
          required
        />
      </div>

      <div className="input-group">
        <label>
          <span className="zh">评论（英文）</span>
          <span className="en">Comment (English)</span>
        </label>
        <textarea
          value={comment.en}
          onChange={(e) => setComment({ ...comment, en: e.target.value })}
          required
        />
      </div>

      <button type="submit">
        <span className="zh">提交评论</span>
        <span className="en">Submit Comment</span>
      </button>

      {message && (
        <div className="message">
          <p className="zh">{message.zh}</p>
          <p className="en">{message.en}</p>
        </div>
      )}
    </form>
  );
};

export default CommentForm; 