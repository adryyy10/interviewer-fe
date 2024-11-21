import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminQuestions.css';
import { Question } from '../types';
import { Routes } from '../constants/routes';
import useFetchAdminQuestions from '../hooks/useFetchAdminQuestions';

const AdminQuestions: FC = () => {
  const { questions } = useFetchAdminQuestions();
  const navigate = useNavigate();

  const renderHeader = () => {
    return(
      <header className="question-admin-header">
        <h2 className="question-admin-title">Questions</h2>
        <button className="question-add-button" onClick={() => navigate(Routes.CreateQuestion)}>
          Add Question
        </button>
      </header>
    );
  }

  const renderTable = () => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Is Approved</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question: Question) => (
            <tr key={question.id || question.content} onClick={() => navigate(`${Routes.AdminQuestions}/${question.id}`)}>
              <td>{question.content}</td>
              <td>{question.category}</td>
              <td>{question.createdBy.username}</td>
              <td>{question.approved ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <section className="question-admin-container">
      {renderHeader()}
      {renderTable()}
    </section>
  );
};

export default AdminQuestions;
