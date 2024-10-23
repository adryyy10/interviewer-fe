import { Question } from '../question/Question';
import { Answer } from '../answer/Answer';
import { QuizResult } from '../quiz/QuizResult';

export interface ScoreProps {
    questions: Question[];
    userAnswers: Answer[];
    result?: QuizResult | null;
}
