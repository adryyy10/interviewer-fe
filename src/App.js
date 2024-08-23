import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionPage from './components/QuestionPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<QuestionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
