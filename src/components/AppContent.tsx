import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CreateQuestionForm from './CreateQuestionForm';
import QuestionPage from './QuestionPage';
import QuizForm from './QuizForm';
import AdminQuestions from './AdminQuestions';
import AdminUsers from './AdminUsers';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { Routes as AppRoutes } from '../constants/routes';
import AdminUserDetails from './AdminUserDetails';
import AdminQuestionDetails from './AdminQuestionDetails';
import LandingPage from './LandingPage';
import Header from './Header';
import FAQ from './FAQ';
import Footer from './Footer';

const AppContent: FC = () => {
    const location = useLocation();

    const isAdminRoute = (pathname: string): boolean => {
        return pathname.startsWith(AppRoutes.AdminBase);
    };

    return (
        <>
            <Header />
            <div className="main-content">
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
                    <Route path={AppRoutes.faq} element={<FAQ />} />
                    <Route path={AppRoutes.Quiz} element={<QuizForm />} />
                    <Route path={AppRoutes.Questions} element={<QuestionPage />} />
                </Routes>
            </div>
            {!isAdminRoute(location.pathname) && <Footer />}
        </>
    );
};

export default AppContent;