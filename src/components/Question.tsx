import { FC } from 'react';
import './Question.css';
import AnswerItem from './AnswerItem';
import { Answer } from '../types/answer/Answer';
import { QuestionProps } from '../types/question/QuestionProps';

const Question: FC<QuestionProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  attempted,
}) => {
  const correctAnswer = question.answers.find((ans) => ans.correct);

  const handleAnswerClick = (answer: Answer) => {
    if (attempted) return;

    onAnswer(answer); // Pass the selected answer back to QuestionPage
  };

  return (
    <section className="question-container">
      <header className="question-header">
        <h2 className="question-title">{question.content}</h2>
        <span className="question-counter">
          {currentQuestionIndex}/{totalQuestions}
        </span>
      </header>
      <ul className={`question-answers ${attempted ? 'disabled' : ''}`}>
        {question.answers.map((answer, index) => (
          <AnswerItem
            key={index}
            answer={answer}
            isSelected={selectedAnswer?.id === answer.id}
            attempted={attempted}
            onClick={() => handleAnswerClick(answer)}
          />
        ))}
      </ul>
      {attempted && correctAnswer && correctAnswer.explanation && (
        <div className="correct-answer-explanation">
          {correctAnswer.explanation}
        </div>
      )}
    </section>
  );
};

export default Question;
