import React, { useEffect, useState } from 'react';
import { fetchAdminQuestions } from '../services/api';

const AdminPage = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetchAdminQuestions();
            setQuestions(response.data['hydra:member']);
        };
        getQuestions();
    }, []);

  return (
    <div>
      <h2>All Created Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
