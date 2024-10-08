import axios, { AxiosResponse } from "axios";
import { Question, SignupData, User } from "../types";
import { AuthResponse } from "../types/api/AuthResponse";
import { QuestionData } from "../types/question/QuestionData";
import { CreateQuestionResponse } from "../types/api/CreateQuestionResponse";
import { Routes } from "../constants/routes";
import { UpdateQuestionData } from "../types/question/UpdateQuestionData";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

const getEncodedApiKey = () => {
    const apiKey = localStorage.getItem('apiKey');
    return apiKey ? btoa(apiKey) : null;
};

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
    return api.get<AuthResponse>(Routes.Auth, {
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
        },
    });
};

export const fetchAdminQuestions = () => api.get(Routes.AdminQuestions, getConfig());

export const fetchAdminUsers = () => api.get(Routes.AdminUsers, getConfig());

export const fetchAdminUserById = (id: number): Promise<AxiosResponse<User>> => api.get(`${Routes.AdminUsers}/${id}`, getConfig());

export const fetchAdminQuestionById = (id: number): Promise<AxiosResponse<Question>> => api.get(`${Routes.AdminQuestions}/${id}`, getConfig());

export const fetchQuestions = (category: string | null) => api.get(category ? `/questions?category=${category}` : Routes.Questions);

// POST
export const createQuestion = async (questionData: Omit<QuestionData, 'id'>): Promise<AxiosResponse<CreateQuestionResponse>> => {
    return api.post<CreateQuestionResponse>(Routes.Questions, questionData, getConfig());
};

export const signup = (data: SignupData): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>(Routes.Signup, data);
};

// PATCH
export const updateAdminQuestionById = (
    id: number,
    questionData: UpdateQuestionData
): Promise<AxiosResponse<Question>> => {
    return api.patch<Question>(`${Routes.AdminQuestions}/${id}`, questionData, getPatchConfig());
};
