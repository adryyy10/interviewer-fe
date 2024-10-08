import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Question } from "../types";
import { AxiosResponse } from "axios";
import { fetchAdminQuestionById, updateAdminQuestionById } from "../services/api";
import { Routes } from "../constants/routes";
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import './AdminQuestionDetails.css';
import { UpdateQuestionData } from "../types/question/UpdateQuestionData";

const AdminQuestionDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<Partial<Question>>({});
    const [updateError, setUpdateError] = useState<string>('');
    const [updateSuccess, setUpdateSuccess] = useState<string>('');
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
                setFormData(response.data);
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

    const handleEditClick = () => {
        setIsEditing(true);
        setUpdateSuccess('');
        setUpdateError('');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData(question || {});
        setUpdateSuccess('');
        setUpdateError('');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!id || !question) {
            setUpdateError('Invalid question data.');
            return;
        }
    
        if (!formData.content || !formData.category) {
            setUpdateError('Content and Category are required fields.');
            return;
        }
    
        try {
            const updatedData: UpdateQuestionData = {
                content: formData.content,
                category: formData.category,
                approved: formData.approved,
            };
            const response: AxiosResponse<Question> = await updateAdminQuestionById(Number(id), updatedData);
            setQuestion(response.data);
            setFormData(response.data);
            setIsEditing(false);
            setUpdateSuccess('Question updated successfully.');
        } catch (err) {
            console.error('Error updating question:', err);
            setUpdateError('Failed to update question. Please try again.');
        }
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
                {!isEditing ? (
                    <>
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
                        <button className="edit-button" onClick={handleEditClick}>
                            <FaEdit /> Edit Question
                        </button>
                        {updateSuccess && <p className="success-message">{updateSuccess}</p>}
                        {updateError && <p className="error-message">{updateError}</p>}
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category || ''}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="php">PHP</option>
                                <option value="js">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="approved">Approved:</label>
                            <select
                                id="approved"
                                name="approved"
                                value={formData.approved ? 'true' : 'false'}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    approved: e.target.value === 'true',
                                }))}
                                required
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        {/* Add more form fields as necessary */}
                        <div className="form-actions">
                            <button type="submit" className="save-button">
                                <FaSave /> Save Changes
                            </button>
                            <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                                <FaTimes /> Cancel
                            </button>
                        </div>
                        {updateError && <p className="error-message">{updateError}</p>}
                    </form>
                )}
            </div>
        </div>
    );

}

export default AdminQuestionDetails;
