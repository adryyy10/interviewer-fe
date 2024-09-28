import React, { useState } from 'react';
import useQuestions from '../hooks/useQuestions';
import Question from './Question';
import Score from './Score';
import './QuestionPage.css';

const QuestionPage = () => {
    const { questions, loading, error } = useQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    if (loading) return <div className="loading-container">Loading questions...</div>;
    if (error) return <div className="loading-container">{error}</div>;

    // Handle Question callback function
    const handleAnswer = (answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: answer,
        }));
    };

    return (
        <div className="question-page-container">
            {questions.length > 0 ? (
                !isFinished ? (
                    <div>
                        <Question
                            question={questions[currentQuestionIndex]} 
                            currentQuestionIndex={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            onAnswer={handleAnswer} // Pass the handleAnswer function
                        />
                        <div className="button-container">
                            <button 
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex -1)} 
                                disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button 
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex +1)}>
                                    Next
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setIsFinished(true)}>
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <Score
                        questions={questions}
                        userAnswers={userAnswers}
                    />
                )
            ) : (
                <div className="loading-container">No questions available for this category.</div>
            )}
        </div>
    );
};

export default QuestionPage;
