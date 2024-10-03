import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuestionForm from './components/CreateQuestionForm';
import QuestionPage from './components/QuestionPage';
import MainPage from './components/MainPage';
import AdminQuestions from './components/AdminQuestions';
import AdminUsers from './components/AdminUsers';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/dashboard"
                            element={<Dashboard /> }
                        />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/admin/questions"
                            element={<AdminQuestions /> }
                        />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/admin/questions/create"
                            element={<CreateQuestionForm /> }
                        />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/admin/users"
                            element={<AdminUsers /> }
                        />
                    </Route>
                    <Route path="/questions" element={<QuestionPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
