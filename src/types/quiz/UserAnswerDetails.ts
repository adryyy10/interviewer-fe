import { Question } from '../question/Question';
import { Answer } from '../answer/Answer';

export interface UserAnswerDetail {
    id: number;
    question: Question;
    selectedAnswer: Answer;
}