import { FC } from 'react';
import './QuizNavigationButtons.css';

interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  submitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

const QuizNavigationButtons: FC<NavigationButtonsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  submitting,
  onPrevious,
  onNext,
  onFinish,
}) => {
  return (
    <footer className="question-page-content-button-container">
      <button 
        onClick={onPrevious} 
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>
      {currentQuestionIndex < totalQuestions - 1 ? (
        <button onClick={onNext}>
          Next
        </button>
      ) : (
        <button onClick={onFinish} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Finish'}
        </button>
      )}
    </footer>
  );
};

export default QuizNavigationButtons;
