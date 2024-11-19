import { Question } from "./Question";

export interface UseFetchQuestionsResponse {
    questions: Question[];
    loading: boolean;
    error: string | null;
}