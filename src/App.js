import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionForm from './components/CreateQuestionForm';
import QuestionPage from './components/QuestionPage';
import MainPage from './components/MainPage';
import AdminQuestions from './components/AdminQuestions';
import AdminUsers from './components/AdminUsers';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Logged Routes */}
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>

                    {/* Admin Logged Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin/questions" element={<AdminQuestions />} />
                        <Route path="/admin/questions/create" element={<CreateQuestionForm />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                    </Route>

                    {/* Other Routes */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/questions" element={<QuestionPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
