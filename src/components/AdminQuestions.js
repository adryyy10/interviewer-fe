import React, { useEffect, useState } from 'react';
import { fetchAdminQuestions } from '../services/api';
import './AdminQuestions.css';

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetchAdminQuestions();
      setQuestions(response.data['hydra:member']);
    };
    getQuestions();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Questions</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Is approved</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.content}</td>
              <td>{question.category}</td>
              <td>{question.createdBy.username}</td>
              <td>{question.approved.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuestions;
