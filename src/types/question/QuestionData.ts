import { Answer } from "../answer/Answer";

export interface QuestionData {
    content: string;
    category: string;
    approved: string;
    answers: Answer[];
}