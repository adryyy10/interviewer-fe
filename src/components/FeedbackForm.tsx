import { FC, useState, FormEvent, Fragment } from "react";
import useCreateFeedback from "../hooks/useCreateFeedback";
import "./FeedbackForm.css";

const FeedbackForm: FC = () => {
  const [content, setContent] = useState<string>("");
  const { successMessage, errorMessage, handleSubmitFeedback, resetMessages } = useCreateFeedback();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await handleSubmitFeedback(content);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    resetMessages();
  };

  const renderFeedbackForm = () => {
    return (
      <Fragment>
        <h2>Submit Your Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="content">Your Feedback</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleInputChange}
              placeholder="Enter your feedback here..."
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }

  return (
    <section className="feedback-form-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {renderFeedbackForm()}
    </section>
  );
};

export default FeedbackForm;
