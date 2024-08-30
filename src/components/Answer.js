import React from 'react';
import './Answer.css';

const Answer = ({ answer, isSelected, isCorrect, onClick }) => {
    return (
        <>
            <li
                className={`answer ${isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                onClick={onClick}
            >
                {answer.content}
            </li>
        </>
    );
};

export default Answer;
