import { FC, ChangeEvent } from 'react';
import { Answer } from '../types/answer/Answer';
import './AdminAnswerItem.css';

interface AnswerItemProps {
  index: number;
  answer: Answer;
  onChange: <T extends keyof Answer>(field: T, value: Answer[T]) => void;
  onRemove: () => void;
}

const renderAnswerContent = (
  index: number, 
  answer: Answer, 
  onChange: <T extends keyof Answer>(field: T, value: Answer[T]) => void
) => {
  return (
    <div>
      <label htmlFor={`answer-content-${index}`}>Answer Content:</label>
      <input
        id={`answer-content-${index}`}
        type="text"
        value={answer.content}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('content', event.target.value)}
        required
      />
    </div>
  );
}

const renderAnswerCorrect = (
  index: number, 
  answer: Answer, 
  onChange: <T extends keyof Answer>(field: T, value: Answer[T]) => void
) => {
  return(
    <div>
    <label htmlFor={`answer-correct-${index}`}>Correct:</label>
    <select
      id={`answer-correct-${index}`}
      value={answer.correct ? 'true' : 'false'}
      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
        onChange('correct', event.target.value === 'true')
      }
      required
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </select>
  </div>
  );
}

const renderAnswerExplanation = (
  index: number, 
  answer: Answer, 
  onChange: <T extends keyof Answer>(field: T, value: Answer[T]) => void
) => {
  return(
    <div>
      <label htmlFor={`answer-explanation-${index}`}>Explanation:</label>
      <textarea
        id={`answer-explanation-${index}`}
        value={answer.explanation}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange('explanation', event.target.value)
        }
        required
      />
    </div>
  );
}

const AdminAnswerItem: FC<AnswerItemProps> = ({ index, answer, onChange, onRemove }) => {
  return (
    <article className="answer-item">
      {renderAnswerContent(index, answer, onChange)}
      {renderAnswerCorrect(index, answer, onChange)}
      {renderAnswerExplanation(index, answer, onChange)}
      <button type="button" onClick={onRemove} className="remove-answer-button">
        Remove Answer
      </button>
    </article>
  );
};

export default AdminAnswerItem;
