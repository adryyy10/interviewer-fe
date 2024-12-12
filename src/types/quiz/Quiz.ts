import { UserAnswerDetail } from "./UserAnswerDetails";

export interface Quiz {
    id: number;
    punctuation: number;
    remarks: string;
    categories: string[];
    createdAt: string;
    userAnswers: UserAnswerDetail[];
}