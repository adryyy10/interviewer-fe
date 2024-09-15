import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../services/api';
import Question from './Question';
import './QuestionPage.css';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetchQuestions();
            setQuestions(response.data['hydra:member']);
        };
        getQuestions();
    }, []);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    return (
        <div className="question-page-container">
            {questions.length > 0 && (
                <div>
                    <Question key={questions[currentQuestionIndex].id} question={questions[currentQuestionIndex]} />
                    <div className="button-container">
                        <button onClick={handlePrevious}>Previous</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionPage;
