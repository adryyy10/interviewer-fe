import React from 'react';
import './Question.css';

const Question = ({ question }) => {
    return (
        <div className="question-container">
            <h3 className="question-title">{question.content}</h3>
            <ul className="question-answers">
                {question.answers.map((answer, index) => (
                    <li key={index}>{answer.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
