import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Question } from '../types';
import { deleteAdminQuestionById } from '../services/api';
import { Routes } from '../constants/routes';
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './AdminQuestionDetails.css';
import { useUpdateAdminQuestion } from '../hooks/useUpdateAdminQuestion';
import { categories } from '../constants/questionCategories';
import { useFetchAdminQuestionDetails } from '../hooks/useFetchAdminQuestionDetails';

const AdminQuestionDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const questionId = id ? Number(id) : null;
  const { question, setQuestion, loading, error } = useFetchAdminQuestionDetails(questionId);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Question>>({});
  const navigate = useNavigate();
  const { updateSuccess, updateError, updateAdminQuestion, resetUpdateMessages } = useUpdateAdminQuestion();

  const handleEditClick = () => {
    setFormData(question || {});
    setIsEditing(true);
    resetUpdateMessages();
  };

  const handleDeleteQuestion = () => {
    try {
      deleteAdminQuestionById(Number(id));
      navigate(Routes.AdminQuestions); 
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  }

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

  const renderManagerQuestion = () => {
    return (
      <div className='question-detail-buttons'>
        <button className="edit-button" onClick={handleEditClick}>
          <FaEdit /> Edit Question
        </button>
        <button className="cancel-button" onClick={handleDeleteQuestion}>
          <FaTimes /> Delete Question
        </button>
      </div>
    );
  }

  const renderAnswers = (answers: Question["answers"]) => {
    return (
      <section className="answers-section">
        <h3>Answers</h3>
        <ul className="answers-list">
          {answers.map((answer, index) => (
            <li key={index} className="answer-item">
              <span className="answer-content">{answer.content}</span>
              <span className={`answer-badge ${answer.correct ? "correct" : "incorrect"}`}>
                {answer.correct ? "Correct" : "Incorrect"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  };

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

        { (question.answers.length > 0) ? renderAnswers(question.answers) : ''}

        { renderManagerQuestion() }
        {updateSuccess && <p className="success-message">{updateSuccess}</p>}
        {updateError && <p className="error-message">{updateError}</p>}
      </article>
    );
  }

  const renderEditForm = () => {
    const handleAnswerChange = <T extends keyof Question["answers"][0]>(
      index: number,
      field: T,
      value: Question["answers"][0][T]
    ) => {
      const updatedAnswers = [...(formData.answers || [])];
      if (updatedAnswers[index]) {
        updatedAnswers[index][field] = value;
      }
      setFormData((prev) => ({
        ...prev,
        answers: updatedAnswers,
      }));
    };
  
    const handleAddAnswer = () => {
      setFormData((prev) => ({
        ...prev,
        answers: [...(prev.answers || []), { content: "", correct: false }],
      }));
    };
  
    const handleRemoveAnswer = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        answers: (prev.answers || []).filter((_, i) => i !== index),
      }));
    };
  
    return (
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category || ""}
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
            value={formData.approved ? "true" : "false"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                approved: e.target.value === "true",
              }))
            }
            required
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
  
        <div className="answers-edit-section">
          <h3>Edit Answers</h3>
          {(formData.answers || []).map((answer, index) => (
            <div key={index} className="answer-edit-item">
              <div className="form-group">
                <label htmlFor={`answer-content-${index}`}>Answer Content:</label>
                <input
                  id={`answer-content-${index}`}
                  type="text"
                  value={answer.content}
                  onChange={(e) =>
                    handleAnswerChange(index, "content", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`answer-correct-${index}`}>Correct:</label>
                <select
                  id={`answer-correct-${index}`}
                  value={answer.correct ? "true" : "false"}
                  onChange={(e) =>
                    handleAnswerChange(index, "correct", e.target.value === "true")
                  }
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button
                type="button"
                className="remove-answer-button"
                onClick={() => handleRemoveAnswer(index)}
              >
                Remove Answer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-answer-button"
            onClick={handleAddAnswer}
          >
            Add Answer
          </button>
        </div>
  
        <div className="form-actions">
          <button type="submit" className="save-button">
            <FaSave /> Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancelEdit}
          >
            <FaTimes /> Cancel
          </button>
        </div>
        {updateError && <p className="error-message">{updateError}</p>}
      </form>
    );
  };
  

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
