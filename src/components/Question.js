import React from 'react';

const Question = ({ question }) => {
    return (
        <div>
            <h3>{question.content}</h3>
            <ul>
                {question.answers.map((answer) => (
                    <li>{answer.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
