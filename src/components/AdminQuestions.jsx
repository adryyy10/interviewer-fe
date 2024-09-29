import React, { useEffect, useState } from 'react';
import { fetchAdminQuestions } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminQuestions.css';

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetchAdminQuestions();
            setQuestions(response.data['hydra:member']);
        };
        getQuestions();
    }, []);

    const handleAddQuestionClick = () => {
        navigate('/admin/questions/create');
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title">Questions</h2>
                <button className="add-question-button" onClick={handleAddQuestionClick}>
                  Add Question
                </button>
            </div>
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
