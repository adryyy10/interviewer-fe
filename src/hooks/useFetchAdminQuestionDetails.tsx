import { useState, useEffect } from "react";
import { Question } from "../types";
import { fetchAdminQuestionById } from "../services/api";

interface UseAdminQuestionDetailsResult {
  question: Question | null;
  setQuestion: (question: Question | null) => void;
  loading: boolean;
  error: string;
}

export const useFetchAdminQuestionDetails = (id: number | null): UseAdminQuestionDetailsResult => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getQuestion = async () => {
      if (!id) {
        setError("No question ID provided.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetchAdminQuestionById(id);
        setQuestion(response.data);
      } catch (err) {
        console.error("Error fetching question details:", err);
        setError("Failed to fetch question details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getQuestion();
  }, [id]);

  return { question, setQuestion, loading, error };
};
