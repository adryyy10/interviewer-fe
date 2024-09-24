import React, { useState } from 'react';
import useQuestions from '../hooks/useQuestions';
import Question from './Question';
import './QuestionPage.css';

const QuestionPage = () => {
    const { questions, loading, error } = useQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (loading) return <div className="loading-container">Loading questions...</div>;
    if (error) return <div className="loading-container">{error}</div>;

    return (
        <div className="question-page-container">
            {questions.length > 0 ? (
                <div>
                    <Question key={questions[currentQuestionIndex].id} question={questions[currentQuestionIndex]} />
                    <div className="button-container">
                        <button onClick={handlePrevious}>Previous</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </div>
            ) : (
                <div className="loading-container">No questions available for this category.</div>
            )}
        </div>
    );
};

export default QuestionPage;
