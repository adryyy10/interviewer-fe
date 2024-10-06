import axios, { AxiosResponse } from "axios";
import { SignupData } from "../types";
import { AuthResponse } from "../types/api/AuthResponse";
import { QuestionData } from "../types/question/QuestionData";
import { CreateQuestionResponse } from "../types/api/CreateQuestionResponse";
import { Routes } from "../constants/routes";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

const getEncodedApiKey = () => {
    const apiKey = localStorage.getItem('apiKey');
    return apiKey ? btoa(apiKey) : null;
};

const config = {
    headers: {
        'Content-Type':  'application/ld+json',
        'Authorization': `Basic ${getEncodedApiKey()}`,
    },
};

// GET
export const Auth = (encodedCredentials: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.get<AuthResponse>(Routes.Auth, {
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
        },
    });
};

export const fetchAdminQuestions = () => api.get(Routes.AdminQuestions, config);

export const fetchAdminUsers = () => api.get(Routes.AdminUsers, config);

export const fetchQuestion = (id: number) => api.get(`/questions/${id}`);

export const fetchQuestions = (category: string | null) => api.get(category ? `/questions?category=${category}` : Routes.Questions);

// POST
export const createQuestion = async (questionData: Omit<QuestionData, 'id'>): Promise<AxiosResponse<CreateQuestionResponse>> => {
    return api.post<CreateQuestionResponse>(Routes.Questions, questionData, config);
};

export const signup = (data: SignupData): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>(Routes.Signup, data);
};
