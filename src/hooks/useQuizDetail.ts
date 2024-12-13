import { useState, useEffect } from 'react';
import { fetchQuizById } from '../services/api';
import { Quiz } from '../types/quiz/Quiz';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { UseQuizDetailResponse } from '../types/quiz/UseQuizDetailsResponse';

const useQuizDetail = (quizId: number): UseQuizDetailResponse => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getQuizDetail = async () => {
            try {
                const response = await fetchQuizById(quizId);
                setQuiz(response.data);
                setLoading(false);
            } catch (err) {
                let errorMessage = 'Failed to fetch quiz details.';
                if (axios.isAxiosError(err)) {
                    const axiosError = err as AxiosError;
                    if (axiosError.response?.status === HttpStatusCode.Forbidden) {
                        errorMessage = "You can't access this quiz";
                    } else {
                        errorMessage = axiosError.message;
                    }
                }
                console.error('Error fetching quiz details:', err);
                setError(errorMessage);
                setLoading(false);
            }
        };
        getQuizDetail();
    }, [quizId]);

    return { quiz, loading, error };
};

export default useQuizDetail;
