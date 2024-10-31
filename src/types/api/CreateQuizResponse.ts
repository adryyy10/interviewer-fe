import { UserAnswerInput } from "../quiz/UserAnswerInput";

export interface CreateQuizResponse {
    id: number;
    punctuation: number;
    remarks: string;
    category: string;
    userAnswers: UserAnswerInput[];
}