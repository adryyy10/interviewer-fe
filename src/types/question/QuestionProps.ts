import { Answer } from '../answer/Answer';
import { Question } from './Question';

export interface QuestionProps {
    question: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    onAnswer: (answer: Answer) => void;
}
