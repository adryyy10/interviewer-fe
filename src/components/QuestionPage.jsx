import React, { useState } from 'react';
import useQuestions from '../hooks/useQuestions';
import Question from './Question';
import './QuestionPage.css';

const QuestionPage = () => {
    const { questions, loading, error } = useQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (loading) return <div className="loading-container">Loading questions...</div>;
    if (error) return <div className="loading-container">{error}</div>;

    return (
        <div className="question-page-container">
            {questions.length > 0 ? (
                <div>
                    <Question
                        question={questions[currentQuestionIndex]} 
                        currentQuestionIndex={currentQuestionIndex + 1}
                        totalQuestions={questions.length}
                    />
                    <div className="button-container">
                        <button 
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex -1)} 
                            disabled={currentQuestionIndex === 0}>
                            Previous
                        </button>
                        <button 
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex +1)} 
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="loading-container">No questions available for this category.</div>
            )}
        </div>
    );
};

export default QuestionPage;
