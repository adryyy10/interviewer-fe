import { User } from "../user/User";

export interface Feedback {
    id: string;
    content: string;
    createdBy: User;
    createdAt: string
}