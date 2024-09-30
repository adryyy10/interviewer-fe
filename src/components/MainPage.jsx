import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
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
        <main className="main-container">
            <h1 className="main-title">Interviewer</h1>
            <form className='main-form'>
                <label htmlFor="category-select" className="category-label">Select Category:</label>
                <select
                    id="category-select"
                    className="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="button" className="main-button" onClick={handleStartQuestionnaire}>
                    Start Questionnaire
                </button>
            </form>
        </main>
    );
};

export default MainPage;
