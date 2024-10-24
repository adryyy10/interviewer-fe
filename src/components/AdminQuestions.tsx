import React, { useEffect, useState, FC } from 'react';
import { fetchAdminQuestions } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminQuestions.css';
import { Question } from '../types';
import { AxiosResponse } from 'axios';
import { Routes } from '../constants/routes';

const AdminQuestions: FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const navigate = useNavigate();

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
        navigate(Routes.CreateQuestion);
    };

    const handleViewQuestionClick = (questionId: number): React.MouseEventHandler<HTMLTableRowElement> => {
        return () => {
            navigate(`/admin/questions/${questionId}`);
        };
    };

    return (
        <div className="question-admin-container">
            <div className="question-admin-header">
                <h2 className="question-admin-title">Questions</h2>
                <button className="question-add-button" onClick={handleAddQuestionClick}>
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
                        <tr key={question.id || question.content} onClick={handleViewQuestionClick(question.id)}>
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
