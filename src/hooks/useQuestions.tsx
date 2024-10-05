// src/hooks/useQuestions.tsx

import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Question } from '../types';
import { HydraMemberResponse } from '../types/api/HydraMemberResponse';
import { AxiosResponse } from 'axios';

interface UseQuestionsReturn {
    questions: Question[];
    loading: boolean;
    error: string | null;
}

const useQuestions = (): UseQuestionsReturn => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        const category: string | null = typeof parsed.category === 'string' ? parsed.category : null;

        const getQuestions = async () => {
            try {
                const response: AxiosResponse<HydraMemberResponse<Question>> = await fetchQuestions(category);
                setQuestions(response.data['hydra:member']);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Failed to fetch questions');
            } finally {
                setLoading(false);
            }
        };

        getQuestions();
    }, [location.search]);

    return { questions, loading, error };
};

export default useQuestions;
