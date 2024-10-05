// src/components/Answer.tsx

import React, { FC } from 'react';
import './Answer.css';
import { AnswerProps } from '../types/answer/AnswerProps';

const Answer: FC<AnswerProps> = ({
    answer,
    isSelected,
    attempted,
    onClick,
}) => {
    const handleClick = () => {
        if (!attempted) {
            onClick();
        }
    };

    return (
        <li
            className={`answer 
                ${isSelected ? (answer.correct ? 'correct' : 'incorrect') : ''}
                ${attempted && answer.correct && !isSelected ? 'highlight-correct' : ''} 
                ${attempted ? 'disabled' : ''}`}
            onClick={handleClick}
        >
            {answer.content}
        </li>
    );
};

export default Answer;
