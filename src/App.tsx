import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';
import AppContent from './components/AppContent';
import './App.css';

const App: FC = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;
