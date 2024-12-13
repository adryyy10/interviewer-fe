import axios, { AxiosResponse } from "axios";
import { Question, SignupData, User } from "../types";
import { AuthResponse } from "../types/api/AuthResponse";
import { QuestionData } from "../types/question/QuestionData";
import { CreateQuestionResponse } from "../types/api/CreateQuestionResponse";
import { Routes } from "../constants/routes";
import { UpdateQuestionData } from "../types/question/UpdateQuestionData";
import { UpdateUserData } from "../types/user/UpdateUserData";
import { Quiz } from "../types/quiz/Quiz";
import { HydraMemberResponse } from "../types/api/HydraMemberResponse";
import { CreateQuizData } from "../types/quiz/CreateQuizData";
import { CreateQuizResponse } from "../types/api/CreateQuizResponse";
import { CreateFeedbackResponse } from "../types/api/CreateFeedbackResponse";
import { FeedbackData } from "../types/feedback/FeedbackData";
import { Feedback } from "../types/feedback/Feedback";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

const getEncodedApiKey = () => {
    const apiKey = localStorage.getItem('apiKey');
    return apiKey ? btoa(apiKey) : null;
};

const getContentTypeConfig = () => ({
    headers: {
        'Content-Type':  'application/ld+json',
    },
});

const getBasicConfig = (encodedCredentials: string) => ({
    headers: {
        Authorization: `Basic ${encodedCredentials}`,
    },
})

const getConfig = () => ({
    headers: {
        'Content-Type':  'application/ld+json',
        'Authorization': `Basic ${getEncodedApiKey()}`,
    },
});

const getPatchConfig = () => ({
    headers: {
        'Content-Type':  'application/merge-patch+json',
        'Authorization': `Basic ${getEncodedApiKey()}`,
    },
});

// GET
export const Auth = (encodedCredentials: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.get<AuthResponse>(Routes.Auth, getBasicConfig(encodedCredentials));
};

export const fetchAdminFeedback = (): Promise<AxiosResponse<HydraMemberResponse<Feedback>>> => api.get(Routes.AdminFeedback, getConfig());

export const fetchAdminQuestions = (): Promise<AxiosResponse<HydraMemberResponse<Question>>> => api.get(Routes.AdminQuestions, getConfig());

export const fetchAdminUsers = (): Promise<AxiosResponse<HydraMemberResponse<User>>> => api.get(Routes.AdminUsers, getConfig());

export const fetchAdminUserById = (id: number): Promise<AxiosResponse<User>> => api.get(`${Routes.AdminUsers}/${id}`, getConfig());

export const fetchAdminQuestionById = (id: number): Promise<AxiosResponse<Question>> => api.get(`${Routes.AdminQuestions}/${id}`, getConfig());

export const fetchQuestions = (categories: string[] | null): Promise<AxiosResponse<HydraMemberResponse<Question>>> => {
    const query = categories
      ? categories.map((category) => `category[]=${encodeURIComponent(category)}`).join("&")
      : "";
    const url = query ? `${Routes.Questions}?${query}` : Routes.Questions;
    return api.get(url);
  };

export const fetchQuizById = (id: number): Promise<AxiosResponse<Quiz>> => api.get<Quiz>(`${Routes.Quizzes}/${id}`, getConfig());

export const fetchMyQuizzes = (): Promise<AxiosResponse<HydraMemberResponse<Quiz>>> => api.get(Routes.MyQuizzes, getConfig());

// POST
export const createQuestion = async (questionData: Omit<QuestionData, 'id'>): Promise<AxiosResponse<CreateQuestionResponse>> => {
    return api.post<CreateQuestionResponse>(Routes.AdminQuestions, questionData, getConfig());
};

export const signup = (data: SignupData): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>(Routes.Signup, data, getContentTypeConfig());
};

export const createQuiz = async (quizData: Omit<CreateQuizData, 'id'>): Promise<AxiosResponse<CreateQuizResponse>> => {
    return api.post<CreateQuizResponse>(Routes.Quizzes, quizData, getConfig());
};

export const createFeedback = async (feedbackData: Omit<FeedbackData, 'id'>): Promise<AxiosResponse<CreateFeedbackResponse>> => {
    return api.post<CreateFeedbackResponse>(Routes.Feedback, feedbackData, getConfig());
};


// PATCH
export const updateAdminQuestionById = (
    id: number,
    questionData: UpdateQuestionData
): Promise<AxiosResponse<Question>> => {
    return api.patch<Question>(`${Routes.AdminQuestions}/${id}`, questionData, getPatchConfig());
};

// DELETE
export const deleteAdminQuestionById = (id: number): Promise<AxiosResponse<Question>> => api.delete(`${Routes.AdminQuestions}/${id}`, getConfig());

export const updateAdminUserById = (
    id: number,
    userData: UpdateUserData
): Promise<AxiosResponse<User>> => {
    return api.patch<User>(`${Routes.AdminUsers}/${id}`, userData, getPatchConfig());
};
