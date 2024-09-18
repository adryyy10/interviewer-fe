import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionForm from './components/CreateQuestionForm';
import QuestionPage from './components/QuestionPage';
import MainPage from './components/MainPage';
import AdminQuestions from './components/AdminQuestions';
import AuthForm from './components/AuthForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('apiKey') !== null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/admin/questions"
          element={
            isAuthenticated ? (
              <AdminQuestions />
            ) : (
              <AuthForm setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/questions/create"
          element={
            isAuthenticated ? (
              <CreateQuestionForm />
            ) : (
              <AuthForm setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/questions" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
