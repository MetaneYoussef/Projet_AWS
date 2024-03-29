import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import Connexion from "./Connexion"; 
import FilmsPage from "./FilmsPage"; 
import Series from "./Series"; 
import Animes from "./Animes"; 
import Accueil from "./Accueil";
import QCM from "./QCM";
import Evenement from "./Evenement";
import HomePage from "./HomePage";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/series" element={<Series />} />
          <Route path="/animes" element={<Animes />} />
          <Route path="/qcm" element={<QCM />} />
          <Route path="/Evenement" element={<Evenement />} />
        </Routes>
        {/* Vous pouvez ajouter plus de sections ou de contenu ici */}
    </Router>
  );
}

export default App;
