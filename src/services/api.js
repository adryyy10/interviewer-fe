import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export const createQuestion = (data) => api.post('/questions', data, {
  headers: {
    'Content-Type': 'application/ld+json',
  },
});

export const fetchQuestions = () => api.get('/questions');
export const fetchQuestion = (id) => api.get(`/questions/${id}`);
