import { Answer } from "../answer/Answer";
import { Question } from "../question/Question";

export interface UserAnswer {
    id: number;
    question: Question;
    selectedAnswer: Answer;
}