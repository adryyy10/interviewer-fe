import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const categories = ['All', 'PHP', 'JS', 'Python', 'Java'];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStartQuestionnaire = () => {
    if (selectedCategory) {
      if (selectedCategory === 'All') {
        navigate('/questions');
      } else {
        navigate(`/questions?category=${selectedCategory}`);
      }
    } else {
      alert('Please select a category to start the questionnaire.');
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Interviewer</h1>
      <select 
        className="category-select" 
        value={selectedCategory} 
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button className="main-button" onClick={handleStartQuestionnaire}>
        Start Questionnaire
      </button>
    </div>
  );
};

export default MainPage;
