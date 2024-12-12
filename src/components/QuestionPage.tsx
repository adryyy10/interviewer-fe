import { useState, FC, Fragment } from 'react';
import useFetchQuestions from '../hooks/useFetchQuestions';
import Question from './Question';
import Score from './Score';
import './QuestionPage.css';
import { Answer } from '../types/answer/Answer';
import { UseFetchQuestionsResponse } from '../types/question/UseFetchQuestionsResponse';
import { calculateQuizResult } from '../utils/quizUtils';
import { QuizResult } from '../types/quiz/QuizResult';
import { createQuiz } from '../services/api';
import { CreateQuizData } from '../types/quiz/CreateQuizData';
import { UserAnswerInput } from '../types/quiz/UserAnswerInput';
import { Routes } from '../constants/routes';
import QuizNavigationButtons from './QuizNavigationButtons';
import { useAuth } from '../hooks/AuthProvider';
import { useQueryCategories } from '../hooks/useQueryCategories';

interface UserAnswerState {
  answer: Answer | null;
  attempted: boolean;
}

const QuestionPage: FC = () => {
  const { token } = useAuth();
  const { questions, loading, error }: UseFetchQuestionsResponse = useFetchQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswerState[]>(
    questions.map(() => ({ answer: null, attempted: false }))
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { categories } = useQueryCategories();

  if (loading) return <div className="loading-container">Loading questions...</div>;
  if (error) return <div className="loading-container">{error}</div>;

  // Handle Question callback function with proper typing
  const handleAnswer = (answer: Answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        answer,
        attempted: true,
      };
      return updatedAnswers;
    });
  };

  const handleFinishQuiz = async () => {
    const result: QuizResult = calculateQuizResult(
      questions,
      userAnswers.map((userAnswerState) => userAnswerState.answer).filter((answer): answer is Answer => answer !== null)
    );

    const userAnswersInput: UserAnswerInput[] = userAnswers.map((userAnswer, index) => {
      const questionId = questions[index].id;
      const selectedAnswerId = userAnswer.answer?.id;
  
      return {
        question: `${Routes.AdminQuestions}/${questionId}`,
        answer: `${Routes.Answers}/${selectedAnswerId}`,
      };
    });

    const createQuizData: CreateQuizData = {
      punctuation: result.punctuation | 0,
      remarks: result.remarks,
      categories: categories,
      userAnswers: userAnswersInput,
    };

    try {
      setSubmitting(true);
      if (token) {
        await createQuiz(createQuizData);
      }
      setSubmitting(false);
      setQuizResult(result);
      setIsFinished(true);
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <section className="question-page-container">
      <div className="question-page-content">
          {questions.length > 0 ? (
            !isFinished ? (
              <Fragment>
                <Question
                  question={questions[currentQuestionIndex]}
                  currentQuestionIndex={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                  selectedAnswer={userAnswers[currentQuestionIndex]?.answer || null}
                  attempted={userAnswers[currentQuestionIndex]?.attempted || false}
                />
                <QuizNavigationButtons
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                  submitting={submitting}
                  onPrevious={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  onFinish={handleFinishQuiz}
                />
              </Fragment>
            ) : (
              <Score
                questions={questions}
                userAnswers={userAnswers.map((userAnswerState) => userAnswerState.answer).filter((answer): answer is Answer => answer !== null)}
                result={quizResult}
              />
            )
          ) : (
            <div className="loading-container">No questions available for this category.</div>
          )}
      </div>
    </section>
  );
};

export default QuestionPage;
