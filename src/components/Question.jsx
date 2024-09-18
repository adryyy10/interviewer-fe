import React, { useState, useEffect } from 'react';
import './Question.css';
import Answer from './Answer';

const Question = ({ question }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        setIsCorrect(answer.correct);
    };

    // Reset state when a new question is displayed
    useEffect(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
    }, [question]);

    return (
        <div className="question-container">
            <h3 className="question-title">{question.content}</h3>
            <ul className="question-answers">
                {question.answers.map((answer, index) => (
                    <Answer
                        key={index}
                        answer={answer}
                        isSelected={selectedAnswer === answer}
                        isCorrect={isCorrect}
                        onClick={() => handleAnswerClick(answer)}
                    />
                ))}
            </ul>

            {selectedAnswer && (
                <div className="selected-answer-explanation">
                    {selectedAnswer.explanation}
                </div>
            )}
        </div>
    );
};

export default Question;
