import axios from 'axios';

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
}


// GET
export const Auth = (encodedCredentials) =>
  api.get('/auth/lookup', {
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
    },
  });

export const fetchAdminQuestions = () => api.get('/admin/questions', config);

export const fetchAdminUsers = () => api.get('/admin/users', config);

export const fetchQuestion = (id) => api.get(`/questions/${id}`);

export const fetchQuestions = () => api.get('/questions');

// POST
export const createQuestion = (data) => api.post('/admin/questions', data, config);

