import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const { category } = queryString.parse(location.search);

        const getQuestions = async () => {
            try {
                const response = await fetchQuestions(category || null);
                setQuestions(response.data['hydra:member']);
            } catch (err) {
                setError('Failed to fetch questions');
            }
            setLoading(false);
        };

        getQuestions();
    }, [location.search]);

    return { questions, loading, error };
};

export default useQuestions;
