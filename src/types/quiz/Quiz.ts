import { UserAnswerDetail } from "./UserAnswerDetails";

export interface Quiz {
    id: number;
    punctuation: number;
    remarks: string;
    category: string;
    createdAt: string;
    userAnswers: UserAnswerDetail[];
}