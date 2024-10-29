import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyQuizzes from '../hooks/useMyQuizzes';
import './MyQuizzes.css';

const MyQuizzes: FC = () => {
    const { quizzes, loading, error } = useMyQuizzes();
    const navigate = useNavigate();

    if (loading) {
        return <div className="quizzes-loading">Loading your quizzes...</div>;
    }

    if (error) {
        return <div className="quizzes-error">{error}</div>;
    }

    if (quizzes.length === 0) {
        return <div className="quizzes-empty">You have no past quizzes.</div>;
    }

    const handleQuizClick = (quizId: number) => {
        navigate(`/quizzes/${quizId}`);
    };

    return (
        <div className="quizzes-container">
            <h1 className="quizzes-title">My Quizzes</h1>
            <ul className="quizzes-list">
                {quizzes.map((quiz) => (
                    <li 
                        key={quiz.id} 
                        className="quiz-item" 
                        onClick={() => handleQuizClick(quiz.id)}
                    >
                        <div className="quiz-header">
                            <div className="quiz-punctuation">Score: {quiz.punctuation}%</div>
                            <div className="quiz-category">Category: {quiz.category}</div>
                        </div>
                        <div className="quiz-remarks">Remarks: {quiz.remarks}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyQuizzes;
