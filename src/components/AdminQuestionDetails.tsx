import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Question } from "../types";
import { AxiosResponse } from "axios";
import { fetchAdminQuestionById } from "../services/api";
import { Routes } from "../constants/routes";
import { FaArrowLeft } from "react-icons/fa";
import './AdminQuestionDetails.css';

const AdminQuestionDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const getQuestion = async () => {
            if (!id) {
                setError('No question ID provided.');
                setLoading(false);
                return;
            }
            try {
                const response: AxiosResponse<Question> = await fetchAdminQuestionById(Number(id));
                setQuestion(response.data);
            } catch (err) {
                console.error('Error fetching question details:', err);
                setError('Failed to fetch question details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        getQuestion();
    }, [id]);

    const handleBackClick = () => {
        navigate(Routes.AdminQuestions);
    };

    if (loading) {
        return <div className="admin-question-details-container"><p>Loading question details...</p></div>;
    }

    if (error) {
        return <div className="admin-question-details-container"><p className="error-message">{error}</p></div>;
    }

    if (!question) {
        return <div className="admin-question-details-container"><p>Question not found.</p></div>;
    }

    return (
        <div className="admin-question-details-container">
            <button className="back-button" onClick={handleBackClick}>
                <FaArrowLeft /> Back to Questions
            </button>
            <div className="question-details-card">
                <h2>Question Details</h2>
                <div className="question-detail">
                    <span className="label">Content:</span>
                    <span className="value">{question.content}</span>
                </div>
                <div className="question-detail">
                    <span className="label">Category:</span>
                    <span className="value">{question.category}</span>
                </div>
                <div className="question-detail">
                    <span className="label">Created by:</span>
                    <span className="value">{question.createdBy.username}</span>
                </div>
                <div className="question-detail">
                    <span className="label">Is approved:</span>
                    <span className="value">{question.approved ? 'Approved' : 'No'}</span>
                </div>
            </div>
        </div>
    );
}


export default AdminQuestionDetails;