import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import { createQuestion } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './CreateQuestionForm.css';
import { QuestionData } from '../types/question/QuestionData';

const CreateQuestionForm: FC = () => {
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const navigate = useNavigate();

    // Handle input changes with proper event typing
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    // Handle form submission with proper event and error typing
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const data: QuestionData = {
            content,
            category,
        };

        try {
            await createQuestion(data);

            setSuccess('Question created successfully!');
            setError('');
            setContent('');
            setCategory('');

            navigate('/admin/questions');

        } catch (err: unknown) {
            let errorMessage = 'An error occurred.';

            if (err instanceof Error) {
                errorMessage = 'An error occurred: ' + (err.message || errorMessage);
            } else if (typeof err === 'object' && err !== null && 'response' in err) {
                const anyErr = err as any;
                errorMessage = 'An error occurred: ' + (anyErr.response?.data?.message || errorMessage);
            }

            setError(errorMessage);
            setSuccess('');
        }
    };

    return (
        <div className="form-container">
            <h2>Create a New Question</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    />
                </div>
                <button type="submit">Create Question</button>
            </form>
        </div>
    );
};

export default CreateQuestionForm;
