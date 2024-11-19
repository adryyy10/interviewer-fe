import { useState, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizForm.css';
import { Routes } from '../constants/routes';
import { categories } from '../constants/questionCategories';

const QuizForm: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const navigate = useNavigate();

  const handleStartQuestionnaire = (): void => {
    let navigateRoute = (selectedCategory === 'All') 
      ? Routes.Questions 
      : `${Routes.Questions}?category=${encodeURIComponent(selectedCategory)}`;
    navigate(navigateRoute)
  };

  return (
    <main className="quiz-main-container">
      <h1 className="quiz-main-title">Interviewer</h1>
      <form className='quiz-main-form' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="category-select" className="quiz-category-label">Select Category:</label>
        <select
          id="category-select"
          className="quiz-category-select"
          value={selectedCategory}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" className="quiz-main-button" onClick={handleStartQuestionnaire}>
            Start Questionnaire
        </button>
      </form>
    </main>
  );
};

export default QuizForm;
