import { Quiz } from "./Quiz";

export interface UseQuizDetailResponse {
    quiz: Quiz | null;
    loading: boolean;
    error: string | null;
}