import React from 'react';

const Question = ({ question }) => {
    return (
        <div>
            <h3>{question.content}</h3>
            <ul>
                <li>{question.option1}</li>
                <li>{question.option2}</li>
                <li>{question.option3}</li>
                <li>{question.option4}</li>
            </ul>
        </div>
    );
};

export default Question;
