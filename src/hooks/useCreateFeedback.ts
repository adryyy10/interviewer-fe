import { useState } from "react";
import { FeedbackData } from "../types/feedback/FeedbackData";
import { createFeedback } from '../services/api';

interface UseCreateFeedbackResult {
  successMessage: string | null;
  errorMessage: string | null;
  handleSubmitFeedback: (feedback: string) => Promise<void>;
  resetMessages: () => void;
}

const useCreateFeedback = (): UseCreateFeedbackResult => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitFeedback = async (feedback: string): Promise<void> => {
    try {

      let feedbackData: FeedbackData = {
        content: feedback
      }
      
      await createFeedback(feedbackData);
      setSuccessMessage("Feedback submitted successfully!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback. Please try again.");
      setSuccessMessage(null);
    }
  };

  const resetMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return { successMessage, errorMessage, handleSubmitFeedback, resetMessages };
};

export default useCreateFeedback;
