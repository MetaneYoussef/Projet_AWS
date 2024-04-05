import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import "./tailwind.css";
import Connexion from "./pages/Connexion/Connexion";
import FilmsPage from "./pages/Genres/Films/PageFilms";
import Series from "./pages/Genres/Series/PageSeries";
import Accueil from "./pages/Accueil/Accueil";
import QCMHomePage from "./pages/QCM/Home";
import QCM from "./pages/QCM/QCM";
import Evenement from "./pages/Divers/Evenement";
import Signup from "./pages/Inscription/Inscription";
import MovieHomePage from "./pages/Genres/Films/AccueilFilm";
import SeriesHomePage from "./pages/Genres/Series/AccueilSeries";
import MovieDetailPage from "./pages/Genres/Films/MovieDetailPage";
import SeriesDetailPage from "./pages/Genres/Series/SeriesDetailPage";
import FormulaireInscription from "./pages/FormulaireInscription/FormulaireInscription";
import UserProfile from "./pages/UserProfile/UserProfile";
import Watchlist from "./pages/Watchlist/Watchlist";
import Contact from "./pages/InsideFooter/Contact";
import FAQ from "./pages/Inscription/FAQ";
import ErrorPage from "./pages/Divers/Page404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/films" element={<MovieHomePage />} />
        <Route path="/films/:genre" element={<FilmsPage />} />
        <Route path="/films/detail/:movieId" element={<MovieDetailPage />} />
        <Route path="/series" element={<SeriesHomePage />} />
        <Route path="/series/:genre" element={<Series />} />
        <Route path="/series/detail/:seriesId" element={<SeriesDetailPage />} />
        <Route path="/qcm" element={<QCMHomePage />} />
        <Route path="/qcm-start" element={<QCM />} />
        <Route path="/Evenement" element={<Evenement />} />
        <Route path="/Inscription" element={<Signup />} />
        <Route path="/signup" element={<FormulaireInscription />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Watchlist" element={<Watchlist />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Accueil />} />

      </Routes>
      {/* Vous pouvez ajouter plus de sections ou de contenu ici */}
    </Router>
  );
}

export default App;