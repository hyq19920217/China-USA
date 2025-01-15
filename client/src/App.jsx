import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import SuggestionForm from './components/SuggestionForm';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">
            <span className="zh">首页</span>
            <span className="en">Home</span>
          </Link>
          <Link to="/submit">
            <span className="zh">提交记录</span>
            <span className="en">Submit Record</span>
          </Link>
          <Link to="/suggestions">
            <span className="zh">提交建议</span>
            <span className="en">Submit Suggestion</span>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<RecordList />} />
          <Route path="/submit" element={<RecordForm />} />
          <Route path="/suggestions" element={<SuggestionForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 