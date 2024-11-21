import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { Question } from '../types';
import { updateAdminQuestionById } from '../services/api';

interface UseUpdateAdminQuestionResult {
  updateSuccess: string;
  updateError: string;
  updateAdminQuestion: (id: number, updatedData: Partial<Question>) => Promise<Question | null>;
  resetUpdateMessages: () => void;
}

export const useUpdateAdminQuestion = (): UseUpdateAdminQuestionResult => {
  const [updateSuccess, setUpdateSuccess] = useState<string>('');
  const [updateError, setUpdateError] = useState<string>('');

  const updateAdminQuestion = async (id: number, updatedData: Partial<Question>): Promise<Question | null> => {
    try {
      const response: AxiosResponse<Question> = await updateAdminQuestionById(id, updatedData);
      setUpdateSuccess('Question updated successfully.');
      setUpdateError('');
      return response.data;
    } catch (err) {
      console.error('Error updating question:', err);
      setUpdateError('Failed to update question. Please try again.');
      setUpdateSuccess('');
      return null;
    }
  };

  const resetUpdateMessages = () => {
    setUpdateSuccess('');
    setUpdateError('');
  };

  return { updateSuccess, updateError, updateAdminQuestion, resetUpdateMessages };
};
