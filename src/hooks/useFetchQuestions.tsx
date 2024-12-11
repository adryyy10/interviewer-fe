import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Question } from '../types';
import { HydraMemberResponse } from '../types/api/HydraMemberResponse';
import { AxiosResponse } from 'axios';
import { UseFetchQuestionsResponse } from '../types/question/UseFetchQuestionsResponse';

const useFetchQuestions = (): UseFetchQuestionsResponse => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation(); // url in web browser

    useEffect(() => {
        const parsed = queryString.parse(location.search, { arrayFormat: "bracket" }); // Parse arrays in query string
        const categories = Array.isArray(parsed.category)
          ? (parsed.category as string[])
          : parsed.category
          ? [parsed.category as string]
          : null;

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
