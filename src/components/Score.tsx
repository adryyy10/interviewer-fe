import React, { FC, useMemo } from 'react';
import './Score.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ScoreProps } from '../types/score/ScoreProps';
import { Question } from '../types/question/Question';
import { Answer } from '../types/answer/Answer';

const Score: FC<ScoreProps> = ({ questions, userAnswers }) => {
    // Calculate score using useMemo to avoid recalculations on every render
    const { percentage } = useMemo(() => {
        let calculatedScore = 0;
        questions.forEach((question: Question, index: number) => {
            const userAnswer: Answer | null = userAnswers[index];
            const correctAnswer: Answer | undefined = question.answers.find((ans) => ans.correct);

            if (userAnswer && correctAnswer && userAnswer.content === correctAnswer.content) {
                calculatedScore += 1;
            }
        });

        const calculatedPercentage = questions.length > 0 ? (calculatedScore / questions.length) * 100 : 0;

        return { score: calculatedScore, percentage: calculatedPercentage };
    }, [questions, userAnswers]);

    return (
        <div className="score-container">
            <h2>🎉 Congratulations! 🎉</h2>
            <div className="score-summary">
                <p>You scored:</p>
                <div className="score-number">
                    <span>{percentage.toFixed(2)}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
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