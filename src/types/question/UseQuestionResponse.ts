import { Question } from "./Question";

export interface UseQuestionsResponse {
    questions: Question[];
    loading: boolean;
    error: string | null;
}