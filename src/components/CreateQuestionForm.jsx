import React, { useState } from 'react';
import { createQuestion } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './CreateQuestionForm.css';

const CreateQuestionForm = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      content,
      category,
    };

    try {
      await createQuestion(data);

      setSuccess('Question created successfully!');
      setContent('');
      setCategory('');

      navigate('/admin/questions');

    } catch (error) {
      setError('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Question</h2>
      {error && <p>{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
