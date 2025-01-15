import React, { useState } from 'react';
import axios from 'axios';

const SuggestionForm = () => {
  const [suggestion, setSuggestion] = useState({ zh: '', en: '' });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/suggestions', {
        content: suggestion
      });
      setSuggestion({ zh: '', en: '' });
      setMessage(response.data);
    } catch (error) {
      setMessage({
        zh: '提交建议失败',
        en: 'Failed to submit suggestion'
      });
    }
  };

  return (
    <div className="suggestion-form-container">
      <h2>
        <span className="zh">提交建议</span>
        <span className="en">Submit Suggestion</span>
      </h2>
      <form onSubmit={handleSubmit} className="suggestion-form">
        <div className="input-group">
          <label>
            <span className="zh">建议（中文）</span>
            <span className="en">Suggestion (Chinese)</span>
          </label>
          <textarea
            value={suggestion.zh}
            onChange={(e) => setSuggestion({ ...suggestion, zh: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>
            <span className="zh">建议（英文）</span>
            <span className="en">Suggestion (English)</span>
          </label>
          <textarea
            value={suggestion.en}
            onChange={(e) => setSuggestion({ ...suggestion, en: e.target.value })}
            required
          />
        </div>

        <button type="submit">
          <span className="zh">提交建议</span>
          <span className="en">Submit Suggestion</span>
        </button>

        {message && (
          <div className="message">
            <p className="zh">{message.zh}</p>
            <p className="en">{message.en}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SuggestionForm; 