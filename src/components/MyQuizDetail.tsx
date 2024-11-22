import { FC } from 'react';
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

  const renderQuizInfo = () => {
    return (
      <section>
        <div className="quiz-info">
          <p><strong>Score:</strong> {quiz.punctuation}%</p>
          <p><strong>Category:</strong> {quiz.category}</p>
          <p><strong>Remarks:</strong> {quiz.remarks}</p>
          <p><strong>Date:</strong> {new Date(quiz.createdAt).toLocaleDateString()}</p>
        </div>
      </section>
    );
  }

  const renderQuestionList = () => {
    return (
      <section>
        <h2 className="questions-title">Questions & Answers</h2>
        <ul className="questions-list">
          {quiz.userAnswers.map((userAnswer, index) => (
            <li key={userAnswer.id} className="question-item">
              <div className="question-content">
                <span className="question-number">Q{index + 1}:</span> {userAnswer.question.content}
              </div>
              <div className={`${userAnswer.answer.correct ? 'selected-answer-correct' : 'selected-answer-incorrect'}`}>
                <strong>Your Answer:</strong> {userAnswer.answer.content}
              </div>
              <div>
                <strong>Explanation:</strong> {userAnswer.answer.explanation}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="quiz-detail-container">
      <div className='quiz-detail-content'>
        <header className='quiz-detail-header'>
          <h1 className="quiz-title">Quiz Details</h1>
          <button onClick={() => navigate(Routes.MyQuizzes)} className="back-button">Back to My Quizzes</button>
        </header>
        {renderQuizInfo()}
        {renderQuestionList()}
      </div>
    </section>
  );
};

export default MyQuizDetail;
