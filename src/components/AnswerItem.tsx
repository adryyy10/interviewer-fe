import { FC } from 'react';
import './AnswerItem.css';
import { Answer } from '../types/answer/Answer';

interface AnswerProps {
  answer: Answer;
  isSelected: boolean;
  attempted: boolean;
  onClick: () => void;
}

const AnswerItem: FC<AnswerProps> = ({
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

export default AnswerItem;
