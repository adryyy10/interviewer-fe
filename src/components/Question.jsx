import React, { useState, useEffect } from 'react';
import './Question.css';
import Answer from './Answer';

const Question = ({ question }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [attempted, setAttempted] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    // Find the correct answer when the question changes
    useEffect(() => {
        setCorrectAnswer(question.answers.find((ans) => ans.correct));

        // Reset state when a new question is displayed
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAttempted(false);
    }, [question]);

    const handleAnswerClick = (answer) => {
        if (attempted) return;

        setSelectedAnswer(answer);
        setIsCorrect(answer.correct);
        setAttempted(true);
    };

    return (
        <div className="question-container">
            <h3 className="question-title">{question.content}</h3>
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
                <div className="selected-answer-explanation">
                    {correctAnswer.explanation} {/* Show the explanation of the correct answer */}
                </div>
            )}
        </div>
    );
};

export default Question;
