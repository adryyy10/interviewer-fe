import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">Interviewer</h1>
      <Link to="/questions">
        <button className="main-button">View Questions</button>
      </Link>
    </div>
  );
};

export default MainPage;
