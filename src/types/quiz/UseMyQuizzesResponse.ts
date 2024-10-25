import { Quiz } from "./Quiz";

export interface UseMyQuizzesResponse {
    quizzes: Quiz[];
    loading: boolean;
    error: string | null;
}