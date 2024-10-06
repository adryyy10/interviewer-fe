import { Answer } from "../answer/Answer";
import { User } from "../user/User";

export interface Question {
    id: number;
    content: string;
    category: string;
    createdBy: User;
    answers: Answer[];
    approved: boolean;
}