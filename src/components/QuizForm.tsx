import React, { useState, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizForm.css';

const QuizForm: FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const navigate = useNavigate();

    const categories: string[] = ['All', 'PHP', 'JS', 'Python', 'Java'];

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedCategory(event.target.value);
    };

    const handleStartQuestionnaire = (): void => {
        if (selectedCategory) {
            if (selectedCategory === 'All') {
                navigate('/questions');
            } else {
                navigate(`/questions?category=${encodeURIComponent(selectedCategory)}`);
            }
        } else {
            alert('Please select a category to start the questionnaire.');
        }
    };

    return (
        <main className="main-container">
            <h1 className="main-title">Interviewer</h1>
            <form className='main-form' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="category-select" className="category-label">Select Category:</label>
                <select
                    id="category-select"
                    className="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    {categories.map((category: string) => (
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

export default QuizForm;
