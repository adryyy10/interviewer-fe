import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchQuestions = () => api.get('/questions');
export const fetchQuestion = (id) => api.get(`/questions/${id}`);
