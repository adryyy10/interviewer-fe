import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../services/api';
import Question from '../components/Question';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetchQuestions();
            setQuestions(response.data['hydra:member']);
        };
        getQuestions();
    }, []);

    return (
        <div>
            {questions.map((question) => (
                <Question key={question.id} question={question} />
            ))}
        </div>
    );
};

export default QuestionPage;
