import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminFeedback.css';
import { Routes } from '../constants/routes';
import useFetchAdminFeedback from '../hooks/useFetchAdminFeedback';
import { Feedback } from '../types/feedback/Feedback';

const AdminFeedbackList: FC = () => {
  const { feedbackItems } = useFetchAdminFeedback();
  const navigate = useNavigate();

  const renderHeader = () => {
    return(
      <header className="feedback-admin-header">
        <h2 className="feedback-admin-title">Feedback list</h2>
      </header>
    );
  }

  const renderTable = () => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Content</th>
            <th>Created By</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {feedbackItems.map((feedbackItem: Feedback) => {
            const formattedDate = new Date(feedbackItem.createdAt).toISOString().split('T')[0];
            return (
              <tr 
                key={feedbackItem.id || feedbackItem.content} 
                onClick={() => navigate(`${Routes.AdminQuestions}/${feedbackItem.id}`)}
              >
                <td>{feedbackItem.id}</td>
                <td>{feedbackItem.content}</td>
                <td>{feedbackItem.createdBy.username}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <section className="feedback-admin-container">
      {renderHeader()}
      {renderTable()}
    </section>
  );
};

export default AdminFeedbackList;
