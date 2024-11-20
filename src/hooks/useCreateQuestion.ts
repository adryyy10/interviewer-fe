import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../services/api';
import { QuestionData } from '../types/question/QuestionData';
import { Routes } from '../constants/routes';

export const useCreateQuestion = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const createNewQuestion = async (data: QuestionData) => {
    try {
      await createQuestion(data);
      setError('');
      navigate(Routes.AdminQuestions);
    } catch (err: unknown) {
      let errorMessage = 'An error occurred.';

      if (err instanceof Error) {
        errorMessage = 'An error occurred: ' + (err.message || errorMessage);
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const anyErr = err as any;
        errorMessage = 'An error occurred: ' + (anyErr.response?.data?.message || errorMessage);
      }

      setError(errorMessage);
    }
  };

  return { error, createNewQuestion };
};
