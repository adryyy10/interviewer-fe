import { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Question } from '../types';
import { fetchAdminQuestionById } from '../services/api';
import { Routes } from '../constants/routes';
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './AdminQuestionDetails.css';
import { useUpdateAdminQuestion } from '../hooks/useUpdateAdminQuestion';
import { categories } from '../constants/questionCategories';

const AdminQuestionDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Question>>({});
  const navigate = useNavigate();
  const { updateSuccess, updateError, updateAdminQuestion, resetUpdateMessages } = useUpdateAdminQuestion();

  useEffect(() => {
    const getQuestion = async () => {
      if (!id) {
        setError('No question ID provided.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetchAdminQuestionById(Number(id));
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

  const handleEditClick = () => {
    setIsEditing(true);
    resetUpdateMessages();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(question || {});
    resetUpdateMessages();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !question) {
      console.error('Invalid question data.');
      return;
    }

    if (!formData.content || !formData.category) {
      console.error('Content and Category are required fields.');
      return;
    }

    const updatedQuestion = await updateAdminQuestion(Number(id), formData);
    if (updatedQuestion) {
      setQuestion(updatedQuestion);
      setFormData(updatedQuestion);
      setIsEditing(false);
    }
  };

  if (loading) {
    return <div className="admin-question-details-container"><p className='loading-message'>Loading question details...</p></div>;
  }

  if (error) {
    return <div className="admin-question-details-container"><p className="error-message">{error}</p></div>;
  }

  if (!question) {
    return <div className="admin-question-details-container"><p>Question not found.</p></div>;
  }

  const renderQuestionDetails = (question: Question) => {
    return(
      <article>
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
      </article>
    );
  }

  const renderEditForm = () => {
    return(
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
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="approved">Approved:</label>
          <select
            id="approved"
            name="approved"
            value={formData.approved ? 'true' : 'false'}
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              approved: e.target.value === 'true',
            }))}
            required
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
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
    );
  }

  return (
    <div className="admin-question-details-container">
      <button className="admin-question-details-back-button" onClick={() => navigate(Routes.AdminQuestions)}>
        <FaArrowLeft /> Back to Questions
      </button>
      <article className="question-details-card">
        <h2>Question Details</h2>
        {!isEditing ? renderQuestionDetails(question) : renderEditForm()}
      </article>
    </div>
  );
};

export default AdminQuestionDetails;
