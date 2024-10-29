import React, { useState, FC } from 'react';
import useQuestions from '../hooks/useQuestions';
import Question from './Question';
import Score from './Score';
import './QuestionPage.css';
import { Answer } from '../types/answer/Answer';
import { UseQuestionsResponse } from '../types/question/UseQuestionResponse';
import { calculateQuizResult } from '../utils/quizUtils';
import { QuizResult } from '../types/quiz/QuizResult';
import { createQuiz } from '../services/api';
import useQuery from '../hooks/useQuery';
import { CreateQuizData } from '../types/quiz/CreateQuizData';
import { UserAnswerInput } from '../types/quiz/UserAnswerInput';

const QuestionPage: FC = () => {
    const { questions, loading, error }: UseQuestionsResponse = useQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    const query = useQuery();
    const category = query.get('category')?.toLowerCase() || 'all';

    if (loading) return <div className="loading-container">Loading questions...</div>;
    if (error) return <div className="loading-container">{error}</div>;

    // Handle Question callback function with proper typing
    const handleAnswer = (answer: Answer) => {
        setUserAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = answer;
            return updatedAnswers;
        });
    };

    // TODO: Fix adding userAnswers when creating Quiz
    const userAnswersInput: UserAnswerInput[] = userAnswers.map((answer, index) => {
        const questionId = questions[index].id;
        const selectedAnswerId = answer.id;

        return {
            question: `/admin/questions/${questionId}`,
            selectedAnswer: `/answers/${selectedAnswerId}`,
        };
    });

    const handleFinishQuiz = async () => {
        const result: QuizResult = calculateQuizResult(questions, userAnswers);

        const createQuizData: CreateQuizData = {
            punctuation: result.punctuation,
            remarks: result.remarks,
            category: category,
            userAnswers: userAnswersInput,
        };

        try {
            setSubmitting(true);
            await createQuiz(createQuizData);
            setSubmitting(false);
            setQuizResult(result);
            setIsFinished(true);
        } catch (err) {
            setSubmitting(false);
            console.error(err);
        }
    };

    return (
        <div className="question-page-container">
            {questions.length > 0 ? (
                !isFinished ? (
                    <div>
                        <Question
                            question={questions[currentQuestionIndex]} 
                            currentQuestionIndex={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            onAnswer={handleAnswer}
                        />
                        <div className="button-container">
                            <button 
                                onClick={() => setCurrentQuestionIndex(prev => prev - 1)} 
                                disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button 
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleFinishQuiz}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Finish'}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <Score
                        questions={questions}
                        userAnswers={userAnswers}
                        result={quizResult}
                    />
                )
            ) : (
                <div className="loading-container">No questions available for this category.</div>
            )}
        </div>
    );
};

export default QuestionPage;
