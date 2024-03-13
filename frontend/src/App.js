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
import MovieDetails from "./pages/Genres/Films/MovieDetails";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/series" element={<Series />} />
          <Route path="/qcm" element={<QCM />} />
          <Route path="/Evenement" element={<Evenement />} />
          <Route path="/Inscription" element={<Signup />} />
          <Route path="/movie-detail/1" component={<MovieDetails />} />
        </Routes>
        {/* Vous pouvez ajouter plus de sections ou de contenu ici */}
    </Router>
  );
}

export default App;