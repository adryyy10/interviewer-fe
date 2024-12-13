import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';
import { Question } from '../types';
import { HydraMemberResponse } from '../types/api/HydraMemberResponse';
import { AxiosResponse } from 'axios';
import { UseFetchQuestionsResponse } from '../types/question/UseFetchQuestionsResponse';
import { useQueryCategories } from './useQueryCategories';

const useFetchQuestions = (): UseFetchQuestionsResponse => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {categories, location} = useQueryCategories();

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response: AxiosResponse<HydraMemberResponse<Question>> = await fetchQuestions(categories);
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

export default useFetchQuestions;
