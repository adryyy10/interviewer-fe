import { QuizResult } from "./QuizResult";
import { UserAnswerInput } from "./UserAnswerInput";

export interface CreateQuizData extends QuizResult {
    category: string;
    userAnswers: UserAnswerInput[];
}