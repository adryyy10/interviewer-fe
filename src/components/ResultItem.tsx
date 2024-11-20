import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Answer } from "../types/answer/Answer";
import { FC, Fragment } from "react";
import { Question } from "../types";
import './ResultItem.css';

export interface ResultItemProps {
  userAnswers: Answer[];
  question: Question;
  index: number;
}

const ResultItem: FC<ResultItemProps> = ({ userAnswers, question, index }) => {
  const userAnswer: Answer | null = userAnswers[index];
  const correctAnswer: Answer | undefined = question.answers.find((ans) => ans.correct);
  const isCorrect = userAnswer && correctAnswer && userAnswer.content === correctAnswer.content;

  const renderAnswerFeedback = () => {
    return (
      <Fragment>
        <p className="result-item-question-content">Question {index + 1}: {question.content}</p>
        <div className="result-item-question-content-answer-feedback">
          {isCorrect ? (
            <FaCheckCircle className="result-item-icon correct-icon" />
          ) : (
            <FaTimesCircle className="result-item-icon incorrect-icon" />
          )}
          <span>
            Your answer: {userAnswer ? userAnswer.content : 'No answer provided'}
          </span>
        </div>
      </Fragment>
    );
  }

  return (
    <article key={index} className="result-item">
      {renderAnswerFeedback()}
      
      {!isCorrect && correctAnswer && (
        <p className="result-item-correct-answer">
          Correct answer: {correctAnswer.content}
        </p>
      )}
    </article>
  );
}

export default ResultItem;