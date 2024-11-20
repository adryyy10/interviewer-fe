import { useState, ChangeEvent, FormEvent, FC } from 'react';
import './CreateQuestionForm.css';
import { QuestionData } from '../types/question/QuestionData';
import { categories } from '../constants/questionCategories';
import { useCreateQuestion } from '../hooks/useCreateQuestion';
import { Answer } from '../types/answer/Answer';
import AdminAnswerItem from './AdminAnswerItem';

const CreateQuestionForm: FC = () => {
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>(categories[0].toLowerCase());
  const [approved, setApproved] = useState<string>('false');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { error, createNewQuestion } = useCreateQuestion();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const data: QuestionData = {
      content,
      category,
      approved,
      answers,
    };

    await createNewQuestion(data);

    setContent('');
    setCategory(categories[0].toLowerCase());
    setApproved('false');
    setAnswers([{ content: '', correct: false, explanation: '' }]);
  };

  const handleAnswerChange = <T extends keyof Answer>(
    index: number,
    field: T,
    value: Answer[T]
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][field] = value;
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { content: '', correct: false, explanation: '' }]);
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
  };

  const renderAnswers = () => {
    return (
      <section className="answers-section">
        <header className='answers-section-header'>
          <h3>Answers</h3>
          <button type="button" onClick={addAnswer} className="add-answer-button">
            Add new answer
          </button>
        </header>
        {answers.map((answer, index) => (
          <AdminAnswerItem
            key={index}
            index={index}
            answer={answer}
            onChange={(field, value) => handleAnswerChange(index, field, value)}
            onRemove={() => removeAnswer(index)}
          />
        ))}
      </section>
    );
  };

  const renderContent = () => (
    <div>
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)}
        required
      />
    </div>
  );

  const renderCategory = () => (
    <div>
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={category}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => setCategory(event.target.value)}
        required
      >
        {categories.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );

  const renderApprove = () => (
    <div>
      <label htmlFor="approved">Approve question:</label>
      <select
        id="approved"
        name="approved"
        value={approved}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => setApproved(event.target.value)}
        required
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
    </div>
  );

  return (
    <section className="create-question-container">
      <h2>Create a new question</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        {renderContent()}
        {renderCategory()}
        {renderApprove()}
        {renderAnswers()}
        <button type="submit">Create question</button>
      </form>
    </section>
  );
};

export default CreateQuestionForm;
