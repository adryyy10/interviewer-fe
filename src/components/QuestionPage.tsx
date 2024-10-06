import React, { useState, FC } from 'react';
import useQuestions from '../hooks/useQuestions';
import Question from './Question';
import Score from './Score';
import './QuestionPage.css';
import { Answer } from '../types/answer/Answer';
import { UseQuestionsResponse } from '../types/question/UseQuestionResponse';

const QuestionPage: FC = () => {
    const { questions, loading, error }: UseQuestionsResponse = useQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

    if (loading) return <div className="loading-container">Loading questions...</div>;
    if (error) return <div className="loading-container">{error}</div>;

    // Handle Question callback function with proper typing
    const handleAnswer = (answer: Answer) => {
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
                            onAnswer={handleAnswer}
                        />
                        <div className="button-container">
                            <button 
                                onClick={() => setCurrentQuestionIndex(prev => prev - 1)} 
                                disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button 
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
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
