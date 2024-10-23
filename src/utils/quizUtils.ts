import { Question } from "../types";
import { Answer } from "../types/answer/Answer";
import { QuizResult } from "../types/quiz/QuizResult";

export const calculateQuizResult = (questions: Question[], answers: Answer[]): QuizResult => {
    const correctPoints = 10;
    let totalPoints = 0;
    let correctAnswers = 0;

    answers.forEach((answer) => {
        if (answer.correct) {
            totalPoints += correctPoints;
            correctAnswers += 1;
        }
    });

    const percentage = (totalPoints / (questions.length * correctPoints)) * 100;

    let remarks = '';

    if (percentage >= 90) {
        remarks = 'Excellent! You have a strong understanding.';
    } else if (percentage >= 70) {
        remarks = 'Good job! A few areas to improve.';
    } else if (percentage >= 50) {
        remarks = 'Fair effort. Consider reviewing some topics.';
    } else {
        remarks = 'Needs improvement. Focus on key areas.';
    }

    return {
        punctuation: totalPoints,
        percentage: percentage,
        remarks,
    };
};
