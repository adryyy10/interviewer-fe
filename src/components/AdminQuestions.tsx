import React, { useEffect, useState, FC } from 'react';
import { fetchAdminQuestions } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminQuestions.css';
import { useAuth } from '../hooks/AuthProvider';
import { Question } from '../types';
import { AxiosResponse } from 'axios';

const AdminQuestions: FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response: AxiosResponse<{ 'hydra:member': Question[] }> = await fetchAdminQuestions();
                setQuestions(response.data['hydra:member']);
            } catch (error) {
                console.error('Error fetching admin questions:', error);
            }
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
                <button className="add-question-button" onClick={() => auth.logOut()}>
                    Logout
                </button>
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
                        <th>Is Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question: Question) => (
                        <tr key={question.id || question.content}>
                            <td>{question.content}</td>
                            <td>{question.category}</td>
                            <td>{question.createdBy.username}</td>
                            <td>{question.approved ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminQuestions;
