import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionForm from './components/CreateQuestionForm';
import QuestionPage from './components/QuestionPage';
import QuizForm from './components/QuizForm';
import AdminQuestions from './components/AdminQuestions';
import AdminUsers from './components/AdminUsers';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { Routes as AppRoutes } from './constants/routes';
import AdminUserDetails from './components/AdminUserDetails';
import AdminQuestionDetails from './components/AdminQuestionDetails';
import LandingPage from './components/LandingPage';

const App: FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    
                    {/* Public Routes */}
                    <Route element={<PublicRoute />}>
                        <Route path={AppRoutes.Login} element={<Login />} />
                        <Route path={AppRoutes.Signup} element={<Signup />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path={AppRoutes.AdminUsers} element={<AdminUsers />} />
                        <Route path={AppRoutes.AdminUserDetails} element={<AdminUserDetails />} />
                        <Route path={AppRoutes.AdminQuestions} element={<AdminQuestions />} />
                        <Route path={AppRoutes.AdminQuestionDetails} element={<AdminQuestionDetails />} />
                        <Route path={AppRoutes.CreateQuestion} element={<CreateQuestionForm />} />
                        <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
                    </Route>

                    {/* Other Routes */}
                    <Route path={AppRoutes.LandingPage} element={<LandingPage />} />
                    <Route path={AppRoutes.Quiz} element={<QuizForm />} />
                    <Route path={AppRoutes.Questions} element={<QuestionPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
