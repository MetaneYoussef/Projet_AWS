import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import "./tailwind.css";
import Connexion from "./pages/Connexion/Connexion";
import FilmsPage from "./pages/Genres/Films/PageFilms";
import Series from "./pages/Genres/Series/PageSeries";
import Accueil from "./pages/Accueil/Accueil";
import QCM from "./pages/Divers/QCM";
import Evenement from "./pages/Divers/Evenement";
import Signup from "./pages/Inscription/Inscription";
import Dune from "./pages/Genres/Films/Dune2";
import MovieHomePage from "./pages/Genres/Films/AccueilFilm";
import SeriesHomePage from "./pages/Genres/Series/AccueilSeries";
import MovieDetailPage from "./pages/Genres/Films/MovieDetailPage";
import SeriesDetailPage from "./pages/Genres/Series/SeriesDetailPage";
import FormulaireInscription from "./pages/FormulaireInscription/FormulaireInscription";
import UserProfile from "./pages/UserProfile/UserProfile";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/films" element={<MovieHomePage />} />
        <Route path="/films/:genre" element={<FilmsPage />} />
        <Route path="/films/detail/:movieId" element={<MovieDetailPage />} />
        <Route path="/series" element={<SeriesHomePage />} />
        <Route path="/series/:genre" element={<Series />} />
        <Route path="/series/detail/:seriesId" element={<SeriesDetailPage />} />
        <Route path="/qcm" element={<QCM />} />
        <Route path="/Evenement" element={<Evenement />} />
        <Route path="/Inscription" element={<Signup />} />
        <Route path="/FormulaireInscription" element={<FormulaireInscription />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Dune" component={<Dune />} />
      </Routes>
      {/* Vous pouvez ajouter plus de sections ou de contenu ici */}
    </Router>
  );
}

export default App;