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
import useQuery from '../hooks/useQuery';
import { CreateQuizData } from '../types/quiz/CreateQuizData';
import { UserAnswerInput } from '../types/quiz/UserAnswerInput';
import { Routes } from '../constants/routes';
import QuizNavigationButtons from './QuizNavigationButtons';

const QuestionPage: FC = () => {
  const { questions, loading, error }: UseFetchQuestionsResponse = useFetchQuestions();
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
      question: `${Routes.AdminQuestions}/${questionId}`,
      selectedAnswer: `${Routes.Answers}/${selectedAnswerId}`,
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
                userAnswers={userAnswers}
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
