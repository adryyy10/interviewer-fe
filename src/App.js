import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionForm from './components/CreateQuestionForm';
import QuestionPage from './components/QuestionPage';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import AuthForm from './components/AuthForm';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPage />
            ) : (
              <AuthForm setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/create" element={<CreateQuestionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
