import React from 'react';
import './Answer.css';

const Answer = ({ answer, isSelected, attempted, onClick }) => {
    return (
        <li
            className={`answer 
                ${isSelected ? (answer.correct ? 'correct' : 'incorrect') : ''}
                ${attempted && answer.correct && !isSelected ? 'highlight-correct' : ''} 
                ${attempted ? 'disabled' : ''}`} // Apply the disabled class conditionally
            onClick={!attempted ? onClick : null} // Disable click if an attempt has been made
        >
            {answer.content}
        </li>
    );
};

export default Answer;
