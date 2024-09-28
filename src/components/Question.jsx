import React, { useState, useEffect } from 'react';
import './Question.css';
import Answer from './Answer';

const Question = ({ question, currentQuestionIndex, totalQuestions, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [attempted, setAttempted] = useState(false);
    const correctAnswer = question.answers.find((ans) => ans.correct);

    // Reset state when a new question is displayed
    useEffect(() => {
        setSelectedAnswer(null);
        setAttempted(false);
    }, [question]);

    const handleAnswerClick = (answer) => {
        if (attempted) return;

        setSelectedAnswer(answer);
        setAttempted(true);
        if (onAnswer) {
            onAnswer(answer); // Pass the selected answer back to QuestionPage
        }
    };

    return (
        <div className="question-container">
            <div className="question-header">
                <h3 className="question-title">{question.content}</h3>
                <span className="question-counter">{currentQuestionIndex}/{totalQuestions}</span>
            </div>
            <ul className={`question-answers ${attempted ? 'disabled' : ''}`}>
                {question.answers.map((answer, index) => (
                    <Answer
                        key={index}
                        answer={answer}
                        isSelected={selectedAnswer === answer}
                        attempted={attempted}
                        onClick={() => handleAnswerClick(answer)}
                    />
                ))}
            </ul>

            {attempted && (
                <div className="correct-answer-explanation">
                    {correctAnswer.explanation}
                </div>
            )}
        </div>
    );
};

export default Question;
