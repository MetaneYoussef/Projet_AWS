import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import "./tailwind.css";
{/* Liens du Header */}
import Connexion from "./pages/Connexion/Connexion";
import FilmsPage from "./pages/Genres/Films/PageFilms";
import Series from "./pages/Genres/Series/PageSeries";
import Accueil from "./pages/Accueil/Accueil";
import QCMHomePage from "./pages/QCM/Home";
import Evenement from "./pages/Divers/Evenement";
import Watchlist from "./pages/Watchlist/Watchlist";
{/* Liens des Pages de Films et Séries */}
import MovieHomePage from "./pages/Genres/Films/AccueilFilm";
import SeriesHomePage from "./pages/Genres/Series/AccueilSeries";
import MovieDetailPage from "./pages/Genres/Films/MovieDetailPage";
import SeriesDetailPage from "./pages/Genres/Series/SeriesDetailPage";
{/* QCM */}
import SelectionQCM from "./pages/QCM/SelectionQCM";
import Qcm from "./pages/QCM/QCM";
import SeriesQcm from "./pages/QCM/QCM";
import RecommendationsPage from "./pages/QCM/ResultsPage";
{/* Liens du Footer */}
import Contact from "./pages/InsideFooter/Contact";
import FAQ from "./pages/Inscription/FAQ";
{/* Autres */}
import Signup from "./pages/Inscription/Inscription";
import FormulaireInscription from "./pages/FormulaireInscription/FormulaireInscription";
import UserProfile from "./pages/UserProfile/UserProfile";
import ErrorPage from "./pages/Divers/Page404";
import AboutUs from "./pages/InsideFooter/AboutUs";

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
        <Route path="/qcm-selection" element={<SelectionQCM />} />
        <Route path="/qcm/:type" element={<Qcm />} />
        <Route path="/recommendations/:type" element={<RecommendationsPage />} />
        <Route path="/Evenement" element={<Evenement />} />
        <Route path="/Inscription" element={<Signup />} />
        <Route path="/signup" element={<FormulaireInscription />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Watchlist" element={<Watchlist />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/A-Propos" element={<AboutUs />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Accueil />} />

      </Routes>
      {/* Vous pouvez ajouter plus de sections ou de contenu ici */}
    </Router>
  );
}

export default App;