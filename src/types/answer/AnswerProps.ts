import { Answer } from './Answer';

export interface AnswerProps {
    answer: Answer;
    isSelected: boolean;
    attempted: boolean;
    onClick: () => void;
}
