import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './QCM/Home'; // Chemin mis à jour pour Home.jsx
import QCM from './QCM/QCM'; // Chemin mis à jour pour QCM.jsx
import RecommendationsPage from './QCM/RecommendationsPage'; // Chemin mis à jour pour RecommendationsPage.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:type" element={<QCM />} />
        <Route path="/recommendations/:type" element={<RecommendationsPage />} />
        {/* Ajouter d'autres routes si nécessaire */}
      </Routes>
    </Router>
  );
}

export default App;
