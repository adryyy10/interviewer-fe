import { Question } from "../question/Question";

export interface CreateQuestionResponse {
    success: boolean;
    message: string;
    data: Question;
}