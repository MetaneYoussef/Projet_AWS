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
import UserProfile from "./pages/Divers/UserProfile";

function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = { < Accueil / > }
        /> <
        Route path = "/connexion"
        element = { < Connexion / > }
        /> <
        Route path = "/films"
        element = { < FilmsPage / > }
        /> <
        Route path = "/series"
        element = { < Series / > }
        /> <
        Route path = "/qcm"
        element = { < QCM / > }
        /> <
        Route path = "/evenement"
        element = { < Evenement / > }
        /> <
        Route path = "/inscription"
        element = { < Signup / > }
        /> <
        Route path = "/movie-detail/:id"
        element = { < MovieDetails / > }
        /> <
        Route path = "/Userprofile"
        element = { < UserProfile / > }
        /> < /
        Routes > { /* Vous pouvez ajouter plus de sections ou de contenu ici */ } <
        /Router>
    );
}

export default App;