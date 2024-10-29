import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizDetail from '../hooks/useQuizDetail';
import './MyQuizDetail.css';
import { Routes } from '../constants/routes';

const MyQuizDetail: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { quiz, loading, error } = useQuizDetail(Number(id));

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!quiz) {
        return <div className="error-message">Quiz not found.</div>;
    }

    const handleGoBack = () => {
        navigate(Routes.MyQuizzes);
    };

    return (
        <div className="quiz-detail-container">
            <button onClick={handleGoBack} className="back-button">
                &larr; Back to My Quizzes
            </button>
            <h1 className="quiz-title">Quiz Details</h1>
            <div className="quiz-info">
                <p><strong>Score:</strong> {quiz.punctuation}%</p>
                <p><strong>Category:</strong> {quiz.category}</p>
                <p><strong>Remarks:</strong> {quiz.remarks}</p>
                <p><strong>Date:</strong> {new Date(quiz.createdAt).toLocaleDateString()}</p>
            </div>
            <h2 className="questions-title">Questions & Answers</h2>
            <ul className="questions-list">
                {quiz.userAnswers.map((userAnswer, index) => (
                    <li key={userAnswer.id} className="question-item">
                        <div className="question-content">
                            <span className="question-number">Q{index + 1}:</span> {userAnswer.question.content}
                        </div>
                        <div className="selected-answer">
                            <strong>Your Answer:</strong> {userAnswer.selectedAnswer.content}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyQuizDetail;
