import React from 'react';
import './Score.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Score = ({ questions, userAnswers }) => {
  let score = 0;

  return (
    <div className="score-container">
      <h2>🎉 Congratulations! 🎉</h2>
      <div className="score-summary">
        <p>You scored:</p>
        <div className="score-number">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = question.answers.find((ans) => ans.correct);
            const isCorrect = userAnswer && userAnswer.content === correctAnswer.content;

            if (isCorrect) {
              score += 1;
            }
          })}
          <span>{(score / questions.length) * 100}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="results-list">
        {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = question.answers.find((ans) => ans.correct);
            const isCorrect = userAnswer && userAnswer.content === correctAnswer.content;

          return (
            <div key={index} className="result-item">
              <h3>Question {index + 1}</h3>
              <p className="question-content">{question.content}</p>
              <div className="answer-feedback">
                {isCorrect ? (
                  <FaCheckCircle className="icon correct-icon" />
                ) : (
                  <FaTimesCircle className="icon incorrect-icon" />
                )}
                <span>
                  Your answer: {userAnswer ? userAnswer.content : 'No answer provided'}
                </span>
              </div>
              {!isCorrect && (
                <p className="correct-answer">
                  Correct answer: {correctAnswer.content}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button className="retake-button" onClick={() => window.location.reload()}>
        Retake Quiz
      </button>
    </div>
  );
};

export default Score;
