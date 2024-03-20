import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import "./tailwind.css";
import Connexion from "./pages/Connexion/Connexion"; 
import FilmsPage from "./pages/Genres/Films/Filmss"; 
import Series from "./pages/Genres/Series/PageSeries"; 
import Accueil from "./pages/Accueil/Accueil";
import QCM from "./pages/Divers/Formulaire";
import Evenement from "./pages/Divers/Evenement";
import Signup from "./pages/Inscription/Inscription";
import Dune from "./pages/Genres/Films/Dune2";
import MovieHomePage from "./pages/Genres/Films/AccueilFilm";
import FormulaireInscription from "./pages/FormulaireInscription/FormulaireInscription";  

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/films" element={<MovieHomePage />} />
          <Route path="/all-films" element={<FilmsPage />} />
          <Route path="/series" element={<Series />} />
          <Route path="/qcm" element={<QCM />} />
          <Route path="/Evenement" element={<Evenement />} />
          <Route path="/Inscription" element={<Signup />} />
          <Route path="/FormulaireInscription" element={<FormulaireInscription />} />
          <Route path="/Dune" component={<Dune />} />
        </Routes>
        {/* Vous pouvez ajouter plus de sections ou de contenu ici */}
    </Router>
  );
}

export default App;