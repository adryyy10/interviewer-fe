import { Question } from '../question/Question';
import { Answer } from '../answer/Answer';

export interface ScoreProps {
    questions: Question[];
    userAnswers: Answer[];
}
