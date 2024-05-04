import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import RecommendationsPage from './components/RecommendationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:type" element={<SelectionQCM />} />
        <Route path="/recommendations/:type" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
