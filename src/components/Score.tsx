import React, { FC } from 'react';
import './Score.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ScoreProps } from '../types/score/ScoreProps';
import { Question } from '../types/question/Question';
import { Answer } from '../types/answer/Answer';

const Score: FC<ScoreProps> = ({ questions, userAnswers, result }) => {
    return (
        <div className="score-container">
            <h2>{result?.remarks}</h2>
            <div className="score-summary">
                <p>You scored:</p>
                <div className="score-number">
                    <span>{result?.punctuation}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${result?.punctuation}%` }}
                    ></div>
                </div>
            </div>

            <div className="results-list">
                {questions.map((question: Question, index: number) => {
                    const userAnswer: Answer | null = userAnswers[index];
                    const correctAnswer: Answer | undefined = question.answers.find((ans) => ans.correct);
                    const isCorrect = userAnswer && correctAnswer && userAnswer.content === correctAnswer.content;

                    return (
                        <div key={index} className="result-item">
                            <p className="result-item-question-content">Question {index + 1}: {question.content}</p>
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
                            {!isCorrect && correctAnswer && (
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
