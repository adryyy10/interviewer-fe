import { QuizResult } from "./QuizResult";
import { UserAnswerInput } from "./UserAnswerInput";

export interface CreateQuizData extends QuizResult {
    categories: string[] | null;
    userAnswers: UserAnswerInput[];
}