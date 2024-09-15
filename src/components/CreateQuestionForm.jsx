import React, { useState } from 'react';
import { createQuestion } from '../services/api'; // Adjust the path if needed

const CreateQuestionForm = () => {
  // State variables for form fields
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const data = {
      content,
      category,
    };

    try {
      // Use the createQuestion function from your API client
      await createQuestion(data); 

      setSuccess('Question created successfully!');
      setContent(''); // Reset the form fields
      setCategory('');
    } catch (error) {
      setError('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Create a New Question</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
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
