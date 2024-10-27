import { useState, useEffect } from 'react';
import { Quiz } from '../types/quiz/Quiz';
import { fetchMyQuizzes } from '../services/api';
import { UseMyQuizzesResponse } from '../types/quiz/UseMyQuizzesResponse';
import { AxiosResponse } from 'axios';
import { HydraMemberResponse } from '../types/api/HydraMemberResponse';

const useMyQuizzes = (): UseMyQuizzesResponse => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response: AxiosResponse<HydraMemberResponse<Quiz>> = await fetchMyQuizzes();
                setQuizzes(response.data['hydra:member']);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch quizzes.');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    return { quizzes, loading, error };
};

export default useMyQuizzes;
