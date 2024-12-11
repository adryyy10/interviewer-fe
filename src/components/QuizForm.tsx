import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizForm.css";
import { Routes } from "../constants/routes";
import { categories } from "../constants/questionCategories";

const QuizForm: FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleCategory = (category: string): void => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStartQuestionnaire = (): void => {
    const query = selectedCategories
      .map((category) => `category[]=${encodeURIComponent(category)}`)
      .join("&");

    // if categories includes 'all' show all categories regardless other categories
    const navigateRoute = selectedCategories.length && !selectedCategories.includes('all')
      ? `${Routes.Questions}?${query}`
      : Routes.Questions;

    navigate(navigateRoute);
  };

  return (
    <main className="quiz-main-container">
      <h1 className="quiz-main-title">Interviewer</h1>
      <form className="quiz-main-form" onSubmit={(e) => e.preventDefault()}>
        <label className="quiz-category-label">Select Categories:</label>
        <div className="categories-container">
          {categories.map((category: string) => (
            <div
              key={category}
              className={`category-item ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="quiz-main-button"
          onClick={handleStartQuestionnaire}
        >
          Start Questionnaire
        </button>
      </form>
    </main>
  );
};

export default QuizForm;
